import { Link } from "react-router-dom";
import { CheckCircle, Lightbulb, Award, Shield, Heart, MapPin, Code, Server, Cloud as CloudIcon, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const missionCards = [
  { icon: CheckCircle, title: "ROI mesurable", desc: "Solutions conçues pour générer un retour sur investissement quantifiable" },
  { icon: Lightbulb, title: "Innovation pragmatique", desc: "Technologies de pointe adaptées à vos réalités opérationnelles" },
  { icon: Award, title: "Agilité stratégique", desc: "Infrastructures évolutives pour accompagner votre croissance" },
];

const expertise = [
  { label: "Développement Web", pct: 95 },
  { label: "Administration Système", pct: 90 },
  { label: "Sécurité Informatique", pct: 85 },
  { label: "Solutions Cloud", pct: 88 },
  { label: "Support Technique", pct: 92 },
  { label: "Formation IT", pct: 80 },
];

const expertiseCards = [
  { icon: Code, title: "Développement", desc: "Équipe de développeurs experts en technologies modernes" },
  { icon: Server, title: "Infrastructure", desc: "Spécialistes en administration système et réseau" },
  { icon: CloudIcon, title: "Cloud", desc: "Experts certifiés AWS, Azure et Google Cloud" },
  { icon: GraduationCap, title: "Formation", desc: "Formateurs expérimentés en informatique" },
];

const values = [
  { icon: Lightbulb, title: "Innovation pragmatique", desc: "Nous transformons les technologies émergentes en solutions concrètes et mesurables pour votre entreprise." },
  { icon: Award, title: "Excellence technique", desc: "Notre équipe allie expertise pointue et méthodologie rigoureuse pour garantir la qualité de chaque projet." },
  { icon: Shield, title: "Fiabilité & transparence", desc: "Communication claire, délais respectés et engagement total envers la réussite de vos projets." },
  { icon: Heart, title: "Impact social", desc: "Nous contribuons à la transformation digitale en Afrique et accompagnons la croissance des entrepreneurs locaux." },
];

const locations = [
  { city: "Abidjan", country: "Côte d'Ivoire", active: true },
  { city: "France", country: "Bientôt", active: false },
  { city: "Amérique du Nord", country: "Bientôt", active: false },
];

const stats = [
  { value: "0+", label: "Projets livrés" },
  { value: "0", label: "Continents couverts" },
  { value: "0%", label: "Satisfaction client" },
  { value: "0/7", label: "Support disponible" },
];

const approach = [
  { step: "01", title: "Écoute & Analyse", desc: "Nous analysons en profondeur vos besoins et contraintes pour proposer la solution la plus adaptée." },
  { step: "02", title: "Conception", desc: "Élaboration d'une solution technique détaillée avec architecture et planning précis." },
  { step: "03", title: "Réalisation", desc: "Développement et mise en œuvre avec suivi régulier et communication transparente." },
  { step: "04", title: "Accompagnement", desc: "Formation, support continu et évolutions pour garantir votre succès à long terme." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
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
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6"
            style={{ textShadow: "0 0 40px hsl(220 72% 50% / 0.3)" }}
          >
            À propos de Nguessan-IT
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre partenaire digital international pour transformer vos ambitions en solutions technologiques concrètes.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="font-display text-3xl font-bold text-primary text-center mb-6"
            style={{ textShadow: "0 0 30px hsl(220 72% 50% / 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Notre Mission
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Dans un monde où <strong className="text-foreground">80% des entreprises accélèrent leur transformation digitale</strong> post-COVID, nous positionnons vos organisations à l'avant-garde de cette révolution technologique.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Notre mission : <strong className="text-foreground">transformer la complexité technologique en avantage concurrentiel</strong>. Nous accompagnons les entreprises, startups et institutions dans la maîtrise des enjeux critiques de l'ère numérique : <span className="text-primary">scalabilité cloud</span>, <span className="text-primary">sécurité des données</span>, <span className="text-primary">expérience utilisateur optimale</span> et <span className="text-primary">intégration IA</span>.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {missionCards.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <c.icon className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-primary/5 backdrop-blur-sm rounded-lg">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Nos Domaines d'Expertise</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Des compétences techniques de niveau entreprise pour relever vos défis les plus critiques
            </p>
            <p className="text-sm text-muted-foreground mt-3 max-w-3xl mx-auto">
              Face à l'accélération technologique (<strong className="text-foreground">cycle de vie moyen d'une stack technique : 3 ans</strong>), nous maintenons une expertise constamment actualisée sur les frameworks modernes, les architectures cloud-native et les standards de cybersécurité.
            </p>
          </motion.div>

          {/* Progress bars */}
          <motion.div
            className="max-w-2xl mx-auto space-y-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {expertise.map((e) => (
              <div key={e.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{e.label}</span>
                  <span className="text-primary font-medium">{e.pct}%</span>
                </div>
                <div className="h-2 bg-accent rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${e.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {expertiseCards.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <c.icon className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Nos Valeurs</h2>
            <p className="text-muted-foreground">Les principes qui guident chaque projet et interaction</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 transition-all"
              >
                <v.icon className="text-primary mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Équipe & Leadership</h2>
            <p className="text-muted-foreground">Une expertise internationale au service de votre transformation digitale</p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">FN</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Fiacre N'Guessan</h3>
              <p className="text-primary text-sm font-medium mb-3">Fondateur & CTO</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fort de plus de 8 ans d'expérience dans le développement web et les infrastructures cloud, Fiacre pilote la vision technologique de Nguessan-IT et accompagne personnellement chaque client dans sa transformation digitale.
              </p>
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Notre équipe internationale</h3>
          </motion.div>
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
                className={`bg-card border border-border rounded-xl p-6 text-center transition-all ${!loc.active ? "opacity-60" : ""}`}
              >
                <MapPin className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground">{loc.city}</h3>
                <p className="text-sm text-muted-foreground">{loc.country}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">En Chiffres</h2>
            <p className="text-muted-foreground">Notre impact mesuré en résultats concrets</p>
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

      {/* Approach */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Notre Approche</h2>
            <p className="text-muted-foreground">Une méthodologie éprouvée pour garantir le succès de vos projets</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {approach.map((a) => (
              <motion.div key={a.step} variants={fadeInUp} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">{a.step}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-16 sm:py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Discutons de vos projets et explorons ensemble les meilleures solutions pour atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Discutons-en maintenant <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary transition"
            >
              Découvrez nos solutions <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
