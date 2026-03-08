import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Users, Sparkles, Globe, Shield, ArrowRight, Send, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "@/components/shared/PhoneInput";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  projectType: z.string().min(1, "Sélectionnez un type de projet"),
  budget: z.string().min(1, "Sélectionnez un budget estimé"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }) }),
});

const projectTypes = [
  "Développement Web & Mobile",
  "Solutions Cloud & IA",
  "Conseil & Support IT",
  "Branding & Design",
  "Formation & Accompagnement",
  "Autre",
];

const budgets = [
  "< 500 000 FCFA",
  "500 000 - 2 000 000 FCFA",
  "2 000 000 - 5 000 000 FCFA",
  "5 000 000 - 10 000 000 FCFA",
  "> 10 000 000 FCFA",
  "À définir",
];

const reasons = [
  { icon: Users, title: "Accompagnement personnalisé", desc: "Un interlocuteur dédié pour votre projet du début à la fin" },
  { icon: Sparkles, title: "Solutions sur mesure", desc: "Chaque projet est unique, nos solutions aussi" },
  { icon: Globe, title: "Présence internationale", desc: "Équipes disponibles sur 3 continents pour vous servir" },
  { icon: Shield, title: "Confidentialité garantie", desc: "Vos données et projets sont protégés (NDA disponible)" },
];

const responseTimes = [
  { label: "Email", value: "sous 24h" },
  { label: "Téléphone", value: "immédiat" },
  { label: "Devis gratuit", value: "2-3 jours ouvrés" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    projectType: "", budget: "", message: "", consent: false,
  });
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
      message: `[Type: ${result.data.projectType}] [Budget: ${result.data.budget}] [Entreprise: ${result.data.company || "N/A"}]\n\n${result.data.message}`,
    });
    setSending(false);

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      return;
    }

    toast.success("Message envoyé avec succès ! Nous vous répondrons sous 48h.");
    setForm({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", message: "", consent: false });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field] ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
    }`;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <motion.div
          className="relative max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Prêt à digitaliser vos idées ?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discutons de votre projet et trouvons ensemble la solution technologique idéale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Demander un devis gratuit <ArrowRight size={18} />
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary transition"
            >
              Découvrir nos services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 sm:py-24" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="text-primary" size={24} />
              <h2 className="font-display text-2xl font-bold gradient-text">
                Formulaire de contact
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Remplissez ce formulaire et nous vous répondrons sous 48h maximum</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nom complet <span className="text-destructive">*</span></label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass("name")} placeholder="Ex: Jean Dupont" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email professionnel <span className="text-destructive">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass("email")} placeholder="votre.email@entreprise.com" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Téléphone <span className="text-destructive">*</span></label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass("phone")} placeholder="+225" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Entreprise</label>
                  <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className={inputClass("company")} placeholder="Ex: MonEntreprise SARL" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Type de projet <span className="text-destructive">*</span></label>
                  <select value={form.projectType} onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))} className={inputClass("projectType")}>
                    <option value="">Sélectionnez un type</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.projectType && <p className="text-xs text-destructive mt-1">{errors.projectType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Budget estimé <span className="text-destructive">*</span></label>
                  <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} className={inputClass("budget")}>
                    <option value="">Sélectionnez une fourchette</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.budget && <p className="text-xs text-destructive mt-1">{errors.budget}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description du besoin <span className="text-destructive">*</span></label>
                <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={inputClass("message")} rows={5} placeholder="Décrivez votre projet, vos objectifs et vos contraintes..." />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-1 rounded border-input" />
                <span className="text-xs text-muted-foreground">
                  J'accepte que mes données soient utilisées dans le cadre de ma demande et de la relation commerciale qui peut en découler.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition disabled:opacity-50"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Send size={18} />
                {sending ? "Envoi en cours..." : "Envoyer ma demande 🚀"}
              </motion.button>

              <a
                href="https://wa.me/2250777655416"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-primary hover:underline"
              >
                Contacter par WhatsApp
              </a>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Why contact us */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Pourquoi nous contacter ?</h3>
              <div className="space-y-4">
                {reasons.map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <r.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Contact direct</h3>
              <div className="space-y-3">
                <a href="mailto:fiacrenguessan@outlook.com" className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition">
                  <Mail className="text-primary mt-0.5" size={18} />
                  <div>
                    <p className="font-medium text-foreground text-sm">Email</p>
                    <p className="text-xs text-muted-foreground">fiacrenguessan@outlook.com</p>
                    <p className="text-xs text-primary">Réponse sous 24h</p>
                  </div>
                </a>
                <a href="tel:+2250777655416" className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition">
                  <Phone className="text-primary mt-0.5" size={18} />
                  <div>
                    <p className="font-medium text-foreground text-sm">Téléphone</p>
                    <p className="text-xs text-muted-foreground">0777655416</p>
                    <p className="text-xs text-primary">Réponse immédiate</p>
                  </div>
                </a>
              </div>
              <a
                href="tel:+2250777655416"
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition"
              >
                <Phone size={16} />
                Planifier un appel avec un expert
              </a>
            </div>

            {/* Response times */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                Temps de réponse
              </h3>
              <div className="space-y-3">
                {responseTimes.map((rt) => (
                  <div key={rt.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{rt.label}</span>
                    <span className="text-sm font-medium text-primary">{rt.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
