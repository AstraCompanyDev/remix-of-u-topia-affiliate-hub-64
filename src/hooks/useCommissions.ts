import { useState, useEffect, useCallback } from 'react';
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

export function useCommissions(): UseCommissionsResult {
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [affiliateStatus, setAffiliateStatus] = useState<AffiliateStatus | null>(null);
  const [activeReferrals, setActiveReferrals] = useState(0);
  const [recentCommissions, setRecentCommissions] = useState<CommissionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommissions = useCallback(async () => {
    try {
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase.functions.invoke('process-commission', {
        body: { action: 'get_user_commissions' },
      });

      if (fetchError) {
        console.error('Error fetching commissions:', fetchError);
        setError('Failed to fetch commission data');
        return;
      }

      if (data?.success) {
        setSummary(data.summary);
        setAffiliateStatus(data.affiliate_status);
        setActiveReferrals(data.active_referrals || 0);
        setRecentCommissions(data.recent_commissions || []);
      }
    } catch (err) {
      console.error('Error in fetchCommissions:', err);
      setError('Failed to fetch commission data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  return {
    summary,
    affiliateStatus,
    activeReferrals,
    recentCommissions,
    isLoading,
    error,
    refetch: fetchCommissions,
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
