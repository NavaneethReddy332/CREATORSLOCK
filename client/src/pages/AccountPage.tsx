import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth, RequireAuth } from "@/lib/auth";
import { User, Link2, Shield, AlertTriangle, Plus, Trash2, Edit2, Check, X, Youtube, Instagram, Twitter, Facebook, Twitch, Github, Linkedin, Globe } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Connection {
  id: number;
  platform: string;
  url: string;
  createdAt: string;
}

function getPlatformIcon(platform: string) {
  const size = 14;
  switch (platform) {
    case "YouTube": return <Youtube size={size} className="text-red-400" />;
    case "Instagram": return <Instagram size={size} className="text-pink-400" />;
    case "Twitter": return <Twitter size={size} className="text-blue-400" />;
    case "Facebook": return <Facebook size={size} className="text-blue-500" />;
    case "Twitch": return <Twitch size={size} className="text-purple-400" />;
    case "GitHub": return <Github size={size} className="text-gray-400" />;
    case "LinkedIn": return <Linkedin size={size} className="text-blue-400" />;
    default: return <Globe size={size} className="text-muted-foreground" />;
  }
}

function ProfileSection() {
  const { user, refresh } = useAuth();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
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
      setEditing(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <User size={14} className="text-primary" />
        <h2 className="text-sm font-medium">Profile</h2>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Username</label>
          {editing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 px-2 py-1.5 rounded border border-border bg-secondary text-xs"
                data-testid="input-username"
              />
              <button onClick={handleSave} disabled={saving} className="p-1.5 bg-primary text-white rounded" data-testid="button-save-username">
                <Check size={12} />
              </button>
              <button onClick={() => { setEditing(false); setUsername(user?.username || ""); }} className="p-1.5 bg-secondary rounded">
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">{user?.username}</span>
              <button onClick={() => setEditing(true)} className="p-1 hover:bg-secondary rounded" data-testid="button-edit-username">
                <Edit2 size={12} className="text-muted-foreground" />
              </button>
            </div>
          )}
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
        
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Email</label>
          <span className="text-xs text-foreground">{user?.email}</span>
        </div>
        
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Joined</label>
          <span className="text-xs text-foreground">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConnectionsSection() {
  const queryClient = useQueryClient();
  const [newUrl, setNewUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const { data, isLoading } = useQuery<{ connections: Connection[] }>({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await fetch("/api/connections");
      return res.json();
    },
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
    <div className="bg-card border border-border rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <Link2 size={14} className="text-primary" />
        <h2 className="text-sm font-medium">Connections</h2>
      </div>

      <div className="space-y-2 mb-3">
        {isLoading && <p className="text-xs text-muted-foreground">Loading...</p>}
        {data?.connections?.map((conn) => (
          <div key={conn.id} className="flex items-center gap-2 p-2 bg-secondary rounded">
            {getPlatformIcon(conn.platform)}
            {editingId === conn.id ? (
              <>
                <input
                  type="text"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="flex-1 px-2 py-1 rounded border border-border bg-card text-xs"
                />
                <button onClick={() => updateMutation.mutate({ id: conn.id, url: editUrl })} className="p-1 bg-primary text-white rounded">
                  <Check size={10} />
                </button>
                <button onClick={() => setEditingId(null)} className="p-1 bg-card rounded">
                  <X size={10} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-xs truncate">{conn.url}</span>
                <button onClick={() => { setEditingId(conn.id); setEditUrl(conn.url); }} className="p-1 hover:bg-card rounded">
                  <Edit2 size={10} className="text-muted-foreground" />
                </button>
                <button onClick={() => deleteMutation.mutate(conn.id)} className="p-1 hover:bg-card rounded">
                  <Trash2 size={10} className="text-destructive" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://youtube.com/@channel"
          className="flex-1 px-2 py-1.5 rounded border border-border bg-secondary text-xs placeholder:text-muted-foreground"
          data-testid="input-new-connection"
        />
        <button
          onClick={() => newUrl && addMutation.mutate(newUrl)}
          disabled={!newUrl || addMutation.isPending}
          className="px-3 py-1.5 bg-primary text-white rounded text-xs font-medium disabled:opacity-50"
          data-testid="button-add-connection"
        >
          <Plus size={12} />
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
    <div className="bg-card border border-border rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield size={14} className="text-primary" />
        <h2 className="text-sm font-medium">Security</h2>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-2 py-1.5 rounded border border-border bg-secondary text-xs"
            data-testid="input-current-password"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-2 py-1.5 rounded border border-border bg-secondary text-xs"
            data-testid="input-new-password"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        {success && <p className="text-xs text-green-400">Password updated!</p>}
        <button
          onClick={handleChange}
          disabled={!currentPassword || !newPassword || saving}
          className="w-full py-2 bg-primary text-white rounded text-xs font-medium disabled:opacity-50"
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
    <div className="bg-card border border-destructive/30 rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={14} className="text-destructive" />
        <h2 className="text-sm font-medium text-destructive">Danger Zone</h2>
      </div>

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="w-full py-2 border border-destructive text-destructive rounded text-xs font-medium hover:bg-destructive/10"
          data-testid="button-delete-account"
        >
          Delete Account
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Enter your password to confirm:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1.5 rounded border border-destructive bg-secondary text-xs"
            placeholder="Password"
            data-testid="input-delete-password"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={!password || deleting}
              className="flex-1 py-2 bg-destructive text-white rounded text-xs font-medium disabled:opacity-50"
              data-testid="button-confirm-delete"
            >
              {deleting ? "Deleting..." : "Confirm Delete"}
            </button>
            <button
              onClick={() => { setConfirming(false); setPassword(""); setError(""); }}
              className="flex-1 py-2 bg-secondary rounded text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <Layout>
        <div className="max-w-lg mx-auto px-3 py-5">
          <h1 className="text-base font-medium text-foreground mb-4" data-testid="text-account-title">Account</h1>
          <div className="space-y-4">
            <ProfileSection />
            <ConnectionsSection />
            <SecuritySection />
            <DangerZoneSection />
          </div>
        </div>
      </Layout>
    </RequireAuth>
  );
}
