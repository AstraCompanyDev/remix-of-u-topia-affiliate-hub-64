import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ReferralData {
  id: string;
  referredUserId: string;
  referredName: string | null;
  referredEmail: string;
  signupDate: string;
  status: 'pending' | 'active' | 'invalid';
  packagePurchased: string | null;
  commissionEarned: number;
  commissionStatus: string | null;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  pendingReferrals: number;
  totalCommissions: number;
}

export function useReferrals() {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    pendingReferrals: 0,
    totalCommissions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = useCallback(async () => {
    try {
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setIsLoading(false);
        return;
      }

      const userId = session.session.user.id;

      // Fetch referrals where current user is the referrer
      const { data: referralData, error: referralError } = await supabase
        .from('referrals')
        .select(`
          id,
          referred_user_id,
          status,
          created_at,
          verified_at
        `)
        .eq('referrer_user_id', userId)
        .order('created_at', { ascending: false });

      if (referralError) {
        console.error('Error fetching referrals:', referralError);
        setError('Failed to fetch referrals');
        return;
      }

      if (!referralData || referralData.length === 0) {
        setReferrals([]);
        setStats({
          totalReferrals: 0,
          activeReferrals: 0,
          pendingReferrals: 0,
          totalCommissions: 0,
        });
        setIsLoading(false);
        return;
      }

      // Get referred user IDs
      const referredUserIds = referralData.map(r => r.referred_user_id);

      // Fetch profiles for referred users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', referredUserIds);

      const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

      // Fetch purchases for referred users
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('user_id, tier')
        .in('user_id', referredUserIds)
        .eq('status', 'completed');

      const purchasesMap = new Map(purchasesData?.map(p => [p.user_id, p.tier]) || []);

      // Fetch commissions for the referrer from these referred users
      const { data: commissionsData } = await supabase
        .from('commission_ledger')
        .select('referred_user_id, amount_usd, status')
        .eq('beneficiary_user_id', userId)
        .in('referred_user_id', referredUserIds);

      // Group commissions by referred user
      const commissionsMap = new Map<string, { total: number; status: string }>();
      commissionsData?.forEach(c => {
        const existing = commissionsMap.get(c.referred_user_id);
        if (existing) {
          existing.total += Number(c.amount_usd);
        } else {
          commissionsMap.set(c.referred_user_id, { total: Number(c.amount_usd), status: c.status });
        }
      });

      // Build referral data
      const mappedReferrals: ReferralData[] = referralData.map(r => {
        const profile = profilesMap.get(r.referred_user_id);
        const pkg = purchasesMap.get(r.referred_user_id);
        const commission = commissionsMap.get(r.referred_user_id);
        
        // Mask email for privacy
        const email = profile?.email || 'Unknown';
        const maskedEmail = email.length > 3 
          ? email.substring(0, 3) + '***@' + email.split('@')[1]
          : '***';

        return {
          id: r.id,
          referredUserId: r.referred_user_id,
          referredName: profile?.full_name ? `${profile.full_name.split(' ')[0]} ${profile.full_name.split(' ')[1]?.[0] || ''}***` : null,
          referredEmail: maskedEmail,
          signupDate: r.created_at,
          status: r.status as 'pending' | 'active' | 'invalid',
          packagePurchased: pkg ? pkg.charAt(0).toUpperCase() + pkg.slice(1) : null,
          commissionEarned: commission?.total || 0,
          commissionStatus: commission?.status || null,
        };
      });

      setReferrals(mappedReferrals);
      
      // Calculate stats
      setStats({
        totalReferrals: mappedReferrals.length,
        activeReferrals: mappedReferrals.filter(r => r.status === 'active').length,
        pendingReferrals: mappedReferrals.filter(r => r.status === 'pending').length,
        totalCommissions: mappedReferrals.reduce((sum, r) => sum + r.commissionEarned, 0),
      });

    } catch (err) {
      console.error('Error in fetchReferrals:', err);
      setError('Failed to fetch referrals');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  return {
    referrals,
    stats,
    isLoading,
    error,
    refetch: fetchReferrals,
  };
}

// Map referral status to display status
export function getDisplayStatus(referral: ReferralData): string {
  if (referral.status === 'active' && referral.packagePurchased) {
    return 'Commissionable';
  }
  if (referral.status === 'active' && !referral.packagePurchased) {
    return 'Signed Up';
  }
  if (referral.status === 'pending') {
    return 'Pending Activation';
  }
  if (referral.status === 'invalid') {
    return 'Reversed';
  }
  return 'Inactive';
}
