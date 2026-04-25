-- Wedding sites table for admin to upload past projects
CREATE TABLE public.wedding_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_names TEXT NOT NULL,
  wedding_date TEXT,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  site_url TEXT,
  tags TEXT[],
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wedding_sites ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can view portfolio
CREATE POLICY "Anyone can view wedding sites"
ON public.wedding_sites FOR SELECT
USING (true);

-- Only authenticated admin can manage
CREATE POLICY "Authenticated users can insert wedding sites"
ON public.wedding_sites FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update wedding sites"
ON public.wedding_sites FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete wedding sites"
ON public.wedding_sites FOR DELETE
TO authenticated
USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_wedding_sites_updated_at
BEFORE UPDATE ON public.wedding_sites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for wedding cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-covers', 'wedding-covers', true);

CREATE POLICY "Public can view wedding covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'wedding-covers');

CREATE POLICY "Authenticated can upload wedding covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wedding-covers');

CREATE POLICY "Authenticated can update wedding covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'wedding-covers');

CREATE POLICY "Authenticated can delete wedding covers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'wedding-covers');