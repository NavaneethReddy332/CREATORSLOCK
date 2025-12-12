import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, Youtube, Instagram, Upload, ExternalLink, Link2, Settings, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const [connections, setConnections] = useState([
    { id: 1, type: "YouTube", handle: "@creator_one", active: true },
    { id: 2, type: "Instagram", handle: "@visual_feed", active: true }
  ]);

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerate = () => {
    setGeneratedLink(`${window.location.origin}/unlock/demo-123`);
  };

  return (
    <Layout>
      <div className="py-12 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your connections and active links.</p>
          </div>
          <button className="bg-card border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent flex items-center gap-2 transition-colors">
            <Settings size={16} /> Settings
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CONNECTIONS */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-sm lg:col-span-1 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-foreground">Connected Accounts</h2>
              <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full font-medium border border-green-500/20">2 Active</span>
            </div>
            
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-accent border border-border/50 hover:border-border transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${conn.type === 'YouTube' ? 'bg-red-500/10 text-red-400' : 'bg-pink-500/10 text-pink-400'}`}>
                      {conn.type === "YouTube" && <Youtube size={18} />}
                      {conn.type === "Instagram" && <Instagram size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{conn.type}</p>
                      <p className="text-xs text-muted-foreground">{conn.handle}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button className="w-full mt-4 py-3 border border-dashed border-border text-muted-foreground rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <Plus size={16} /> Connect New Account
              </button>
            </div>
          </section>

          {/* RIGHT: CREATE LINK */}
          <section className="bg-card rounded-2xl p-8 border border-border shadow-sm lg:col-span-2">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-primary/10 text-primary rounded-lg">
                 <Link2 size={24} />
               </div>
               <div>
                 <h2 className="font-bold text-foreground text-lg">Create New Unlock Link</h2>
                 <p className="text-sm text-muted-foreground">Protect your content in 3 simple steps.</p>
               </div>
             </div>

            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Destination URL or File</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://dropbox.com/file..."
                    className="flex-1 bg-background border border-border rounded-lg p-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
                  />
                  <button className="bg-card border border-border text-muted-foreground px-4 rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                    <Upload size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-background/50 rounded-xl border border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Required Actions</h3>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                    <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary" defaultChecked />
                    <span>Subscribe on YouTube</span>
                  </label>
                  <label className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                    <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary" defaultChecked />
                    <span>Follow on Instagram</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:brightness-110 transition-all"
              >
                Generate Secure Link
              </button>

              {generatedLink && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mt-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-400">Link Successfully Generated!</p>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-green-400 hover:text-green-300 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                        Open <ExternalLink size={12} />
                      </a>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 bg-background p-2 rounded-lg border border-green-500/20">
                    <code className="text-muted-foreground text-sm flex-1 px-2">{generatedLink}</code>
                    <button className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-green-500/30 transition-colors">
                      Copy
                    </button>
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
