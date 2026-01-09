import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Menu, X, Shield } from "lucide-react";
import logoLight from "@/assets/u-topia-logo-light.png";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndAdmin = async (session: any) => {
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
      checkAuthAndAdmin(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuthAndAdmin(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/refer-and-earn", label: "Refer & Earn" },
    { path: "/purchase", label: "Purchase" },
    { path: "/dashboard", label: "Dashboard" },
    ...(isAdmin ? [{ path: "/admin", label: "Admin", isAdmin: true }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1a] border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
          </Link>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? "text-white font-medium" : "text-gray-400 hover:text-white transition-colors"}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Auth Button - Right */}
          <div className="hidden md:flex items-center flex-shrink-0">
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut} 
                className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Join Now
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive(link.path) ? "text-white font-medium" : "text-gray-400 hover:text-white transition-colors"}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2 w-fit">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" size="sm">
                    Join Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
