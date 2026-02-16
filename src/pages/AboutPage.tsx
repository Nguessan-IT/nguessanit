import { Target, Lightbulb, Heart, MapPin } from "lucide-react";

const values = [
  { icon: Target, title: "Excellence", desc: "Des solutions sur mesure avec les plus hauts standards de qualité." },
  { icon: Lightbulb, title: "Innovation", desc: "Toujours à la pointe des technologies pour vous offrir le meilleur." },
  { icon: Heart, title: "Engagement", desc: "Un accompagnement personnalisé et un suivi de proximité." },
];

const locations = [
  { city: "Abidjan", country: "Côte d'Ivoire", status: "Siège actif", active: true },
  { city: "France", country: "Europe", status: "Bientôt", active: false },
  { city: "Amérique du Nord", country: "", status: "Bientôt", active: false },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">À propos de Nguessan-IT</h1>
          <p className="text-lg text-muted-foreground">
            Une entreprise de transformation digitale au service de l'Afrique, l'Europe et l'Amérique.
          </p>
        </div>
      </section>

      {/* Mission - glassmorphism */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Chez Nguessan-IT, nous croyons que la technologie est le levier le plus puissant pour transformer les entreprises.
              Notre mission est d'accompagner les organisations dans leur transition numérique en offrant des solutions innovantes,
              fiables et adaptées à leurs réalités. Du cloud à l'intelligence artificielle, nous aidons nos clients à maximiser
              leur ROI et à se positionner en leaders sur leurs marchés.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">Notre Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">ROI</div>
              <p className="text-sm text-muted-foreground">Optimisation du retour sur investissement de vos projets IT</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">Cloud</div>
              <p className="text-sm text-muted-foreground">Migration et gestion d'infrastructures cloud modernes</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">IA</div>
              <p className="text-sm text-muted-foreground">Intégration de solutions d'intelligence artificielle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
                <v.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">Nos Implantations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className={`bg-card border border-border rounded-lg p-6 text-center transition ${!loc.active ? "opacity-50" : ""}`}
              >
                <MapPin className="text-primary mx-auto mb-3" size={28} />
                <h3 className="font-display font-semibold text-foreground">{loc.city}</h3>
                {loc.country && <p className="text-sm text-muted-foreground">{loc.country}</p>}
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${loc.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {loc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
