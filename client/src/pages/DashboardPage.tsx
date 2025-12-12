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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your connections and active links.</p>
          </div>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Settings size={16} /> Settings
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CONNECTIONS */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm lg:col-span-1 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900">Connected Accounts</h2>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">2 Active</span>
            </div>
            
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${conn.type === 'YouTube' ? 'bg-red-50 text-red-600' : 'bg-pink-50 text-pink-600'}`}>
                      {conn.type === "YouTube" && <Youtube size={18} />}
                      {conn.type === "Instagram" && <Instagram size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{conn.type}</p>
                      <p className="text-xs text-gray-500">{conn.handle}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button className="w-full mt-4 py-3 border border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <Plus size={16} /> Connect New Account
              </button>
            </div>
          </section>

          {/* RIGHT: CREATE LINK */}
          <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm lg:col-span-2">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                 <Link2 size={24} />
               </div>
               <div>
                 <h2 className="font-bold text-gray-900 text-lg">Create New Unlock Link</h2>
                 <p className="text-sm text-gray-500">Protect your content in 3 simple steps.</p>
               </div>
             </div>

            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Destination URL or File</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://dropbox.com/file..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <button className="bg-white border border-gray-200 text-gray-600 px-4 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    <Upload size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Required Actions</h3>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer hover:border-blue-300 transition-colors">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span>Subscribe on YouTube</span>
                  </label>
                  <label className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer hover:border-blue-300 transition-colors">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span>Follow on Instagram</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
              >
                Generate Secure Link
              </button>

              {generatedLink && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-800">Link Successfully Generated!</p>
                    <Link href="/unlock/demo-123">
                      <a target="_blank" className="text-green-600 hover:text-green-800 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                        Open <ExternalLink size={12} />
                      </a>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-green-100">
                    <code className="text-gray-600 text-sm flex-1 px-2">{generatedLink}</code>
                    <button className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-green-200 transition-colors">
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
