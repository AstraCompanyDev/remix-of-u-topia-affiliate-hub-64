import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const ALLOWED_ORIGINS = [
  "https://jhrsmjlvzfzdfbdfhwss.lovableproject.com",
  "https://lovable.dev",
  "http://localhost:5173",
  "http://localhost:8080",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app') || origin.endsWith('.lovableproject.com')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SYNC-STRIPE-PRICE] ${step}${detailsStr}`);
};

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    // Initialize Supabase client with service role for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify admin authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user?.email) {
      throw new Error("User not authenticated");
    }

    // Check if user is admin
    const { data: isAdminResult } = await supabaseClient.rpc("is_admin", {
      _email: userData.user.email,
    });

    if (!isAdminResult) {
      throw new Error("Unauthorized: Admin access required");
    }

    logStep("Admin verified", { email: userData.user.email });

    // Parse request body
    const { package_id, price_usd, name } = await req.json();

    if (!package_id || !price_usd || !name) {
      throw new Error("Missing required fields: package_id, price_usd, name");
    }

    logStep("Request parsed", { package_id, price_usd, name });

    // Get current package data
    const { data: packageData, error: packageError } = await supabaseClient
      .from("packages")
      .select("stripe_product_id, stripe_price_id")
      .eq("id", package_id)
      .single();

    if (packageError || !packageData) {
      throw new Error("Package not found");
    }

    logStep("Package found", { 
      stripe_product_id: packageData.stripe_product_id,
      current_price_id: packageData.stripe_price_id 
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    let productId = packageData.stripe_product_id;

    // Create product if it doesn't exist
    if (!productId) {
      logStep("Creating new Stripe product");
      const product = await stripe.products.create({
        name: `U-topia ${name} Membership`,
        description: `${name} tier membership package`,
      });
      productId = product.id;
      logStep("Product created", { productId });
    }

    // Create new price (Stripe prices are immutable)
    logStep("Creating new Stripe price", { productId, price_usd });
    const newPrice = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(price_usd * 100), // Convert to cents
      currency: "usd",
    });

    logStep("New price created", { priceId: newPrice.id });

    // Deactivate old price if it exists
    if (packageData.stripe_price_id) {
      logStep("Deactivating old price", { oldPriceId: packageData.stripe_price_id });
      try {
        await stripe.prices.update(packageData.stripe_price_id, { active: false });
        logStep("Old price deactivated");
      } catch (deactivateError) {
        logStep("Warning: Could not deactivate old price", { 
          error: deactivateError instanceof Error ? deactivateError.message : String(deactivateError) 
        });
      }
    }

    // Update package with new Stripe IDs
    const { error: updateError } = await supabaseClient
      .from("packages")
      .update({
        stripe_price_id: newPrice.id,
        stripe_product_id: productId,
      })
      .eq("id", package_id);

    if (updateError) {
      throw new Error(`Failed to update package: ${updateError.message}`);
    }

    logStep("Package updated with new Stripe IDs");

    return new Response(
      JSON.stringify({
        success: true,
        stripe_price_id: newPrice.id,
        stripe_product_id: productId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    const origin = req.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
