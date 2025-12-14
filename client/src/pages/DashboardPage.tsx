import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { RequireAuth, useAuth } from "@/lib/auth";
import { Plus, ExternalLink, Trash2, Youtube, Instagram, Copy, Check, Link2, BarChart3, Sparkles, Twitter, Facebook, Twitch, Github, Linkedin, Globe, Loader2, Upload, File, X, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";

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

type UploadStatus = "pending" | "uploading" | "completed" | "error";

interface UploadedFile {
  file: File;
  name: string;
  size: number;
  status: UploadStatus;
  progress: number;
  error?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [targetUrl, setTargetUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [createdLinkId, setCreatedLinkId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allFilesUploaded = uploadedFiles.length > 0 && uploadedFiles.every(f => f.status === "completed");
  const anyFileUploading = uploadedFiles.some(f => f.status === "uploading");
  const hasFilesToUpload = uploadedFiles.some(f => f.status === "pending");

  const uploadFileWithProgress = (file: UploadedFile, index: number, linkId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file.file);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadedFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress: percentComplete } : f
          ));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadedFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: "completed" as UploadStatus, progress: 100 } : f
          ));
          resolve();
        } else {
          const errorMsg = "Upload failed";
          setUploadedFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: "error" as UploadStatus, error: errorMsg } : f
          ));
          reject(new Error(errorMsg));
        }
      });

      xhr.addEventListener("error", () => {
        setUploadedFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: "error" as UploadStatus, error: "Network error" } : f
        ));
        reject(new Error("Network error"));
      });

      xhr.open("POST", `/api/files/upload/${linkId}`);
      xhr.withCredentials = true;
      
      setUploadedFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: "uploading" as UploadStatus, progress: 0 } : f
      ));
      
      xhr.send(formData);
    });
  };

  const uploadSingleFile = async (index: number) => {
    if (!createdLinkId) return;
    const file = uploadedFiles[index];
    if (file.status !== "pending") return;
    
    try {
      await uploadFileWithProgress(file, index, createdLinkId);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

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
      const finalTargetUrl = uploadedFiles.length > 0 ? `__FILES__` : targetUrl;
      
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: finalTargetUrl,
          unlockCode: code,
          requiredActions: selectedPlatforms.map((platform, i) => ({
            platform,
            action: platform === "YouTube" ? "subscribe" : "follow",
            connectionId: connections.find(c => c.platform === platform)?.id || i,
          })),
        }),
      });
      if (!res.ok) throw new Error("Failed to create link");
      const data = await res.json();
      return { code, linkId: data.link.id };
    },
    onSuccess: async (data) => {
      setCreatedLinkId(data.linkId);
      setGeneratedLink(`${window.location.origin}/unlock/${data.code}`);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        name: file.name,
        size: file.size,
        status: "pending" as UploadStatus,
        progress: 0,
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleGenerate = () => {
    if (uploadedFiles.length > 0 && allFilesUploaded && createdLinkId && generatedLink) {
      return;
    }
    
    const hasContent = targetUrl || allFilesUploaded;
    if (hasContent && selectedPlatforms.length > 0 && !createdLinkId) {
      createLinkMutation.mutate();
    }
  };

  const handleCreateLinkForUpload = () => {
    if (uploadedFiles.length > 0 && selectedPlatforms.length > 0 && !createdLinkId) {
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
                      Content URL or Upload Files
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="url" 
                        placeholder="https://your-content-url.com"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        disabled={uploadedFiles.length > 0}
                        className="flex-1 px-3 py-2 rounded border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-xs disabled:opacity-50"
                        data-testid="input-target-url"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!!targetUrl}
                        className="px-3 py-2 rounded border border-border bg-secondary text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-upload-files"
                      >
                        <Upload size={14} />
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file-upload"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {uploadedFiles.length > 0 
                        ? "Files will be uploaded to Google Drive for download" 
                        : "Enter a URL or upload files for visitors to unlock"}
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-medium text-foreground">
                          Files to Upload ({uploadedFiles.length})
                        </label>
                        {!createdLinkId && selectedPlatforms.length > 0 && (
                          <button
                            type="button"
                            onClick={handleCreateLinkForUpload}
                            disabled={createLinkMutation.isPending}
                            className="text-xs text-primary hover:underline disabled:opacity-50"
                            data-testid="button-prepare-upload"
                          >
                            {createLinkMutation.isPending ? "Preparing..." : "Prepare for Upload"}
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div 
                            key={index}
                            className="p-2 rounded border border-border bg-secondary"
                          >
                            <div className="flex items-center gap-2">
                              {file.status === "completed" ? (
                                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                              ) : file.status === "uploading" ? (
                                <Loader2 size={14} className="text-primary animate-spin flex-shrink-0" />
                              ) : (
                                <File size={14} className="text-muted-foreground flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                  {file.status === "uploading" && ` - ${file.progress}%`}
                                  {file.status === "completed" && " - Uploaded"}
                                  {file.status === "error" && ` - ${file.error}`}
                                </p>
                              </div>
                              {file.status === "pending" && createdLinkId && (
                                <button
                                  type="button"
                                  onClick={() => uploadSingleFile(index)}
                                  className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-1"
                                  data-testid={`button-upload-file-${index}`}
                                >
                                  <Upload size={12} />
                                  Upload
                                </button>
                              )}
                              {file.status === "pending" && !createdLinkId && (
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                                  data-testid={`button-remove-file-${index}`}
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                            {file.status === "uploading" && (
                              <div className="mt-2">
                                <Progress value={file.progress} className="h-1.5" />
                                <p className="text-xs text-muted-foreground mt-1 text-right">{file.progress}% uploaded</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {createdLinkId && hasFilesToUpload && (
                        <p className="text-xs text-amber-500">
                          Click "Upload" on each file to upload them to Google Drive
                        </p>
                      )}
                    </div>
                  )}

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
                    disabled={
                      (!targetUrl && uploadedFiles.length === 0) || 
                      selectedPlatforms.length === 0 || 
                      createLinkMutation.isPending || 
                      anyFileUploading ||
                      (uploadedFiles.length > 0 && !allFilesUploaded)
                    }
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    data-testid="button-generate-link"
                  >
                    {(createLinkMutation.isPending || anyFileUploading) && <Loader2 size={14} className="animate-spin" />}
                    {anyFileUploading 
                      ? "Uploading Files..." 
                      : createLinkMutation.isPending 
                        ? "Creating..." 
                        : uploadedFiles.length > 0 && !allFilesUploaded
                          ? "Upload All Files First"
                          : "Generate Locked Link"}
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
