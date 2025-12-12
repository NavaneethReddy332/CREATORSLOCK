import { useState } from "react";
import { Check, Lock, Unlock, ArrowRight, Terminal } from "lucide-react";

export default function UnlockPage() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "SUBSCRIBE.YT", done: false },
    { id: 2, label: "FOLLOW.IG", done: false },
    { id: 3, label: "FOLLOW.TK", done: false }
  ]);

  const allDone = tasks.every(t => t.done);

  const handleTaskClick = (id: number) => {
    window.open("#", "_blank");
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  return (
    <div className="min-h-screen bg-bg-main font-mono flex items-center justify-center p-4">
      
      <div className="w-full max-w-[320px] border border-border-main bg-bg-main relative">
        {/* CORNER MARKERS */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-accent-main"></div>
        <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-accent-main"></div>
        <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-accent-main"></div>
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-accent-main"></div>

        {/* HEADER */}
        <div className="p-4 border-b border-border-main flex justify-between items-center bg-border-dim">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-accent-main" />
            <span className="text-[10px] text-fg-primary uppercase tracking-widest">SECURE.GATE</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${allDone ? 'bg-accent-main' : 'bg-border-main'}`}></div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              {allDone ? (
                <Unlock size={24} className="text-accent-main" />
              ) : (
                <Lock size={24} className="text-fg-muted" />
              )}
            </div>
            <p className="text-[10px] text-fg-secondary uppercase tracking-widest">
              Auth Required
            </p>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <button 
                key={task.id}
                onClick={() => !task.done && handleTaskClick(task.id)}
                disabled={task.done}
                className={`w-full p-3 border text-[10px] uppercase tracking-wider flex items-center justify-between transition-all group ${
                  task.done 
                    ? 'border-accent-main/50 bg-accent-dim text-accent-main' 
                    : 'border-border-main bg-bg-main text-fg-secondary hover:border-fg-muted hover:text-fg-primary'
                }`}
              >
                <span>{task.label}</span>
                {task.done ? (
                  <Check size={10} />
                ) : (
                  <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>

          <button 
            disabled={!allDone}
            className={`w-full py-3 text-[10px] uppercase font-bold tracking-widest transition-all ${
              allDone 
                ? 'bg-accent-main text-fg-primary hover:bg-accent-main/80' 
                : 'bg-border-dim text-fg-muted cursor-not-allowed'
            }`}
          >
            {allDone ? "ACCESS GRANTED" : "AWAITING AUTH"}
          </button>

        </div>

        {/* FOOTER */}
        <div className="p-2 border-t border-border-main flex justify-center">
          <span className="text-[8px] text-fg-muted uppercase">Encrypted by YOU RISE</span>
        </div>

      </div>
    </div>
  );
}
