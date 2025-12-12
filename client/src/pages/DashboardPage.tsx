import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, ExternalLink, Trash2, Youtube, Instagram, Copy, Check, Link2, BarChart3, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const [connections, setConnections] = useState([
    { id: 1, type: "YouTube", handle: "@yourchannel", active: true },
    { id: 2, type: "Instagram", handle: "@yourprofile", active: true }
  ]);

  const [targetUrl, setTargetUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["YouTube", "Instagram"]);

  const handleGenerate = () => {
    if (targetUrl) {
      setGeneratedLink(`${window.location.origin}/unlock/demo-123`);
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "YouTube": return <Youtube size={18} className="text-red-500" />;
      case "Instagram": return <Instagram size={18} className="text-pink-500" />;
      default: return <Link2 size={18} className="text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-dashboard-title">Creator Dashboard</h1>
              <p className="text-muted-foreground">Create and manage your locked links</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-card border border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Your Accounts</h2>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {connections.length} connected
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {connections.map((conn) => (
                  <motion.div 
                    key={conn.id} 
                    className="p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors"
                    data-testid={`connection-item-${conn.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        {getIcon(conn.type)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{conn.type}</p>
                        <p className="text-sm text-muted-foreground">{conn.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-secondary rounded-lg transition-all"
                        data-testid={`button-delete-${conn.id}`}
                      >
                        <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                <button 
                  className="w-full p-4 text-sm text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 font-medium"
                  data-testid="button-add-account"
                >
                  <Plus size={18} />
                  Connect New Account
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-border/50 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <BarChart3 size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quick Stats</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Links Created</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-muted-foreground">New Followers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card border border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border bg-secondary/30">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Link2 size={18} className="text-primary" />
                  Create New Locked Link
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content URL
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://your-content-url.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    data-testid="input-target-url"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    This is the link visitors will unlock after completing actions
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Required Actions
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {connections.map((conn) => (
                      <button
                        key={conn.id}
                        onClick={() => togglePlatform(conn.type)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                          selectedPlatforms.includes(conn.type)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-white text-muted-foreground hover:border-primary/50'
                        }`}
                        data-testid={`toggle-platform-${conn.type.toLowerCase()}`}
                      >
                        {getIcon(conn.type)}
                        <span className="font-medium">
                          {conn.type === "YouTube" ? "Subscribe" : "Follow"}
                        </span>
                        {selectedPlatforms.includes(conn.type) && (
                          <Check size={16} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button 
                  onClick={handleGenerate}
                  disabled={!targetUrl || selectedPlatforms.length === 0}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full gradient-primary text-white py-4 rounded-xl font-semibold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  data-testid="button-generate-link"
                >
                  Generate Locked Link
                </motion.button>

                <AnimatePresence>
                  {generatedLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-green-800 flex items-center gap-2">
                          <Check size={16} />
                          Link Generated Successfully!
                        </span>
                        <Link href="/unlock/demo-123" className="text-green-700 hover:text-green-900">
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-white text-sm text-foreground p-3 rounded-lg border border-green-200 truncate" data-testid="text-generated-link">
                          {generatedLink}
                        </code>
                        <button
                          onClick={handleCopy}
                          className="p-3 bg-white border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                          data-testid="button-copy-link"
                        >
                          {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-green-600" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
