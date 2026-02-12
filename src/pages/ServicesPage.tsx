import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", billing_type: "monthly", active: true });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, price: form.price ? parseFloat(form.price) : null };
      if (editing) {
        const { error } = await supabase.from("services").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Service modifié" : "Service ajouté");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Service supprimé");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", billing_type: "monthly", active: true });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (s: any) => {
    setForm({ name: s.name, description: s.description || "", price: s.price?.toString() || "", billing_type: s.billing_type || "monthly", active: s.active ?? true });
    setEditing(s);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Services</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing ? "Modifier" : "Nouveau service"}</h2>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nom *</label>
              <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Prix (FCFA)</label>
              <input type="number" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Type de facturation</label>
              <select value={form.billing_type} onChange={(e) => setForm(f => ({ ...f, billing_type: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="monthly">Mensuel</option>
                <option value="yearly">Annuel</option>
                <option value="one_time">Unique</option>
                <option value="hourly">Horaire</option>
              </select>
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
                <th className="text-left p-3 font-medium text-muted-foreground">Nom</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Prix</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Facturation</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Chargement...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Aucun service</td></tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition">
                    <td className="p-3 font-medium text-foreground">{s.name}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{s.price ? `${s.price.toLocaleString()} FCFA` : "—"}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{s.billing_type || "—"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {s.active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(s)} className="p-1.5 rounded hover:bg-accent transition"><Pencil size={14} className="text-muted-foreground" /></button>
                        <button onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(s.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition"><Trash2 size={14} className="text-destructive" /></button>
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
