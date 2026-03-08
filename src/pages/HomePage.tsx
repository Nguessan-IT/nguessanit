import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Code, Wrench, Cloud, GraduationCap, Palette, FileText, Brain, Database } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo-nguessan-it.png";
import FloatingOrbs from "@/components/shared/FloatingOrbs";

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
    desc: "Sites web modernes, applications web sur mesure et e-commerce",
    tags: ["React/Vue.js", "E-commerce", "CMS"],
    glowColor: "210 100% 60%",
  },
  {
    icon: Wrench,
    title: "Maintenance Informatique",
    desc: "Support technique, maintenance préventive et dépannage urgent",
    tags: ["Support 24/7", "Maintenance", "Sécurité"],
    glowColor: "160 80% 45%",
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    desc: "Migration vers le cloud, serveurs et infrastructure réseau",
    tags: ["AWS/Azure", "Migration", "Infrastructure"],
    glowColor: "200 90% 55%",
  },
  {
    icon: GraduationCap,
    title: "Formation & Conseil",
    desc: "Formation informatique et conseil en transformation digitale",
    tags: ["Formation", "Audit IT", "Stratégie"],
    glowColor: "270 70% 60%",
  },
  {
    icon: Palette,
    title: "Identité Visuelle & Branding",
    desc: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
    tags: ["Logo & charte", "Identité complète", "Digital"],
    glowColor: "330 80% 55%",
  },
  {
    icon: FileText,
    title: "Documents Interactifs",
    desc: "Transformez vos documents statiques en expériences interactives engageantes",
    tags: ["PDF interactifs", "Catalogues", "Présentations"],
    glowColor: "30 90% 55%",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    desc: "Optimisez vos processus grâce à l'IA : chatbots, analyse prédictive, automatisation",
    tags: ["Machine Learning", "NLP", "RPA"],
    glowColor: "180 80% 45%",
  },
  {
    icon: Database,
    title: "Bases de Données",
    price: "Devis sur mesure",
    desc: "Modélisation, administration et sécurisation de bases de données",
    tags: ["PostgreSQL", "SQL Server", "Firebase"],
    glowColor: "45 85% 50%",
  },
];

const stats = [
  { value: "1+", label: "Années expérience" },
  { value: "10+", label: "Clients satisfaits" },
  { value: "20+", label: "Projets réalisés" },
  { value: "24/7", label: "Support technique" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <FloatingOrbs />

        <div className="relative max-w-5xl mx-auto px-4 w-full text-center py-20 z-10">
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
            <span className="gradient-text">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ perspective: 1200 }}
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  rotateY: -4,
                  rotateX: 4,
                  scale: 1.03,
                  boxShadow: `0 20px 50px -15px hsl(${s.glowColor} / 0.35), 0 0 30px -5px hsl(${s.glowColor} / 0.15)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-card border border-border rounded-xl p-5 transition-all group overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />
                
                {/* Colored glow background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, hsl(${s.glowColor} / 0.08) 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-shadow duration-300"
                  style={{ background: `hsl(${s.glowColor} / 0.1)` }}
                >
                  <s.icon style={{ color: `hsl(${s.glowColor})` }} size={22} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-1">{s.title}</h3>
                <p className="text-xs font-medium text-primary mb-2">{s.price}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{tag}</span>
                  ))}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  En savoir plus <ArrowRight size={12} />
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
        className="py-16 sm:py-24"
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
