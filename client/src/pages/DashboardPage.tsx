import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Plus, ExternalLink, Trash2, Youtube, Instagram, Copy, Check, Link2, BarChart3, Sparkles } from "lucide-react";
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
      case "YouTube": return <Youtube size={14} className="text-red-400" />;
      case "Instagram": return <Instagram size={14} className="text-pink-400" />;
      default: return <Link2 size={14} className="text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-3 py-5">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-medium text-foreground" data-testid="text-dashboard-title">Creator Dashboard</h1>
              <p className="text-xs text-muted-foreground">Create and manage your locked links</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded overflow-hidden">
              <div className="p-3 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-medium text-foreground">Your Accounts</h2>
                  <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                    {connections.length}
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {connections.map((conn) => (
                  <div 
                    key={conn.id} 
                    className="p-3 flex items-center justify-between group hover:bg-secondary/30 transition-colors"
                    data-testid={`connection-item-${conn.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                        {getIcon(conn.type)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{conn.type}</p>
                        <p className="text-xs text-muted-foreground">{conn.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-all"
                        data-testid={`button-delete-${conn.id}`}
                      >
                        <Trash2 size={12} className="text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  className="w-full p-3 text-xs text-primary hover:bg-secondary/30 transition-colors flex items-center justify-center gap-1.5 font-medium"
                  data-testid="button-add-account"
                >
                  <Plus size={14} />
                  Connect New Account
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded p-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                  <BarChart3 size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Quick Stats</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded p-2 text-center">
                  <p className="text-lg font-semibold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Links</p>
                </div>
                <div className="bg-secondary rounded p-2 text-center">
                  <p className="text-lg font-semibold text-foreground">156</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded overflow-hidden">
              <div className="p-3 border-b border-border bg-secondary/30">
                <h2 className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Link2 size={14} className="text-primary" />
                  Create New Locked Link
                </h2>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Content URL
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://your-content-url.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                    data-testid="input-target-url"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    The link visitors will unlock after completing actions
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Required Actions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {connections.map((conn) => (
                      <button
                        key={conn.id}
                        onClick={() => togglePlatform(conn.type)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-colors ${
                          selectedPlatforms.includes(conn.type)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                        }`}
                        data-testid={`toggle-platform-${conn.type.toLowerCase()}`}
                      >
                        {getIcon(conn.type)}
                        <span className="font-medium">
                          {conn.type === "YouTube" ? "Subscribe" : "Follow"}
                        </span>
                        {selectedPlatforms.includes(conn.type) && (
                          <Check size={12} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={!targetUrl || selectedPlatforms.length === 0}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-generate-link"
                >
                  Generate Locked Link
                </button>

                {generatedLink && (
                  <div className="bg-green-900/20 border border-green-700/50 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-green-400 flex items-center gap-1.5">
                        <Check size={12} />
                        Link Generated!
                      </span>
                      <Link href="/unlock/demo-123" className="text-green-400 hover:text-green-300">
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-card text-xs text-foreground p-2 rounded border border-green-700/30 truncate" data-testid="text-generated-link">
                        {generatedLink}
                      </code>
                      <button
                        onClick={handleCopy}
                        className="p-2 bg-card border border-green-700/30 rounded hover:bg-secondary transition-colors"
                        data-testid="button-copy-link"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-green-400" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
