import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MessageCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated 404 */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span className="font-display text-[8rem] sm:text-[10rem] font-extrabold leading-none gradient-text select-none">
            404
          </span>
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-display text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary/10 blur-2xl">
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Message */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Oups ! Page introuvable
        </h1>
        <p className="text-muted-foreground mb-2 leading-relaxed">
          Nous sommes désolés, la page que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Veuillez vérifier l'adresse saisie ou le lien sur lequel vous avez cliqué. 
          Il est possible que cette page ait été déplacée ou que l'URL contienne une erreur.
        </p>

        {/* Suggestions */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 mb-8 text-left">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Search size={16} className="text-primary" />
            Quelques suggestions :
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Vérifiez que l'URL est correctement orthographiée
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Retournez à la page d'accueil et naviguez depuis le menu
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Si le problème persiste, contactez-nous pour signaler le lien cassé
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition shadow-md shadow-primary/20"
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary hover:bg-primary/5 transition"
          >
            <ArrowLeft size={18} />
            Page précédente
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary hover:bg-primary/5 transition"
          >
            <MessageCircle size={18} />
            Contactez-nous
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
