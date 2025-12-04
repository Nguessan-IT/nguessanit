-- Supprimer l'ancienne politique UPDATE trop permissive
DROP POLICY IF EXISTS "Users can update clients" ON public.clients;

-- Créer une nouvelle politique UPDATE restrictive
CREATE POLICY "Créateurs et admins peuvent modifier les clients"
ON public.clients
FOR UPDATE
USING (
  (auth.uid() = created_by) OR has_role(auth.uid(), 'admin'::app_role)
);