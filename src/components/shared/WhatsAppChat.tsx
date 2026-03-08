import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-nguessan-it.png";

const PHONE_NUMBER = "2250777655416";

const AUTO_REPLIES: { keywords: string[]; reply: string }[] = [
  { keywords: ["bonjour", "salut", "hello", "bonsoir", "hi"], reply: "Bonjour ! 👋 Bienvenue chez Nguessan-IT. Comment puis-je vous aider aujourd'hui ?" },
  { keywords: ["devis", "prix", "tarif", "coût", "combien"], reply: "Pour un devis personnalisé, merci de nous préciser votre besoin (site web, maintenance, cloud…). Vous pouvez aussi remplir notre formulaire sur /devis 📋" },
  { keywords: ["service", "offre", "proposez"], reply: "Nous proposons : Développement Web, Maintenance IT, Solutions Cloud, Formation & Conseil, Audit Sécurité et Support 24/7. Quel service vous intéresse ? 🚀" },
  { keywords: ["contact", "joindre", "appeler", "téléphone"], reply: "Vous pouvez nous joindre au +225 0777655416 ou par email à fiacrenguessan@outlook.com 📞" },
  { keywords: ["merci", "super", "parfait", "ok"], reply: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊" },
];

const DEFAULT_REPLY = "Merci pour votre message ! Un conseiller vous répondra rapidement. Pour une réponse immédiate, cliquez sur « Continuer sur WhatsApp » ci-dessous. 💬";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
  time: string;
}

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  for (const rule of AUTO_REPLIES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.reply;
  }
  return DEFAULT_REPLY;
}

function now() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bonjour ! 👋 Je suis l'assistant Nguessan-IT. Posez-moi vos questions sur nos services, un devis ou autre.", from: "bot", time: now() },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), text, from: "user", time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, text: getAutoReply(text), from: "bot", time: now() };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  const openWhatsApp = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.from === "user");
    const text = lastUserMsg ? encodeURIComponent(lastUserMsg.text) : encodeURIComponent("Bonjour, je souhaite en savoir plus sur vos services.");
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: "#25D366" }}
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col"
            style={{ maxHeight: "min(520px, 75vh)" }}
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

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
              style={{ background: "#ECE5DD", minHeight: 200 }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      msg.from === "user"
                        ? "bg-[#DCF8C6] text-gray-900 rounded-tr-none"
                        : "bg-white text-gray-900 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* WhatsApp redirect */}
            <button
              onClick={openWhatsApp}
              className="text-xs text-center py-2 font-medium hover:underline"
              style={{ background: "#DCF8C6", color: "#075E54" }}
            >
              💬 Continuer sur WhatsApp
            </button>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F0F0] border-t border-gray-200">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Tapez un message..."
                className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none border border-gray-200 text-gray-900 placeholder:text-gray-400"
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: "#075E54" }}
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
