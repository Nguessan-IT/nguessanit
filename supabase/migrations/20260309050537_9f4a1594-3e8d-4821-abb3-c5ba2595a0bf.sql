
-- Drop the restrictive SELECT policy and recreate as permissive
DROP POLICY IF EXISTS "Users can view all services" ON public.services;

CREATE POLICY "Anyone can view active services"
ON public.services
AS PERMISSIVE
FOR SELECT
TO anon, authenticated
USING (active = true);
