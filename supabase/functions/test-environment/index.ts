import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  console.log(`[TEST-ENV] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify admin access
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !userData.user?.email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Check admin status
    const { data: isAdminData } = await supabaseAdmin.rpc("is_admin", { _email: userData.user.email });
    if (!isAdminData) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }

    // Verify test mode is active
    const { data: envSetting } = await supabaseAdmin
      .from("platform_settings")
      .select("value")
      .eq("key", "environment_mode")
      .single();

    const currentMode = envSetting?.value?.replace(/"/g, "") || "test";
    if (currentMode !== "test") {
      return new Response(
        JSON.stringify({ error: "Test mode is not active. Cannot perform test actions in production mode." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const body = await req.json();
    const { action } = body;

    logStep("Processing test action", { action, admin: userData.user.email });

    switch (action) {
      case "create_test_user": {
        const email = body.email || `test-user-${Date.now()}@test.utopia.local`;
        
        // Create auth user
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password: `TestPass123!${Date.now()}`,
          email_confirm: true,
          user_metadata: { is_test: true, full_name: "Test User" },
        });

        if (authError) {
          logStep("Error creating test user", { error: authError.message });
          return new Response(
            JSON.stringify({ error: authError.message }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        logStep("Test user created", { userId: authUser.user.id, email });

        return new Response(
          JSON.stringify({ 
            success: true, 
            user_id: authUser.user.id,
            email,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create_test_referral": {
        // Get two test users to create a referral between them
        const { data: testUsers, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
        
        const testUserList = testUsers?.users?.filter(u => 
          u.user_metadata?.is_test === true || u.email?.includes("@test.utopia.local")
        ) || [];

        if (testUserList.length < 2) {
          return new Response(
            JSON.stringify({ error: "Need at least 2 test users. Create test users first." }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        const referrer = testUserList[0];
        const referred = testUserList[testUserList.length - 1];

        // Create affiliate status for referrer if not exists
        await supabaseAdmin
          .from("affiliate_status")
          .upsert({
            user_id: referrer.id,
            tier: "gold",
            tier_depth_limit: 3,
            is_active: true,
            is_test: true,
          }, { onConflict: "user_id" });

        // Create referral relationship
        const { data: referral, error: refError } = await supabaseAdmin
          .from("referrals")
          .insert({
            referrer_user_id: referrer.id,
            referred_user_id: referred.id,
            status: "active",
            verified_at: new Date().toISOString(),
            is_test: true,
          })
          .select()
          .single();

        if (refError) {
          logStep("Error creating test referral", { error: refError.message });
          return new Response(
            JSON.stringify({ error: refError.message }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        logStep("Test referral created", { 
          referrer: referrer.email, 
          referred: referred.email 
        });

        return new Response(
          JSON.stringify({ 
            success: true, 
            referral_id: referral.id,
            referrer_email: referrer.email,
            referred_email: referred.email,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "simulate_revenue_event": {
        const { amount_usd = 250, tier = "silver" } = body;

        // Get a test user with active referral
        const { data: testReferrals } = await supabaseAdmin
          .from("referrals")
          .select("referred_user_id, referrer_user_id")
          .eq("is_test", true)
          .eq("status", "active")
          .limit(1)
          .single();

        if (!testReferrals) {
          return new Response(
            JSON.stringify({ error: "No test referrals found. Create a test referral first." }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        // Create affiliate status for referred user
        const tierDepthMap: Record<string, number> = {
          bronze: 1, silver: 2, gold: 3, platinum: 4, diamond: 5
        };

        await supabaseAdmin
          .from("affiliate_status")
          .upsert({
            user_id: testReferrals.referred_user_id,
            tier: tier,
            tier_depth_limit: tierDepthMap[tier] || 2,
            is_active: true,
            is_test: true,
          }, { onConflict: "user_id" });

        // Create settled revenue event
        const { data: revenueEvent, error: revenueError } = await supabaseAdmin
          .from("revenue_events")
          .insert({
            user_id: testReferrals.referred_user_id,
            source: "membership",
            amount_usd,
            status: "settled",
            external_reference: `test_${Date.now()}`,
            settled_at: new Date().toISOString(),
            is_test: true,
          })
          .select()
          .single();

        if (revenueError) {
          logStep("Error creating revenue event", { error: revenueError.message });
          return new Response(
            JSON.stringify({ error: revenueError.message }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        // Process commissions
        const commissionsCreated = await processTestCommissions(
          supabaseAdmin, 
          revenueEvent,
          testReferrals.referred_user_id
        );

        logStep("Revenue event simulated", { 
          event_id: revenueEvent.id, 
          amount: amount_usd,
          commissions: commissionsCreated 
        });

        return new Response(
          JSON.stringify({ 
            success: true, 
            revenue_event_id: revenueEvent.id,
            amount_usd,
            commissions_created: commissionsCreated,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "reset_test_data": {
        logStep("Resetting all test data");

        // Delete in order of dependencies
        await supabaseAdmin.from("commission_ledger").delete().eq("is_test", true);
        await supabaseAdmin.from("revenue_events").delete().eq("is_test", true);
        await supabaseAdmin.from("purchases").delete().eq("is_test", true);
        await supabaseAdmin.from("referrals").delete().eq("is_test", true);
        await supabaseAdmin.from("affiliate_status").delete().eq("is_test", true);
        await supabaseAdmin.from("platform_activity").delete().eq("is_test", true);

        // Delete test users from auth
        const { data: allUsers } = await supabaseAdmin.auth.admin.listUsers();
        const testUsers = allUsers?.users?.filter(u => 
          u.user_metadata?.is_test === true || u.email?.includes("@test.utopia.local")
        ) || [];

        for (const user of testUsers) {
          await supabaseAdmin.auth.admin.deleteUser(user.id);
        }

        logStep("Test data reset complete", { deleted_users: testUsers.length });

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "All test data has been reset",
            deleted_users: testUsers.length,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Unknown action" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("Error in test-environment", { error: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Process commissions for test revenue event
// deno-lint-ignore no-explicit-any
async function processTestCommissions(
  supabase: any,
  revenueEvent: { id: string; user_id: string; amount_usd: number },
  userId: string
): Promise<number> {
  // Get commission rates
  const { data: rates } = await supabase
    .from("commission_rates")
    .select("*")
    .eq("is_active", true)
    .order("layer");

  if (!rates?.length) return 0;

  const rateMap = new Map<number, number>();
  for (const rate of rates) {
    rateMap.set(rate.layer, Number(rate.rate_percent));
  }

  // Get upline chain
  const { data: uplineData } = await supabase.rpc("get_upline_chain", { 
    p_user_id: userId, 
    p_max_depth: 5 
  });

  if (!uplineData?.length) return 0;

  // Get affiliate statuses
  const uplineIds = uplineData.map((u: { referrer_id: string }) => u.referrer_id);
  const { data: statusData } = await supabase
    .from("affiliate_status")
    .select("*")
    .in("user_id", uplineIds);

  const statusMap = new Map();
  for (const s of statusData || []) {
    statusMap.set(s.user_id, s);
  }

  // Calculate commissions
  const commissions = [];
  for (const upline of uplineData) {
    const status = statusMap.get(upline.referrer_id) || { tier_depth_limit: 1, is_active: true };
    
    if (!status.is_active || upline.layer > status.tier_depth_limit) continue;
    
    const rate = rateMap.get(upline.layer);
    if (!rate) continue;

    const amount = Number(revenueEvent.amount_usd) * (rate / 100);
    commissions.push({
      beneficiary_user_id: upline.referrer_id,
      source_revenue_event_id: revenueEvent.id,
      layer: upline.layer,
      referred_user_id: userId,
      amount_usd: amount,
      rate_percent: rate,
      status: "pending",
      is_test: true,
    });
  }

  if (commissions.length === 0) return 0;

  const { data: inserted } = await supabase
    .from("commission_ledger")
    .upsert(commissions, {
      onConflict: "beneficiary_user_id,source_revenue_event_id,layer",
      ignoreDuplicates: true,
    })
    .select();

  return inserted?.length || 0;
}
