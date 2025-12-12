import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, Upload, ExternalLink, Settings, Trash2, Database, Network } from "lucide-react";
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
        <div className="flex items-center justify-between border-b border-border-main pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent-main animate-pulse"></div>
            <h1 className="text-sm text-fg-primary uppercase tracking-widest">Command Interface</h1>
          </div>
          <button className="text-[9px] text-fg-muted hover:text-fg-primary uppercase tracking-widest flex items-center gap-2">
            <Settings size={10} /> Config
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COL: CONNECTIONS */}
          <section className="col-span-1 border border-border-main bg-bg-main">
            <div className="p-3 border-b border-border-main flex justify-between items-center bg-border-dim">
              <span className="text-[9px] text-fg-muted uppercase tracking-widest">Network Nodes</span>
              <Network size={10} className="text-fg-muted" />
            </div>
            
            <div className="divide-y divide-border-main">
              {connections.map((conn) => (
                <div key={conn.id} className="p-3 flex items-center justify-between group hover:bg-border-dim transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-accent-main font-mono">
                      {conn.type === "YouTube" ? "YT" : "IG"}
                    </span>
                    <span className="text-[10px] text-fg-secondary font-mono">{conn.handle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent-main rounded-full"></div>
                    <button className="opacity-0 group-hover:opacity-100 text-fg-muted hover:text-fg-primary transition-opacity">
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-3 text-[9px] text-fg-muted hover:text-accent-main hover:bg-border-dim transition-colors uppercase tracking-widest text-left flex items-center gap-2">
                <Plus size={10} /> Init Connection
              </button>
            </div>
          </section>

          {/* RIGHT COL: GENERATOR */}
          <section className="col-span-1 md:col-span-2 border border-border-main bg-bg-main">
            <div className="p-3 border-b border-border-main flex justify-between items-center bg-border-dim">
              <span className="text-[9px] text-fg-muted uppercase tracking-widest">Link Synthesis</span>
              <Database size={10} className="text-fg-muted" />
            </div>

            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[9px] text-fg-muted uppercase tracking-widest">Target Vector (URL)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-bg-main border border-border-main p-2 text-[11px] text-fg-primary focus:border-accent-main focus:outline-none transition-colors placeholder:text-fg-muted"
                  />
                </div>
                <button className="bg-border-dim border border-border-main text-fg-muted p-2 hover:text-fg-primary transition-colors flex items-center justify-center">
                  <Upload size={12} />
                </button>
              </div>

              <div className="space-y-2 pt-4 border-t border-dotted border-border-main">
                <p className="text-[9px] text-fg-muted uppercase tracking-widest mb-2">Protocol Requirements</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-3 h-3 border border-border-main bg-bg-main flex items-center justify-center group-hover:border-accent-main">
                      <div className="w-1.5 h-1.5 bg-accent-main opacity-100"></div>
                    </div>
                    <span className="text-[10px] text-fg-secondary group-hover:text-fg-primary transition-colors">SUB.YT</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                     <div className="w-3 h-3 border border-border-main bg-bg-main flex items-center justify-center group-hover:border-accent-main">
                      <div className="w-1.5 h-1.5 bg-accent-main opacity-100"></div>
                    </div>
                    <span className="text-[10px] text-fg-secondary group-hover:text-fg-primary transition-colors">FOL.IG</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleGenerate}
                  className="w-full bg-accent-main text-fg-primary py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-accent-main/80 transition-colors"
                >
                  Execute Generation
                </button>
              </div>

              {generatedLink && (
                <div className="mt-4 bg-accent-dim border border-border-main p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-accent-main uppercase">Output Generated</span>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-fg-secondary hover:text-fg-primary">
                        <ExternalLink size={10} />
                      </a>
                    </Link>
                  </div>
                  <code className="block text-[10px] text-fg-secondary break-all border-b border-dotted border-border-main pb-1 mb-1">
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
