import { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-nguessan-it.png";

const PHONE_NUMBER = "2250777655416";

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendToWhatsApp = () => {
    const text = message.trim() || "Bonjour, je souhaite en savoir plus sur vos services.";
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setMessage("");
    setOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: "#25D366" }}
            aria-label="Discuter sur WhatsApp"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[370px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075E54" }}>
              <img src={logoImg} alt="Nguessan-IT" className="w-10 h-10 rounded-full border-2 border-white/30" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Nguessan-IT</p>
                <p className="text-green-200 text-xs">En ligne</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-5 space-y-3" style={{ background: "#ECE5DD" }}>
              {/* Bot welcome bubble */}
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 rounded-lg rounded-tl-none px-3 py-2 text-sm shadow-sm max-w-[85%]">
                  <p>Bonjour ! 👋 Envoyez-nous un message et nous vous répondrons directement sur WhatsApp.</p>
                  <p className="text-[10px] text-gray-500 text-right mt-1">
                    {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {["Demander un devis", "Infos services", "Support technique"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-100 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F0F0] border-t border-gray-200">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendToWhatsApp()}
                placeholder="Tapez un message..."
                className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none border border-gray-200 text-gray-900 placeholder:text-gray-400"
              />
              <button
                onClick={sendToWhatsApp}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: "#25D366" }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
