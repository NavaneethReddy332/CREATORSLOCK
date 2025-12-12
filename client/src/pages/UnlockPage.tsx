import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Unlock, ArrowRight, Youtube, Instagram, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function UnlockPage() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Subscribe on YouTube", platform: "YouTube", done: false },
    { id: 2, label: "Follow on Instagram", platform: "Instagram", done: false },
  ]);

  const allDone = tasks.every(t => t.done);
  const progress = (tasks.filter(t => t.done).length / tasks.length) * 100;

  const handleTaskClick = (id: number) => {
    window.open("#", "_blank");
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case "YouTube": return <Youtube size={20} className="text-red-500" />;
      case "Instagram": return <Instagram size={20} className="text-pink-500" />;
      default: return <ExternalLink size={20} className="text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-3xl shadow-card border border-border/50 overflow-hidden">
          <div className="gradient-primary p-6 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="relative z-10">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center"
              >
                {allDone ? (
                  <Unlock size={32} className="text-white" />
                ) : (
                  <Lock size={32} className="text-white" />
                )}
              </motion.div>
              <h1 className="text-xl font-bold mb-1">
                {allDone ? "Content Unlocked!" : "Unlock This Content"}
              </h1>
              <p className="text-white/80 text-sm">
                {allDone 
                  ? "You now have full access" 
                  : "Complete the steps below to unlock"}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {tasks.filter(t => t.done).length} of {tasks.length}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {tasks.map((task, index) => (
                <motion.button 
                  key={task.id}
                  onClick={() => !task.done && handleTaskClick(task.id)}
                  disabled={task.done}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all group ${
                    task.done 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-border bg-white hover:border-primary hover:shadow-md cursor-pointer'
                  }`}
                  data-testid={`button-task-${task.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      task.done ? 'bg-green-100' : 'bg-secondary'
                    }`}>
                      {getIcon(task.platform)}
                    </div>
                    <span className={`font-medium ${task.done ? 'text-green-700' : 'text-foreground'}`}>
                      {task.label}
                    </span>
                  </div>
                  {task.done ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  ) : (
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  )}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {allDone ? (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full gradient-primary text-white py-4 rounded-xl font-semibold shadow-glow flex items-center justify-center gap-2"
                  data-testid="button-unlock"
                >
                  <Sparkles size={18} />
                  Access Your Content
                </motion.button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-secondary text-muted-foreground py-4 rounded-xl font-medium text-center"
                >
                  Complete all steps to unlock
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/30 flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-md gradient-primary flex items-center justify-center">
              <Sparkles size={10} className="text-white" />
            </div>
            <span className="text-xs text-muted-foreground">
              Powered by <Link href="/"><a className="font-medium text-primary hover:underline">YouRise</a></Link>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
