-- Add public SELECT policy for packages table so all users (including anonymous) can view packages
CREATE POLICY "Anyone can view active packages" 
ON public.packages 
FOR SELECT 
USING (is_active = true);