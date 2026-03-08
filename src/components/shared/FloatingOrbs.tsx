import { motion } from "framer-motion";

const orbs = [
  {
    size: 120,
    gradient: "radial-gradient(circle, hsl(210 100% 60% / 0.15), hsl(200 100% 70% / 0.05), transparent)",
    top: "10%",
    left: "5%",
    duration: 30,
  },
  {
    size: 180,
    gradient: "radial-gradient(circle, hsl(220 100% 65% / 0.12), hsl(230 100% 60% / 0.04), transparent)",
    top: "60%",
    right: "10%",
    duration: 35,
  },
  {
    size: 100,
    gradient: "radial-gradient(circle, hsl(190 100% 50% / 0.18), hsl(210 100% 60% / 0.06), transparent)",
    bottom: "20%",
    left: "70%",
    duration: 40,
  },
  {
    size: 140,
    gradient: "radial-gradient(circle, hsl(200 80% 55% / 0.10), hsl(220 80% 65% / 0.03), transparent)",
    top: "35%",
    left: "40%",
    duration: 45,
  },
];

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.gradient,
            filter: "blur(2px)",
            top: orb.top,
            left: orb.left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
          }}
          animate={{
            x: [0, 30, -20, -50, 0],
            y: [0, -30, -60, -30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(210 85% 55%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
