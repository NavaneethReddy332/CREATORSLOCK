import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth, RequireAuth } from "@/lib/auth";
import { User, Link2, Shield, AlertTriangle, Plus, Trash2, Edit2, Check, X, Youtube, Instagram, Twitter, Facebook, Twitch, Github, Linkedin, Globe, ExternalLink, Loader2, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpandTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

interface Connection {
  id: number;
  platform: string;
  url: string;
  createdAt: string;
}

type TabType = "profile" | "connections" | "security" | "danger";

function TikTokIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

function ConnectionSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-border/50 animate-pulse">
      <div className="w-6 h-6 rounded bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-muted rounded w-24" />
        <div className="h-2 bg-muted/60 rounded w-48" />
      </div>
    </div>
  );
}

function getPlatformIcon(platform: string) {
  const size = 16;
  switch (platform) {
    case "YouTube": return <Youtube size={size} className="text-red-500" />;
    case "Instagram": return <Instagram size={size} className="text-pink-500" />;
    case "Twitter": return <Twitter size={size} className="text-sky-400" />;
    case "TikTok": return <TikTokIcon size={size} className="text-foreground" />;
    case "Facebook": return <Facebook size={size} className="text-blue-600" />;
    case "Twitch": return <Twitch size={size} className="text-purple-500" />;
    case "GitHub": return <Github size={size} className="text-foreground" />;
    case "LinkedIn": return <Linkedin size={size} className="text-blue-500" />;
    default: return <Globe size={size} className="text-muted-foreground" />;
  }
}

function SidebarNav({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (tab: TabType) => void }) {
  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "connections" as TabType, label: "Connections", icon: Link2 },
    { id: "security" as TabType, label: "Security", icon: Shield },
    { id: "danger" as TabType, label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <nav className="w-48 flex-shrink-0">
      <div className="flex items-center gap-2 mb-4 px-3">
        <User size={18} className="text-primary" />
        <h1 className="text-base font-medium text-foreground">Account</h1>
      </div>
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isDanger = tab.id === "danger";
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                isActive 
                  ? isDanger 
                    ? "bg-destructive/10 text-destructive border-l-2 border-destructive" 
                    : "bg-primary/10 text-primary border-l-2 border-primary"
                  : isDanger
                    ? "text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <Icon size={14} className={isDanger && isActive ? "text-destructive" : ""} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ProfileSection() {
  const { user, refresh } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSaveUsername = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await refresh();
      setEditingUsername(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-base font-medium mb-6">Profile</h2>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center gap-8">
            <span className="text-sm text-muted-foreground w-20">Username</span>
            {editingUsername ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-3 py-1.5 rounded border border-border bg-secondary text-sm min-w-[200px]"
                  data-testid="input-username"
                  autoFocus
                />
                <button 
                  onClick={handleSaveUsername} 
                  disabled={saving} 
                  className="p-1.5 bg-primary text-white rounded hover:bg-primary/90"
                  data-testid="button-save-username"
                >
                  <Check size={14} />
                </button>
                <button 
                  onClick={() => { setEditingUsername(false); setUsername(user?.username || ""); setError(""); }} 
                  className="p-1.5 bg-secondary rounded hover:bg-secondary/80"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <span className="text-sm font-medium text-foreground">{user?.username}</span>
            )}
          </div>
          {!editingUsername && (
            <button 
              onClick={() => setEditingUsername(true)} 
              className="p-1.5 hover:bg-secondary rounded text-primary"
              data-testid="button-edit-username"
            >
              <ExternalLink size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center gap-8">
            <span className="text-sm text-muted-foreground w-20">Email</span>
            <span className="text-sm font-medium text-foreground">{user?.email}</span>
          </div>
          <button 
            className="p-1.5 hover:bg-secondary rounded text-primary opacity-50 cursor-not-allowed"
            disabled
            title="Email cannot be changed"
          >
            <ExternalLink size={16} />
          </button>
        </div>
        
        <div className="flex items-center py-2">
          <div className="flex items-center gap-8">
            <span className="text-sm text-muted-foreground w-20">Joined</span>
            <span className="text-sm font-medium text-foreground">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "-"}
            </span>
          </div>
        </div>

        {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      </div>
    </div>
  );
}

function ConnectionsSection() {
  const queryClient = useQueryClient();
  const [newUrl, setNewUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const { data, isLoading, isFetching } = useQuery<{ connections: Connection[] }>({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await fetch("/api/connections");
      return res.json();
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  const addMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to add");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      setNewUrl("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, url }: { id: number; url: string }) => {
      const res = await fetch(`/api/connections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/connections/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["connections"] }),
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-base font-medium mb-6">Connections</h2>

      <div className="space-y-3 mb-4">
        {isLoading ? (
          <>
            <ConnectionSkeleton />
            <ConnectionSkeleton />
            <ConnectionSkeleton />
          </>
        ) : isFetching && data?.connections?.length === 0 ? (
          <>
            <ConnectionSkeleton />
            <ConnectionSkeleton />
          </>
        ) : null}
        {data?.connections?.length === 0 && !isLoading && !isFetching && (
          <p className="text-sm text-muted-foreground">No connections added yet.</p>
        )}
        {data?.connections?.map((conn) => (
          <motion.div 
            key={conn.id} 
            className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-border/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center">
              {getPlatformIcon(conn.platform)}
            </div>
            {editingId === conn.id ? (
              <>
                <input
                  type="text"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded border border-border bg-card text-sm"
                />
                <button 
                  onClick={() => updateMutation.mutate({ id: conn.id, url: editUrl })}
                  disabled={updateMutation.isPending}
                  className="p-1.5 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
                >
                  {updateMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                </button>
                <button 
                  onClick={() => setEditingId(null)} 
                  className="p-1.5 bg-card rounded border border-border hover:bg-secondary"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{conn.platform}</p>
                  <p className="text-xs text-muted-foreground truncate">{conn.url}</p>
                </div>
                <button 
                  onClick={() => { setEditingId(conn.id); setEditUrl(conn.url); }} 
                  className="p-1.5 hover:bg-card rounded"
                >
                  <Edit2 size={14} className="text-muted-foreground" />
                </button>
                <button 
                  onClick={() => deleteMutation.mutate(conn.id)}
                  disabled={deleteMutation.isPending}
                  className="p-1.5 hover:bg-card rounded disabled:opacity-50"
                >
                  {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin text-destructive" /> : <Trash2 size={14} className="text-destructive" />}
                </button>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://youtube.com/@channel or tiktok.com/@user"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-secondary text-sm placeholder:text-muted-foreground"
          data-testid="input-new-connection"
        />
        <button
          onClick={() => newUrl && addMutation.mutate(newUrl)}
          disabled={!newUrl || addMutation.isPending}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90 flex items-center gap-2"
          data-testid="button-add-connection"
        >
          {addMutation.isPending ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus size={14} />
              Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/account/security/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-base font-medium mb-6">Security</h2>

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
            data-testid="input-current-password"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
            data-testid="input-new-password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-green-400">Password updated successfully!</p>}
        <button
          onClick={handleChange}
          disabled={!currentPassword || !newPassword || saving}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-primary/90"
          data-testid="button-change-password"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

function DangerZoneSection() {
  const { logout } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await logout();
    } catch (e: any) {
      setError(e.message);
      setDeleting(false);
    }
  };

  return (
    <div className="bg-card border border-destructive/30 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={18} className="text-destructive" />
        <h2 className="text-base font-medium text-destructive">Danger Zone</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <button
        onClick={() => setConfirming(!confirming)}
        className="px-4 py-2.5 border border-destructive text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors"
        data-testid="button-delete-account"
      >
        {confirming ? "Cancel" : "Delete Account"}
      </button>

      <ExpandTransition isVisible={confirming}>
        <div className="space-y-4 max-w-md mt-4 pt-4 border-t border-destructive/20">
          <p className="text-sm text-muted-foreground">Enter your password to confirm deletion:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-destructive bg-secondary text-sm"
            placeholder="Password"
            data-testid="input-delete-password"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={!password || deleting}
              className="flex-1 py-2.5 bg-destructive text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-destructive/90 flex items-center justify-center gap-2"
              data-testid="button-confirm-delete"
            >
              {deleting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </button>
          </div>
        </div>
      </ExpandTransition>
    </div>
  );
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const renderSection = () => {
    switch (activeTab) {
      case "profile": return <ProfileSection />;
      case "connections": return <ConnectionsSection />;
      case "security": return <SecuritySection />;
      case "danger": return <DangerZoneSection />;
    }
  };

  return (
    <RequireAuth>
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex gap-8">
            <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <motion.div 
              key={activeTab}
              className="flex-1 min-w-0"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderSection()}
            </motion.div>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  );
}
