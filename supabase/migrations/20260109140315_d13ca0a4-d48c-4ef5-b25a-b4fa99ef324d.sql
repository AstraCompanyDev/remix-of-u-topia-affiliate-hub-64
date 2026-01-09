-- Add stripe_price_id column to packages table
ALTER TABLE public.packages ADD COLUMN stripe_price_id TEXT;

-- Add stripe_product_id for reference
ALTER TABLE public.packages ADD COLUMN stripe_product_id TEXT;

-- Update existing packages with known Stripe price IDs
UPDATE public.packages SET stripe_price_id = 'price_1SmqHeGagzA6swjX6xWyaEa9', stripe_product_id = 'prod_bronze' WHERE LOWER(name) = 'bronze';
UPDATE public.packages SET stripe_price_id = 'price_1SmqHvGagzA6swjXkbAKbS2C', stripe_product_id = 'prod_silver' WHERE LOWER(name) = 'silver';
UPDATE public.packages SET stripe_price_id = 'price_1SmqI5GagzA6swjXSRVL5CXE', stripe_product_id = 'prod_gold' WHERE LOWER(name) = 'gold';
UPDATE public.packages SET stripe_price_id = 'price_1SmqIEGagzA6swjX0KJjGYze', stripe_product_id = 'prod_platinum' WHERE LOWER(name) = 'platinum';
UPDATE public.packages SET stripe_price_id = 'price_1SmqINGagzA6swjXH0jVXLiH', stripe_product_id = 'prod_diamond' WHERE LOWER(name) = 'diamond';