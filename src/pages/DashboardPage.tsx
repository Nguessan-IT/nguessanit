import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Briefcase, FileText, Receipt } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function KpiCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-md ${color}`}>
          <Icon size={20} className="text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-display font-bold text-card-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: clients } = useQuery({
    queryKey: ["clients-count"],
    queryFn: async () => {
      const { count } = await supabase.from("clients").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services-count"],
    queryFn: async () => {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: quotes } = useQuery({
    queryKey: ["quotes-count"],
    queryFn: async () => {
      const { count } = await supabase.from("quotes").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ["invoices-stats"],
    queryFn: async () => {
      const { data } = await supabase.from("invoices").select("total_amount, status");
      const total = data?.reduce((sum, i) => sum + (i.total_amount || 0), 0) ?? 0;
      const paid = data?.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total_amount || 0), 0) ?? 0;
      return { count: data?.length ?? 0, total, paid };
    },
  });

  const chartData = [
    { name: "Clients", value: clients ?? 0 },
    { name: "Services", value: services ?? 0 },
    { name: "Devis", value: quotes ?? 0 },
    { name: "Factures", value: invoices?.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard icon={Users} label="Clients" value={clients ?? 0} color="bg-primary" />
        <KpiCard icon={Briefcase} label="Services" value={services ?? 0} color="bg-primary" />
        <KpiCard icon={FileText} label="Devis" value={quotes ?? 0} color="bg-primary" />
        <KpiCard icon={Receipt} label="Revenu total" value={`${(invoices?.total ?? 0).toLocaleString()} FCFA`} color="bg-primary" />
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Aperçu général</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(220, 72%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
