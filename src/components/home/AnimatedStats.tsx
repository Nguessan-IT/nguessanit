import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { TrendingUp, Star, Rocket, Zap, ThumbsUp, Globe, Headphones, Code, Cloud, Target } from "lucide-react";
import techBg from "@/assets/tech-background.jpg";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = { TrendingUp, Star, Rocket, Zap, ThumbsUp, Globe, Headphones, Code, Cloud, Target };

const defaultStats = [
  { value: 1, suffix: "+", label: "Années expérience", Icon: TrendingUp },
  { value: 10, suffix: "+", label: "Clients satisfaits", Icon: Star },
  { value: 20, suffix: "+", label: "Projets réalisés", Icon: Rocket },
  { value: 24, suffix: "/7", label: "Support technique", Icon: Zap },
];

function parseStatValue(val: string): { value: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)/);
  return match ? { value: parseInt(match[1], 10), suffix: match[2] } : { value: 0, suffix: val };
}

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function GridBackground({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stats-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.08)" strokeWidth="1" />
          </pattern>
          <linearGradient id="grid-fade-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grid-fade-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade-h)" />
            <rect width="100%" height="100%" fill="url(#grid-fade-v)" style={{ mixBlendMode: "multiply" }} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#stats-grid)" mask="url(#grid-mask)" />
      </svg>

      {/* Sweeping horizontal laser line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--primary)), hsl(var(--primary) / 0.6), transparent)",
          boxShadow: "0 0 20px 2px hsl(var(--primary) / 0.4)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? {
          top: ["0%", "100%", "0%"],
          opacity: [0, 1, 1, 1, 0],
        } : {}}
        transition={{ duration: 4, delay: 0.3, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Sweeping vertical laser line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.4), transparent)",
          boxShadow: "0 0 15px 1px hsl(var(--primary) / 0.3)",
        }}
        initial={{ left: "0%", opacity: 0 }}
        animate={isInView ? {
          left: ["0%", "100%", "0%"],
          opacity: [0, 1, 1, 1, 0],
        } : {}}
        transition={{ duration: 5, delay: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Glowing intersection dots that pulse */}
      {[
        { x: "25%", y: "30%", delay: 0.5 },
        { x: "50%", y: "50%", delay: 1.0 },
        { x: "75%", y: "30%", delay: 1.5 },
        { x: "12%", y: "70%", delay: 0.8 },
        { x: "88%", y: "70%", delay: 1.2 },
        { x: "37%", y: "20%", delay: 1.8 },
        { x: "63%", y: "80%", delay: 2.0 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 8px 2px hsl(var(--primary) / 0.5)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? {
            scale: [0, 1.5, 1, 1.5, 1],
            opacity: [0, 1, 0.6, 1, 0.6],
          } : {}}
          transition={{
            duration: 3,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Corner accent brackets */}
      {[
        { pos: "top-3 left-3", rotate: 0 },
        { pos: "top-3 right-3", rotate: 90 },
        { pos: "bottom-3 right-3", rotate: 180 },
        { pos: "bottom-3 left-3", rotate: 270 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.pos} w-6 h-6 pointer-events-none`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${corner.rotate}deg)` }}>
            <path d="M2 8V2h6" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function StatCard({ s, i, isInView }: { s: typeof defaultStats[0]; i: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useTransform(mouseX, (v) => `${v}px`);
  const spotlightY = useTransform(mouseY, (v) => `${v}px`);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-primary/10 bg-card/40 backdrop-blur-sm overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.04, y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
    >
      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          left: spotlightX,
          top: spotlightY,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Top border glow on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
          transformOrigin: "center",
        }}
      />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />

      {/* Icon */}
      <motion.div
        className="relative w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5"
        initial={{ scale: 0, rotate: -90 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        {/* Orbit ring */}
        <motion.div
          className="absolute inset-[-4px] rounded-full border border-dashed border-primary/20"
          animate={isInView ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <s.Icon className="w-6 h-6 text-primary" strokeWidth={2} />
      </motion.div>

      {/* Number with glow */}
      <motion.div
        className="relative font-display text-5xl sm:text-6xl font-extrabold text-primary mb-2"
        initial={{ filter: "blur(10px)" }}
        animate={isInView ? { filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
      >
        <AnimatedCounter value={s.value} suffix={s.suffix} delay={0.4 + i * 0.15} />
        {/* Number glow */}
        <div className="absolute inset-0 text-5xl sm:text-6xl font-extrabold text-primary/20 blur-lg pointer-events-none flex items-center justify-center">
          {s.value}{s.suffix}
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-sm text-muted-foreground font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
      >
        {s.label}
      </motion.p>

      {/* Bottom pulse dots */}
      <motion.div
        className="flex gap-1.5 mt-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 + i * 0.1 }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-1 h-1 rounded-full bg-primary/50"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: dot * 0.4 + i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    supabase
      .from("site_stats")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setStats(
            data.map((s: any) => {
              const parsed = parseStatValue(s.stat_value);
              return {
                value: parsed.value,
                suffix: parsed.suffix,
                label: s.label,
                Icon: iconMap[s.icon_name] || Rocket,
              };
            })
          );
        }
      });
  }, []);

  return (
    <section className="relative py-20 overflow-hidden" ref={containerRef}>
      {/* Tech circuit board background */}
      <div className="absolute inset-0 -z-10">
        <img src={techBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Background grid effect */}
        <div className="absolute inset-0 -m-8 rounded-3xl overflow-hidden">
          <GridBackground isInView={isInView} />
        </div>

        {/* Section header */}
        <motion.div
          className="text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nos chiffres
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3">
            L'excellence en chiffres
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
