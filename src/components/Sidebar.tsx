import { Home, Clock, Users, MessageCircle, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Logout from "@/components/accounts/Logout"; // Import the Logout component

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem = "home" }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/patient" },
    { id: "progress", label: "Progress", icon: Clock, path: "/patient/progress" },
    { id: "avatars", label: "Avatars", icon: Users, path: "/patient/avatars" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/patient/messages" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-card shadow-md hover:bg-muted transition"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-24
          bg-card
          flex flex-col items-center
          pt-20 pb-6
          rounded-r-3xl
          shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="ReMotion logo" className="w-12 h-12 object-contain" />
          <span className="mt-2 text-base font-bold tracking-wide text-foreground font-[Hammersmith One]">
            ReMotion
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-3 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div key={item.id} className="relative group">
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    w-14 h-14
                    rounded-2xl
                    flex items-center justify-center
                    transition-all duration-200
                    ${isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                  `}
                >
                  <Icon className="w-6 h-6" />
                </Link>
                {/* Tooltip */}
                <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-lg shadow-md transition-opacity duration-200">
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Logout Button (Bottom of Sidebar) */}
        <div className="mt-auto pb-4">
          <div className="relative group">
            <button
              onClick={() => {
                setLogoutModalOpen(true);
                setOpen(false); // Close sidebar when clicking logout
              }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-6 h-6" />
            </button>
            {/* Tooltip */}
            <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap bg-destructive text-destructive-foreground text-sm font-medium px-3 py-1.5 rounded-lg shadow-md transition-opacity duration-200">
              Logout
            </span>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Logout modal={logoutModalOpen} setModal={setLogoutModalOpen} />
    </>
  );
};

export default Sidebar;