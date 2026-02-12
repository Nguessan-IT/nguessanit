import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type InteractionType = Database["public"]["Enums"]["interaction_type"];
type InteractionStatus = Database["public"]["Enums"]["interaction_status"];

const typeLabels: Record<InteractionType, string> = { email: "Email", call: "Appel", ticket: "Ticket", meeting: "Réunion" };
const statusLabels: Record<InteractionStatus, string> = { pending: "En attente", in_progress: "En cours", completed: "Terminé", cancelled: "Annulé" };

export default function InteractionsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ subject: "", description: "", client_id: "", type: "email" as InteractionType, status: "pending" as InteractionStatus, scheduled_at: "" });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients-list"],
    queryFn: async () => {
      const { data } = await supabase.from("clients").select("id, name").order("name");
      return data ?? [];
    },
  });

  const { data: interactions = [], isLoading } = useQuery({
    queryKey: ["interactions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("interactions").select("*, clients(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, scheduled_at: form.scheduled_at || null, created_by: user!.id };
      if (editing) {
        const { error } = await supabase.from("interactions").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("interactions").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Interaction modifiée" : "Interaction créée");
      queryClient.invalidateQueries({ queryKey: ["interactions"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("interactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Interaction supprimée");
      queryClient.invalidateQueries({ queryKey: ["interactions"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ subject: "", description: "", client_id: "", type: "email", status: "pending", scheduled_at: "" });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (i: any) => {
    setForm({ subject: i.subject, description: i.description || "", client_id: i.client_id, type: i.type, status: i.status || "pending", scheduled_at: i.scheduled_at || "" });
    setEditing(i);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Interactions</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> Nouvelle interaction
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing ? "Modifier" : "Nouvelle interaction"}</h2>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sujet *</label>
              <input value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Client *</label>
              <select value={form.client_id} onChange={(e) => setForm(f => ({ ...f, client_id: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Sélectionner...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value as InteractionType }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Statut</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as InteractionStatus }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Date planifiée</label>
              <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm(f => ({ ...f, scheduled_at: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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
                <th className="text-left p-3 font-medium text-muted-foreground">Sujet</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Client</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Chargement...</td></tr>
              ) : interactions.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Aucune interaction</td></tr>
              ) : (
                interactions.map((i) => (
                  <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition">
                    <td className="p-3 font-medium text-foreground">{i.subject}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{(i as any).clients?.name || "—"}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">{typeLabels[i.type as InteractionType]}</span></td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">{statusLabels[i.status as InteractionStatus]}</span></td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(i)} className="p-1.5 rounded hover:bg-accent transition"><Pencil size={14} className="text-muted-foreground" /></button>
                        <button onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(i.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition"><Trash2 size={14} className="text-destructive" /></button>
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
