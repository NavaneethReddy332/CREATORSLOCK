import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "INDEX", path: "/" },
    { label: "DASH", path: "/dashboard" },
    { label: "INFO", path: "/#about" },
    { label: "COMM", path: "/#contact" },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-fg-secondary font-mono flex flex-col selection:bg-accent-main selection:text-fg-primary">
      {/* HEADER - Compact & Technical */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main border-b border-border-main h-10 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="text-[10px] font-bold tracking-widest text-accent-main uppercase hover:text-fg-primary transition-colors">
              YOU RISE
            </a>
          </Link>
          <div className="h-3 w-px bg-border-main"></div>
          <span className="text-[9px] text-fg-muted">SYS.VER.2.0</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "text-[10px] tracking-widest hover:text-fg-primary transition-colors",
                  location === item.path ? "text-fg-primary border-b border-accent-main" : "text-fg-secondary"
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
          <div className="h-3 w-px bg-border-main mx-2"></div>
          <Link href="/dashboard">
            <a className="text-[10px] text-accent-main hover:text-fg-primary uppercase tracking-widest">
              [INITIATE]
            </a>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-fg-secondary hover:text-fg-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-10 left-0 right-0 z-40 bg-bg-main border-b border-border-main px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[10px] text-fg-secondary py-2 border-b border-border-dim hover:text-fg-primary tracking-widest"
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT - Grid Background */}
      <main className="flex-1 pt-10 w-full min-h-screen">
        {children}
      </main>

      {/* FOOTER - Minimal Technical Footer */}
      <footer className="border-t border-border-main bg-bg-main py-4 px-4 flex justify-between items-center text-[9px] uppercase tracking-wider text-fg-muted">
        <div>
           YOU RISE SYSTEM © {new Date().getFullYear()}
        </div>
        <div className="flex gap-4">
          <span>STATUS: ONLINE</span>
          <span>LATENCY: 12ms</span>
        </div>
      </footer>
    </div>
  );
}
