import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalClients: number;
  totalRevenue: number;
  activeQuotes: number;
  pendingInteractions: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalRevenue: 0,
    activeQuotes: 0,
    pendingInteractions: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total clients
      const { count: clientsCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Fetch total revenue from paid invoices
      const { data: invoices } = await supabase
        .from('invoices')
        .select('total_amount')
        .eq('status', 'paid');

      const totalRevenue = invoices?.reduce((sum, invoice) => sum + Number(invoice.total_amount), 0) || 0;

      // Fetch active quotes
      const { count: quotesCount } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .in('status', ['draft', 'sent']);

      // Fetch pending interactions
      const { count: interactionsCount } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalClients: clientsCount || 0,
        totalRevenue: totalRevenue,
        activeQuotes: quotesCount || 0,
        pendingInteractions: interactionsCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques du tableau de bord",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-1"></div>
                <div className="h-3 bg-muted rounded w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord ERP</h1>
        <p className="text-muted-foreground">Aperçu de votre activité commerciale</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">Clients enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Factures payées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis Actifs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeQuotes}</div>
            <p className="text-xs text-muted-foreground">En attente de réponse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInteractions}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Dernières actions dans l'ERP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau client ajouté</p>
                  <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Facture générée</p>
                  <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Interaction client complétée</p>
                  <p className="text-xs text-muted-foreground">Il y a 6 heures</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Raccourcis vers les tâches courantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Ajouter un nouveau client</div>
                <div className="text-sm text-muted-foreground">Enregistrer un nouveau prospect</div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Créer un devis</div>
                <div className="text-sm text-muted-foreground">Générer une proposition commerciale</div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium">Planifier une interaction</div>
                <div className="text-sm text-muted-foreground">Programmer un suivi client</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;