import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Sparkles, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="p-5">
            <div className="text-center mb-5">
              <Link href="/" className="inline-flex items-center gap-1.5 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">YouRise</span>
              </Link>
              <h1 className="text-base font-medium text-foreground mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isLogin 
                  ? "Sign in to access your dashboard" 
                  : "Start growing your audience today"}
              </p>
            </div>

            <div className="flex bg-secondary rounded p-0.5 mb-4">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                  !isLogin 
                    ? 'bg-card text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-tab-signup"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                  isLogin 
                    ? 'bg-card text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="button-tab-login"
              >
                Log In
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      data-testid="input-name"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    data-testid="input-password"
                  />
                </div>
                {!isLogin && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Min 8 characters
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5"
                data-testid="button-submit-auth"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={14} />
              </button>
            </form>

            {!isLogin && (
              <p className="mt-4 text-center text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy</a>
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
            data-testid="button-toggle-auth-mode"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
