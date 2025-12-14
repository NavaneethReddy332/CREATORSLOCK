import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Unlock, ArrowRight, Youtube, Instagram, Sparkles, ExternalLink, Loader2, AlertCircle } from "lucide-react";

interface RequiredAction {
  platform: string;
  action: string;
  connectionId: number;
  url?: string;
}

interface LockedLink {
  id: number;
  targetUrl: string;
  unlockCode: string;
  parsedRequiredActions: RequiredAction[];
}

interface Creator {
  displayName: string | null;
  profileImage: string | null;
  bannerImage: string | null;
  audienceMessage: string | null;
}

interface UnlockAttempt {
  id: number;
  linkId: number;
  parsedCompletedActions: string[];
  unlocked: boolean;
  unlockedAt: string | null;
}

const platformIcons: Record<string, React.ReactNode> = {
  YouTube: <Youtube size={14} className="text-red-400" />,
  Instagram: <Instagram size={14} className="text-pink-400" />,
  TikTok: <ExternalLink size={14} className="text-cyan-400" />,
  Twitter: <ExternalLink size={14} className="text-blue-400" />,
  Facebook: <ExternalLink size={14} className="text-blue-500" />,
  Twitch: <ExternalLink size={14} className="text-purple-400" />,
  LinkedIn: <ExternalLink size={14} className="text-blue-600" />,
  Discord: <ExternalLink size={14} className="text-indigo-400" />,
  GitHub: <ExternalLink size={14} className="text-gray-400" />,
  Spotify: <ExternalLink size={14} className="text-green-400" />,
  default: <ExternalLink size={14} className="text-primary" />,
};

function Confetti() {
  const particles = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 4 + Math.random() * 6,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: -20,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

function SparkleEffect() {
  const sparkles = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      delay: i * 0.05,
    })), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, Math.cos(sparkle.angle * Math.PI / 180) * 30],
            y: [0, Math.sin(sparkle.angle * Math.PI / 180) * 30],
          }}
          transition={{
            duration: 0.6,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function UnlockPage() {
  const { id: code } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [justCompletedTask, setJustCompletedTask] = useState<string | null>(null);

  const { data: linkData, isLoading: linkLoading, error: linkError } = useQuery({
    queryKey: ['/api/links', code],
    queryFn: async () => {
      const res = await fetch(`/api/links/${code}`);
      if (!res.ok) throw new Error('Link not found');
      return res.json();
    },
    enabled: !!code,
  });

  const link: LockedLink | undefined = linkData?.link;
  const creator: Creator | undefined = linkData?.creator;

  const { data: attemptData, isLoading: attemptLoading } = useQuery({
    queryKey: ['/api/unlock', link?.id],
    queryFn: async () => {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId: link!.id }),
      });
      if (!res.ok) throw new Error('Failed to create unlock attempt');
      return res.json();
    },
    enabled: !!link?.id,
  });

  const attempt: UnlockAttempt | undefined = attemptData?.attempt;

  const updateAttemptMutation = useMutation({
    mutationFn: async (data: { completedActions: string[]; unlocked: boolean; unlockedAt?: string }) => {
      const res = await fetch(`/api/unlock/${attempt!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update unlock attempt');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/unlock', link?.id] });
    },
  });

  const completedActions = attempt?.parsedCompletedActions || [];
  const tasks = link?.parsedRequiredActions || [];
  const allDone = tasks.length > 0 && tasks.every(t => 
    completedActions.includes(`${t.connectionId}-${t.action}`)
  );
  const progress = tasks.length > 0 
    ? (completedActions.length / tasks.length) * 100 
    : 0;

  useEffect(() => {
    if (allDone && !attempt?.unlocked && attempt?.id) {
      setShowConfetti(true);
      updateAttemptMutation.mutate({
        completedActions,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      });
      setTimeout(() => setShowConfetti(false), 4000);
      
      if (link?.targetUrl === "__FILES__") {
        setTimeout(() => {
          window.location.href = `/download/${code}`;
        }, 2000);
      }
    }
  }, [allDone, attempt?.unlocked, attempt?.id, link?.targetUrl, code]);

  const handleTaskClick = async (task: RequiredAction) => {
    const actionKey = `${task.connectionId}-${task.action}`;
    
    if (completedActions.includes(actionKey)) return;
    
    if (task.url) {
      window.open(task.url, "_blank");
    }

    const newCompletedActions = [...completedActions, actionKey];
    setJustCompletedTask(actionKey);
    
    await updateAttemptMutation.mutateAsync({
      completedActions: newCompletedActions,
      unlocked: newCompletedActions.length === tasks.length,
      unlockedAt: newCompletedActions.length === tasks.length ? new Date().toISOString() : undefined,
    });

    setTimeout(() => setJustCompletedTask(null), 600);
  };

  const handleAccessContent = () => {
    if (link?.targetUrl === "__FILES__") {
      window.location.href = `/download/${code}`;
    } else if (link?.targetUrl) {
      window.open(link.targetUrl, "_blank");
    }
  };

  const getIcon = (platform: string) => platformIcons[platform] || platformIcons.default;

  const isTaskDone = (task: RequiredAction) => 
    completedActions.includes(`${task.connectionId}-${task.action}`);

  if (linkLoading || attemptLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-3">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
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
          <p className="text-sm text-muted-foreground mb-4">This unlock link doesn't exist or has expired.</p>
          <Link href="/">
            <a className="text-primary text-sm hover:underline">Go to Homepage</a>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <motion.div 
        className="w-full max-w-xs"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="bg-card border border-border rounded overflow-hidden">
          <motion.div 
            className="relative overflow-hidden"
            animate={allDone ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="h-20 bg-primary relative"
              style={creator?.bannerImage ? { 
                backgroundImage: `url(${creator.bannerImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              } : {}}
              data-testid="img-creator-banner"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="relative px-4 -mt-6">
              <div className="flex items-end gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-card flex-shrink-0"
                  data-testid="img-creator-avatar"
                >
                  {creator?.profileImage ? (
                    <img 
                      src={creator.profileImage} 
                      alt={creator.displayName || "Creator"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-primary-foreground">
                      {(creator?.displayName || "C").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-foreground" data-testid="text-creator-name">
                    {creator?.displayName || "Creator"}
                  </p>
                </div>
              </div>
              
              {creator?.audienceMessage && (
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed" data-testid="text-audience-message">
                  {creator.audienceMessage}
                </p>
              )}
              
              <div className="flex items-center justify-center gap-2 py-3 border-t border-border/50 -mx-4 px-4 bg-secondary/30">
                <motion.div 
                  className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center relative"
                  animate={allDone ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    {allDone ? (
                      <motion.div
                        key="unlocked"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Unlock size={16} className="text-primary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="locked"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Lock size={16} className="text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {allDone && <SparkleEffect />}
                </motion.div>
                <div>
                  <motion.h1 
                    className="text-sm font-medium text-foreground"
                    layout
                  >
                    {allDone ? "Content Unlocked!" : "Unlock This Content"}
                  </motion.h1>
                  <p className="text-muted-foreground text-xs">
                    {allDone 
                      ? "You now have full access" 
                      : "Complete the steps below"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-foreground">Progress</span>
                <span className="text-xs text-muted-foreground" data-testid="text-progress">
                  {completedActions.length}/{tasks.length}
                </span>
              </div>
              <div className="h-1 bg-secondary rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {tasks.map((task, index) => {
                  const taskKey = `${task.connectionId}-${task.action}`;
                  const done = isTaskDone(task);
                  const isJustCompleted = justCompletedTask === taskKey;

                  return (
                    <motion.button 
                      key={taskKey}
                      onClick={() => !done && handleTaskClick(task)}
                      disabled={done || updateAttemptMutation.isPending}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={!done ? { scale: 1.02 } : {}}
                      whileTap={!done ? { scale: 0.98 } : {}}
                      className={`w-full p-2.5 rounded border flex items-center justify-between transition-colors ${
                        done 
                          ? 'border-green-700/50 bg-green-900/20' 
                          : 'border-border bg-card hover:border-primary cursor-pointer'
                      }`}
                      data-testid={`button-task-${task.connectionId}`}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`w-6 h-6 rounded flex items-center justify-center ${
                            done ? 'bg-green-900/30' : 'bg-secondary'
                          }`}
                          animate={isJustCompleted ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {getIcon(task.platform)}
                        </motion.div>
                        <span className={`text-xs font-medium ${done ? 'text-green-400' : 'text-foreground'}`}>
                          {task.action} on {task.platform}
                        </span>
                      </div>
                      <AnimatePresence mode="wait">
                        {done ? (
                          <motion.div 
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center"
                          >
                            <Check size={10} className="text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="arrow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <ArrowRight size={14} className="text-muted-foreground" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {allDone ? (
                <motion.button 
                  key="access"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccessContent}
                  className="w-full bg-primary text-primary-foreground py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5"
                  data-testid="button-unlock"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Sparkles size={12} />
                  </motion.div>
                  Access Your Content
                </motion.button>
              ) : (
                <motion.div 
                  key="pending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-secondary text-muted-foreground py-2 rounded text-xs text-center"
                >
                  Complete all steps to unlock
                </motion.div>
              )}
            </AnimatePresence>
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
