import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type InvoiceStatus = Database["public"]["Enums"]["invoice_status"];

const statusColors: Record<InvoiceStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-orange-100 text-orange-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function InvoicesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", client_id: "", total_amount: "", due_date: "", status: "draft" as InvoiceStatus });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients-list"],
    queryFn: async () => {
      const { data } = await supabase.from("clients").select("id, name").order("name");
      return data ?? [];
    },
  });

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("invoices").select("*, clients(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        total_amount: parseFloat(form.total_amount) || 0,
        due_date: form.due_date || null,
        created_by: user!.id,
        invoice_number: editing ? editing.invoice_number : `FAC-${Date.now().toString().slice(-6)}`,
      };
      if (editing) {
        const { error } = await supabase.from("invoices").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("invoices").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Facture modifiée" : "Facture créée");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("invoices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Facture supprimée");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ title: "", description: "", client_id: "", total_amount: "", due_date: "", status: "draft" });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (inv: any) => {
    setForm({ title: inv.title, description: inv.description || "", client_id: inv.client_id, total_amount: inv.total_amount?.toString() || "0", due_date: inv.due_date || "", status: inv.status || "draft" });
    setEditing(inv);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Factures</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} /> Nouvelle facture
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing ? "Modifier" : "Nouvelle facture"}</h2>
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
              <label className="block text-sm font-medium text-foreground mb-1">Échéance</label>
              <input type="date" value={form.due_date} onChange={(e) => setForm(f => ({ ...f, due_date: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Statut</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as InvoiceStatus }))} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyée</option>
                <option value="paid">Payée</option>
                <option value="overdue">En retard</option>
                <option value="cancelled">Annulée</option>
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
              ) : invoices.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Aucune facture</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition">
                    <td className="p-3 font-mono text-xs text-muted-foreground">{inv.invoice_number}</td>
                    <td className="p-3 font-medium text-foreground">{inv.title}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{(inv as any).clients?.name || "—"}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{inv.total_amount.toLocaleString()} FCFA</td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status as InvoiceStatus] || ""}`}>{inv.status}</span></td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(inv)} className="p-1.5 rounded hover:bg-accent transition"><Pencil size={14} className="text-muted-foreground" /></button>
                        <button onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(inv.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition"><Trash2 size={14} className="text-destructive" /></button>
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
