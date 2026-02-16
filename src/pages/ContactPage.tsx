import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      message: result.data.message,
    });
    setSending(false);

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      return;
    }

    toast.success("Message envoyé avec succès !");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition ${
      errors[field] ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
    }`;

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/30 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Contactez-nous</h1>
          <p className="text-lg text-muted-foreground">
            Une question, un projet ? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass("name")}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputClass("email")}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Téléphone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={inputClass("phone")}
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={inputClass("message")}
                  rows={5}
                  placeholder="Décrivez votre projet ou votre demande..."
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                <Send size={18} />
                {sending ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Informations de contact</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">contact@nguessan-it.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <p className="text-sm text-muted-foreground">+225 XX XX XX XX</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
