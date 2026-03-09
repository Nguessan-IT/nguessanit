import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { X, ExternalLink, ArrowRight, Sparkles, Layers } from "lucide-react";
import techBg from "@/assets/tech-background.jpg";

// Categories are built dynamically from project data

interface Project {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  image_url: string | null;
  category: string;
  technologies: string[];
  client_name: string | null;
  project_url: string | null;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 pb-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl my-auto bg-card border border-border rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition"
        >
          <X size={20} />
        </button>

        {/* Image */}
        {project.image_url && (
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
                {project.category}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {project.title}
          </h2>

          {project.client_name && (
            <p className="text-sm text-primary font-medium mb-4">
              Client : {project.client_name}
            </p>
          )}

          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
            {project.full_description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                <ExternalLink size={16} />
                Voir le projet
              </a>
            )}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:border-primary hover:bg-primary/5 transition"
            >
              Un projet similaire ? Contactez-nous
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        setProjects((data as any) || []);
        setLoading(false);
      });
  }, []);

  // Build dynamic categories from project data
  const dynamicCategories = [
    { key: "all", label: "Tous" },
    ...Array.from(new Set(projects.map((p) => p.category))).map((cat) => ({
      key: cat,
      label: cat,
    })),
  ];

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={techBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Layers size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Portfolio</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Nos Réalisations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos projets récents et l'expertise que nous mettons au service de chaque client.
          </p>
        </motion.div>
      </section>

      {/* Filter bar */}
      <section className="py-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat.key
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-secondary animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Aucun projet dans cette catégorie pour le moment.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/50 bg-card hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <Layers size={40} className="text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm">
                          {categories.find((c) => c.key === project.category)?.label || project.category}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                          Voir le détail
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.client_name && (
                        <p className="text-xs text-primary/70 font-medium mb-2">{project.client_name}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {project.short_description}
                      </p>

                      {/* Tech tags */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-muted-foreground">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
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
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Transformons votre idée en réalité. Contactez-nous pour un devis gratuit et personnalisé.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition shadow-lg shadow-primary/25"
          >
            <Sparkles size={18} />
            Demandez votre devis gratuit
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
