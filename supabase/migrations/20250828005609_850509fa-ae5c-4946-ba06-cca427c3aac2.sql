-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create newsletters table for email subscriptions
CREATE TABLE public.newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create donations table for tracking donations
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  paystack_reference TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create seminars table
CREATE TABLE public.seminars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create journals table
CREATE TABLE public.journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  published_date DATE,
  author TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seminars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for newsletters (public can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletters
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletters" ON public.newsletters
  FOR SELECT USING (true);

-- RLS Policies for donations
CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Donations can be updated" ON public.donations
  FOR UPDATE USING (true);

-- RLS Policies for contacts (anyone can submit)
CREATE POLICY "Anyone can submit contact forms" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- RLS Policies for seminars (public read)
CREATE POLICY "Anyone can view seminars" ON public.seminars
  FOR SELECT USING (is_active = true);

-- RLS Policies for journals (public read)
CREATE POLICY "Anyone can view journals" ON public.journals
  FOR SELECT USING (true);

-- Insert sample seminars
INSERT INTO public.seminars (title, description, date, location) VALUES
('Advanced Livestock Breeding Techniques', 'Learn modern breeding techniques for improved livestock production', '2025-09-10', 'Lagos, Nigeria'),
('Feed Formulation Workshop', 'Comprehensive workshop on feed formulation and nutrition', '2025-10-11', 'Akure, Nigeria'),
('Sustainable Farming Practices', 'Discover sustainable farming methods for the future', '2025-12-15', 'Abuja, Nigeria');

-- Insert sample journals
INSERT INTO public.journals (title, description, url, author, published_date, is_featured) VALUES
('Modern Livestock Breeding in Nigeria', 'Comprehensive guide to livestock breeding practices', 'https://example.com/journal1', 'Dr. Adebayo Johnson', '2024-01-15', true),
('Feed Formulation Best Practices', 'Scientific approach to animal feed formulation', 'https://example.com/journal2', 'Prof. Kemi Adeyemi', '2024-02-20', true),
('Sustainable Agriculture in West Africa', 'Sustainable farming practices for the region', 'https://example.com/journal3', 'Dr. Emmanuel Okafor', '2024-03-10', false);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();