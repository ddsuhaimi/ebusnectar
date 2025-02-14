
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Bus, 
  MapPin, 
  UserCircle, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const mainMenuItems = [
    { name: "Dasbor", icon: LayoutDashboard, path: "/" },
    { name: "Pemesanan", icon: CalendarDays, path: "/bookings" },
  ];

  const backOfficeItems = [
    { name: "Armada", icon: Bus, path: "/fleet" },
    { name: "Rute", icon: MapPin, path: "/routes" },
    { name: "Profil", icon: UserCircle, path: "/profile" },
    { name: "Pengaturan", icon: Settings, path: "/settings" },
  ];

  const NavItem = ({ item }: { item: { name: string; icon: any; path: string } }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-x-3 px-3 py-2 text-sm rounded-lg transition-colors",
          isActive 
            ? "bg-accent text-accent-foreground" 
            : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className={cn(!isOpen && "hidden")}>{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button - Now in top right */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-background rounded-lg shadow-lg hover:bg-accent/10 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
      
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={cn(
        "fixed md:relative z-40 h-full bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        isMobile ? (
          isOpen ? "translate-x-0" : "-translate-x-full"
        ) : "translate-x-0",
        "border-r flex flex-col"
      )}>
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-accent">
            {isOpen ? "EBusID" : "E"}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-2 space-y-6">
          {/* Main Menu */}
          <div>
            <h2 className="mb-2 px-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Menu Utama
            </h2>
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Back Office */}
          <div>
            <h2 className="mb-2 px-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Kantor
            </h2>
            <div className="space-y-1">
              {backOfficeItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t p-3">
          <button className="flex w-full items-center gap-x-3 px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-accent/10 hover:text-accent transition-colors">
            <LogOut className="h-4 w-4" />
            {isOpen && <span>Keluar</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
