import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Search, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Database } from '@/integrations/supabase/types';

type InvoiceStatus = Database['public']['Enums']['invoice_status'];

interface Invoice {
  id: string;
  invoice_number: string;
  title: string;
  description: string | null;
  client_id: string;
  total_amount: number;
  status: InvoiceStatus | null;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  clients?: { name: string };
}

interface Client {
  id: string;
  name: string;
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState({
    invoice_number: '',
    title: '',
    description: '',
    client_id: '',
    total_amount: '',
    status: 'draft' as InvoiceStatus,
    due_date: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, name').order('name');
    setClients(data || []);
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FAC-${year}${month}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      invoice_number: formData.invoice_number || generateInvoiceNumber(),
      title: formData.title,
      description: formData.description || null,
      client_id: formData.client_id,
      total_amount: parseFloat(formData.total_amount) || 0,
      status: formData.status,
      due_date: formData.due_date || null,
      created_by: user?.id,
    };

    if (editingInvoice) {
      const { error } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', editingInvoice.id);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Facture modifiée avec succès' });
        fetchInvoices();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('invoices').insert(invoiceData);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Facture créée avec succès' });
        fetchInvoices();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) return;

    const { error } = await supabase.from('invoices').delete().eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Facture supprimée avec succès' });
      fetchInvoices();
    }
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoice_number: invoice.invoice_number,
      title: invoice.title,
      description: invoice.description || '',
      client_id: invoice.client_id,
      total_amount: invoice.total_amount.toString(),
      status: invoice.status || 'draft',
      due_date: invoice.due_date || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      invoice_number: '',
      title: '',
      description: '',
      client_id: '',
      total_amount: '',
      status: 'draft',
      due_date: '',
    });
    setEditingInvoice(null);
    setIsDialogOpen(false);
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.title.toLowerCase().includes(search.toLowerCase()) ||
    invoice.invoice_number.toLowerCase().includes(search.toLowerCase())
  );

  const statusLabels: Record<InvoiceStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    draft: { label: 'Brouillon', variant: 'secondary' },
    sent: { label: 'Envoyée', variant: 'outline' },
    paid: { label: 'Payée', variant: 'default' },
    overdue: { label: 'En retard', variant: 'destructive' },
    cancelled: { label: 'Annulée', variant: 'secondary' },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Factures</h1>
          <p className="text-muted-foreground">Gérez votre facturation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingInvoice ? 'Modifier la facture' : 'Nouvelle facture'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice_number">Numéro</Label>
                  <Input
                    id="invoice_number"
                    value={formData.invoice_number}
                    onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                    placeholder="Auto-généré"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_id">Client *</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_amount">Montant (€) *</Label>
                  <Input
                    id="total_amount"
                    type="number"
                    step="0.01"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as InvoiceStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="sent">Envoyée</SelectItem>
                      <SelectItem value="paid">Payée</SelectItem>
                      <SelectItem value="overdue">En retard</SelectItem>
                      <SelectItem value="cancelled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Date d'échéance</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingInvoice ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">{invoice.invoice_number}</TableCell>
                    <TableCell className="font-medium">{invoice.title}</TableCell>
                    <TableCell>{invoice.clients?.name || '-'}</TableCell>
                    <TableCell>{invoice.total_amount.toLocaleString('fr-FR')} €</TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[invoice.status || 'draft'].variant}>
                        {statusLabels[invoice.status || 'draft'].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {invoice.due_date
                        ? format(new Date(invoice.due_date), 'dd/MM/yyyy', { locale: fr })
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(invoice)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(invoice.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune facture trouvée</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
