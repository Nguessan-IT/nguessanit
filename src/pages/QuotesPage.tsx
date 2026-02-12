import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function QuotesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", client_id: "", total_amount: "", valid_until: "", status: "draft" });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients-list"],
    queryFn: async () => {
      const { data } = await supabase.from("clients").select("id, name").order("name");
      return data ?? [];
    },
  });

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("quotes").select("*, clients(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        total_amount: parseFloat(form.total_amount) || 0,
        valid_until: form.valid_until || null,
        created_by: user!.id,
        quote_number: editing ? editing.quote_number : `DEV-${Date.now().toString().slice(-6)}`,
      };
      if (editing) {
        const { error } = await supabase.from("quotes").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("quotes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Devis modifié" : "Devis créé");
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quotes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Devis supprimé");
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ title: "", description: "", client_id: "", total_amount: "", valid_until: "", status: "draft" });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (q: any) => {
    setForm({ title: q.title, description: q.description || "", client_id: q.client_id, total_amount: q.total_amount?.toString() || "0", valid_until: q.valid_until || "", status: q.status || "draft" });
    setEditing(q);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Devis</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> Nouveau devis
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing ? "Modifier" : "Nouveau devis"}</h2>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Titre *</label>
              <input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Client *</label>
              <select value={form.client_id} onChange={(e) => setForm(f => ({ ...f, client_id: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Sélectionner...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Montant (FCFA)</label>
              <input type="number" value={form.total_amount} onChange={(e) => setForm(f => ({ ...f, total_amount: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Valide jusqu'au</label>
              <input type="date" value={form.valid_until} onChange={(e) => setForm(f => ({ ...f, valid_until: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" rows={3} />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saveMutation.isPending} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-50">Enregistrer</button>
              <button type="button" onClick={resetForm} className="px-4 py-2 border border-border rounded-md text-sm text-foreground hover:bg-accent transition">Annuler</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">N°</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Titre</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Client</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Montant</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Chargement...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Aucun devis</td></tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition">
                    <td className="p-3 font-mono text-xs text-muted-foreground">{q.quote_number}</td>
                    <td className="p-3 font-medium text-foreground">{q.title}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{(q as any).clients?.name || "—"}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{q.total_amount.toLocaleString()} FCFA</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">{q.status}</span></td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(q)} className="p-1.5 rounded hover:bg-accent transition"><Pencil size={14} className="text-muted-foreground" /></button>
                        <button onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(q.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition"><Trash2 size={14} className="text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
