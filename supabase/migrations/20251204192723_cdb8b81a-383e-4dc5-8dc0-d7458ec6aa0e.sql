-- Supprimer l'ancienne politique ALL trop permissive
DROP POLICY IF EXISTS "Users can manage client services" ON public.client_services;

-- Créer des politiques restrictives pour chaque opération

-- INSERT: admins uniquement
CREATE POLICY "Admins peuvent créer des services clients"
ON public.client_services
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- UPDATE: admins uniquement
CREATE POLICY "Admins peuvent modifier les services clients"
ON public.client_services
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- DELETE: admins uniquement
CREATE POLICY "Admins peuvent supprimer les services clients"
ON public.client_services
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));