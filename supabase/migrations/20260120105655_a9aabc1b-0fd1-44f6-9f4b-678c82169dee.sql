-- Allow referrers to view purchases of users they referred (needed for dashboard display)
CREATE POLICY "Referrers can view referred users purchases"
ON public.purchases
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.referrals
    WHERE referrals.referrer_user_id = auth.uid()
    AND referrals.referred_user_id = purchases.user_id
  )
);

-- Also allow referrers to view profiles of users they referred
CREATE POLICY "Referrers can view referred users profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.referrals
    WHERE referrals.referrer_user_id = auth.uid()
    AND referrals.referred_user_id = profiles.id
  )
);