import { Target, Lightbulb, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Excellence", desc: "Des solutions sur mesure avec les plus hauts standards de qualité." },
  { icon: Lightbulb, title: "Innovation", desc: "Toujours à la pointe des technologies pour vous offrir le meilleur." },
  { icon: Heart, title: "Engagement", desc: "Un accompagnement personnalisé et un suivi de proximité." },
];

const locations = [
  { city: "Abidjan", country: "Côte d'Ivoire", status: "Siège actif", active: true },
  { city: "France", country: "Europe", status: "Bientôt", active: false },
  { city: "Amérique du Nord", country: "", status: "Bientôt", active: false },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
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
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">À propos de Nguessan-IT</h1>
          <p className="text-lg text-muted-foreground">
            Une entreprise de transformation digitale au service de l'Afrique, l'Europe et l'Amérique.
          </p>
        </motion.div>
      </section>

      {/* Mission - glassmorphism */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Chez Nguessan-IT, nous croyons que la technologie est le levier le plus puissant pour transformer les entreprises.
                Notre mission est d'accompagner les organisations dans leur transition numérique en offrant des solutions innovantes,
                fiables et adaptées à leurs réalités. Du cloud à l'intelligence artificielle, nous aidons nos clients à maximiser
                leur ROI et à se positionner en leaders sur leurs marchés.
              </p>
            </div>
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                <div className="relative font-display text-5xl font-bold text-primary select-none">
                  N-IT
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Notre Expertise
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { label: "ROI", desc: "Optimisation du retour sur investissement de vos projets IT" },
              { label: "Cloud", desc: "Migration et gestion d'infrastructures cloud modernes" },
              { label: "IA", desc: "Intégration de solutions d'intelligence artificielle" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px hsl(220 72% 50% / 0.15)" }}
                className="bg-card border border-border rounded-lg p-6 text-center transition-all"
              >
                <motion.div
                  className="text-3xl font-bold text-primary mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {item.label}
                </motion.div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nos Valeurs
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px hsl(220 72% 50% / 0.1)" }}
                className="bg-card border border-border rounded-lg p-6 transition-all"
              >
                <v.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nos Implantations
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {locations.map((loc) => (
              <motion.div
                key={loc.city}
                variants={fadeInUp}
                whileHover={loc.active ? { y: -5 } : {}}
                className={`bg-card border border-border rounded-lg p-6 text-center transition-all ${!loc.active ? "opacity-50" : ""}`}
              >
                <MapPin className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground">{loc.city}</h3>
                {loc.country && <p className="text-sm text-muted-foreground">{loc.country}</p>}
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${loc.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {loc.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
