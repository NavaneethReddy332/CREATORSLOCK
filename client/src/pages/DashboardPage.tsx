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
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your connections and active links.</p>
          </div>
          <button className="bg-black border border-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 flex items-center gap-2 transition-colors">
            <Settings size={16} /> Settings
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CONNECTIONS */}
          <section className="bg-black rounded-2xl p-6 border border-gray-800 shadow-sm lg:col-span-1 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-white">Connected Accounts</h2>
              <span className="bg-blue-900/20 text-blue-400 text-xs px-2 py-1 rounded-full font-medium border border-blue-900/50">2 Active</span>
            </div>
            
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-900 border border-gray-800/50 hover:border-gray-700 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-gray-900 text-gray-400`}>
                      {conn.type === "YouTube" && <Youtube size={18} />}
                      {conn.type === "Instagram" && <Instagram size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{conn.type}</p>
                      <p className="text-xs text-gray-500">{conn.handle}</p>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button className="w-full mt-4 py-3 border border-dashed border-gray-800 text-gray-500 rounded-xl hover:border-blue-600 hover:text-blue-500 hover:bg-blue-950/10 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <Plus size={16} /> Connect New Account
              </button>
            </div>
          </section>

          {/* RIGHT: CREATE LINK */}
          <section className="bg-black rounded-2xl p-8 border border-gray-800 shadow-sm lg:col-span-2">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-blue-900/20 text-blue-500 rounded-lg border border-blue-900/30">
                 <Link2 size={24} />
               </div>
               <div>
                 <h2 className="font-bold text-white text-lg">Create New Unlock Link</h2>
                 <p className="text-sm text-gray-500">Protect your content in 3 simple steps.</p>
               </div>
             </div>

            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Destination URL or File</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://dropbox.com/file..."
                    className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-700"
                  />
                  <button className="bg-black border border-gray-700 text-gray-400 px-4 rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
                    <Upload size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-800">
                <h3 className="text-sm font-medium text-white mb-3">Required Actions</h3>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-2 bg-black px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-600 hover:text-blue-400 transition-colors">
                    <input type="checkbox" className="rounded border-gray-700 bg-black text-blue-600 focus:ring-blue-600" defaultChecked />
                    <span>Subscribe on YouTube</span>
                  </label>
                  <label className="flex items-center gap-2 bg-black px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-600 hover:text-blue-400 transition-colors">
                    <input type="checkbox" className="rounded border-gray-700 bg-black text-blue-600 focus:ring-blue-600" defaultChecked />
                    <span>Follow on Instagram</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all"
              >
                Generate Secure Link
              </button>

              {generatedLink && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-6 mt-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-blue-400">Link Successfully Generated!</p>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-blue-400 hover:text-white flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                        Open <ExternalLink size={12} />
                      </a>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 bg-black p-2 rounded-lg border border-blue-900/30">
                    <code className="text-gray-400 text-sm flex-1 px-2">{generatedLink}</code>
                    <button className="bg-blue-900/20 text-blue-400 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-blue-600 hover:text-white transition-colors">
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
