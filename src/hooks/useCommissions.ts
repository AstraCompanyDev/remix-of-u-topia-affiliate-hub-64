import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CommissionSummary {
  total_earned: number;
  pending: number;
  approved: number;
  paid: number;
  held: number;
  reversed: number;
  by_layer: Record<number, number>;
}

export interface AffiliateStatus {
  user_id: string;
  tier: string;
  tier_depth_limit: number;
  is_active: boolean;
  updated_at: string;
}

export interface CommissionEntry {
  id: string;
  beneficiary_user_id: string;
  source_revenue_event_id: string;
  layer: number;
  referred_user_id: string;
  amount_usd: number;
  rate_percent: number;
  status: string;
  created_at: string;
  notes: string | null;
}

interface UseCommissionsResult {
  summary: CommissionSummary | null;
  affiliateStatus: AffiliateStatus | null;
  activeReferrals: number;
  recentCommissions: CommissionEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

async function fetchCommissionData() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    return null;
  }

  const userId = session.session.user.id;

  // Fetch all data in parallel for speed
  const [commissionsResult, affiliateResult, referralsResult] = await Promise.all([
    supabase
      .from('commission_ledger')
      .select('*')
      .eq('beneficiary_user_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('affiliate_status')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(),
    supabase
      .from('referrals')
      .select('id', { count: 'exact', head: true })
      .eq('referrer_user_id', userId)
      .eq('status', 'active'),
  ]);

  // Calculate summary from commissions
  const commissions = commissionsResult.data || [];
  const summary: CommissionSummary = {
    total_earned: 0,
    pending: 0,
    approved: 0,
    paid: 0,
    held: 0,
    reversed: 0,
    by_layer: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

  for (const comm of commissions) {
    const amount = Number(comm.amount_usd);
    if (comm.status === 'pending') {
      summary.pending += amount;
    } else if (comm.status === 'approved') {
      summary.approved += amount;
      summary.total_earned += amount;
    } else if (comm.status === 'paid') {
      summary.paid += amount;
      summary.total_earned += amount;
    } else if (comm.status === 'held') {
      summary.held += amount;
    } else if (comm.status === 'reversed') {
      summary.reversed += amount;
    }

    if (comm.status !== 'reversed') {
      summary.by_layer[comm.layer] = (summary.by_layer[comm.layer] || 0) + amount;
    }
  }

  return {
    summary,
    affiliateStatus: affiliateResult.data as AffiliateStatus | null,
    activeReferrals: referralsResult.count || 0,
    recentCommissions: commissions.slice(0, 10) as CommissionEntry[],
  };
}

export function useCommissions(): UseCommissionsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['commissions'],
    queryFn: fetchCommissionData,
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
    gcTime: 1000 * 60 * 30, // 30 minutes - keep in cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    summary: data?.summary || null,
    affiliateStatus: data?.affiliateStatus || null,
    activeReferrals: data?.activeReferrals || 0,
    recentCommissions: data?.recentCommissions || [],
    isLoading,
    error: error ? 'Failed to fetch commission data' : null,
    refetch: async () => { await refetch(); },
  };
}

// Utility function to format currency
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Tier display helpers
export const tierColors: Record<string, string> = {
  bronze: 'text-amber-700 bg-amber-100',
  silver: 'text-gray-600 bg-gray-100',
  gold: 'text-yellow-700 bg-yellow-100',
  platinum: 'text-cyan-700 bg-cyan-100',
  diamond: 'text-purple-700 bg-purple-100',
};

export function getTierLabel(tier: string): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}
