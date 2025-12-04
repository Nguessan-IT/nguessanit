import { z } from 'zod';

// Schéma de validation pour le formulaire WhatsApp
export const whatsAppContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Le numéro de téléphone doit contenir au moins 8 chiffres" })
    .max(20, { message: "Le numéro de téléphone ne peut pas dépasser 20 caractères" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Format de téléphone invalide" }),
  company: z
    .string()
    .trim()
    .max(100, { message: "Le nom de l'entreprise ne peut pas dépasser 100 caractères" })
    .optional()
    .or(z.literal("")),
  projectType: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
});

// Schéma de validation pour le formulaire de demande d'appel
export const callRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Le numéro de téléphone doit contenir au moins 8 chiffres" })
    .max(20, { message: "Le numéro de téléphone ne peut pas dépasser 20 caractères" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Format de téléphone invalide" }),
  company: z
    .string()
    .trim()
    .max(100, { message: "Le nom de l'entreprise ne peut pas dépasser 100 caractères" })
    .optional()
    .or(z.literal("")),
  preferredTime: z.string().optional().or(z.literal("")),
  preferredDate: z.string().optional().or(z.literal("")),
  timezone: z.string().optional().or(z.literal("")),
  callType: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
});

export type WhatsAppContactFormData = z.infer<typeof whatsAppContactSchema>;
export type CallRequestFormData = z.infer<typeof callRequestSchema>;
