
-- Allow anon read/write on newsletters for admin page (protected by password in UI)
DROP POLICY IF EXISTS "Admins can manage newsletters" ON public.newsletters;

CREATE POLICY "Anyone can read newsletters"
ON public.newsletters FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert newsletters"
ON public.newsletters FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update newsletters"
ON public.newsletters FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete newsletters"
ON public.newsletters FOR DELETE
USING (true);

-- Allow anon read on subscribers for admin page
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can read subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (true);
