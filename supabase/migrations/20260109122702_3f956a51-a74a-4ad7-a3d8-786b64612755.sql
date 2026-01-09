-- Add restrictive DELETE policy to platform_activity table to make audit logs immutable
CREATE POLICY "Deny all deletes on platform_activity"
ON public.platform_activity
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);