import { Link } from "react-router-dom";
import { Globe, Cloud, Shield, Brain, Code, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Transformation digitale",
    desc: "Accompagnement stratégique de bout en bout pour moderniser vos processus métier, automatiser vos flux et accélérer votre croissance.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Migration cloud, architecture hybride, gestion d'infrastructures sécurisées et évolutives adaptées à vos besoins.",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    desc: "Audit de sécurité, protection des données, mise en conformité RGPD et surveillance continue de vos systèmes critiques.",
  },
  {
    icon: Brain,
    title: "Conseil IT & IA",
    desc: "Intégration d'intelligence artificielle, analyse prédictive et optimisation de vos processus grâce aux dernières avancées technologiques.",
  },
  {
    icon: Code,
    title: "Développement web & mobile",
    desc: "Création de sites web, applications mobiles et plateformes sur mesure avec les technologies les plus performantes.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "Tableaux de bord, reporting avancé et analyse de données pour une prise de décision éclairée et rapide.",
  },
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Nos Services</h1>
          <p className="text-lg text-muted-foreground">
            Des solutions complètes pour accompagner votre transformation numérique à chaque étape.
          </p>
        </motion.div>
      </section>

      {/* Services grid */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px hsl(220 72% 50% / 0.15)" }}
                className="bg-card border border-border rounded-lg p-8 transition-all group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <s.icon className="text-primary mb-5" size={36} />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline whitespace-normal text-center"
                >
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-16 bg-primary/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Un projet en tête ?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Discutons de vos besoins et trouvons ensemble la meilleure solution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
            >
              Demandez un devis <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
