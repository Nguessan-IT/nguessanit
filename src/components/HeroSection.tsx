import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background text-foreground py-24 px-6 md:px-16 lg:px-32 flex flex-col items-center text-center">
      
      {/* LOGO + SLOGAN */}
      <div className="mb-6">
        <img
          src="/lovable-uploads/bc7144b0-fd62-41b6-942a-989408889f91.png"
          alt="Logo Nguessan-IT"
          className="mx-auto w-32 md:w-40"
        />
        <p className="mt-3 text-primary font-semibold tracking-wide uppercase">
          Votre partenaire digital pour innover et transformer
        </p>
      </div>

      {/* TITRE PRINCIPAL */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl"
      >
        Transformez vos idées en{" "}
        <span className="text-primary">solutions digitales performantes</span>.
      </motion.h1>

      {/* SOUS-TITRE PRINCIPAL */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-6 text-xl md:text-2xl max-w-3xl font-semibold leading-relaxed"
      >
        Chez <strong>Nguessan-IT</strong>, nous aidons entreprises, startups et institutions à
        concevoir, développer et déployer des solutions technologiques sur mesure. 
        Notre mission : <strong>digitaliser vos ambitions</strong> et libérer le potentiel de votre
        organisation.
      </motion.h2>

      {/* SOUS-TEXTE SERVICES */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 text-base md:text-lg max-w-3xl text-muted-foreground italic"
      >
        De la conception à la mise en production : <strong>Développement Web & Mobile</strong> — <strong>Cloud & IA</strong> — <strong>Conseil IT</strong> — <strong>Intégration sur mesure</strong>.
      </motion.p>

      {/* CTA BUTTONS */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 animate-pulse hover:animate-none"
          style={{
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)"
          }}
        >
          Demandez votre devis gratuit
        </motion.a>

        <motion.a
          href="/services"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative border-2 border-primary text-primary font-semibold py-3 px-8 rounded-full overflow-hidden group transition-all duration-300"
        >
          <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">
            Découvrez nos services
          </span>
        </motion.a>
      </div>

      {/* SECTION IDENTITÉ INTERNATIONALE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 flex flex-col items-center"
      >
        <Globe className="w-12 h-12 text-primary mb-3 animate-pulse" />
        <p className="text-muted-foreground text-lg md:text-xl font-medium text-center max-w-2xl">
          Partenaire digital de confiance pour les entreprises d'Afrique, d'Europe et d'Amérique.
        </p>
      </motion.div>
    </section>
  );
}
