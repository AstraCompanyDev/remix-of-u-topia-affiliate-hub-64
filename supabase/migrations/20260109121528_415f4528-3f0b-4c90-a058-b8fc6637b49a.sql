-- Create admin_whitelist table for role-based access control
CREATE TABLE public.admin_whitelist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_whitelist ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_whitelist
    WHERE email = _email
      AND is_active = true
  )
$$;

-- RLS Policy: Only admins can view the whitelist
CREATE POLICY "Admins can view whitelist"
ON public.admin_whitelist
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- RLS Policy: Only admins can insert new admins
CREATE POLICY "Admins can insert whitelist"
ON public.admin_whitelist
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- RLS Policy: Only admins can update whitelist entries
CREATE POLICY "Admins can update whitelist"
ON public.admin_whitelist
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create platform_activity table for activity feed
CREATE TABLE public.platform_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'success',
  amount INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on platform_activity
ALTER TABLE public.platform_activity ENABLE ROW LEVEL SECURITY;

-- Only admins can view platform activity
CREATE POLICY "Admins can view platform activity"
ON public.platform_activity
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Service role can insert activity (for edge functions)
CREATE POLICY "Service role can insert activity"
ON public.platform_activity
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add RLS policy to allow admins to view all purchases
CREATE POLICY "Admins can view all purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Add RLS policy to allow admins to view all referral links
CREATE POLICY "Admins can view all referral links"
ON public.referral_links
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));