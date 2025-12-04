-- Supprimer l'ancienne politique SELECT trop permissive
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Créer une nouvelle politique SELECT restrictive
CREATE POLICY "Utilisateurs voient leur profil, admins voient tout"
ON public.profiles
FOR SELECT
USING (
  (auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role)
);