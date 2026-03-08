import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

const emailSchema = z.string().trim().email("Email invalide").max(255);

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers" as any)
      .insert({ email: result.data } as any);
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("Vous êtes déjà inscrit à notre newsletter !");
      } else {
        toast.error("Erreur lors de l'inscription. Réessayez.");
      }
      return;
    }

    toast.success("Inscription réussie ! Bienvenue dans notre newsletter 🎉");
    setEmail("");
  };

  return (
    <section className="py-16">
      <motion.div
        className="max-w-2xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="text-primary" size={28} />
          </div>
          <h2 className="font-display text-2xl font-bold gradient-text mb-2">
            Restez informé
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Recevez nos dernières actualités, offres exclusives et conseils tech directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              required
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              {loading ? "..." : "S'inscrire"}
            </motion.button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            Pas de spam. Désabonnement en un clic.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
