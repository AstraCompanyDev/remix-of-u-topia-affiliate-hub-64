-- Drop overly permissive policies
DROP POLICY IF EXISTS "Service role can insert referral links" ON public.referral_links;
DROP POLICY IF EXISTS "Service role can update referral links" ON public.referral_links;

-- Users can insert their own referral links
CREATE POLICY "Users can insert their own referral links"
ON public.referral_links
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own referral links (for marking as used by themselves - edge case)
CREATE POLICY "Users can update their own referral links"
ON public.referral_links
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);