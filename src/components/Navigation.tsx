
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Bus, 
  MapPin, 
  UserCircle, 
  Settings, 
  LogOut 
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const mainMenuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Bookings", icon: CalendarDays, path: "/bookings" },
  ];

  const backOfficeItems = [
    { name: "Fleet", icon: Bus, path: "/fleet" },
    { name: "Routes", icon: MapPin, path: "/routes" },
    { name: "Profile", icon: UserCircle, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" },
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
        {item.name}
      </Link>
    );
  };

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold text-accent">
          EBusID
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-2 space-y-6">
        {/* Main Menu */}
        <div>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* Back Office */}
        <div>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Back Office
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
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;
