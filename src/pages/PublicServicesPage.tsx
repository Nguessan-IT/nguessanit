import { Link } from "react-router-dom";
import { Code, Cloud, Brain, Target, GraduationCap, Palette, FileText, Database, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Code,
    title: "Développement Web & Mobile",
    desc: "Créez des sites web, applications et plateformes performantes, responsives et adaptées à votre identité.",
    techs: "React, .NET, Node.js, Flutter, PWA",
    cta: "Demandez un devis pour votre application",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Migration, hébergement et sécurisation de vos données dans le cloud.",
    techs: "AWS, Azure, GCP, Cloud Vault Nguessan-IT",
    cta: "Planifiez votre migration cloud",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle & Automatisation",
    desc: "Optimisez vos processus grâce à l'IA : chatbots, analyse prédictive, automatisation sur mesure.",
    techs: "Machine Learning, NLP, RPA",
    cta: "Découvrez nos solutions IA",
  },
  {
    icon: Target,
    title: "Conseil & Stratégie IT",
    desc: "Audit, architecture logicielle, transformation digitale et gestion de projets.",
    techs: "Audit IT, Architecture, Digital Strategy",
    cta: "Obtenez un audit gratuit",
  },
  {
    icon: GraduationCap,
    title: "Formation & Support Technique",
    desc: "Formations techniques, DevOps, maintenance applicative et support 24/7.",
    techs: "DevOps, Agile, ITIL, Technical Training",
    cta: "Découvrez nos formations",
  },
  {
    icon: Palette,
    title: "Identité Visuelle & Branding Digital",
    desc: "Conception de logos, chartes graphiques, kits visuels et univers de marque cohérents pour web et réseaux sociaux.",
    techs: "Adobe Suite, Figma, Brand Guidelines",
    cta: "Créez votre identité de marque",
  },
  {
    icon: FileText,
    title: "Documents Interactifs & Corporate",
    desc: "Création de présentations, rapports, brochures et pitch decks professionnels interactifs (PDF/Docx dynamiques).",
    techs: "Interactive PDF, InDesign, PowerPoint",
    cta: "Obtenez vos supports corporate",
  },
  {
    icon: Database,
    title: "Conception & Gestion de Bases de Données",
    desc: "Modélisation, administration et sécurisation de bases de données pour applications et systèmes métiers.",
    techs: "SQL Server, PostgreSQL, Supabase, Firebase",
    cta: "Optimisez votre gestion de données",
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="bg-card border border-border rounded-xl p-6 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
                <div className="mb-4">
                  <p className="text-xs font-medium text-primary mb-1">Technologies :</p>
                  <p className="text-xs text-muted-foreground">{s.techs}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-auto"
                >
                  {s.cta} <ArrowRight size={14} />
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Notre Méthodologie</h2>
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Nos Résultats</h2>
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
