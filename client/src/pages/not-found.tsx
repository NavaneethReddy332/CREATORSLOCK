import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-red-600 font-mono p-4 text-center">
      <AlertTriangle className="h-16 w-16 mb-6 text-red-600 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">404 // Access Void</h1>
      <p className="text-red-800 text-sm mb-8 uppercase tracking-widest max-w-md">
        The requested sector does not exist within the system parameters.
      </p>
      
      <Link href="/">
        <a className="border border-red-600 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-red-600 hover:text-black transition-colors">
          Return to Base
        </a>
      </Link>
    </div>
  );
}
