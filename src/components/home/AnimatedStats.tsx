import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const stats = [
  { value: 1, suffix: "+", label: "Années expérience", icon: "🏆", color: "210 100% 60%" },
  { value: 10, suffix: "+", label: "Clients satisfaits", icon: "🤝", color: "160 80% 45%" },
  { value: 20, suffix: "+", label: "Projets réalisés", icon: "🚀", color: "270 70% 60%" },
  { value: 24, suffix: "/7", label: "Support technique", icon: "⚡", color: "30 90% 55%" },
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
    <section className="relative py-20 overflow-hidden" ref={containerRef}>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm" />
        {/* Sweeping light beam */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "200%" } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.08), transparent)",
            width: "50%",
          }}
        />
      </motion.div>

      {/* Decorative floating particles */}
      {isInView && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
              initial={{
                x: `${15 + i * 15}%`,
                y: "110%",
                opacity: 0,
              }}
              animate={{
                y: "-10%",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                delay: 0.5 + i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            Nos chiffres parlent
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            L'excellence en chiffres
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative group"
              initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.08,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              style={{ perspective: 800 }}
            >
              {/* Card */}
              <div className="relative bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 text-center overflow-hidden transition-shadow duration-500 group-hover:shadow-xl">
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, hsl(${s.color} / 0.15) 0%, transparent 70%)`,
                  }}
                />

                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                  style={{
                    background: `linear-gradient(90deg, hsl(${s.color}), hsl(${s.color} / 0.4))`,
                    transformOrigin: "left",
                  }}
                />

                {/* Shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Icon with pulse ring */}
                <motion.div
                  className="relative mx-auto mb-4 w-14 h-14 flex items-center justify-center text-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid hsl(${s.color} / 0.3)`,
                    }}
                    animate={
                      isInView
                        ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  <span className="relative z-10">{s.icon}</span>
                </motion.div>

                {/* Animated number */}
                <div
                  className="font-display text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(${s.color}), hsl(${s.color} / 0.7))`,
                  }}
                >
                  <AnimatedCounter value={s.value} suffix={s.suffix} delay={0.4 + i * 0.15} />
                </div>

                {/* Label with stagger */}
                <motion.p
                  className="text-sm text-muted-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                >
                  {s.label}
                </motion.p>

                {/* Bottom sparkle dots */}
                <motion.div
                  className="flex justify-center gap-1 mt-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-1 h-1 rounded-full"
                      style={{ background: `hsl(${s.color})` }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
