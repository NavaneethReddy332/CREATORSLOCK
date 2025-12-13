import { useState } from "react";
import { Layout } from "@/components/Layout";
import { RequireAuth, useAuth } from "@/lib/auth";
import { Plus, ExternalLink, Trash2, Youtube, Instagram, Copy, Check, Link2, BarChart3, Sparkles, Twitter, Facebook, Twitch, Github, Linkedin, Globe, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Connection {
  id: number;
  platform: string;
  url: string;
}

function TikTokIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [targetUrl, setTargetUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const { data: connectionsData, isLoading: connectionsLoading } = useQuery<{ connections: Connection[] }>({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await fetch("/api/connections");
      return res.json();
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  const connections = connectionsData?.connections || [];

  const createLinkMutation = useMutation({
    mutationFn: async () => {
      const code = Math.random().toString(36).substring(2, 10);
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl,
          unlockCode: code,
          requiredActions: selectedPlatforms.map((platform, i) => ({
            platform,
            action: platform === "YouTube" ? "subscribe" : "follow",
            connectionId: connections.find(c => c.platform === platform)?.id || i,
          })),
        }),
      });
      if (!res.ok) throw new Error("Failed to create link");
      return { code };
    },
    onSuccess: (data) => {
      setGeneratedLink(`${window.location.origin}/unlock/${data.code}`);
    },
  });

  const handleGenerate = () => {
    if (targetUrl && selectedPlatforms.length > 0) {
      createLinkMutation.mutate();
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

  const getIcon = (platform: string) => {
    switch (platform) {
      case "YouTube": return <Youtube size={14} className="text-red-500" />;
      case "Instagram": return <Instagram size={14} className="text-pink-500" />;
      case "Twitter": return <Twitter size={14} className="text-sky-400" />;
      case "TikTok": return <TikTokIcon size={14} className="text-foreground" />;
      case "Facebook": return <Facebook size={14} className="text-blue-600" />;
      case "Twitch": return <Twitch size={14} className="text-purple-500" />;
      case "GitHub": return <Github size={14} className="text-foreground" />;
      case "LinkedIn": return <Linkedin size={14} className="text-blue-500" />;
      default: return <Globe size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <RequireAuth>
      <Layout>
        <div className="max-w-5xl mx-auto px-3 py-5">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-medium text-foreground" data-testid="text-dashboard-title">Dashboard</h1>
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
                  {connectionsLoading ? (
                    <>
                      <div className="p-3 flex items-center gap-2 animate-pulse">
                        <div className="w-6 h-6 rounded bg-muted" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3 bg-muted rounded w-16" />
                          <div className="h-2 bg-muted/60 rounded w-32" />
                        </div>
                      </div>
                      <div className="p-3 flex items-center gap-2 animate-pulse">
                        <div className="w-6 h-6 rounded bg-muted" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3 bg-muted rounded w-20" />
                          <div className="h-2 bg-muted/60 rounded w-28" />
                        </div>
                      </div>
                    </>
                  ) : connections.length === 0 ? (
                    <div className="p-3 text-xs text-muted-foreground text-center">
                      No connections yet
                    </div>
                  ) : null}
                  {!connectionsLoading && connections.map((conn) => (
                    <div 
                      key={conn.id} 
                      className="p-3 flex items-center gap-2"
                      data-testid={`connection-item-${conn.id}`}
                    >
                      <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                        {getIcon(conn.platform)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{conn.platform}</p>
                        <p className="text-xs text-muted-foreground truncate">{conn.url}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Link href="/account">
                    <button 
                      className="w-full p-3 text-xs text-primary hover:bg-secondary/30 transition-colors flex items-center justify-center gap-1.5 font-medium"
                      data-testid="button-add-account"
                    >
                      <Plus size={14} />
                      Manage Connections
                    </button>
                  </Link>
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
                    <p className="text-lg font-semibold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground">Links</p>
                  </div>
                  <div className="bg-secondary rounded p-2 text-center">
                    <p className="text-lg font-semibold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground">Unlocks</p>
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
                    {connections.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        Add connections in your <Link href="/account" className="text-primary hover:underline">account settings</Link> first.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {connections.map((conn) => (
                          <button
                            key={conn.id}
                            onClick={() => togglePlatform(conn.platform)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-colors ${
                              selectedPlatforms.includes(conn.platform)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                            }`}
                            data-testid={`toggle-platform-${conn.platform.toLowerCase()}`}
                          >
                            {getIcon(conn.platform)}
                            <span className="font-medium">
                              {conn.platform === "YouTube" ? "Subscribe" : "Follow"}
                            </span>
                            {selectedPlatforms.includes(conn.platform) && (
                              <Check size={12} className="text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={!targetUrl || selectedPlatforms.length === 0 || createLinkMutation.isPending}
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-generate-link"
                  >
                    {createLinkMutation.isPending ? "Creating..." : "Generate Locked Link"}
                  </button>

                  {generatedLink && (
                    <div className="bg-green-900/20 border border-green-700/50 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-green-400 flex items-center gap-1.5">
                          <Check size={12} />
                          Link Generated!
                        </span>
                        <Link href={`/unlock/${generatedLink.split('/').pop()}`} className="text-green-400 hover:text-green-300">
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
    </RequireAuth>
  );
}
