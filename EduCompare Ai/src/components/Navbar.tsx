import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const navLinks = [
  { label: "School", to: "/search?category=School" },
  { label: "Competitive", to: "/search?category=Competitive" },
  { label: "Govt Jobs", to: "/search?category=Government" },
  { label: "Skills", to: "/search?category=Skills" },
  { label: "Lifestyle", to: "/search?category=Lifestyle" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenu(false);
    }
  };

  const isActive = (to: string) => {
    const params = new URLSearchParams(to.split("?")[1]);
    const currentParams = new URLSearchParams(location.search);
    return location.pathname === "/search" && params.get("category") === currentParams.get("category");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link to="/" className="font-display font-bold text-xl shrink-0">
            <span className="gradient-text">EduCompare</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, platforms, exams..."
                className="w-full bg-secondary/70 rounded-xl pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card transition-all duration-200"
              />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                <Button
                  variant={isActive(link.to) ? "default" : "ghost"}
                  size="sm"
                  className={isActive(link.to) ? "shadow-sm" : ""}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:block font-medium">
                  {user.displayName?.split(" ")[0]}
                </span>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full ring-2 ring-primary/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
                <Button variant="ghost" size="icon" onClick={logout} className="hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => setShowAuth(true)} className="shadow-sm shadow-primary/20">
                Sign In
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg p-4 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full bg-secondary/70 rounded-xl pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </form>
            <div className="flex flex-wrap gap-2">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMobileMenu(false)}>
                  <Button variant={isActive(link.to) ? "default" : "secondary"} size="sm">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
