import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileText,
  Dumbbell // Imported new icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logout from "@/components/accounts/Logout";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Updated Navigation Items
const navItems = [
  { icon: Users, label: "Patients", path: "patients" },
  { icon: Dumbbell, label: "Exercise Plans", path: "exercise-plans" }, // New Item
  { icon: FileText, label: "Reports", path: "reports" },
  { icon: BarChart3, label: "Analytics", path: "analytics" },
  { icon: Settings, label: "Settings", path: "settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background flex w-full">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-64" : "w-20",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              {sidebarOpen && (
                <span className="font-bold text-xl text-sidebar-foreground animate-fade-in">
                  ReMotion
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(`/therapist/${item.path}`);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    !sidebarOpen && "mx-auto"
                  )} />
                  {sidebarOpen && (
                    <span className="font-medium animate-fade-in">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer - Logout Button */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={() => setLogoutModalOpen(true)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200",
                "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              )}
            >
              <LogOut className={cn("w-5 h-5", !sidebarOpen && "mx-auto")} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden sm:block">
                <h2 className="text-sm text-muted-foreground">Physiotherapist Dashboard</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Dr. Kapil Sharma</p>
                <p className="text-xs text-muted-foreground">Physiotherapist</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">SM</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Logout modal={logoutModalOpen} setModal={setLogoutModalOpen} />
    </>
  );
}