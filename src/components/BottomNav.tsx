import { Link, useLocation } from "react-router-dom";
import { Home, Users, ShoppingBag, LayoutDashboard, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const BottomNav = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async (session: any) => {
      setUser(session?.user ?? null);
      
      if (session?.user?.email) {
        const { data } = await supabase
          .from('admin_whitelist')
          .select('id')
          .eq('email', session.user.email)
          .eq('is_active', true)
          .maybeSingle();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      checkAuth(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/refer-and-earn", label: "Refer", icon: Users },
    { path: "/purchase", label: "Purchase", icon: ShoppingBag },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ...(isAdmin ? [{ path: "/admin", label: "Admin", icon: Shield }] : []),
  ];

  // Don't show on auth page
  if (location.pathname === "/auth" || location.pathname === "/reset-password") {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1a] border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                active 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
