import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <div className="bg-black p-8 rounded-3xl shadow-xl border border-gray-800 max-w-md w-full">
        <div className="w-16 h-16 bg-gray-900 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
          <AlertCircle className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/">
          <a className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors inline-flex items-center gap-2 w-full justify-center">
            <Home size={18} /> Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
