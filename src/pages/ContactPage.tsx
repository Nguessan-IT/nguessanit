import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Send } from "lucide-react";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

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
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-primary/50 ${
      errors[field] ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
    }`;

  return (
    <div className="overflow-hidden">
      {/* Hero with animated gradient */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/30 animate-gradient-shift" />
        
        {/* Floating luminous orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
            animate={{ y: [0, 15, 0], x: [0, -10, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-[10%] w-32 h-32 bg-primary/15 rounded-full blur-2xl"
            animate={{ y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Contactez-nous</h1>
          <p className="text-lg text-muted-foreground">
            Une question, un projet ? Nous sommes à votre écoute.
          </p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="bg-card border border-border rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass("name")}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="group">
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
              <div className="group">
                <label className="block text-sm font-medium text-foreground mb-1">Téléphone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={inputClass("phone")}
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div className="group">
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
              <motion.button
                type="submit"
                disabled={sending}
                className="relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition disabled:opacity-50 overflow-hidden"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full animate-shimmer" />
                <Send size={18} className="relative z-10" />
                <span className="relative z-10">{sending ? "Envoi en cours..." : "Envoyer le message"}</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
                {[
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Instagram, href: "https://instagram.com" },
                  { icon: Facebook, href: "https://facebook.com" },
                ].map(({ icon: Icon, href }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-accent rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
