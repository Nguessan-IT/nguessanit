

# Ajout des pages publiques du site Nguessan-IT

## Contexte
Le projet actuel ne contient que la partie **admin (ERP/CRM)** accessible via `/admin`. Il manque les pages publiques du site vitrine que les visiteurs voient : page d'accueil, a propos, services, et contact.

## Pages a creer

### 1. Page d'accueil (`/`)
- Hero section avec le nom Nguessan-IT, slogan et CTA ("Demandez un devis")
- Section services en bref (3-4 cartes resumant les services)
- Section chiffres cles / pourquoi nous choisir
- Section temoignages ou partenaires
- CTA final vers la page contact

### 2. Page A propos (`/about`)
- Section "Notre Mission" avec style glassmorphism (bg-card/30 backdrop-blur)
- Section "Expertise" axee sur les defis numeriques (ROI, cloud, IA)
- Section equipe avec localisation (Abidjan HQ actif, France et Amerique du Nord "bientot" en opacite reduite)
- Valeurs de l'entreprise

### 3. Page Services publique (`/services`)
- Catalogue des services Nguessan-IT (different de la page admin ServicesPage)
- Cartes de services avec descriptions, icones
- Boutons d'action avec texte centre (whitespace-normal, text-center)
- CTA vers devis/contact

### 4. Page Contact (`/contact`)
- Formulaire de contact avec validation Zod (nom, email, telephone, message)
- Style "captivant" avec gradient anime et effets lumineux
- Informations de contact (adresse Abidjan, email, telephone)
- Liens reseaux sociaux (LinkedIn, Instagram, Facebook)

## Composants partages a creer

### 5. Layout public (`PublicLayout`)
- Navbar sticky avec logo Nguessan-IT et liens (Accueil, Services, A propos, Contact)
- Menu hamburger responsive pour mobile
- Footer global avec :
  - Bloc contact rapide (email, telephone, CTA "Demandez un devis")
  - Liens utiles, liste services, adresse Abidjan
  - Liens reseaux sociaux avec icones
  - Liens legaux (Mentions legales, Politique de confidentialite, CGU)
  - Copyright 2025 Nguessan-IT

## Modifications du routeur (App.tsx)

Structure des routes mise a jour :

```text
/                -> HomePage (public)
/about           -> AboutPage (public)
/services        -> PublicServicesPage (public)
/contact         -> ContactPage (public)
/admin/login     -> LoginPage
/admin/*         -> ERP protege (existant)
```

## Fichiers a creer
- `src/components/layout/PublicLayout.tsx` - Layout avec navbar et footer
- `src/pages/HomePage.tsx` - Page d'accueil
- `src/pages/AboutPage.tsx` - Page a propos
- `src/pages/PublicServicesPage.tsx` - Page services publique
- `src/pages/ContactPage.tsx` - Page contact

## Fichiers a modifier
- `src/App.tsx` - Ajout des routes publiques avec PublicLayout

## Details techniques
- Toutes les pages utilisent le design system existant (couleurs HSL, Tailwind, DM Sans / Space Grotesk)
- Validation des formulaires avec Zod
- Composants responsives (mobile-first)
- Les pages publiques n'exigent pas d'authentification
- La page Services publique affiche un catalogue statique (pas de requete Supabase)
- La page Contact envoie les messages via un insert dans une table `contact_messages` (migration a creer)

