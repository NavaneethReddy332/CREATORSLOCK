import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-mesh flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <nav className="glass-dark rounded-2xl shadow-soft px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">YouRise</span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    location === item.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <Link href="/auth" data-testid="button-get-started">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gradient-primary text-white px-5 py-2 rounded-full text-sm font-medium shadow-glow transition-shadow hover:shadow-lg"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-40 glass-dark rounded-2xl shadow-card p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    location === item.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full gradient-primary text-white px-4 py-3 rounded-xl text-base font-medium mt-2 block text-center"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="border-t border-border bg-white/50 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">YouRise</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Grow your audience, one unlock at a time.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} YouRise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
