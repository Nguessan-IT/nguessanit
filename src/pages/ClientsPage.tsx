import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export default function ClientsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company_size: "", industry: "", address: "", contact_person: "", notes: "" });

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      let query = supabase.from("clients").select("*").order("created_at", { ascending: false });
      if (search) query = query.ilike("name", `%${search}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("clients").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("clients").insert({ ...form, created_by: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Client modifié" : "Client ajouté");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Client supprimé");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", company_size: "", industry: "", address: "", contact_person: "", notes: "" });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (client: any) => {
    setForm({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company_size: client.company_size || "",
      industry: client.industry || "",
      address: client.address || "",
      contact_person: client.contact_person || "",
      notes: client.notes || "",
    });
    setEditing(client);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Clients</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="mb-4 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            {editing ? "Modifier le client" : "Nouveau client"}
          </h2>
          <form
            onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { key: "name", label: "Nom *", required: true },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Téléphone" },
              { key: "contact_person", label: "Personne de contact" },
              { key: "company_size", label: "Taille entreprise" },
              { key: "industry", label: "Secteur" },
              { key: "address", label: "Adresse" },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
                <input
                  type={type || "text"}
                  value={(form as any)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required={required}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saveMutation.isPending} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
                {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button type="button" onClick={resetForm} className="px-4 py-2 border border-border rounded-md text-sm text-foreground hover:bg-accent transition">
                Annuler
              </button>
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
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Téléphone</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Secteur</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Chargement...</td></tr>
              ) : clients.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Aucun client trouvé</td></tr>
              ) : (
                clients.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition">
                    <td className="p-3 font-medium text-foreground">{c.name}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{c.email || "—"}</td>
                    <td className="p-3 text-muted-foreground hidden lg:table-cell">{c.phone || "—"}</td>
                    <td className="p-3 text-muted-foreground hidden lg:table-cell">{c.industry || "—"}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(c)} className="p-1.5 rounded hover:bg-accent transition" title="Modifier">
                          <Pencil size={14} className="text-muted-foreground" />
                        </button>
                        <button onClick={() => { if (confirm("Supprimer ce client ?")) deleteMutation.mutate(c.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition" title="Supprimer">
                          <Trash2 size={14} className="text-destructive" />
                        </button>
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
