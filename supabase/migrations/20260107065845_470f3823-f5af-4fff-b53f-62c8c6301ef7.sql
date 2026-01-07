-- Add UPDATE policy - deny all user updates (only service role can update)
CREATE POLICY "Deny user updates on purchases"
ON public.purchases
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Add DELETE policy - deny all deletes (purchases should never be deleted)
CREATE POLICY "Deny all deletes on purchases"
ON public.purchases
FOR DELETE
TO authenticated
USING (false);