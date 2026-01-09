import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReferralLink {
  id: string;
  user_id: string;
  code: string;
  is_active: boolean;
  used_at: string | null;
  used_by_email: string | null;
  created_at: string;
}

export function useReferralLink() {
  const [referralLink, setReferralLink] = useState<ReferralLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReferralLink = useCallback(async () => {
    try {
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase.functions.invoke('referral-link', {
        body: { action: 'get' },
      });

      if (fetchError) {
        console.error('Error fetching referral link:', fetchError);
        setError('Failed to fetch referral link');
        return;
      }

      if (data?.link) {
        setReferralLink(data.link);
      }
    } catch (err) {
      console.error('Error in fetchReferralLink:', err);
      setError('Failed to fetch referral link');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerateLink = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast({
          title: 'Not Authenticated',
          description: 'Please log in to generate a referral link.',
          variant: 'destructive',
        });
        return;
      }

      const { data, error: genError } = await supabase.functions.invoke('referral-link', {
        body: { action: 'generate' },
      });

      if (genError) {
        console.error('Error generating referral link:', genError);
        toast({
          title: 'Error',
          description: 'Failed to generate a new referral link.',
          variant: 'destructive',
        });
        return;
      }

      if (data?.link) {
        setReferralLink(data.link);
        toast({
          title: 'Link Refreshed',
          description: 'Your new referral link is ready.',
        });
      }
    } catch (err) {
      console.error('Error in regenerateLink:', err);
      toast({
        title: 'Error',
        description: 'Failed to generate a new referral link.',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchReferralLink();
  }, [fetchReferralLink]);

  // Build the full referral URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://u-topia.com';
  const fullReferralUrl = referralLink 
    ? `${baseUrl}/auth?ref=${referralLink.code}` 
    : null;

  return {
    referralLink,
    fullReferralUrl,
    isLoading,
    isRefreshing,
    error,
    regenerateLink,
    refetch: fetchReferralLink,
  };
}
