import { Link } from "react-router-dom";
import { Code, Cloud, Brain, Target, GraduationCap, Palette, FileText, Database, ArrowRight, Sparkles, MessageCircle, Wrench, Crosshair, Lightbulb, Zap, Rocket, ThumbsUp, Globe, Headphones } from "lucide-react";
import techBg from "@/assets/tech-background.jpg";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  { step: "01", title: "Analyse du besoin", desc: "Compréhension approfondie de vos objectifs et contraintes", icon: Crosshair, color: "210 100% 55%", gradient: "from-blue-500 to-cyan-400" },
  { step: "02", title: "Conception", desc: "Design et architecture technique de votre solution", icon: Lightbulb, color: "270 80% 60%", gradient: "from-purple-500 to-pink-400" },
  { step: "03", title: "Développement & tests", desc: "Développement agile avec tests continus", icon: Code, color: "160 80% 45%", gradient: "from-emerald-500 to-teal-400" },
  { step: "04", title: "Mise en ligne & support", desc: "Déploiement sécurisé et accompagnement permanent", icon: Zap, color: "35 95% 55%", gradient: "from-orange-500 to-amber-400" },
];

const iconMap: Record<string, any> = { Rocket, ThumbsUp, Globe, Headphones, Code, Cloud, Zap, Target };

const defaultStats = [
  { value: "40+", label: "Projets livrés", icon: Rocket, color: "210 100% 55%" },
  { value: "80%", label: "Satisfaction client", icon: ThumbsUp, color: "160 80% 45%" },
  { value: "2", label: "Continents couverts", icon: Globe, color: "270 80% 60%" },
  { value: "19/7", label: "Support disponible", icon: Headphones, color: "35 95% 55%" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
function useAnimatedCounter(value: string, isInView: boolean) {
  // Parse numeric prefix: "40+" → 40, "80%" → 80, "19/7" → 19, "2" → 2
  const match = value.match(/^(\d+)/);
  const numericValue = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? value.slice(match[1].length) : value;
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || numericValue === 0) return;
    hasAnimated.current = true;
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, numericValue]);

  return numericValue > 0 ? `${display}${suffix}` : value;
}

function StatCard3D({ s }: { s: { value: string; label: string; icon: any; color: string } }) {
  const statRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });
  const animatedValue = useAnimatedCounter(s.value, isInView);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = statRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
    const spotlight = card.querySelector('.stat-spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(${s.color} / 0.3) 0%, transparent 60%)`;
      spotlight.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = statRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const spotlight = card.querySelector('.stat-spotlight') as HTMLElement;
    if (spotlight) spotlight.style.opacity = '0';
  };

  const Icon = s.icon;

  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center">
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-[-28px] z-10 relative"
        style={{
          background: `linear-gradient(135deg, hsl(${s.color}), hsl(${s.color} / 0.7))`,
          boxShadow: `0 8px 25px -5px hsl(${s.color} / 0.5)`,
        }}
        whileHover={{ scale: 1.2, rotate: -15 }}
        animate={{
          boxShadow: [
            `0 6px 20px -5px hsl(${s.color} / 0.4)`,
            `0 6px 30px -5px hsl(${s.color} / 0.7)`,
            `0 6px 20px -5px hsl(${s.color} / 0.4)`,
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 400, damping: 15 },
        }}
      >
        <motion.div
          className="absolute inset-[-5px] rounded-full border-2 border-dashed"
          style={{ borderColor: `hsl(${s.color} / 0.3)` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <Icon size={24} className="text-white relative z-10" />
      </motion.div>

      <div
        ref={statRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-card/90 backdrop-blur-sm rounded-xl pt-12 pb-6 px-4 text-center w-full overflow-hidden group cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          borderTop: `3px solid hsl(${s.color})`,
          boxShadow: `0 10px 30px -10px hsl(${s.color} / 0.15)`,
        }}
      >
        <div className="stat-spotlight absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0 rounded-xl" />
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderTop: `2px solid hsl(${s.color} / 0.6)`, borderLeft: `2px solid hsl(${s.color} / 0.6)`, borderTopLeftRadius: "12px" }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderBottom: `2px solid hsl(${s.color} / 0.6)`, borderRight: `2px solid hsl(${s.color} / 0.6)`, borderBottomRightRadius: "12px" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(90deg, transparent, hsl(${s.color}), transparent)`, boxShadow: `0 0 15px hsl(${s.color} / 0.5)` }} />

        <motion.div
          ref={counterRef}
          className="font-display text-4xl sm:text-5xl font-bold mb-1 relative z-10"
          style={{ color: `hsl(${s.color})`, textShadow: `0 0 20px hsl(${s.color} / 0.3)` }}
        >
          {animatedValue}
        </motion.div>
        <div className="text-sm text-muted-foreground relative z-10 font-medium">{s.label}</div>

        <div className="flex justify-center gap-1.5 mt-3 relative z-10">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: `hsl(${s.color})` }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: dot * 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PublicServicesPage() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    supabase
      .from("site_stats")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setStats(
            data.map((s: any) => ({
              value: s.stat_value,
              label: s.label,
              icon: iconMap[s.icon_name] || Rocket,
              color: s.color,
            }))
          );
        }
      });
  }, []);

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
                  y: -10,
                  rotateY: -4,
                  rotateX: 4,
                  scale: 1.04,
                  boxShadow: `0 25px 60px -10px hsl(${s.glowColor} / 0.45), 0 0 40px -5px hsl(${s.glowColor} / 0.2)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-card border border-border rounded-xl p-5 pt-6 transition-all group overflow-hidden flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Vivid colored top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-500 group-hover:h-1.5"
                  style={{
                    background: `linear-gradient(90deg, hsl(${s.glowColor}), hsl(${s.glowColor} / 0.6))`,
                    boxShadow: `0 2px 12px hsl(${s.glowColor} / 0.4)`,
                  }}
                />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />

                {/* Colored glow background on hover — more visible */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, hsl(${s.glowColor} / 0.18) 0%, hsl(${s.glowColor} / 0.06) 50%, transparent 80%)`,
                  }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ background: `hsl(${s.glowColor} / 0.12)` }}
                >
                  <s.icon style={{ color: `hsl(${s.glowColor})` }} size={24} />
                </div>
                <h3 className="font-display font-bold text-foreground text-[15px] tracking-tight mb-1.5">{s.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex-1 leading-relaxed">{s.desc}</p>
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
      <section className="relative py-20 overflow-hidden">
        {/* Tech background */}
        <div className="absolute inset-0 -z-10">
          <img src={techBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/75 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold italic gradient-text mb-4">Notre Méthodologie</h2>
            <p className="text-muted-foreground text-base">Un processus éprouvé pour garantir le succès de vos projets digitaux</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ perspective: 1200 }}
          >
            {methodology.map((m) => {
              const cardRef = useRef<HTMLDivElement>(null);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const card = cardRef.current;
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                // Move spotlight
                const spotlight = card.querySelector('.methodology-spotlight') as HTMLElement;
                if (spotlight) {
                  spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(${m.color} / 0.25) 0%, transparent 60%)`;
                  spotlight.style.opacity = '1';
                }
              };

              const handleMouseLeave = () => {
                const card = cardRef.current;
                if (!card) return;
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                const spotlight = card.querySelector('.methodology-spotlight') as HTMLElement;
                if (spotlight) spotlight.style.opacity = '0';
              };

              return (
                <motion.div key={m.step} variants={fadeInUp} className="flex flex-col items-center">
                  {/* Floating icon circle with unique color */}
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-[-32px] z-10 relative"
                    style={{
                      background: `linear-gradient(135deg, hsl(${m.color}), hsl(${m.color} / 0.7))`,
                      boxShadow: `0 8px 25px -5px hsl(${m.color} / 0.5), 0 0 20px hsl(${m.color} / 0.2)`,
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    animate={{
                      boxShadow: [
                        `0 8px 25px -5px hsl(${m.color} / 0.5), 0 0 20px hsl(${m.color} / 0.2)`,
                        `0 8px 35px -5px hsl(${m.color} / 0.7), 0 0 35px hsl(${m.color} / 0.35)`,
                        `0 8px 25px -5px hsl(${m.color} / 0.5), 0 0 20px hsl(${m.color} / 0.2)`,
                      ],
                    }}
                    transition={{
                      boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                      scale: { type: "spring", stiffness: 400, damping: 15 },
                    }}
                  >
                    {/* Orbit ring */}
                    <motion.div
                      className="absolute inset-[-6px] rounded-full border-2 border-dashed"
                      style={{ borderColor: `hsl(${m.color} / 0.3)` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <m.icon size={28} className="text-white relative z-10" />
                  </motion.div>

                  {/* 3D Card */}
                  <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative bg-card/90 backdrop-blur-sm rounded-xl pt-12 pb-8 px-6 text-center w-full overflow-hidden group cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
                      borderTop: `3px solid hsl(${m.color})`,
                      boxShadow: `0 10px 30px -10px hsl(${m.color} / 0.15)`,
                    }}
                  >
                    {/* Mouse-following spotlight */}
                    <div
                      className="methodology-spotlight absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0 rounded-xl"
                    />

                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />

                    {/* Corner accents */}
                    <div
                      className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        borderTop: `2px solid hsl(${m.color} / 0.6)`,
                        borderLeft: `2px solid hsl(${m.color} / 0.6)`,
                        borderTopLeftRadius: "12px",
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        borderBottom: `2px solid hsl(${m.color} / 0.6)`,
                        borderRight: `2px solid hsl(${m.color} / 0.6)`,
                        borderBottomRightRadius: "12px",
                      }}
                    />

                    {/* Colored bottom glow on hover */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-1.5"
                      style={{
                        background: `linear-gradient(90deg, transparent, hsl(${m.color}), transparent)`,
                        boxShadow: `0 0 15px hsl(${m.color} / 0.5)`,
                      }}
                    />

                    <div
                      className="text-4xl font-bold mb-2 font-display relative z-10"
                      style={{ color: `hsl(${m.color} / 0.25)` }}
                    >
                      {m.step}
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2 relative z-10">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{m.desc}</p>

                    {/* Pulsing dots */}
                    <div className="flex justify-center gap-1.5 mt-4 relative z-10">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: `hsl(${m.color})` }}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: dot * 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={techBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold italic gradient-text mb-4">Nos Résultats</h2>
            <p className="text-muted-foreground text-base">Des chiffres qui témoignent de notre engagement et de notre expertise</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ perspective: 1200 }}
          >
            {stats.map((s) => (
              <StatCard3D key={s.label} s={s} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={techBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />
        </div>

        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Prêt à démarrer <span className="italic gradient-text">votre projet</span> ?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Discutons de vos besoins et construisons ensemble la solution digitale qui propulsera votre entreprise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition shadow-lg shadow-primary/25"
            >
              <Sparkles size={18} />
              Demandez votre devis gratuit
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border rounded-full font-medium text-foreground hover:border-primary hover:bg-primary/5 transition"
            >
              Découvrez nos réalisations
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://linkedin.com/company/nguessan-it"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border bg-card/80 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://instagram.com/nguessanit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border bg-card/80 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border bg-card/80 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
