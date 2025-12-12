import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/#about" },
    { label: "Contact", path: "/#contact" },
  ];

  return (
    <div className="min-h-screen bg-black text-red-600 font-sans selection:bg-red-600 selection:text-black flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-600 h-16 flex items-center justify-between px-6 md:px-12">
        <Link href="/">
          <a className="font-mono text-xl font-bold tracking-tighter hover:text-red-500 transition-colors cursor-pointer data-[active]:text-red-500">
            CREATOR_LOCK
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "text-sm font-medium tracking-wide uppercase hover:underline underline-offset-4 decoration-1",
                  location === item.path ? "text-red-500 font-bold" : "text-red-700 hover:text-red-500"
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-red-600 hover:text-red-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-mono border-b border-red-900 pb-2 text-red-600 hover:text-red-400 hover:pl-2 transition-all"
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* MAIN CONTENT */}
      <main className="flex-1 pt-16 w-full max-w-[1440px] mx-auto px-4 md:px-8 text-[#ffffff]">
        {children}
      </main>
      {/* FOOTER */}
      <footer className="border-t border-red-600 py-8 mt-20 bg-black text-center">
        <p className="text-xs text-red-800 font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} Creator Lock. Strict Simplicity.
        </p>
      </footer>
    </div>
  );
}
