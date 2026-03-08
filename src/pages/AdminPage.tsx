import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, Mail, Send, Users, FileText, Trash2, Eye, Plus } from "lucide-react";

const ADMIN_PASSWORD = "NgIT@2025!Admin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"subscribers" | "newsletters">("subscribers");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadingNl, setLoadingNl] = useState(false);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(false);

  // Newsletter form
  const [nlForm, setNlForm] = useState({ subject: "", content: "" });
  const [sending, setSending] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success("Accès autorisé");
    } else {
      toast.error("Mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchSubscribers();
    fetchNewsletters();
    fetchMessages();
  }, [authenticated]);

  const fetchSubscribers = async () => {
    setLoadingSubs(true);
    const { data } = await supabase
      .from("newsletter_subscribers" as any)
      .select("*")
      .order("subscribed_at", { ascending: false });
    setSubscribers(data || []);
    setLoadingSubs(false);
  };

  const fetchNewsletters = async () => {
    setLoadingNl(true);
    const { data } = await supabase
      .from("newsletters" as any)
      .select("*")
      .order("created_at", { ascending: false });
    setNewsletters(data || []);
    setLoadingNl(false);
  };

  const fetchMessages = async () => {
    setLoadingMsg(true);
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setContactMessages(data || []);
    setLoadingMsg(false);
  };

  const createNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlForm.subject.trim() || !nlForm.content.trim()) {
      toast.error("Remplissez tous les champs");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("newsletters" as any).insert({
      subject: nlForm.subject.trim(),
      content: nlForm.content.trim(),
    } as any);
    setSending(false);
    if (error) {
      toast.error("Erreur: " + error.message);
      return;
    }
    toast.success("Newsletter créée !");
    setNlForm({ subject: "", content: "" });
    fetchNewsletters();
  };

  const deleteNewsletter = async (id: string) => {
    const { error } = await supabase.from("newsletters" as any).delete().eq("id", id);
    if (error) {
      toast.error("Erreur suppression");
      return;
    }
    toast.success("Newsletter supprimée");
    fetchNewsletters();
  };

  const markAsSent = async (id: string) => {
    const { error } = await supabase
      .from("newsletters")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Erreur");
      return;
    }
    toast.success("Marquée comme envoyée");
    fetchNewsletters();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="text-primary" size={28} />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">Administration</h1>
            <p className="text-sm text-muted-foreground mt-1">Accès réservé</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition"
            >
              Accéder
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Admin Newsletter</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez vos abonnés et newsletters</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: "subscribers" as const, label: "Abonnés", icon: Users },
            { key: "newsletters" as const, label: "Newsletters", icon: FileText },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === t.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Subscribers Tab */}
        {tab === "subscribers" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Abonnés ({subscribers.length})
            </h2>
            {loadingSubs ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : subscribers.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun abonné pour l'instant.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id} className="border-b border-border/50">
                        <td className="py-3 px-2 text-foreground">{s.email}</td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {new Date(s.subscribed_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${s.active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                            {s.active ? "Actif" : "Inactif"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Contact Messages */}
            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Mail size={20} className="text-primary" />
                Messages de contact ({contactMessages.length})
              </h2>
              {loadingMsg ? (
                <p className="text-muted-foreground text-sm">Chargement...</p>
              ) : contactMessages.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun message.</p>
              ) : (
                <div className="space-y-3">
                  {contactMessages.map((m) => (
                    <div key={m.id} className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-foreground text-sm">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email} {m.phone && `• ${m.phone}`}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(m.created_at).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Newsletters Tab */}
        {tab === "newsletters" && (
          <div className="space-y-6">
            {/* Create Newsletter */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Plus size={20} className="text-primary" />
                Créer une newsletter
              </h2>
              <form onSubmit={createNewsletter} className="space-y-4">
                <input
                  value={nlForm.subject}
                  onChange={(e) => setNlForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="Sujet de la newsletter"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  value={nlForm.content}
                  onChange={(e) => setNlForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Contenu de la newsletter..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition disabled:opacity-50"
                >
                  <FileText size={16} />
                  {sending ? "Création..." : "Créer la newsletter"}
                </button>
              </form>
            </div>

            {/* Newsletter List */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">
                Newsletters ({newsletters.length})
              </h2>
              {loadingNl ? (
                <p className="text-muted-foreground text-sm">Chargement...</p>
              ) : newsletters.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune newsletter créée.</p>
              ) : (
                <div className="space-y-4">
                  {newsletters.map((nl) => (
                    <div key={nl.id} className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-foreground">{nl.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(nl.created_at).toLocaleDateString("fr-FR")} •{" "}
                            <span className={nl.status === "sent" ? "text-green-500" : "text-yellow-500"}>
                              {nl.status === "sent" ? "Envoyée" : "Brouillon"}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {nl.status !== "sent" && (
                            <button
                              onClick={() => markAsSent(nl.id)}
                              className="p-2 rounded-lg hover:bg-accent transition text-primary"
                              title="Marquer comme envoyée"
                            >
                              <Send size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNewsletter(nl.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition text-destructive"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">{nl.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
