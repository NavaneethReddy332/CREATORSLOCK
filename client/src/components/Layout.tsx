import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2">
        <div className="max-w-5xl mx-auto">
          <nav className="bg-card border border-border rounded px-3 py-2 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5" data-testid="link-home">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">YouRise</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                    location === item.path 
                      ? "bg-secondary text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="w-px h-4 bg-border mx-1.5" />
              <Link href="/auth" data-testid="button-get-started">
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">
                  Get Started
                </button>
              </Link>
            </div>

            <button
              className="md:hidden p-1.5 rounded hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed top-12 left-3 right-3 z-40 bg-card border border-border rounded p-2 md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-2.5 py-1.5 rounded text-xs font-medium",
                  location === item.path 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/auth" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground px-2.5 py-1.5 rounded text-xs font-medium mt-1 text-center"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-1 pt-14">
        {children}
      </main>

      <footer className="border-t border-border py-4 px-3">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
              <Sparkles size={10} className="text-white" />
            </div>
            <span className="text-xs font-medium text-foreground">YouRise</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Grow your audience, one unlock at a time.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} YouRise
          </p>
        </div>
      </footer>
    </div>
  );
}
