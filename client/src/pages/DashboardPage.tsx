import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, Youtube, Instagram, Upload, ExternalLink, Link2, Settings, Trash2, Database, Network } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const [connections, setConnections] = useState([
    { id: 1, type: "YouTube", handle: "USR-8842", active: true },
    { id: 2, type: "Instagram", handle: "USR-9921", active: true }
  ]);

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerate = () => {
    setGeneratedLink(`${window.location.origin}/unlock/demo-123`);
  };

  return (
    <Layout>
      <div className="max-w-[1000px] mx-auto p-4 md:p-8 space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-blue-600 animate-pulse"></div>
            <h1 className="text-sm text-white uppercase tracking-widest">Command Interface</h1>
          </div>
          <button className="text-[9px] text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
            <Settings size={10} /> Config
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COL: CONNECTIONS */}
          <section className="col-span-1 border border-gray-800 bg-black">
            <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Network Nodes</span>
              <Network size={10} className="text-gray-600" />
            </div>
            
            <div className="divide-y divide-gray-800">
              {connections.map((conn) => (
                <div key={conn.id} className="p-3 flex items-center justify-between group hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-blue-500 font-mono">
                      {conn.type === "YouTube" ? "YT" : "IG"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{conn.handle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 transition-opacity">
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-3 text-[9px] text-gray-600 hover:text-blue-500 hover:bg-gray-900/10 transition-colors uppercase tracking-widest text-left flex items-center gap-2">
                <Plus size={10} /> Init Connection
              </button>
            </div>
          </section>

          {/* RIGHT COL: GENERATOR */}
          <section className="col-span-1 md:col-span-2 border border-gray-800 bg-black">
            <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Link Synthesis</span>
              <Database size={10} className="text-gray-600" />
            </div>

            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[9px] text-gray-600 uppercase tracking-widest">Target Vector (URL)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-black border border-gray-800 p-2 text-[11px] text-white focus:border-blue-600 focus:outline-none transition-colors placeholder:text-gray-800"
                  />
                </div>
                <button className="bg-gray-900 border border-gray-800 text-gray-400 p-2 hover:text-white transition-colors flex items-center justify-center">
                  <Upload size={12} />
                </button>
              </div>

              <div className="space-y-2 pt-4 border-t border-dotted border-gray-800">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-2">Protocol Requirements</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-3 h-3 border border-gray-700 bg-black flex items-center justify-center group-hover:border-blue-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 opacity-100"></div>
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">SUB.YT</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                     <div className="w-3 h-3 border border-gray-700 bg-black flex items-center justify-center group-hover:border-blue-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 opacity-100"></div>
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">FOL.IG</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleGenerate}
                  className="w-full bg-blue-600 text-white py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-blue-500 transition-colors"
                >
                  Execute Generation
                </button>
              </div>

              {generatedLink && (
                <div className="mt-4 bg-gray-900/20 border border-gray-800 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-blue-500 uppercase">Output Generated</span>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-gray-500 hover:text-white">
                        <ExternalLink size={10} />
                      </a>
                    </Link>
                  </div>
                  <code className="block text-[10px] text-gray-400 break-all border-b border-dotted border-gray-800 pb-1 mb-1">
                    {generatedLink}
                  </code>
                </div>
              )}

            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
