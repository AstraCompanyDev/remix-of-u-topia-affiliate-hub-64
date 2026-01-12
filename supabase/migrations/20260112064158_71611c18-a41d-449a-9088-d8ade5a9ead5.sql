-- Fix function search path for get_tier_depth_limit
CREATE OR REPLACE FUNCTION public.get_tier_depth_limit(p_tier affiliate_tier)
RETURNS INT
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
    SELECT CASE p_tier
        WHEN 'bronze' THEN 1
        WHEN 'silver' THEN 2
        WHEN 'gold' THEN 3
        WHEN 'platinum' THEN 4
        WHEN 'diamond' THEN 5
    END;
$$;