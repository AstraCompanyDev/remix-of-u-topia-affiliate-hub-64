import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

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

// Price IDs for each membership tier
const PRICE_IDS: Record<ValidTier, string> = {
  bronze: "price_1SmqHeGagzA6swjX6xWyaEa9",
  silver: "price_1SmqHvGagzA6swjXkbAKbS2C",
  gold: "price_1SmqI5GagzA6swjXSRVL5CXE",
  platinum: "price_1SmqIEGagzA6swjX0KJjGYze",
  diamond: "price_1SmqINGagzA6swjXH0jVXLiH",
};

// Input validation
function validateTier(tier: unknown): tier is ValidTier {
  return typeof tier === "string" && 
         tier.length <= 20 && 
         VALID_TIERS.includes(tier as ValidTier);
}

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

    console.log(`Creating checkout session for tier: ${tier}`);

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const requestOrigin = origin || ALLOWED_ORIGINS[0];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: PRICE_IDS[tier],
          quantity: 1,
        },
      ],
      success_url: `${requestOrigin}/purchase-success?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestOrigin}/purchase?tier=${tier}`,
    });

    console.log(`Checkout session created: ${session.id}`);

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