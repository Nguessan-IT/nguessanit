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
import { Plus, Pencil, Trash2, Search, MessageSquare, Mail, Phone, Calendar, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Database } from '@/integrations/supabase/types';

type InteractionType = Database['public']['Enums']['interaction_type'];
type InteractionStatus = Database['public']['Enums']['interaction_status'];

interface Interaction {
  id: string;
  subject: string;
  description: string | null;
  type: InteractionType;
  status: InteractionStatus | null;
  client_id: string;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
  clients?: { name: string };
}

interface Client {
  id: string;
  name: string;
}

export default function Interactions() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    type: 'email' as InteractionType,
    status: 'pending' as InteractionStatus,
    client_id: '',
    scheduled_at: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchInteractions();
    fetchClients();
  }, []);

  const fetchInteractions = async () => {
    const { data, error } = await supabase
      .from('interactions')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      setInteractions(data || []);
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, name').order('name');
    setClients(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const interactionData = {
      subject: formData.subject,
      description: formData.description || null,
      type: formData.type,
      status: formData.status,
      client_id: formData.client_id,
      scheduled_at: formData.scheduled_at || null,
      created_by: user?.id,
    };

    if (editingInteraction) {
      const { error } = await supabase
        .from('interactions')
        .update(interactionData)
        .eq('id', editingInteraction.id);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Interaction modifiée avec succès' });
        fetchInteractions();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('interactions').insert(interactionData);

      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Interaction créée avec succès' });
        fetchInteractions();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette interaction ?')) return;

    const { error } = await supabase.from('interactions').delete().eq('id', id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Interaction supprimée avec succès' });
      fetchInteractions();
    }
  };

  const handleEdit = (interaction: Interaction) => {
    setEditingInteraction(interaction);
    setFormData({
      subject: interaction.subject,
      description: interaction.description || '',
      type: interaction.type,
      status: interaction.status || 'pending',
      client_id: interaction.client_id,
      scheduled_at: interaction.scheduled_at ? interaction.scheduled_at.slice(0, 16) : '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      description: '',
      type: 'email',
      status: 'pending',
      client_id: '',
      scheduled_at: '',
    });
    setEditingInteraction(null);
    setIsDialogOpen(false);
  };

  const filteredInteractions = interactions.filter(interaction =>
    interaction.subject.toLowerCase().includes(search.toLowerCase())
  );

  const typeIcons: Record<InteractionType, React.ReactNode> = {
    email: <Mail className="w-4 h-4" />,
    call: <Phone className="w-4 h-4" />,
    meeting: <Calendar className="w-4 h-4" />,
    ticket: <Ticket className="w-4 h-4" />,
  };

  const typeLabels: Record<InteractionType, string> = {
    email: 'Email',
    call: 'Appel',
    meeting: 'Réunion',
    ticket: 'Ticket',
  };

  const statusLabels: Record<InteractionStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'En attente', variant: 'outline' },
    in_progress: { label: 'En cours', variant: 'secondary' },
    completed: { label: 'Terminé', variant: 'default' },
    cancelled: { label: 'Annulé', variant: 'destructive' },
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
          <h1 className="text-3xl font-bold text-foreground">Interactions</h1>
          <p className="text-muted-foreground">Suivez vos communications clients</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle interaction
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingInteraction ? 'Modifier l\'interaction' : 'Nouvelle interaction'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as InteractionType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Appel</SelectItem>
                      <SelectItem value="meeting">Réunion</SelectItem>
                      <SelectItem value="ticket">Ticket</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as InteractionStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduled_at">Planifié le</Label>
                  <Input
                    id="scheduled_at"
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingInteraction ? 'Modifier' : 'Créer'}
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
          {filteredInteractions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Planifié</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInteractions.map((interaction) => (
                  <TableRow key={interaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {typeIcons[interaction.type]}
                        <span>{typeLabels[interaction.type]}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{interaction.subject}</TableCell>
                    <TableCell>{interaction.clients?.name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[interaction.status || 'pending'].variant}>
                        {statusLabels[interaction.status || 'pending'].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interaction.scheduled_at
                        ? format(new Date(interaction.scheduled_at), 'dd/MM/yyyy HH:mm', { locale: fr })
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(interaction.created_at), 'dd/MM/yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(interaction)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(interaction.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune interaction trouvée</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
