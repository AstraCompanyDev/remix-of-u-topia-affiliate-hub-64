import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

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

const TIER_PRICES: Record<ValidTier, number> = {
  bronze: 10000,
  silver: 25000,
  gold: 50000,
  platinum: 100000,
  diamond: 250000,
};

const TIER_NAMES: Record<ValidTier, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

const TIER_DEPTH_LIMITS: Record<ValidTier, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
  diamond: 5,
};

// Input validation functions
function validateTier(tier: unknown): tier is ValidTier {
  return typeof tier === "string" && 
         tier.length <= 20 && 
         VALID_TIERS.includes(tier as ValidTier);
}

function validateSessionId(sessionId: unknown): sessionId is string {
  return typeof sessionId === "string" && 
         sessionId.length >= 10 && 
         sessionId.length <= 100 &&
         /^cs_[a-zA-Z0-9_]+$/.test(sessionId);
}

// Sanitize string for logging (prevent log injection)
function sanitizeForLog(input: string, maxLength = 50): string {
  return input.replace(/[\n\r\t]/g, ' ').substring(0, maxLength);
}

const logStep = (step: string, details?: Record<string, unknown>) => {
  console.log(`[VERIFY-PURCHASE] ${step}`, details ? JSON.stringify(details) : "");
};

// Initialize affiliate status for a user
// deno-lint-ignore no-explicit-any
async function initializeAffiliateStatus(
  supabase: SupabaseClient<any>,
  userId: string,
  tier: ValidTier
): Promise<void> {
  logStep("Initializing affiliate status", { userId, tier });
  
  // Check if already exists
  const { data: existing } = await supabase
    .from("affiliate_status")
    .select("user_id, tier")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    // Upgrade tier if new tier is higher
    const existingDepth = TIER_DEPTH_LIMITS[existing.tier as ValidTier] || 1;
    const newDepth = TIER_DEPTH_LIMITS[tier];
    
    if (newDepth > existingDepth) {
      const { error } = await supabase
        .from("affiliate_status")
        .update({
          tier: tier,
          tier_depth_limit: newDepth,
        })
        .eq("user_id", userId);

      if (error) {
        logStep("Error upgrading tier", { error: error.message });
      } else {
        logStep("Tier upgraded", { from: existing.tier, to: tier });
      }
    } else {
      logStep("Existing tier is same or higher", { existing: existing.tier, new: tier });
    }
    return;
  }

  // Create new affiliate status
  const { error } = await supabase
    .from("affiliate_status")
    .insert({
      user_id: userId,
      tier: tier,
      tier_depth_limit: TIER_DEPTH_LIMITS[tier],
      is_active: true,
    });

  if (error) {
    logStep("Error creating affiliate status", { error: error.message });
  } else {
    logStep("Affiliate status created", { tier });
  }
}

// Activate referral if user was referred
// deno-lint-ignore no-explicit-any
async function activateReferralIfExists(
  supabase: SupabaseClient<any>,
  userId: string
): Promise<void> {
  logStep("Checking for pending referral", { userId });

  const { data: referral, error: fetchError } = await supabase
    .from("referrals")
    .select("*")
    .eq("referred_user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (fetchError) {
    logStep("Error checking referral", { error: fetchError.message });
    return;
  }

  if (!referral) {
    logStep("No pending referral found");
    return;
  }

  // Activate the referral
  const { error: updateError } = await supabase
    .from("referrals")
    .update({
      status: "active",
      verified_at: new Date().toISOString(),
    })
    .eq("id", referral.id);

  if (updateError) {
    logStep("Error activating referral", { error: updateError.message });
  } else {
    logStep("Referral activated", { referrer: referral.referrer_user_id });
  }
}

// Create revenue event and trigger commission calculation
// deno-lint-ignore no-explicit-any
async function createRevenueEventAndCommissions(
  supabase: SupabaseClient<any>,
  userId: string,
  tier: ValidTier,
  amountCents: number,
  sessionId: string,
  isTest: boolean = false
): Promise<{ revenueEventId: string | null; commissionsCreated: number }> {
  const amountUsd = amountCents / 100;
  logStep("Creating revenue event", { userId, tier, amountUsd, sessionId, isTest });

  // Create settled revenue event
  const { data: revenueEvent, error: insertError } = await supabase
    .from("revenue_events")
    .insert({
      user_id: userId,
      source: "membership",
      amount_usd: amountUsd,
      status: "settled",
      external_reference: `stripe_${sessionId}`,
      settled_at: new Date().toISOString(),
      is_test: isTest,
    })
    .select()
    .single();

  if (insertError) {
    logStep("Error creating revenue event", { error: insertError.message });
    return { revenueEventId: null, commissionsCreated: 0 };
  }

  logStep("Revenue event created", { id: revenueEvent.id });

  // Process commissions using the commission engine
  const commissionsCreated = await processCommissions(supabase, revenueEvent, isTest);

  return { revenueEventId: revenueEvent.id, commissionsCreated };
}

// Process commissions for a revenue event
// deno-lint-ignore no-explicit-any
async function processCommissions(
  supabase: SupabaseClient<any>,
  revenueEvent: { id: string; user_id: string; source: string; amount_usd: number; status: string },
  isTest: boolean = false
): Promise<number> {
  logStep("Processing commissions", { 
    revenue_event_id: revenueEvent.id, 
    user_id: revenueEvent.user_id,
    amount: revenueEvent.amount_usd,
    is_test: isTest
  });

  // Verify event is commissionable
  if (revenueEvent.status !== "settled" || Number(revenueEvent.amount_usd) <= 0) {
    logStep("Event not commissionable", { status: revenueEvent.status, amount: revenueEvent.amount_usd });
    return 0;
  }

  // Verify source is approved
  const { data: approvedSource } = await supabase
    .from("approved_revenue_sources")
    .select("source_name")
    .eq("source_name", revenueEvent.source)
    .eq("is_active", true)
    .maybeSingle();

  if (!approvedSource) {
    logStep("Source not approved for commission", { source: revenueEvent.source });
    return 0;
  }

  // Get commission rates
  const { data: ratesData, error: ratesError } = await supabase
    .from("commission_rates")
    .select("*")
    .eq("is_active", true)
    .order("layer");

  if (ratesError || !ratesData || ratesData.length === 0) {
    logStep("Error fetching commission rates", { error: ratesError?.message });
    return 0;
  }

  const rateMap = new Map<number, number>();
  for (const rate of ratesData) {
    rateMap.set(rate.layer, Number(rate.rate_percent));
  }

  // Build upline chain using the database function
  const { data: uplineData, error: uplineError } = await supabase
    .rpc("get_upline_chain", { p_user_id: revenueEvent.user_id, p_max_depth: 5 });

  if (uplineError) {
    logStep("Error getting upline chain", { error: uplineError.message });
    return 0;
  }

  if (!uplineData || uplineData.length === 0) {
    logStep("No upline found for user");
    return 0;
  }

  logStep("Upline chain found", { layers: uplineData.length });

  // Get affiliate statuses for all upline members
  const uplineUserIds = uplineData.map((u: { referrer_id: string }) => u.referrer_id);
  const { data: affiliateStatusData, error: statusError } = await supabase
    .from("affiliate_status")
    .select("*")
    .in("user_id", uplineUserIds);

  if (statusError) {
    logStep("Error fetching affiliate statuses", { error: statusError.message });
    return 0;
  }

  const statusMap = new Map<string, { tier: string; tier_depth_limit: number; is_active: boolean }>();
  for (const status of affiliateStatusData || []) {
    statusMap.set(status.user_id, {
      tier: status.tier,
      tier_depth_limit: status.tier_depth_limit,
      is_active: status.is_active,
    });
  }

  // Calculate and insert commissions
  const commissionsToInsert: Array<{
    beneficiary_user_id: string;
    source_revenue_event_id: string;
    layer: number;
    referred_user_id: string;
    amount_usd: number;
    rate_percent: number;
    status: string;
    is_test: boolean;
  }> = [];

  for (const uplineMember of uplineData) {
    const layer = uplineMember.layer;
    const affiliateId = uplineMember.referrer_id;
    
    // Get affiliate status (default to bronze if not found)
    const status = statusMap.get(affiliateId) || { 
      tier: "bronze", 
      tier_depth_limit: 1, 
      is_active: true 
    };

    // Skip inactive affiliates
    if (!status.is_active) {
      logStep("Skipping inactive affiliate", { user_id: affiliateId, layer });
      continue;
    }

    // Check tier depth limit
    if (layer > status.tier_depth_limit) {
      logStep("Layer exceeds tier depth limit", { 
        user_id: affiliateId, 
        layer, 
        tier: status.tier,
        limit: status.tier_depth_limit 
      });
      continue;
    }

    // Get rate for this layer
    const ratePercent = rateMap.get(layer);
    if (!ratePercent) {
      logStep("No rate found for layer", { layer });
      continue;
    }

    // Calculate commission amount: Revenue × (Rate / 100)
    const commissionAmount = Number(revenueEvent.amount_usd) * (ratePercent / 100);

    logStep("Commission calculated", { 
      beneficiary: affiliateId, 
      layer, 
      rate: ratePercent, 
      amount: commissionAmount 
    });

    commissionsToInsert.push({
      beneficiary_user_id: affiliateId,
      source_revenue_event_id: revenueEvent.id,
      layer,
      referred_user_id: revenueEvent.user_id,
      amount_usd: commissionAmount,
      rate_percent: ratePercent,
      status: "pending",
      is_test: isTest,
    });
  }

  if (commissionsToInsert.length === 0) {
    logStep("No commissions to insert");
    return 0;
  }

  // Insert commissions (with upsert for idempotency)
  const { data: insertedCommissions, error: insertError } = await supabase
    .from("commission_ledger")
    .upsert(commissionsToInsert, {
      onConflict: "beneficiary_user_id,source_revenue_event_id,layer",
      ignoreDuplicates: true,
    })
    .select();

  if (insertError) {
    logStep("Error inserting commissions", { error: insertError.message });
    return 0;
  }

  logStep("Commissions inserted successfully", { count: insertedCommissions?.length || 0 });

  return insertedCommissions?.length || commissionsToInsert.length;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request format", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { session_id, tier } = body as { session_id: unknown; tier: unknown };

    // Validate session_id format
    if (!validateSessionId(session_id)) {
      console.warn(`Invalid session_id format received`);
      return new Response(
        JSON.stringify({ error: "Invalid session identifier", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate tier
    if (!validateTier(tier)) {
      console.warn(`Invalid tier received: ${sanitizeForLog(String(tier))}`);
      return new Response(
        JSON.stringify({ error: "Invalid membership tier", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    logStep("Verifying purchase", { session: sanitizeForLog(session_id), tier });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Payment service unavailable", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 503 }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve the checkout session from Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (stripeError) {
      console.error("Stripe session retrieval failed:", stripeError instanceof Error ? stripeError.message : "Unknown");
      return new Response(
        JSON.stringify({ error: "Unable to verify payment session", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    logStep("Session retrieved", { status: session.payment_status });

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const customerEmail = session.customer_details?.email || session.customer_email;
    if (!customerEmail) {
      console.error("No customer email found in session");
      return new Response(
        JSON.stringify({ error: "Customer information unavailable", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    logStep("Customer email found", { email: customerEmail.substring(0, 3) + "***" });

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
      logStep("Purchase already recorded");
      return new Response(
        JSON.stringify({ verified: true, already_recorded: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Try to find user by email
    const { data: userData } = await supabaseClient.auth.admin.listUsers();
    const user = userData?.users?.find((u) => u.email === customerEmail);

    // Determine if this is a test transaction (Stripe test mode uses test keys)
    // Test mode sessions have IDs starting with "cs_test_"
    const isTestTransaction = session_id.startsWith("cs_test_");
    logStep("Transaction mode detected", { isTest: isTestTransaction });

    // Record the purchase
    const { error: insertError } = await supabaseClient.from("purchases").insert({
      user_id: user?.id || null,
      email: customerEmail,
      tier: tier,
      amount: TIER_PRICES[tier],
      stripe_session_id: session_id,
      status: "completed",
      is_test: isTestTransaction,
    });

    if (insertError) {
      logStep("Error recording purchase", { error: insertError.message });
      return new Response(
        JSON.stringify({ error: "Unable to record purchase. Please contact support.", verified: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    logStep("Purchase recorded successfully");

    // === COMMISSION SYSTEM INTEGRATION ===
    let commissionsCreated = 0;
    let revenueEventId: string | null = null;

    if (user?.id) {
      // 1. Initialize/upgrade affiliate status
      await initializeAffiliateStatus(supabaseClient, user.id, tier);

      // 2. Activate pending referral if exists
      await activateReferralIfExists(supabaseClient, user.id);

      // 3. Create revenue event and calculate commissions
      const commissionResult = await createRevenueEventAndCommissions(
        supabaseClient,
        user.id,
        tier,
        TIER_PRICES[tier],
        session_id,
        isTestTransaction
      );
      commissionsCreated = commissionResult.commissionsCreated;
      revenueEventId = commissionResult.revenueEventId;

      logStep("Commission processing complete", { 
        commissionsCreated, 
        revenueEventId,
        isTest: isTestTransaction
      });
    } else {
      logStep("No user found - skipping commission processing (guest purchase)");
    }

    // Send confirmation email
    let emailSent = false;
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const tierName = TIER_NAMES[tier];
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
                  Your affiliate status has been activated. Start referring friends to earn commissions!
                </p>
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 32px 0;">
                <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                  © ${new Date().getFullYear()} U-topia. All rights reserved.
                </p>
              </div>
            </body>
            </html>
          `,
        });

        if (emailError) {
          logStep("Error sending email", { error: emailError });
        } else {
          logStep("Confirmation email sent");
          emailSent = true;
        }
      } catch (emailErr) {
        logStep("Email sending failed", { error: emailErr instanceof Error ? emailErr.message : "Unknown" });
      }
    } else {
      logStep("RESEND_API_KEY not configured, skipping email");
    }

    return new Response(
      JSON.stringify({ 
        verified: true, 
        email_sent: emailSent,
        commissions_created: commissionsCreated,
        revenue_event_id: revenueEventId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    // Log detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("Error verifying purchase", { error: errorMessage });
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request", verified: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
