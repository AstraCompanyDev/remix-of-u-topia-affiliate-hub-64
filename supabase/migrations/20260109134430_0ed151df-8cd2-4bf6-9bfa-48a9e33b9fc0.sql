-- Add explicit deny policies for anonymous access on profiles
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Add explicit deny policy for anonymous access on platform_activity
CREATE POLICY "Deny anonymous access to platform_activity"
ON public.platform_activity
FOR SELECT
TO anon
USING (false);