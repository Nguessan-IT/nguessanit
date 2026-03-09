import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TrendingUp, Star, Rocket, Zap } from "lucide-react";

const stats = [
  { value: 1, suffix: "+", label: "Années expérience", Icon: TrendingUp },
  { value: 10, suffix: "+", label: "Clients satisfaits", Icon: Star },
  { value: 20, suffix: "+", label: "Projets réalisés", Icon: Rocket },
  { value: 24, suffix: "/7", label: "Support technique", Icon: Zap },
];

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

export default function AnimatedStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Blue circle icon */}
              <motion.div
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, type: "spring", stiffness: 200 }}
              >
                <s.Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
              </motion.div>

              {/* Number */}
              <div className="font-display text-5xl sm:text-6xl font-extrabold text-primary mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} delay={0.3 + i * 0.15} />
              </div>

              {/* Label */}
              <p className="text-sm text-muted-foreground font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
