import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Lock, Mail, Send, Users, FileText, Trash2, Plus, Download,
  MessageCircle, Receipt, Phone, Calendar, Building2, DollarSign, BarChart3, Save, Image, Edit, Eye, EyeOff,
} from "lucide-react";
import RichTextEditor from "@/components/shared/RichTextEditor";

const ADMIN_PASSWORD = "NgIT@2025!Admin";

type TabKey = "subscribers" | "contacts" | "quotes" | "newsletters" | "stats" | "portfolio";

function exportCSV(filename: string, headers: string[], rows: string[][]) {
  const bom = "\uFEFF";
  const csv = [headers.join(";"), ...rows.map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(";"))].join("\n");
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`${filename} exporté avec succès`);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<TabKey>("contacts");

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadingNl, setLoadingNl] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  const [siteStats, setSiteStats] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [savingStats, setSavingStats] = useState(false);

  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectForm, setProjectForm] = useState({ title: "", short_description: "", full_description: "", image_url: "", category: "web", technologies: "", client_name: "", project_url: "" });

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
    fetchQuotes();
    fetchSiteStats();
    fetchPortfolio();
  }, [authenticated]);

  const fetchSubscribers = async () => {
    setLoadingSubs(true);
    const { data } = await supabase.from("newsletter_subscribers" as any).select("*").order("subscribed_at", { ascending: false });
    setSubscribers(data || []);
    setLoadingSubs(false);
  };

  const fetchNewsletters = async () => {
    setLoadingNl(true);
    const { data } = await supabase.from("newsletters" as any).select("*").order("created_at", { ascending: false });
    setNewsletters(data || []);
    setLoadingNl(false);
  };

  const fetchMessages = async () => {
    setLoadingMsg(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setContactMessages(data || []);
    setLoadingMsg(false);
  };

  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    const { data } = await supabase.from("quotes").select("*, clients(name, email)").order("created_at", { ascending: false });
    setQuotes(data || []);
    setLoadingQuotes(false);
  };

  const fetchSiteStats = async () => {
    setLoadingStats(true);
    const { data } = await supabase.from("site_stats").select("*").order("display_order");
    setSiteStats(data || []);
    setLoadingStats(false);
  };

  const updateStat = (index: number, field: string, value: string) => {
    setSiteStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const saveSiteStats = async () => {
    setSavingStats(true);
    for (const stat of siteStats) {
      await supabase.from("site_stats").update({
        stat_value: stat.stat_value,
        label: stat.label,
        icon_name: stat.icon_name,
        color: stat.color,
        updated_at: new Date().toISOString(),
      }).eq("id", stat.id);
    }
    setSavingStats(false);
    toast.success("Statistiques mises à jour !");
  };

  const fetchPortfolio = async () => {
    setLoadingPortfolio(true);
    const { data } = await supabase.from("portfolio_projects").select("*").order("display_order");
    setPortfolioProjects(data || []);
    setLoadingPortfolio(false);
  };

  const resetProjectForm = () => {
    setProjectForm({ title: "", short_description: "", full_description: "", image_url: "", category: "web", technologies: "", client_name: "", project_url: "" });
    setEditingProject(null);
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) { toast.error("Le titre est requis"); return; }
    const payload = {
      title: projectForm.title.trim(),
      short_description: projectForm.short_description.trim(),
      full_description: projectForm.full_description.trim(),
      image_url: projectForm.image_url.trim() || null,
      category: projectForm.category,
      technologies: projectForm.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
      client_name: projectForm.client_name.trim() || null,
      project_url: projectForm.project_url.trim() || null,
      updated_at: new Date().toISOString(),
    };

    if (editingProject) {
      const { error } = await supabase.from("portfolio_projects").update(payload).eq("id", editingProject.id);
      if (error) { toast.error("Erreur: " + error.message); return; }
      toast.success("Projet mis à jour !");
    } else {
      const maxOrder = portfolioProjects.length > 0 ? Math.max(...portfolioProjects.map((p: any) => p.display_order || 0)) : 0;
      const { error } = await supabase.from("portfolio_projects").insert({ ...payload, display_order: maxOrder + 1 });
      if (error) { toast.error("Erreur: " + error.message); return; }
      toast.success("Projet ajouté !");
    }
    resetProjectForm();
    fetchPortfolio();
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) { toast.error("Erreur suppression"); return; }
    toast.success("Projet supprimé");
    fetchPortfolio();
  };

  const toggleProjectActive = async (id: string, active: boolean) => {
    await supabase.from("portfolio_projects").update({ active: !active }).eq("id", id);
    fetchPortfolio();
  };

  const startEditProject = (p: any) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      short_description: p.short_description || "",
      full_description: p.full_description || "",
      image_url: p.image_url || "",
      category: p.category || "web",
      technologies: (p.technologies || []).join(", "),
      client_name: p.client_name || "",
      project_url: p.project_url || "",
    });
  };

  const createNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlForm.subject.trim() || !nlForm.content.trim()) { toast.error("Remplissez tous les champs"); return; }
    setSending(true);
    const { error } = await supabase.from("newsletters" as any).insert({ subject: nlForm.subject.trim(), content: nlForm.content.trim() } as any);
    setSending(false);
    if (error) { toast.error("Erreur: " + error.message); return; }
    toast.success("Newsletter créée !");
    setNlForm({ subject: "", content: "" });
    fetchNewsletters();
  };

  const deleteNewsletter = async (id: string) => {
    const { error } = await supabase.from("newsletters" as any).delete().eq("id", id);
    if (error) { toast.error("Erreur suppression"); return; }
    toast.success("Newsletter supprimée");
    fetchNewsletters();
  };

  const markAsSent = async (id: string) => {
    const { error } = await supabase.from("newsletters" as any).update({ status: "sent", sent_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("Erreur"); return; }
    toast.success("Marquée comme envoyée");
    fetchNewsletters();
  };

  // Export functions
  const exportContacts = () => {
    exportCSV(
      `contacts_${new Date().toISOString().slice(0, 10)}.csv`,
      ["Nom", "Email", "Téléphone", "Message", "Date"],
      contactMessages.map((m) => [m.name, m.email, m.phone || "", m.message, formatDate(m.created_at)])
    );
  };

  const exportQuotes = () => {
    exportCSV(
      `devis_${new Date().toISOString().slice(0, 10)}.csv`,
      ["N° Devis", "Titre", "Client", "Email Client", "Montant", "Statut", "Validité", "Date création"],
      quotes.map((q) => [
        q.quote_number, q.title, q.clients?.name || "N/A", q.clients?.email || "N/A",
        q.total_amount?.toString() || "0", q.status || "brouillon",
        q.valid_until ? new Date(q.valid_until).toLocaleDateString("fr-FR") : "N/A",
        formatDate(q.created_at),
      ])
    );
  };

  const exportSubscribers = () => {
    exportCSV(
      `abonnes_${new Date().toISOString().slice(0, 10)}.csv`,
      ["Email", "Date inscription", "Statut"],
      subscribers.map((s) => [s.email, formatDate(s.subscribed_at), s.active ? "Actif" : "Inactif"])
    );
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
            <button type="submit" className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition">
              Accéder
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: any; count: number }[] = [
    { key: "contacts", label: "Messages Contact", icon: MessageCircle, count: contactMessages.length },
    { key: "quotes", label: "Devis", icon: Receipt, count: quotes.length },
    { key: "subscribers", label: "Abonnés", icon: Users, count: subscribers.length },
    { key: "newsletters", label: "Newsletters", icon: FileText, count: newsletters.length },
    { key: "stats", label: "Statistiques Site", icon: BarChart3, count: siteStats.length },
    { key: "portfolio", label: "Portfolio", icon: Image, count: portfolioProjects.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Tableau de bord Admin</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez vos contacts, devis, abonnés et newsletters</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                tab === t.key ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <t.icon size={20} className="text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{t.count}</p>
              <p className="text-xs text-muted-foreground">{t.label}</p>
            </button>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* ===================== CONTACTS TAB ===================== */}
        {tab === "contacts" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <MessageCircle size={20} className="text-primary" />
                Messages de contact ({contactMessages.length})
              </h2>
              {contactMessages.length > 0 && (
                <button onClick={exportContacts} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition">
                  <Download size={16} />
                  Exporter CSV
                </button>
              )}
            </div>
            {loadingMsg ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : contactMessages.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun message de contact reçu.</p>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((m) => (
                  <div key={m.id} className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
                      <div className="space-y-1">
                        <p className="font-bold text-foreground">{m.name}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Mail size={12} /> {m.email}</span>
                          {m.phone && <span className="inline-flex items-center gap-1"><Phone size={12} /> {m.phone}</span>}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(m.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap bg-background/50 rounded-lg p-3">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== QUOTES TAB ===================== */}
        {tab === "quotes" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Receipt size={20} className="text-primary" />
                Devis ({quotes.length})
              </h2>
              {quotes.length > 0 && (
                <button onClick={exportQuotes} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition">
                  <Download size={16} />
                  Exporter CSV
                </button>
              )}
            </div>
            {loadingQuotes ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : quotes.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun devis enregistré.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">N° Devis</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Titre</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Client</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Montant</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Statut</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q) => (
                      <tr key={q.id} className="border-b border-border/50 hover:bg-secondary/30 transition">
                        <td className="py-3 px-2 font-mono text-xs text-primary">{q.quote_number}</td>
                        <td className="py-3 px-2 text-foreground font-medium">{q.title}</td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="text-foreground text-sm">{q.clients?.name || "N/A"}</p>
                            <p className="text-xs text-muted-foreground">{q.clients?.email || ""}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-foreground">{formatCurrency(q.total_amount)}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            q.status === "accepted" ? "bg-green-500/10 text-green-500" :
                            q.status === "sent" ? "bg-blue-500/10 text-blue-500" :
                            q.status === "rejected" ? "bg-red-500/10 text-red-500" :
                            "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {q.status === "draft" ? "Brouillon" : q.status === "sent" ? "Envoyé" : q.status === "accepted" ? "Accepté" : q.status === "rejected" ? "Refusé" : q.status || "Brouillon"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">{formatDate(q.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===================== SUBSCRIBERS TAB ===================== */}
        {tab === "subscribers" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Users size={20} className="text-primary" />
                Abonnés ({subscribers.length})
              </h2>
              {subscribers.length > 0 && (
                <button onClick={exportSubscribers} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition">
                  <Download size={16} />
                  Exporter CSV
                </button>
              )}
            </div>
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
                        <td className="py-3 px-2 text-muted-foreground">{new Date(s.subscribed_at).toLocaleDateString("fr-FR")}</td>
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
          </div>
        )}

        {/* ===================== NEWSLETTERS TAB ===================== */}
        {tab === "newsletters" && (
          <div className="space-y-6">
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
                <RichTextEditor content={nlForm.content} onChange={(html) => setNlForm((f) => ({ ...f, content: html }))} />
                <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition disabled:opacity-50">
                  <FileText size={16} />
                  {sending ? "Création..." : "Créer la newsletter"}
                </button>
              </form>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Newsletters ({newsletters.length})</h2>
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
                            <button onClick={() => markAsSent(nl.id)} className="p-2 rounded-lg hover:bg-accent transition text-primary" title="Marquer comme envoyée">
                              <Send size={16} />
                            </button>
                          )}
                          <button onClick={() => deleteNewsletter(nl.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition text-destructive" title="Supprimer">
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

        {/* ===================== STATS TAB ===================== */}
        {tab === "stats" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Statistiques du site ({siteStats.length})
              </h2>
              <button
                onClick={saveSiteStats}
                disabled={savingStats}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                <Save size={16} />
                {savingStats ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Modifiez les chiffres affichés sur la page Services publique. Les changements sont visibles immédiatement après enregistrement.
            </p>
            {loadingStats ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : siteStats.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune statistique configurée.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteStats.map((stat, index) => (
                  <div key={stat.id} className="bg-secondary/50 rounded-xl p-5 border border-border/50 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `hsl(${stat.color})` }}
                      >
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{stat.stat_key}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Valeur affichée</label>
                        <input
                          value={stat.stat_value}
                          onChange={(e) => updateStat(index, "stat_value", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Label</label>
                        <input
                          value={stat.label}
                          onChange={(e) => updateStat(index, "label", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Icône</label>
                        <select
                          value={stat.icon_name}
                          onChange={(e) => updateStat(index, "icon_name", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {["Rocket", "ThumbsUp", "Globe", "Headphones", "Code", "Cloud", "Zap", "Target"].map((ic) => (
                            <option key={ic} value={ic}>{ic}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Couleur HSL</label>
                        <input
                          value={stat.color}
                          onChange={(e) => updateStat(index, "color", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="210 100% 55%"
                        />
                      </div>
                    </div>
                    {stat.updated_at && (
                      <p className="text-xs text-muted-foreground">
                        Dernière mise à jour : {new Date(stat.updated_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== PORTFOLIO TAB ===================== */}
        {tab === "portfolio" && (
          <div className="space-y-6">
            {/* Add/Edit form */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Plus size={20} className="text-primary" />
                {editingProject ? "Modifier le projet" : "Ajouter un projet"}
              </h2>
              <form onSubmit={saveProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Titre *</label>
                    <input value={projectForm.title} onChange={(e) => setProjectForm(f => ({ ...f, title: e.target.value }))} placeholder="Nom du projet" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Client</label>
                    <input value={projectForm.client_name} onChange={(e) => setProjectForm(f => ({ ...f, client_name: e.target.value }))} placeholder="Nom du client" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Description courte</label>
                  <input value={projectForm.short_description} onChange={(e) => setProjectForm(f => ({ ...f, short_description: e.target.value }))} placeholder="Résumé en une phrase" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Description complète</label>
                  <textarea value={projectForm.full_description} onChange={(e) => setProjectForm(f => ({ ...f, full_description: e.target.value }))} placeholder="Description détaillée du projet..." rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">URL de l'image</label>
                    <input value={projectForm.image_url} onChange={(e) => setProjectForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">URL du projet</label>
                    <input value={projectForm.project_url} onChange={(e) => setProjectForm(f => ({ ...f, project_url: e.target.value }))} placeholder="https://..." className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Catégorie</label>
                    <select value={projectForm.category} onChange={(e) => setProjectForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="web">Web</option>
                      <option value="erp">ERP/CRM</option>
                      <option value="mobile">Mobile</option>
                      <option value="cloud">Cloud</option>
                      <option value="branding">Branding</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Technologies (séparées par des virgules)</label>
                    <input value={projectForm.technologies} onChange={(e) => setProjectForm(f => ({ ...f, technologies: e.target.value }))} placeholder="React, Node.js, AWS" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition hover:opacity-90">
                    <Save size={16} />
                    {editingProject ? "Mettre à jour" : "Ajouter le projet"}
                  </button>
                  {editingProject && (
                    <button type="button" onClick={resetProjectForm} className="px-6 py-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition">
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects list */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Image size={20} className="text-primary" />
                Projets ({portfolioProjects.length})
              </h2>
              {loadingPortfolio ? (
                <p className="text-muted-foreground text-sm">Chargement...</p>
              ) : portfolioProjects.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun projet ajouté.</p>
              ) : (
                <div className="space-y-4">
                  {portfolioProjects.map((p: any) => (
                    <div key={p.id} className="flex items-start gap-4 bg-secondary/50 rounded-xl p-4 border border-border/50">
                      {p.image_url && (
                        <img src={p.image_url} alt={p.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground truncate">{p.title}</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${p.active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                            {p.active ? "Actif" : "Masqué"}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">{p.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{p.short_description}</p>
                        {p.technologies && p.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.technologies.map((t: string) => (
                              <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => toggleProjectActive(p.id, p.active)} className="p-2 rounded-lg hover:bg-accent transition" title={p.active ? "Masquer" : "Afficher"}>
                          {p.active ? <EyeOff size={16} className="text-muted-foreground" /> : <Eye size={16} className="text-primary" />}
                        </button>
                        <button onClick={() => startEditProject(p)} className="p-2 rounded-lg hover:bg-accent transition text-primary" title="Modifier">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition text-destructive" title="Supprimer">
                          <Trash2 size={16} />
                        </button>
                      </div>
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
