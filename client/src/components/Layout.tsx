import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 h-16 flex items-center justify-between px-6 md:px-12 transition-all">
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity text-white">
            <div className="bg-blue-600 text-white p-1 rounded-md">
              <Lock size={16} strokeWidth={3} />
            </div>
            <span>CreatorLock</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  location === item.path ? "text-blue-500 font-semibold" : "text-gray-400"
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
          <Link href="/dashboard">
            <a className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all">
              Get Started
            </a>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden border-b border-gray-800"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-white py-3 border-b border-gray-800"
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <Link href="/dashboard">
                <a onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium mt-4">
                  Get Started
                </a>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-16 w-full max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-12 mt-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white">
             <div className="bg-white text-black p-1 rounded-md">
              <Lock size={14} strokeWidth={3} />
            </div>
            <span className="text-sm">CreatorLock</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Creator Lock.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
