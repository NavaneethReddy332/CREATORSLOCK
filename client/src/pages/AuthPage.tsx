import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe"
                      className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      data-testid="input-username"
                      required={!isLogin}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                    data-testid="input-email"
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-3 py-2 rounded border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    data-testid="input-password"
                    required
                  />
                </div>
                {!isLogin && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Min 8 characters
                  </p>
                )}
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 disabled:opacity-50"
                data-testid="button-submit-auth"
              >
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                {!loading && <ArrowRight size={14} />}
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
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
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
