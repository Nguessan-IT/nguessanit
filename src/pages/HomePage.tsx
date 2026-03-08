import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Code, Wrench, Cloud, GraduationCap, Palette, FileText } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo-nguessan-it.png";

const features = [
  "Solutions 100% sur mesure",
  "Accompagnement de A à Z",
  "Technologies de pointe",
  "Support réactif 24/7",
];

const services = [
  {
    icon: Code,
    title: "Développement Web",
    price: "À partir de 300$",
    desc: "Sites web modernes, applications web sur mesure et e-commerce",
    tags: ["React/Vue.js", "E-commerce", "CMS"],
  },
  {
    icon: Wrench,
    title: "Maintenance Informatique",
    price: "Devis sur mesure",
    desc: "Support technique, maintenance préventive et dépannage urgent",
    tags: ["Support 24/7", "Maintenance", "Sécurité"],
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    price: "Devis sur mesure",
    desc: "Migration vers le cloud, serveurs et infrastructure réseau",
    tags: ["AWS/Azure", "Migration", "Infrastructure"],
  },
  {
    icon: GraduationCap,
    title: "Formation & Conseil",
    price: "Devis sur mesure",
    desc: "Formation informatique et conseil en transformation digitale",
    tags: ["Formation", "Audit IT", "Stratégie"],
  },
  {
    icon: Palette,
    title: "Identité Visuelle & Branding Digital",
    price: "Devis sur mesure",
    desc: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
    tags: ["Logo & charte graphique", "Identité complète", "Déclinaisons digitales"],
  },
  {
    icon: FileText,
    title: "Documents Interactifs",
    price: "Devis sur mesure",
    desc: "Transformez vos documents statiques en expériences interactives engageantes",
    tags: ["PDF interactifs", "Catalogues digitaux", "Présentations animées"],
  },
];

const stats = [
  { value: "1+", label: "Années expérience" },
  { value: "10+", label: "Clients satisfaits" },
  { value: "20+", label: "Projets réalisés" },
  { value: "24/7", label: "Support technique" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">

        <div className="relative max-w-5xl mx-auto px-4 w-full text-center py-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.img
              src={logoImg}
              alt="Logo Nguessan-IT"
              className="mx-auto w-40 h-40 object-contain drop-shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            Solutions Informatiques
            <Sparkles size={16} />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Transformez vos idées en
            <br />
            <span className="text-primary" style={{ textShadow: "0 0 40px hsl(220 72% 50% / 0.4), 0 0 80px hsl(220 72% 50% / 0.2)" }}>
              solutions digitales performantes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Chez Nguessan-IT, nous aidons entreprises, startups et institutions à concevoir, développer et déployer des solutions technologiques sur mesure. Notre mission : digitaliser vos ambitions et libérer le potentiel de votre organisation.
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle size={16} className="text-primary" />
                {f}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg transition overflow-hidden hover:shadow-lg hover:shadow-primary/25"
            >
              <Sparkles size={18} />
              Demandez votre devis GRATUIT
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-medium text-foreground hover:border-primary hover:text-primary transition"
            >
              Découvrir nos services
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Partenaire digital de confiance pour les entreprises d'Afrique, d'Europe et d'Amérique.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-primary">Nos expertises</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3">Des solutions sur mesure</h2>
            <p className="text-muted-foreground">Des solutions informatiques complètes adaptées à vos besoins professionnels</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeInUp}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -12px hsl(220 72% 50% / 0.12)" }}
                className="bg-card border border-border rounded-xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">{s.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{s.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">{tag}</span>
                  ))}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Voir tous nos services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/5 backdrop-blur-sm rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp}>
                <motion.div
                  className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {s.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-16 sm:py-24 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-sm text-primary font-medium">Prêt à décoller ?</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
            Besoin d'une solution<br />personnalisée ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contactez-nous pour un devis gratuit et découvrez comment nous pouvons transformer votre infrastructure IT
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            Demander un devis <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
