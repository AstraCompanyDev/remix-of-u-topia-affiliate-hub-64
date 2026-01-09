-- Drop the overly permissive INSERT policy for platform_activity
DROP POLICY IF EXISTS "Service role can insert activity" ON public.platform_activity;

-- Create a more restrictive INSERT policy - only authenticated users can insert their own activity
CREATE POLICY "Users can insert own activity"
ON public.platform_activity
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR public.is_admin(auth.jwt() ->> 'email'));