import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Price IDs for each membership tier
const PRICE_IDS: Record<string, string> = {
  bronze: "price_1SmqHeGagzA6swjX6xWyaEa9",
  silver: "price_1SmqHvGagzA6swjXkbAKbS2C",
  gold: "price_1SmqI5GagzA6swjXSRVL5CXE",
  platinum: "price_1SmqIEGagzA6swjX0KJjGYze",
  diamond: "price_1SmqINGagzA6swjXH0jVXLiH",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const { tier } = await req.json();

    if (!tier || !PRICE_IDS[tier]) {
      return new Response(
        JSON.stringify({ error: "Invalid tier specified" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    console.log(`Creating checkout session for tier: ${tier}`);

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "https://jhrsmjlvzfzdfbdfhwss.supabase.co";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: PRICE_IDS[tier],
          quantity: 1,
        },
      ],
      success_url: `${origin}/purchase-success?tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/purchase?tier=${tier}`,
    });

    console.log(`Checkout session created: ${session.id}`);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating checkout session:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
