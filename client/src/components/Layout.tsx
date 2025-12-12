import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const navItems = user 
    ? [
        { label: "Home", path: "/" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "Account", path: "/account" },
      ]
    : [
        { label: "Home", path: "/" },
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2">
        <div className="max-w-5xl mx-auto">
          <nav className="bg-card border border-border rounded px-3 py-2 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5" data-testid="link-home">
              <motion.div 
                className="w-5 h-5 rounded bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Sparkles size={12} className="text-white" />
              </motion.div>
              <span className="text-sm font-medium text-foreground">YouRise</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <Link 
                    href={item.path}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-medium transition-colors duration-200",
                      location === item.path 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="w-px h-4 bg-border mx-1.5" />
              {!loading && (
                user ? (
                  <motion.button 
                    onClick={logout}
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    data-testid="button-logout"
                  >
                    <LogOut size={12} />
                    Logout
                  </motion.button>
                ) : (
                  <Link href="/auth" data-testid="button-get-started">
                    <motion.button 
                      className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                )
              )}
            </div>

            <motion.button
              className="md:hidden p-1.5 rounded hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed top-12 left-3 right-3 z-40 bg-card border border-border rounded p-2 md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut", delay: index * 0.03 }}
                >
                  <Link 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-2.5 py-1.5 rounded text-xs font-medium transition-colors duration-200",
                      location === item.path 
                        ? "bg-secondary text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <motion.button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="px-2.5 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 text-left transition-colors duration-200"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut", delay: navItems.length * 0.03 }}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut", delay: navItems.length * 0.03 }}
                >
                  <Link 
                    href="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block bg-primary text-primary-foreground px-2.5 py-1.5 rounded text-xs font-medium mt-1 text-center"
                  >
                    Get Started
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
