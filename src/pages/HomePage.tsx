import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Code, Wrench, Cloud, GraduationCap, Palette, FileText, Brain, Database, Rocket, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo-nguessan-it.png";
import FloatingOrbs from "@/components/shared/FloatingOrbs";
import AnimatedStats from "@/components/home/AnimatedStats";

const features = [
"Solutions 100% sur mesure",
"Accompagnement de A à Z",
"Technologies de pointe",
"Support réactif 24/7"];


const services = [
{
  icon: Code,
  title: "Développement Web",
  desc: "Sites web modernes, applications web sur mesure et e-commerce",
  tags: ["React/Vue.js", "E-commerce", "CMS"],
  glowColor: "210 100% 60%"
},
{
  icon: Wrench,
  title: "Maintenance Informatique",
  desc: "Support technique, maintenance préventive et dépannage urgent",
  tags: ["Support 24/7", "Maintenance", "Sécurité"],
  glowColor: "160 80% 45%"
},
{
  icon: Cloud,
  title: "Solutions Cloud",
  desc: "Migration vers le cloud, serveurs et infrastructure réseau",
  tags: ["AWS/Azure", "Migration", "Infrastructure"],
  glowColor: "200 90% 55%"
},
{
  icon: GraduationCap,
  title: "Formation & Conseil",
  desc: "Formation informatique et conseil en transformation digitale",
  tags: ["Formation", "Audit IT", "Stratégie"],
  glowColor: "270 70% 60%"
},
{
  icon: Palette,
  title: "Identité Visuelle & Branding",
  desc: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
  tags: ["Logo & charte", "Identité complète", "Digital"],
  glowColor: "330 80% 55%"
},
{
  icon: FileText,
  title: "Documents Interactifs",
  desc: "Transformez vos documents statiques en expériences interactives engageantes",
  tags: ["PDF interactifs", "Catalogues", "Présentations"],
  glowColor: "30 90% 55%"
},
{
  icon: Brain,
  title: "Intelligence Artificielle",
  desc: "Optimisez vos processus grâce à l'IA : chatbots, analyse prédictive, automatisation",
  tags: ["Machine Learning", "NLP", "RPA"],
  glowColor: "180 80% 45%"
},
{
  icon: Database,
  title: "Bases de Données",
  desc: "Modélisation, administration et sécurisation de bases de données",
  tags: ["PostgreSQL", "SQL Server", "Firebase"],
  glowColor: "45 85% 50%"
}];



const fadeInUp = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function HomePage() {
  const { data: partners = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase.
      from("partners").
      select("*").
      eq("active", true).
      order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  const mockPartners = [
  { id: 'm1', name: 'Microsoft', logo_url: 'https://logo.clearbit.com/microsoft.com' },
  { id: 'm2', name: 'Google', logo_url: 'https://logo.clearbit.com/google.com' },
  { id: 'm3', name: 'Amazon', logo_url: 'https://logo.clearbit.com/amazon.com' },
  { id: 'm4', name: 'Apple', logo_url: 'https://logo.clearbit.com/apple.com' },
  { id: 'm5', name: 'Meta', logo_url: 'https://logo.clearbit.com/meta.com' },
  { id: 'm6', name: 'IBM', logo_url: 'https://logo.clearbit.com/ibm.com' },
  { id: 'm7', name: 'Oracle', logo_url: 'https://logo.clearbit.com/oracle.com' }];


  const displayPartners = partners.length > 0 ? partners : mockPartners;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-10">
        <FloatingOrbs />

        <div className="relative max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
          {/* Left Column: Content */}
          <div className="text-left flex flex-col items-start">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 hidden lg:block">
              
              <motion.img
                src={logoImg}
                alt="Logo Nguessan-IT"
                className="w-28 h-28 object-contain drop-shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              
            </motion.div>

            {/* Logo for mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:hidden mx-auto">
              
              <motion.img
                src={logoImg}
                alt="Logo Nguessan-IT"
                className="w-32 h-32 object-contain drop-shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6 lg:mx-0 mx-auto">
              
              <Sparkles size={16} />
              Solutions Informatiques
              <Sparkles size={16} />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 lg:text-left text-center leading-tight">
              
              Transformez vos idées en
              <br />
              <span className="gradient-text">
                solutions performantes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 lg:text-left text-center max-w-xl lg:mx-0 mx-auto">
              
              Chez Nguessan-IT, nous aidons entreprises, startups et institutions à concevoir, développer et déployer des solutions technologiques sur mesure. Notre mission : digitaliser vos ambitions.
            </motion.p>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap lg:justify-start justify-center gap-4 mb-10">
              
              {features.map((f) =>
              <span key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle size={16} className="text-primary" />
                  {f}
                </span>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 lg:mx-0 mx-auto w-full sm:w-auto">
              
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg transition overflow-hidden hover:shadow-lg hover:shadow-primary/25 w-full sm:w-auto">
                
                <Sparkles size={18} />
                Devis GRATUIT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-lg font-medium text-foreground hover:border-primary hover:text-primary transition w-full sm:w-auto">
                
                Nos services
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Icons */}
          <div className="relative h-[600px] hidden lg:block overflow-hidden">
            <div className="absolute inset-0 flex gap-6 justify-center">
              {/* First Column - Scroll Up */}
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: [0, -1000] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                
                {[...services, ...services].map((s, i) =>
                <div
                  key={`col1-${i}`}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 w-48 shadow-sm transition-transform hover:scale-105"
                  style={{
                    boxShadow: `0 10px 30px -10px hsl(${s.glowColor} / 0.15)`
                  }}>
                  
                    <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `hsl(${s.glowColor} / 0.1)` }}>
                    
                      <s.icon style={{ color: `hsl(${s.glowColor})` }} size={32} />
                    </div>
                    <span className="font-display font-semibold text-center text-sm">{s.title}</span>
                  </div>
                )}
              </motion.div>

              {/* Second Column - Scroll Down */}
              <motion.div
                className="flex flex-col gap-6 pt-12"
                animate={{ y: [-1000, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                
                {[...services].reverse().concat([...services].reverse()).map((s, i) =>
                <div
                  key={`col2-${i}`}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 w-48 shadow-sm transition-transform hover:scale-105"
                  style={{
                    boxShadow: `0 10px 30px -10px hsl(${s.glowColor} / 0.15)`
                  }}>
                  
                    <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `hsl(${s.glowColor} / 0.1)` }}>
                    
                      <s.icon style={{ color: `hsl(${s.glowColor})` }} size={32} />
                    </div>
                    <span className="font-display font-semibold text-center text-sm">{s.title}</span>
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Top and Bottom Fades for smooth infinite effect */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Partners / Clients Infinite Scroll */}
      

































      

      {/* Services */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            
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
            style={{ perspective: 1200 }}>
            
            {services.map((s, i) =>
            <motion.div
              key={s.title}
              custom={i}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                rotateY: -4,
                rotateX: 4,
                scale: 1.04,
                boxShadow: `0 25px 60px -10px hsl(${s.glowColor} / 0.45), 0 0 40px -5px hsl(${s.glowColor} / 0.2)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-card border border-border rounded-xl p-5 pt-6 transition-all group overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}>
              
                {/* Vivid colored top border */}
                <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-500 group-hover:h-1.5"
                style={{
                  background: `linear-gradient(90deg, hsl(${s.glowColor}), hsl(${s.glowColor} / 0.6))`,
                  boxShadow: `0 2px 12px hsl(${s.glowColor} / 0.4)`
                }} />
              

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
                
                {/* Colored glow background on hover — more visible */}
                <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top, hsl(${s.glowColor} / 0.18) 0%, hsl(${s.glowColor} / 0.06) 50%, transparent 80%)`
                }} />
              

                <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ background: `hsl(${s.glowColor} / 0.12)` }}>
                
                  <s.icon style={{ color: `hsl(${s.glowColor})` }} size={24} />
                </div>
                <h3 className="font-display font-bold text-foreground text-[15px] tracking-tight mb-1.5">{s.title}</h3>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.tags.map((tag) =>
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{tag}</span>
                )}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  En savoir plus <ArrowRight size={12} />
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Voir tous nos services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedStats />

      {/* CTA */}
      <motion.section
        className="relative py-24 sm:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        
        {/* Subtle background glow for the whole section to match the image's airy feel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8">
            
            <Rocket size={16} />
            <span className="text-sm font-medium">Prêt à décoller ?</span>
          </motion.div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.1]">
            Besoin d'une solution<br />
            <span className="text-primary relative inline-block mt-2">
              personnalisée ?
              <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Contactez-nous pour un devis gratuit et découvrez comment nous pouvons transformer votre infrastructure IT
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#4a77ff] text-white rounded-full font-medium text-lg transition-all w-full sm:w-auto hover:-translate-y-1"
              style={{
                boxShadow: '0 15px 40px -5px rgba(74, 119, 255, 0.5)'
              }}>
              
              <Sparkles size={20} className="opacity-80" />
              Demander un devis
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform opacity-80" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-background text-foreground border border-primary/20 shadow-sm rounded-full font-medium text-lg hover:border-primary/40 hover:bg-accent/50 transition-all w-full sm:w-auto">
              
              Nous contacter
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Partners / Clients Infinite Scroll - Before Footer */}
      <section className="py-12 border-t border-border/50 bg-card/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Ils nous font confiance
          </p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <motion.div
            className="flex gap-12 sm:gap-24 items-center whitespace-nowrap px-6"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}>
            
            {[...displayPartners, ...displayPartners, ...displayPartners].map((partner, i) =>
            <div key={`footer-${partner.id}-${i}`} className="flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img
                src={partner.logo_url}
                alt={partner.name}
                className="h-8 sm:h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${partner.name}&background=random&color=fff&size=128`;
                }} />
              
              </div>
            )}
          </motion.div>
          
          {/* Gradient Edges */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </div>);

}