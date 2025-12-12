import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <div className="bg-card p-8 rounded-3xl shadow-xl border border-border max-w-md w-full">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/">
          <a className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:brightness-110 transition-colors inline-flex items-center gap-2 w-full justify-center">
            <Home size={18} /> Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
