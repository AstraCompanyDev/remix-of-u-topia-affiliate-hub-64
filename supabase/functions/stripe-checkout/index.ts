import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// Allowed origins for CORS
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

// Valid tier keys
const VALID_TIERS = ["bronze", "silver", "gold", "platinum", "diamond"] as const;
type ValidTier = typeof VALID_TIERS[number];

// Input validation
function validateTier(tier: unknown): tier is ValidTier {
  return typeof tier === "string" && 
         tier.length <= 20 && 
         VALID_TIERS.includes(tier as ValidTier);
}

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[STRIPE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Payment service unavailable. Please try again later." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 503 }
      );
    }

    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { tier } = body as { tier: unknown };

    if (!validateTier(tier)) {
      console.warn(`Invalid tier requested: ${String(tier).substring(0, 50)}`);
      return new Response(
        JSON.stringify({ error: "Invalid membership tier specified" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    logStep("Creating checkout session for tier", { tier });

    // Initialize Supabase client to fetch package data
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Fetch the package from database to get current Stripe price ID
    const { data: packageData, error: packageError } = await supabaseClient
      .from("packages")
      .select("stripe_price_id, price_usd, name")
      .ilike("name", tier)
      .eq("is_active", true)
      .single();

    if (packageError || !packageData) {
      logStep("Package not found or inactive", { tier, error: packageError?.message });
      return new Response(
        JSON.stringify({ error: "Package not found or is inactive" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    if (!packageData.stripe_price_id) {
      logStep("Package has no Stripe price configured", { tier });
      return new Response(
        JSON.stringify({ error: "Package pricing not configured. Please contact support." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    logStep("Package found", { 
      tier, 
      price_id: packageData.stripe_price_id, 
      price_usd: packageData.price_usd 
    });

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const requestOrigin = origin || ALLOWED_ORIGINS[0];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: packageData.stripe_price_id,
          quantity: 1,
        },
      ],
      success_url: `${requestOrigin}/purchase-success?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestOrigin}/purchase?tier=${tier}`,
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Log detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating checkout session:", errorMessage);
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: "Unable to create checkout session. Please try again." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});