import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIER_PRICES: Record<string, number> = {
  bronze: 10000,
  silver: 25000,
  gold: 50000,
  platinum: 100000,
  diamond: 250000,
};

const TIER_NAMES: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, tier } = await req.json();

    if (!session_id || !tier) {
      return new Response(
        JSON.stringify({ error: "Missing session_id or tier" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log(`Verifying purchase for session: ${session_id}, tier: ${tier}`);

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log(`Session status: ${session.payment_status}`);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const customerEmail = session.customer_details?.email || session.customer_email;
    if (!customerEmail) {
      return new Response(
        JSON.stringify({ error: "No customer email found", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log(`Customer email: ${customerEmail}`);

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Check if this purchase was already recorded
    const { data: existingPurchase } = await supabaseClient
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (existingPurchase) {
      console.log("Purchase already recorded");
      return new Response(
        JSON.stringify({ verified: true, already_recorded: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Try to find user by email
    const { data: userData } = await supabaseClient.auth.admin.listUsers();
    const user = userData?.users?.find((u) => u.email === customerEmail);

    // Record the purchase
    const { error: insertError } = await supabaseClient.from("purchases").insert({
      user_id: user?.id || null,
      email: customerEmail,
      tier: tier,
      amount: TIER_PRICES[tier] || 0,
      stripe_session_id: session_id,
      status: "completed",
    });

    if (insertError) {
      console.error("Error recording purchase:", insertError);
      throw new Error(`Failed to record purchase: ${insertError.message}`);
    }

    console.log("Purchase recorded successfully");

    // Send confirmation email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const resend = new Resend(resendKey);
      const tierName = TIER_NAMES[tier] || tier;
      const priceFormatted = `$${(TIER_PRICES[tier] / 100).toLocaleString()}`;

      const { error: emailError } = await resend.emails.send({
        from: "U-topia <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Welcome to U-topia ${tierName} Membership!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0f1a; color: #ffffff; padding: 40px 20px; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
              <h1 style="color: #a855f7; margin: 0 0 24px 0; font-size: 28px; text-align: center;">
                🎉 Welcome to U-topia!
              </h1>
              <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for your purchase! Your <strong style="color: #a855f7;">${tierName} Membership</strong> is now active.
              </p>
              <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h2 style="color: #ffffff; margin: 0 0 16px 0; font-size: 18px;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0;">Package:</td>
                    <td style="color: #ffffff; text-align: right; padding: 8px 0;">${tierName} Membership</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0;">Amount:</td>
                    <td style="color: #a855f7; font-weight: bold; text-align: right; padding: 8px 0;">${priceFormatted}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0;">Status:</td>
                    <td style="color: #22c55e; text-align: right; padding: 8px 0;">✓ Confirmed</td>
                  </tr>
                </table>
              </div>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0; text-align: center;">
                If you have any questions, feel free to reach out to our support team.
              </p>
              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 32px 0;">
              <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                © 2024 U-topia. All rights reserved.
              </p>
            </div>
          </body>
          </html>
        `,
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
      } else {
        console.log("Confirmation email sent successfully");
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email");
    }

    return new Response(
      JSON.stringify({ verified: true, email_sent: !!resendKey }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error verifying purchase:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage, verified: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
