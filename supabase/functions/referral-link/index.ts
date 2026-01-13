import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const ALLOWED_ORIGINS = [
  'https://jhrsmjlvzfzdfbdfhwss.lovableproject.com',
  'https://lovable.dev',
  'http://localhost:5173',
  'http://localhost:8080',
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app') || origin.endsWith('.lovableproject.com')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
};

interface ReferralLinkRequest {
  action: 'get' | 'use' | 'generate';
  code?: string;
  email?: string;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const authHeader = req.headers.get('Authorization');
    const body: ReferralLinkRequest = await req.json();
    
    // Validate action
    if (!body.action || !['get', 'use', 'generate'].includes(body.action)) {
      console.error('Invalid action provided:', body.action);
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For 'use' action, we don't need authentication (public endpoint for signups)
    if (body.action === 'use') {
      if (!body.code || typeof body.code !== 'string' || body.code.length > 20) {
        console.error('Invalid code format for use action');
        return new Response(
          JSON.stringify({ error: 'Invalid referral code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!body.email || typeof body.email !== 'string' || !body.email.includes('@') || body.email.length > 255) {
        console.error('Invalid email format for use action');
        return new Response(
          JSON.stringify({ error: 'Invalid email' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Find the active referral link with this code
      const { data: link, error: linkError } = await supabase
        .from('referral_links')
        .select('*')
        .eq('code', body.code.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (linkError) {
        console.error('Error fetching referral link:', linkError);
        return new Response(
          JSON.stringify({ error: 'Failed to validate referral code' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!link) {
        console.log('Referral code not found or already used:', body.code);
        return new Response(
          JSON.stringify({ error: 'Invalid or expired referral code', valid: false }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mark the link as used
      const { error: updateError } = await supabase
        .from('referral_links')
        .update({
          is_active: false,
          used_at: new Date().toISOString(),
          used_by_email: body.email.toLowerCase().trim(),
        })
        .eq('id', link.id);

      if (updateError) {
        console.error('Error marking referral link as used:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to process referral' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate a new referral link for the referrer
      const { data: newCodeData, error: codeError } = await supabase
        .rpc('generate_referral_code');

      if (codeError) {
        console.error('Error generating new referral code:', codeError);
        // Don't fail the request, just log it - the user can regenerate manually
      } else {
        const { error: insertError } = await supabase
          .from('referral_links')
          .insert({
            user_id: link.user_id,
            code: newCodeData,
            is_active: true,
          });

        if (insertError) {
          console.error('Error inserting new referral link:', insertError);
        }
      }

      console.log('Referral link used successfully:', body.code);
      return new Response(
        JSON.stringify({ 
          success: true, 
          valid: true,
          referrer_id: link.user_id 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For 'get' and 'generate' actions, we need authentication
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !userData?.user) {
      console.error('Failed to verify token:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = userData.user.id;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (body.action === 'get') {
      // Get the user's active referral link
      const { data: link, error: linkError } = await supabase
        .from('referral_links')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (linkError) {
        console.error('Error fetching active referral link:', linkError);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch referral link' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // If no active link, generate one
      if (!link) {
        const { data: newCode, error: codeError } = await supabase
          .rpc('generate_referral_code');

        if (codeError) {
          console.error('Error generating referral code:', codeError);
          return new Response(
            JSON.stringify({ error: 'Failed to generate referral code' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data: newLink, error: insertError } = await supabase
          .from('referral_links')
          .insert({
            user_id: userId,
            code: newCode,
            is_active: true,
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error inserting new referral link:', insertError);
          return new Response(
            JSON.stringify({ error: 'Failed to create referral link' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('Generated new referral link for user:', userId);
        return new Response(
          JSON.stringify({ link: newLink }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Returning existing referral link for user:', userId);
      return new Response(
        JSON.stringify({ link }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.action === 'generate') {
      // Force generate a new referral link (deactivate old one first)
      const { error: deactivateError } = await supabase
        .from('referral_links')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('is_active', true);

      if (deactivateError) {
        console.error('Error deactivating old referral link:', deactivateError);
      }

      const { data: newCode, error: codeError } = await supabase
        .rpc('generate_referral_code');

      if (codeError) {
        console.error('Error generating referral code:', codeError);
        return new Response(
          JSON.stringify({ error: 'Failed to generate referral code' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: newLink, error: insertError } = await supabase
        .from('referral_links')
        .insert({
          user_id: userId,
          code: newCode,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting new referral link:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create referral link' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Force generated new referral link for user:', userId);
      return new Response(
        JSON.stringify({ link: newLink }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error in referral-link function:', error);
    const origin = req.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
