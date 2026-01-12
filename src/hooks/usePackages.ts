import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Package {
  id: string;
  name: string;
  price_usd: number;
  shares: number;
  dividend_cap_percent: number;
  is_active: boolean;
}

export type PackageKey = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

const packageOrder: PackageKey[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

// Fallback packages used if the backend returns no rows (e.g. during RLS/config transitions).
// This prevents the UI from appearing "broken" while keeping dynamic package updates when available.
const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'default-bronze',
    name: 'Bronze',
    price_usd: 100,
    shares: 100,
    dividend_cap_percent: 2,
    is_active: true,
  },
  {
    id: 'default-silver',
    name: 'Silver',
    price_usd: 250,
    shares: 300,
    dividend_cap_percent: 3,
    is_active: true,
  },
  {
    id: 'default-gold',
    name: 'Gold',
    price_usd: 500,
    shares: 750,
    dividend_cap_percent: 4,
    is_active: true,
  },
  {
    id: 'default-platinum',
    name: 'Platinum',
    price_usd: 1000,
    shares: 1800,
    dividend_cap_percent: 5,
    is_active: true,
  },
  {
    id: 'default-diamond',
    name: 'Diamond',
    price_usd: 2500,
    shares: 5000,
    dividend_cap_percent: 6,
    is_active: true,
  },
];

// Mapping for referral capacity based on tier
const referralCapacity: Record<PackageKey, number> = {
  bronze: 3,
  silver: 9,
  gold: 27,
  platinum: 81,
  diamond: 243,
};

// Commission depth is same as tier level (1-5)
const commissionDepth: Record<PackageKey, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
  diamond: 5,
};

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('price_usd', { ascending: true });

      if (error) throw error;

      // If backend returns nothing, fall back so the marketing UI never looks empty.
      if (!data || data.length === 0) {
        setPackages(DEFAULT_PACKAGES);
      } else {
        setPackages(data);
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch packages'));

      // On error, still show fallback packages for a functional UI.
      setPackages(DEFAULT_PACKAGES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('packages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'packages'
        },
        () => {
          // Refetch packages when any change occurs
          fetchPackages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getPackageByName = (name: string): Package | undefined => {
    return packages.find(p => p.name.toLowerCase() === name.toLowerCase());
  };

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
  };

  const getPackageFeatures = (pkg: Package): string[] => {
    const key = pkg.name.toLowerCase() as PackageKey;
    return [
      `${pkg.shares.toLocaleString()} Share Allocation`,
      `Maximum Referral Capacity: ${referralCapacity[key] || 3}`,
      `Commission Depth: ${commissionDepth[key] || 1} layer${commissionDepth[key] > 1 ? 's' : ''}`,
      `Maximum Reward Rate: Up to ${pkg.dividend_cap_percent}%`,
    ];
  };

  const getPackageHighlights = (pkg: Package): string[] => {
    const key = pkg.name.toLowerCase() as PackageKey;
    const highlightTexts: Record<PackageKey, string> = {
      bronze: 'Entry-level passive income',
      silver: 'Mid-tier dividends',
      gold: 'LP growth eligible',
      platinum: 'Higher passive rewards',
      diamond: 'Top-tier dividends',
    };
    
    return [
      `${pkg.shares.toLocaleString()} Shares`,
      `${referralCapacity[key] || 3} Referrals`,
      highlightTexts[key] || 'Passive income',
    ];
  };

  return {
    packages,
    isLoading,
    error,
    getPackageByName,
    formatPrice,
    getPackageFeatures,
    getPackageHighlights,
    packageOrder,
  };
}
