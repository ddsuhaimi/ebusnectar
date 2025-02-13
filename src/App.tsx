
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import RoutesPage from "./pages/Routes";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => {
  // Determine if we should show navigation based on the current route
  const shouldShowNav = window.location.pathname !== "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen">
            {shouldShowNav ? (
              <div className="flex h-screen overflow-hidden">
                <Navigation />
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/routes" element={<RoutesPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            )}
          </div>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
