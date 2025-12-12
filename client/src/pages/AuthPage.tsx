import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-card border border-border/50 overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">YouRise</span>
              </Link>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isLogin ? "Welcome Back!" : "Create Your Account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Sign in to access your dashboard" 
                  : "Start growing your audience today"}
              </p>
            </div>

            <div className="flex bg-secondary rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-tab-signup"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-tab-login"
              >
                Log In
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      data-testid="input-name"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    autoFocus
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    data-testid="input-password"
                  />
                </div>
                {!isLogin && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full gradient-primary text-white py-4 rounded-xl font-semibold shadow-glow flex items-center justify-center gap-2 group"
                data-testid="button-submit-auth"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            {!isLogin && (
              <p className="mt-6 text-center text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            )}
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
            data-testid="button-toggle-auth-mode"
          >
            {isLogin ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
