import { motion } from "framer-motion";

export default function HighTechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(210 60% 97%) 0%, hsl(210 40% 98%) 30%, hsl(200 50% 96%) 60%, hsl(210 60% 95%) 100%)" }}>
      {/* Large soft blue orb top-left */}
      <motion.div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(210 80% 85% / 0.5) 0%, transparent 70%)" }}
        animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Medium orb center-right */}
      <motion.div
        className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(200 70% 88% / 0.4) 0%, transparent 70%)" }}
        animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Small accent orb bottom-left */}
      <motion.div
        className="absolute bottom-10 left-[20%] w-[300px] h-[300px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, hsl(215 75% 90% / 0.35) 0%, transparent 70%)" }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(220 72% 50%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </div>
  );
}
