import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Briefcase, FileText, Receipt, TrendingUp, Clock, PieChart } from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

interface Stats {
  totalClients: number;
  totalServices: number;
  totalQuotes: number;
  totalInvoices: number;
  pendingQuotes: number;
  unpaidInvoices: number;
  totalRevenue: number;
}

interface RevenueData {
  month: string;
  revenue: number;
}

interface ServiceDistribution {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalServices: 0,
    totalQuotes: 0,
    totalInvoices: 0,
    pendingQuotes: 0,
    unpaidInvoices: 0,
    totalRevenue: 0,
  });
  const [recentClients, setRecentClients] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [serviceDistribution, setServiceDistribution] = useState<ServiceDistribution[]>([]);
  const [invoicesByStatus, setInvoicesByStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentClients();
    fetchRevenueEvolution();
    fetchServiceDistribution();
    fetchInvoicesByStatus();
  }, []);

  const fetchStats = async () => {
    try {
      const [clients, services, quotes, invoices] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('quotes').select('id, status', { count: 'exact' }),
        supabase.from('invoices').select('id, status, total_amount', { count: 'exact' }),
      ]);

      const pendingQuotes = quotes.data?.filter(q => q.status === 'draft' || q.status === 'pending').length || 0;
      const unpaidInvoices = invoices.data?.filter(i => i.status !== 'paid').length || 0;
      const totalRevenue = invoices.data?.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0;

      setStats({
        totalClients: clients.count || 0,
        totalServices: services.count || 0,
        totalQuotes: quotes.count || 0,
        totalInvoices: invoices.count || 0,
        pendingQuotes,
        unpaidInvoices,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentClients(data || []);
  };

  const fetchRevenueEvolution = async () => {
    const { data: invoices } = await supabase
      .from('invoices')
      .select('total_amount, created_at, status')
      .eq('status', 'paid');

    // Generate last 6 months
    const months: RevenueData[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      
      const monthRevenue = invoices?.filter(inv => {
        const invDate = new Date(inv.created_at);
        return invDate >= monthStart && invDate <= monthEnd;
      }).reduce((sum, inv) => sum + (inv.total_amount || 0), 0) || 0;

      months.push({
        month: format(date, 'MMM yyyy', { locale: fr }),
        revenue: monthRevenue,
      });
    }

    setRevenueData(months);
  };

  const fetchServiceDistribution = async () => {
    const { data: clientServices } = await supabase
      .from('client_services')
      .select('service_id, custom_price, services(name, price)');

    const serviceMap = new Map<string, { name: string; total: number }>();

    clientServices?.forEach((cs: any) => {
      const serviceName = cs.services?.name || 'Inconnu';
      const price = cs.custom_price || cs.services?.price || 0;
      
      if (serviceMap.has(serviceName)) {
        const current = serviceMap.get(serviceName)!;
        serviceMap.set(serviceName, { name: serviceName, total: current.total + Number(price) });
      } else {
        serviceMap.set(serviceName, { name: serviceName, total: Number(price) });
      }
    });

    const distribution: ServiceDistribution[] = Array.from(serviceMap.values())
      .map((service, index) => ({
        name: service.name,
        value: service.total,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    setServiceDistribution(distribution);
  };

  const fetchInvoicesByStatus = async () => {
    const { data: invoices } = await supabase
      .from('invoices')
      .select('status, total_amount');

    const statusMap = new Map<string, number>();
    const statusLabels: Record<string, string> = {
      draft: 'Brouillon',
      sent: 'Envoyée',
      paid: 'Payée',
      overdue: 'En retard',
      cancelled: 'Annulée',
    };

    invoices?.forEach(inv => {
      const status = inv.status || 'draft';
      const current = statusMap.get(status) || 0;
      statusMap.set(status, current + (inv.total_amount || 0));
    });

    const statusData = Array.from(statusMap.entries()).map(([status, amount]) => ({
      status: statusLabels[status] || status,
      montant: amount,
    }));

    setInvoicesByStatus(statusData);
  };

  const statCards = [
    { title: 'Clients', value: stats.totalClients, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Services', value: stats.totalServices, icon: Briefcase, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Devis', value: stats.totalQuotes, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Factures', value: stats.totalInvoices, icon: Receipt, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            {payload[0].value.toLocaleString('fr-FR')} €
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="card-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Devis en attente</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-500/10">
                <Receipt className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Factures impayées</p>
                <p className="text-2xl font-bold text-foreground">{stats.unpaidInvoices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalRevenue.toLocaleString('fr-FR')} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Evolution Chart */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Évolution du chiffre d'affaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Aucune donnée de revenus disponible
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Distribution Chart */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Répartition par service
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serviceDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Montant']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Aucun service associé aux clients
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoices by Status Chart */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Factures par statut
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoicesByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={invoicesByStatus} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                />
                <YAxis 
                  type="category"
                  dataKey="status"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Montant']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="montant" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              Aucune facture disponible
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Clients */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Clients récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentClients.length > 0 ? (
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(client.created_at), 'dd MMM yyyy', { locale: fr })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Aucun client pour le moment</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
