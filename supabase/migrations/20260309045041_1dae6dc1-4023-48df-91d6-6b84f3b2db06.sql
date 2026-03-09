
-- Create portfolio storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Allow anyone to view portfolio images
CREATE POLICY "Anyone can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow authenticated admins to upload portfolio images
CREATE POLICY "Admins can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Allow authenticated admins to delete portfolio images
CREATE POLICY "Admins can delete portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
