-- Fix purchases table: restrict SELECT to authenticated users only
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.purchases;
DROP POLICY IF EXISTS "Admins can view all purchases" ON public.purchases;

CREATE POLICY "Users can view their own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Fix platform_settings table: restrict SELECT to authenticated admins only
DROP POLICY IF EXISTS "Admins can view platform settings" ON public.platform_settings;

CREATE POLICY "Admins can view platform settings"
ON public.platform_settings
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Add DELETE policy for admin_whitelist (already exists from earlier migration, but ensure it's correct)
DROP POLICY IF EXISTS "Admins can delete from whitelist" ON public.admin_whitelist;

CREATE POLICY "Admins can delete from whitelist"
ON public.admin_whitelist
FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));