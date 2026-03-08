import { Link } from "react-router-dom";
import { Code, Cloud, Brain, Target, GraduationCap, Palette, FileText, Database, ArrowRight, Sparkles, MessageCircle, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code,
    title: "Développement Web",
    desc: "Sites web modernes, applications web sur mesure et e-commerce",
    techs: ["React/Vue.js", "E-commerce", "CMS"],
    cta: "Demandez un devis pour votre application",
    glowColor: "210 100% 60%",
  },
  {
    icon: Wrench,
    title: "Maintenance Informatique",
    desc: "Support technique, maintenance préventive et dépannage urgent",
    techs: ["Support 24/7", "Maintenance", "Sécurité"],
    cta: "Planifiez votre maintenance",
    glowColor: "160 80% 45%",
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    desc: "Migration vers le cloud, serveurs et infrastructure réseau",
    techs: ["AWS/Azure", "Migration", "Infrastructure"],
    cta: "Planifiez votre migration cloud",
    glowColor: "200 90% 55%",
  },
  {
    icon: GraduationCap,
    title: "Formation & Conseil",
    desc: "Formation informatique et conseil en transformation digitale",
    techs: ["Formation", "Audit IT", "Stratégie"],
    cta: "Découvrez nos formations",
    glowColor: "270 70% 60%",
  },
  {
    icon: Palette,
    title: "Identité Visuelle & Branding",
    desc: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
    techs: ["Logo & charte", "Identité complète", "Digital"],
    cta: "Créez votre identité de marque",
    glowColor: "330 80% 55%",
  },
  {
    icon: FileText,
    title: "Documents Interactifs",
    desc: "Transformez vos documents statiques en expériences interactives engageantes",
    techs: ["PDF interactifs", "Catalogues", "Présentations"],
    cta: "Obtenez vos supports corporate",
    glowColor: "30 90% 55%",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    desc: "Optimisez vos processus grâce à l'IA : chatbots, analyse prédictive, automatisation",
    techs: ["Machine Learning", "NLP", "RPA"],
    cta: "Découvrez nos solutions IA",
    glowColor: "180 80% 45%",
  },
  {
    icon: Database,
    title: "Bases de Données",
    desc: "Modélisation, administration et sécurisation de bases de données",
    techs: ["PostgreSQL", "SQL Server", "Firebase"],
    cta: "Optimisez votre gestion de données",
    glowColor: "45 85% 50%",
  },
];

const methodology = [
  { step: "01", title: "Analyse du besoin", desc: "Compréhension approfondie de vos objectifs et contraintes" },
  { step: "02", title: "Conception", desc: "Design et architecture technique de votre solution" },
  { step: "03", title: "Développement & tests", desc: "Développement agile avec tests continus" },
  { step: "04", title: "Mise en ligne & support", desc: "Déploiement sécurisé et accompagnement permanent" },
];

const stats = [
  { value: "40+", label: "Projets livrés" },
  { value: "80%", label: "Satisfaction client" },
  { value: "2", label: "Continents couverts" },
  { value: "19/7", label: "Support disponible" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PublicServicesPage() {
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
            Nos Services Digitaux
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Des solutions technologiques sur mesure pour transformer vos idées en réalité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              <Sparkles size={18} />
              Demandez un devis gratuit
            </Link>
            <Link
              to="/contact#form"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary transition"
            >
              <MessageCircle size={18} />
              Contactez un expert
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="relative bg-card border border-border rounded-xl p-5 transition-all group overflow-hidden flex flex-col"
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
                <p className="text-xs text-muted-foreground mb-3 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.techs.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{tag}</span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-auto"
                >
                  {s.cta} <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-primary/5 backdrop-blur-sm rounded-lg">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold gradient-text mb-3">Notre Méthodologie</h2>
            <p className="text-muted-foreground">Un processus éprouvé pour garantir le succès de vos projets digitaux</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {methodology.map((m) => (
              <motion.div key={m.step} variants={fadeInUp} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">{m.step}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold gradient-text mb-3">Nos Résultats</h2>
            <p className="text-muted-foreground">Des chiffres qui témoignent de notre engagement et de notre expertise</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp}>
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-16 bg-primary/5 backdrop-blur-sm rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Discutons de vos besoins et construisons ensemble la solution digitale qui propulsera votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Demandez un devis <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary transition"
            >
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
