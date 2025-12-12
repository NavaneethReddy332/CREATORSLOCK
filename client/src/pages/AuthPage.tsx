import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth - redirect to dashboard
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-main font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] border border-border-main bg-bg-main relative">
        {/* CORNER MARKERS */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-accent-main"></div>
        <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-accent-main"></div>
        <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-accent-main"></div>
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-accent-main"></div>

        {/* HEADER */}
        <div className="p-4 border-b border-border-main flex justify-between items-center bg-border-dim">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-accent-main" />
            <span className="text-[10px] text-fg-primary uppercase tracking-widest">
              {isLogin ? "SYSTEM.LOGIN" : "NEW.IDENTITY"}
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-accent-main animate-pulse"></div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-fg-primary uppercase tracking-tight">
              {isLogin ? "Welcome Back" : "Initialize Account"}
            </h1>
            <p className="text-[10px] text-fg-secondary leading-relaxed">
              {isLogin 
                ? "Enter credentials to access command interface." 
                : "Create a secure identity to begin sequence."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] text-fg-muted uppercase tracking-widest">Username / ID</label>
              <input 
                type="text" 
                className="w-full bg-bg-main border border-border-main p-3 text-fg-primary focus:border-accent-main focus:outline-none transition-colors"
                autoFocus
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] text-fg-muted uppercase tracking-widest">Passkey</label>
              <input 
                type="password" 
                className="w-full bg-bg-main border border-border-main p-3 text-fg-primary focus:border-accent-main focus:outline-none transition-colors"
              />
            </div>

            <button className="w-full bg-accent-main text-fg-primary py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-accent-main/80 transition-colors flex items-center justify-center gap-2 group">
              {isLogin ? "Access System" : "Create Identity"}
              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4 border-t border-border-main text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] text-fg-muted hover:text-accent-main uppercase tracking-widest transition-colors"
            >
              {isLogin ? ">> Initialize New Identity" : ">> Access Existing System"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
