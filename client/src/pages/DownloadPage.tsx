import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, File, Loader2, AlertCircle, Check, Sparkles, ArrowLeft } from "lucide-react";

interface LinkFile {
  id: number;
  linkId: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  driveFileId: string;
  createdAt: string;
}

interface Creator {
  displayName: string | null;
  profileImage: string | null;
  bannerImage: string | null;
}

export default function DownloadPage() {
  const { code } = useParams<{ code: string }>();
  const [downloadingFile, setDownloadingFile] = useState<number | null>(null);
  const [downloadedFiles, setDownloadedFiles] = useState<Set<number>>(new Set());

  const { data: linkData, isLoading: linkLoading, error: linkError } = useQuery({
    queryKey: ['/api/links', code],
    queryFn: async () => {
      const res = await fetch(`/api/links/${code}`);
      if (!res.ok) throw new Error('Link not found');
      return res.json();
    },
    enabled: !!code,
  });

  const link = linkData?.link;
  const creator: Creator | undefined = linkData?.creator;

  const { data: filesData, isLoading: filesLoading } = useQuery<{ files: LinkFile[] }>({
    queryKey: ['/api/files', link?.id],
    queryFn: async () => {
      const res = await fetch(`/api/files/${link!.id}`);
      if (!res.ok) throw new Error('Failed to load files');
      return res.json();
    },
    enabled: !!link?.id,
  });

  const files = filesData?.files || [];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDownload = async (file: LinkFile) => {
    setDownloadingFile(file.id);
    try {
      const res = await fetch(`/api/files/download/${file.id}`);
      if (!res.ok) throw new Error('Failed to get download URL');
      const data = await res.json();
      
      if (data.downloadUrl) {
        window.open(data.downloadUrl, "_blank");
        setDownloadedFiles(prev => new Set(prev).add(file.id));
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloadingFile(null);
    }
  };

  if (linkLoading || filesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-3">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading files...</p>
        </motion.div>
      </div>
    );
  }

  if (linkError || !link) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-lg font-medium mb-2">Link Not Found</h2>
          <p className="text-sm text-muted-foreground mb-4">This download link doesn't exist or has expired.</p>
          <Link href="/">
            <a className="text-primary text-sm hover:underline">Go to Homepage</a>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <motion.div 
        className="w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="bg-card border border-border rounded overflow-hidden">
          <motion.div className="relative overflow-hidden">
            <div 
              className="h-16 bg-primary relative"
              style={creator?.bannerImage ? { 
                backgroundImage: `url(${creator.bannerImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="relative px-4 -mt-5">
              <div className="flex items-end gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-card flex-shrink-0">
                  {creator?.profileImage ? (
                    <img 
                      src={creator.profileImage} 
                      alt={creator.displayName || "Creator"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary-foreground">
                      {(creator?.displayName || "C").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-foreground">
                    {creator?.displayName || "Creator"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="px-4 py-3 border-t border-border bg-green-900/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-400">Content Unlocked!</p>
                <p className="text-xs text-muted-foreground">Download your files below</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Available Files</span>
              <span className="text-xs text-muted-foreground">{files.length} file{files.length !== 1 ? 's' : ''}</span>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-6">
                <File size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No files available</p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded border border-border bg-secondary"
                  >
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <File size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate" data-testid={`text-filename-${file.id}`}>
                        {file.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.fileSize)}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(file)}
                      disabled={downloadingFile === file.id}
                      className="p-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                      data-testid={`button-download-${file.id}`}
                    >
                      {downloadingFile === file.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : downloadedFiles.has(file.id) ? (
                        <Check size={14} />
                      ) : (
                        <Download size={14} />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-border bg-secondary/30 flex items-center justify-center gap-1.5">
            <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
              <Sparkles size={8} className="text-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              Powered by <Link href="/"><a className="text-primary hover:underline">YouRise</a></Link>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
