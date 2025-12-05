import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Receipt,
  LogOut,
  Settings,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Tableau de bord', url: '/admin', icon: LayoutDashboard },
  { title: 'Clients', url: '/admin/clients', icon: Users },
  { title: 'Services', url: '/admin/services', icon: Briefcase },
  { title: 'Devis', url: '/admin/quotes', icon: FileText },
  { title: 'Factures', url: '/admin/invoices', icon: Receipt },
  { title: 'Interactions', url: '/admin/interactions', icon: MessageSquare },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/4f2a1c12-fb89-40b3-a468-dccf8db5850a.png" 
            alt="Nguessan-IT Logo" 
            className="w-10 h-10 object-contain rounded-lg"
          />
          <div>
            <h2 className="font-bold text-sidebar-foreground">Nguessan-IT</h2>
            <p className="text-xs text-muted-foreground">ERP / CRM</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-sidebar-accent text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to="/">
              <Settings className="w-4 h-4 mr-1" />
              Site
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-1" />
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
