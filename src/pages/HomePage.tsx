import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Globe, title: "Transformation digitale", desc: "Accompagnement stratégique pour moderniser vos processus métier." },
  { icon: Zap, title: "Cloud & Infrastructure", desc: "Solutions cloud sécurisées et évolutives pour votre entreprise." },
  { icon: Shield, title: "Cybersécurité", desc: "Protection avancée de vos données et systèmes critiques." },
  { icon: Users, title: "Conseil IT & IA", desc: "Expertise en intelligence artificielle et optimisation IT." },
];

const stats = [
  { value: "50+", label: "Clients accompagnés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "3", label: "Continents" },
  { value: "24/7", label: "Support disponible" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-[10%] w-72 h-72 bg-primary/8 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-[15%] w-56 h-56 bg-accent/20 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Particle grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: `${(i % 5) * 25 + 5}%`,
                top: `${Math.floor(i / 5) * 25 + 10}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Votre partenaire digital
              <br />
              <span className="relative text-primary">
                pour innover et transformer
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-primary/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8"
            >
              Nguessan-IT accompagne les entreprises d'Afrique, d'Europe et d'Amérique dans leur transformation numérique avec expertise et innovation.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/contact"
                className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Demandez votre devis gratuit <ArrowRight size={18} />
                </span>
                <span className="absolute inset-0 bg-primary-foreground/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -inset-1 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/services"
                className="group relative px-6 py-3 border border-border rounded-md font-medium text-foreground transition overflow-hidden hover:border-primary hover:text-primary"
              >
                <span className="relative z-10">Découvrez nos services</span>
                <motion.span
                  className="absolute inset-0 bg-primary/5"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Levitating logo area */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative w-64 h-64 flex items-center justify-center"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
              <div className="relative font-display text-7xl font-bold text-primary select-none">
                N-IT
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-3xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nos expertises
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="bg-card border border-border rounded-lg p-6 transition-all cursor-default"
              >
                <s.icon className="text-primary mb-4" size={32} />
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/5">
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
          <motion.h2
            className="font-display text-3xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Prêt à transformer votre entreprise ?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
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
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
