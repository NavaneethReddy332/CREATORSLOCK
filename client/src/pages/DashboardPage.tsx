import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, Link as LinkIcon, Youtube, Instagram, Upload, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const [connections, setConnections] = useState([
    { id: 1, type: "YouTube", handle: "@creator_one" },
    { id: 2, type: "Instagram", handle: "@visual_feed" }
  ]);

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerate = () => {
    // Mock generation
    setGeneratedLink(`${window.location.origin}/unlock/demo-123`);
  };

  return (
    <Layout>
      <div className="py-12 space-y-20">
        
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-mono font-bold text-red-600 mb-2 uppercase">Command Center</h1>
          <p className="text-red-800 font-mono text-xs uppercase tracking-widest">System Status: Active</p>
        </div>

        {/* CONNECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: CONNECTIONS */}
          <section className="border border-red-900 p-8 relative">
            <div className="absolute top-0 left-0 bg-red-600 text-black text-xs font-bold px-3 py-1 font-mono uppercase">
              Connections
            </div>
            
            <div className="mt-6 space-y-4">
              {connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between border border-red-900/50 p-4 hover:border-red-600 transition-colors">
                  <div className="flex items-center gap-4">
                    {conn.type === "YouTube" && <Youtube size={16} className="text-red-600" />}
                    {conn.type === "Instagram" && <Instagram size={16} className="text-red-600" />}
                    <span className="text-red-500 font-mono text-sm">{conn.handle}</span>
                  </div>
                  <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              ))}

              <button className="w-full border border-dashed border-red-800 py-4 text-red-700 hover:text-red-500 hover:border-red-500 transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase">
                <Plus size={14} /> Add Connection
              </button>
            </div>
          </section>

          {/* RIGHT: CREATE LINK */}
          <section className="border border-red-900 p-8 relative">
             <div className="absolute top-0 left-0 bg-red-600 text-black text-xs font-bold px-3 py-1 font-mono uppercase">
              Generate Link
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-red-600 font-mono uppercase">Target URL / File</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://dropbox.com/file..."
                    className="flex-1 bg-black border border-red-800 p-3 text-red-500 font-mono text-sm focus:outline-none focus:border-red-500"
                  />
                  <button className="bg-red-900/20 border border-red-800 p-3 text-red-500 hover:bg-red-900/40">
                    <Upload size={16} />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                className="w-full bg-red-600 text-black font-bold py-3 text-sm uppercase tracking-widest hover:bg-white transition-colors"
              >
                Generate Unlock Link
              </button>

              {generatedLink && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-950/20 border border-red-600 p-4 overflow-hidden"
                >
                  <p className="text-xs text-red-400 font-mono mb-2 uppercase">Link Generated:</p>
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-red-500 text-sm truncate">{generatedLink}</code>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-red-500 hover:text-white">
                        <ExternalLink size={16} />
                      </a>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
