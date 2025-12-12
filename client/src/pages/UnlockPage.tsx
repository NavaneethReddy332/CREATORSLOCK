import { useState } from "react";
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
      case "YouTube": return <Youtube size={14} className="text-red-400" />;
      case "Instagram": return <Instagram size={14} className="text-pink-400" />;
      default: return <ExternalLink size={14} className="text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <div className="w-full max-w-xs">
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="bg-primary p-4 text-white text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-white/20 rounded flex items-center justify-center">
              {allDone ? (
                <Unlock size={20} className="text-white" />
              ) : (
                <Lock size={20} className="text-white" />
              )}
            </div>
            <h1 className="text-sm font-medium mb-0.5">
              {allDone ? "Content Unlocked!" : "Unlock This Content"}
            </h1>
            <p className="text-white/70 text-xs">
              {allDone 
                ? "You now have full access" 
                : "Complete the steps below to unlock"}
            </p>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-foreground">Progress</span>
                <span className="text-xs text-muted-foreground">
                  {tasks.filter(t => t.done).length}/{tasks.length}
                </span>
              </div>
              <div className="h-1 bg-secondary rounded overflow-hidden">
                <div 
                  className="h-full bg-primary rounded transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {tasks.map((task) => (
                <button 
                  key={task.id}
                  onClick={() => !task.done && handleTaskClick(task.id)}
                  disabled={task.done}
                  className={`w-full p-2.5 rounded border flex items-center justify-between transition-colors ${
                    task.done 
                      ? 'border-green-700/50 bg-green-900/20' 
                      : 'border-border bg-card hover:border-primary cursor-pointer'
                  }`}
                  data-testid={`button-task-${task.id}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${
                      task.done ? 'bg-green-900/30' : 'bg-secondary'
                    }`}>
                      {getIcon(task.platform)}
                    </div>
                    <span className={`text-xs font-medium ${task.done ? 'text-green-400' : 'text-foreground'}`}>
                      {task.label}
                    </span>
                  </div>
                  {task.done ? (
                    <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  ) : (
                    <ArrowRight size={14} className="text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>

            {allDone ? (
              <button 
                className="w-full bg-primary text-primary-foreground py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5"
                data-testid="button-unlock"
              >
                <Sparkles size={12} />
                Access Your Content
              </button>
            ) : (
              <div className="w-full bg-secondary text-muted-foreground py-2 rounded text-xs text-center">
                Complete all steps to unlock
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
      </div>
    </div>
  );
}
