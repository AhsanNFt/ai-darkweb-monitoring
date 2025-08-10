import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  Activity, 
  Bell, 
  User, 
  Settings, 
  AlertTriangle,
  FileText,
  Users,
  Menu,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const sidebarItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Explorer", url: "/explorer", icon: Search },
  { title: "Graph", url: "/graph", icon: Activity },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background font-cyber">
      {/* Top Header */}
      <header className="h-16 bg-cyber-dark border-b border-cyber-surface flex items-center justify-between px-6 cyber-panel">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-cyber-text hover:text-cyber-cyan hover:bg-cyber-surface"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-cyber-cyan" />
            <h1 className="text-xl font-bold text-cyber-text">DarkSight</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-text-muted" />
            <Input 
              placeholder="Global search..." 
              className="pl-10 bg-cyber-surface border-cyber-surface text-cyber-text placeholder:text-cyber-text-muted focus:border-cyber-cyan focus:ring-cyber-cyan"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-cyber-pulse"></div>
            <span className="text-sm text-cyber-text-dim">Online</span>
          </div>
          
          <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan hover:bg-cyber-surface relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-red rounded-full text-xs flex items-center justify-center text-white">3</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-cyber-text hover:text-cyber-cyan hover:bg-cyber-surface">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-cyber-panel border-cyber-surface">
              <DropdownMenuItem className="text-cyber-text hover:bg-cyber-surface focus:bg-cyber-surface">Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout} className="text-cyber-text hover:bg-cyber-surface focus:bg-cyber-surface">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-60'} h-[calc(100vh-4rem)] bg-cyber-dark cyber-transition`}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg cyber-transition ${
                    isActive
                      ? 'bg-cyber-cyan text-cyber-black cyber-glow'
                      : 'text-cyber-text hover:bg-cyber-surface hover:text-cyber-cyan'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}