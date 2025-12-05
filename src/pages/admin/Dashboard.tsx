import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Briefcase, FileText, Receipt, TrendingUp, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Stats {
  totalClients: number;
  totalServices: number;
  totalQuotes: number;
  totalInvoices: number;
  pendingQuotes: number;
  unpaidInvoices: number;
  totalRevenue: number;
}

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentClients();
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

  const statCards = [
    { title: 'Clients', value: stats.totalClients, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Services', value: stats.totalServices, icon: Briefcase, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Devis', value: stats.totalQuotes, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Factures', value: stats.totalInvoices, icon: Receipt, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

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
