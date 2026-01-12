import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RevenueEvent {
  id: string;
  user_id: string;
  source: string;
  amount_usd: number;
  status: string;
  external_reference: string | null;
  occurred_at: string;
  settled_at: string | null;
}

interface UplineMember {
  layer: number;
  referrer_id: string;
}

interface AffiliateStatus {
  user_id: string;
  tier: string;
  tier_depth_limit: number;
  is_active: boolean;
}

interface CommissionRate {
  layer: number;
  rate_percent: number;
  is_active: boolean;
}

const logStep = (step: string, details?: Record<string, unknown>) => {
  console.log(`[COMMISSION ENGINE] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // deno-lint-ignore no-explicit-any
    const supabaseAdmin: SupabaseClient<any> = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.json();
    const { action, revenue_event_id, user_id, source, amount_usd, external_reference } = body;
    logStep("Request received", { action, revenue_event_id, user_id, source, amount_usd });

    // Action: create_revenue_event - Create and settle a revenue event (for purchases)
    if (action === "create_revenue_event") {
      if (!user_id || !source || !amount_usd) {
        throw new Error("Missing required fields: user_id, source, amount_usd");
      }

      // Check if source is approved
      const { data: approvedSource, error: sourceError } = await supabaseAdmin
        .from("approved_revenue_sources")
        .select("source_name")
        .eq("source_name", source)
        .eq("is_active", true)
        .maybeSingle();

      if (sourceError) {
        logStep("Error checking approved sources", { error: sourceError.message });
        throw new Error("Failed to verify revenue source");
      }

      if (!approvedSource) {
        logStep("Source not approved", { source });
        return new Response(
          JSON.stringify({ success: false, message: "Revenue source not approved" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Create settled revenue event
      const { data: revenueEvent, error: insertError } = await supabaseAdmin
        .from("revenue_events")
        .insert({
          user_id,
          source,
          amount_usd,
          status: "settled",
          external_reference,
          settled_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        logStep("Error creating revenue event", { error: insertError.message });
        throw new Error("Failed to create revenue event");
      }

      logStep("Revenue event created", { id: revenueEvent.id });

      // Process commissions for this event
      const commissionResult = await processCommissions(supabaseAdmin, revenueEvent as RevenueEvent);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          revenue_event: revenueEvent,
          commissions_created: commissionResult.count
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: settle_revenue_event - Mark a pending event as settled and calculate commissions
    if (action === "settle_revenue_event") {
      if (!revenue_event_id) {
        throw new Error("Missing required field: revenue_event_id");
      }

      const { data: revenueEvent, error: fetchError } = await supabaseAdmin
        .from("revenue_events")
        .select("*")
        .eq("id", revenue_event_id)
        .single();

      if (fetchError || !revenueEvent) {
        throw new Error("Revenue event not found");
      }

      if (revenueEvent.status === "settled") {
        return new Response(
          JSON.stringify({ success: false, message: "Event already settled" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Update to settled
      const { error: updateError } = await supabaseAdmin
        .from("revenue_events")
        .update({ status: "settled", settled_at: new Date().toISOString() })
        .eq("id", revenue_event_id);

      if (updateError) {
        throw new Error("Failed to settle revenue event");
      }

      // Process commissions
      const commissionResult = await processCommissions(supabaseAdmin, revenueEvent as RevenueEvent);

      return new Response(
        JSON.stringify({ success: true, commissions_created: commissionResult.count }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: reverse_revenue_event - Reverse settled event and mark commissions reversed
    if (action === "reverse_revenue_event") {
      if (!revenue_event_id) {
        throw new Error("Missing required field: revenue_event_id");
      }

      const { data: revenueEvent, error: fetchError } = await supabaseAdmin
        .from("revenue_events")
        .select("*")
        .eq("id", revenue_event_id)
        .single();

      if (fetchError || !revenueEvent) {
        throw new Error("Revenue event not found");
      }

      if (revenueEvent.status === "reversed") {
        return new Response(
          JSON.stringify({ success: false, message: "Event already reversed" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Update to reversed
      const { error: updateError } = await supabaseAdmin
        .from("revenue_events")
        .update({ status: "reversed" })
        .eq("id", revenue_event_id);

      if (updateError) {
        throw new Error("Failed to reverse revenue event");
      }

      // Reverse all commissions for this event
      const { data: reversedCommissions, error: reverseError } = await supabaseAdmin
        .from("commission_ledger")
        .update({ 
          status: "reversed",
          notes: `Reversed due to revenue event reversal at ${new Date().toISOString()}`
        })
        .eq("source_revenue_event_id", revenue_event_id)
        .neq("status", "reversed")
        .select();

      if (reverseError) {
        logStep("Error reversing commissions", { error: reverseError.message });
      }

      logStep("Commissions reversed", { count: reversedCommissions?.length || 0 });

      return new Response(
        JSON.stringify({ 
          success: true, 
          commissions_reversed: reversedCommissions?.length || 0 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: get_user_commissions - Get commission summary for a user
    if (action === "get_user_commissions") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        throw new Error("Authorization required");
      }

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: authHeader } } }
      );

      const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
      if (authError || !user) {
        throw new Error("Not authenticated");
      }

      // Get all commissions for this user
      const { data: commissions, error: commError } = await supabaseAdmin
        .from("commission_ledger")
        .select("*")
        .eq("beneficiary_user_id", user.id)
        .order("created_at", { ascending: false });

      if (commError) {
        throw new Error("Failed to fetch commissions");
      }

      // Calculate summaries
      const summary = {
        total_earned: 0,
        pending: 0,
        approved: 0,
        paid: 0,
        held: 0,
        reversed: 0,
        by_layer: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
      };

      for (const comm of commissions || []) {
        if (comm.status === "pending") {
          summary.pending += Number(comm.amount_usd);
        } else if (comm.status === "approved") {
          summary.approved += Number(comm.amount_usd);
          summary.total_earned += Number(comm.amount_usd);
        } else if (comm.status === "paid") {
          summary.paid += Number(comm.amount_usd);
          summary.total_earned += Number(comm.amount_usd);
        } else if (comm.status === "held") {
          summary.held += Number(comm.amount_usd);
        } else if (comm.status === "reversed") {
          summary.reversed += Number(comm.amount_usd);
        }

        if (comm.status !== "reversed") {
          summary.by_layer[comm.layer] = (summary.by_layer[comm.layer] || 0) + Number(comm.amount_usd);
        }
      }

      // Get affiliate status
      const { data: affiliateStatus } = await supabaseAdmin
        .from("affiliate_status")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Get referral count
      const { count: referralCount } = await supabaseAdmin
        .from("referrals")
        .select("*", { count: "exact", head: true })
        .eq("referrer_user_id", user.id)
        .eq("status", "active");

      return new Response(
        JSON.stringify({ 
          success: true, 
          summary,
          affiliate_status: affiliateStatus,
          active_referrals: referralCount || 0,
          recent_commissions: (commissions || []).slice(0, 10)
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: create_referral - Create a referral relationship
    if (action === "create_referral") {
      const { referrer_user_id, referred_user_id } = body;
      
      if (!referrer_user_id || !referred_user_id) {
        throw new Error("Missing referrer_user_id or referred_user_id");
      }

      // Check if referral already exists
      const { data: existingReferral } = await supabaseAdmin
        .from("referrals")
        .select("id")
        .eq("referred_user_id", referred_user_id)
        .maybeSingle();

      if (existingReferral) {
        return new Response(
          JSON.stringify({ success: false, message: "User already has a referrer" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      // Create referral
      const { data: referral, error: refError } = await supabaseAdmin
        .from("referrals")
        .insert({
          referrer_user_id,
          referred_user_id,
          status: "pending",
        })
        .select()
        .single();

      if (refError) {
        throw new Error("Failed to create referral");
      }

      return new Response(
        JSON.stringify({ success: true, referral }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: activate_referral - Activate a pending referral after verification
    if (action === "activate_referral") {
      const { referred_user_id } = body;
      
      if (!referred_user_id) {
        throw new Error("Missing referred_user_id");
      }

      const { data: referral, error: updateError } = await supabaseAdmin
        .from("referrals")
        .update({ status: "active", verified_at: new Date().toISOString() })
        .eq("referred_user_id", referred_user_id)
        .eq("status", "pending")
        .select()
        .single();

      if (updateError) {
        throw new Error("Failed to activate referral");
      }

      return new Response(
        JSON.stringify({ success: true, referral }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: init_affiliate - Initialize affiliate status for a new user
    if (action === "init_affiliate") {
      if (!user_id) {
        throw new Error("Missing user_id");
      }

      // Check if already exists
      const { data: existing } = await supabaseAdmin
        .from("affiliate_status")
        .select("user_id")
        .eq("user_id", user_id)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ success: true, message: "Affiliate status already exists" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: insertError } = await supabaseAdmin
        .from("affiliate_status")
        .insert({
          user_id,
          tier: "bronze",
          tier_depth_limit: 1,
          is_active: true,
        });

      if (insertError) {
        logStep("Error creating affiliate status", { error: insertError.message });
        throw new Error("Failed to initialize affiliate status");
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action: upgrade_tier - Upgrade user's affiliate tier based on purchase
    if (action === "upgrade_tier") {
      const { tier } = body;
      if (!user_id || !tier) {
        throw new Error("Missing user_id or tier");
      }

      const tierDepthMap: Record<string, number> = {
        bronze: 1,
        silver: 2,
        gold: 3,
        platinum: 4,
        diamond: 5,
      };

      const depth = tierDepthMap[tier.toLowerCase()];
      if (!depth) {
        throw new Error("Invalid tier");
      }

      const { error: updateError } = await supabaseAdmin
        .from("affiliate_status")
        .upsert({
          user_id,
          tier: tier.toLowerCase(),
          tier_depth_limit: depth,
          is_active: true,
        });

      if (updateError) {
        throw new Error("Failed to upgrade tier");
      }

      return new Response(
        JSON.stringify({ success: true, tier, tier_depth_limit: depth }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("Error", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Core commission calculation function
// deno-lint-ignore no-explicit-any
async function processCommissions(
  supabaseAdmin: SupabaseClient<any>,
  revenueEvent: RevenueEvent
): Promise<{ count: number }> {
  logStep("Processing commissions", { 
    revenue_event_id: revenueEvent.id, 
    user_id: revenueEvent.user_id,
    amount: revenueEvent.amount_usd 
  });

  // Verify event is commissionable
  if (revenueEvent.status !== "settled" || Number(revenueEvent.amount_usd) <= 0) {
    logStep("Event not commissionable", { status: revenueEvent.status, amount: revenueEvent.amount_usd });
    return { count: 0 };
  }

  // Verify source is approved
  const { data: approvedSource } = await supabaseAdmin
    .from("approved_revenue_sources")
    .select("source_name")
    .eq("source_name", revenueEvent.source)
    .eq("is_active", true)
    .maybeSingle();

  if (!approvedSource) {
    logStep("Source not approved for commission", { source: revenueEvent.source });
    return { count: 0 };
  }

  // Get commission rates
  const { data: ratesData, error: ratesError } = await supabaseAdmin
    .from("commission_rates")
    .select("*")
    .eq("is_active", true)
    .order("layer");

  const rates = ratesData as CommissionRate[] | null;

  if (ratesError || !rates || rates.length === 0) {
    logStep("Error fetching commission rates", { error: ratesError?.message });
    return { count: 0 };
  }

  const rateMap = new Map<number, number>();
  for (const rate of rates) {
    rateMap.set(rate.layer, Number(rate.rate_percent));
  }

  // Build upline chain using the database function
  const { data: uplineData, error: uplineError } = await supabaseAdmin
    .rpc("get_upline_chain", { p_user_id: revenueEvent.user_id, p_max_depth: 5 });

  if (uplineError) {
    logStep("Error getting upline chain", { error: uplineError.message });
    return { count: 0 };
  }

  const uplineChain = uplineData as UplineMember[] | null;

  if (!uplineChain || uplineChain.length === 0) {
    logStep("No upline found for user");
    return { count: 0 };
  }

  logStep("Upline chain found", { layers: uplineChain.length });

  // Get affiliate statuses for all upline members
  const uplineUserIds = uplineChain.map((u) => u.referrer_id);
  const { data: affiliateStatusData, error: statusError } = await supabaseAdmin
    .from("affiliate_status")
    .select("*")
    .in("user_id", uplineUserIds);

  if (statusError) {
    logStep("Error fetching affiliate statuses", { error: statusError.message });
    return { count: 0 };
  }

  const affiliateStatuses = affiliateStatusData as AffiliateStatus[] | null;

  const statusMap = new Map<string, { tier: string; tier_depth_limit: number; is_active: boolean }>();
  for (const status of affiliateStatuses || []) {
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
  }> = [];

  for (const uplineMember of uplineChain) {
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
    });
  }

  if (commissionsToInsert.length === 0) {
    logStep("No commissions to insert");
    return { count: 0 };
  }

  // Insert commissions (with upsert for idempotency)
  const { data: insertedCommissions, error: insertError } = await supabaseAdmin
    .from("commission_ledger")
    .upsert(commissionsToInsert, {
      onConflict: "beneficiary_user_id,source_revenue_event_id,layer",
      ignoreDuplicates: true,
    })
    .select();

  if (insertError) {
    logStep("Error inserting commissions", { error: insertError.message });
    return { count: 0 };
  }

  logStep("Commissions inserted successfully", { count: insertedCommissions?.length || 0 });

  return { count: insertedCommissions?.length || commissionsToInsert.length };
}
