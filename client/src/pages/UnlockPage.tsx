import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Unlock, Youtube, Instagram, ArrowRight, ShieldCheck } from "lucide-react";

export default function UnlockPage() {
  const [tasks, setTasks] = useState([
    { id: 1, type: "YouTube", action: "Subscribe", label: "Subscribe to Channel", done: false, url: "#" },
    { id: 2, type: "Instagram", action: "Follow", label: "Follow on Instagram", done: false, url: "#" },
    { id: 3, type: "TikTok", action: "Follow", label: "Follow on TikTok", done: false, url: "#" }
  ]);

  const allDone = tasks.every(t => t.done);

  const handleTaskClick = (id: number) => {
    // Simulate visiting link then marking done
    window.open("#", "_blank");
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-xl shadow-black/20 overflow-hidden border border-border">
          
          {/* Header Section */}
          <div className="bg-slate-950 p-8 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,#fff_0%,transparent_50%)]"></div>
             
             <div className="relative z-10">
               <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-500 ${allDone ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-white/10 text-white backdrop-blur-sm'}`}>
                  {allDone ? <Unlock size={32} /> : <Lock size={32} />}
               </div>
               <h1 className="text-xl font-bold mb-2">Exclusive Content</h1>
               <p className="text-slate-400 text-sm">
                 Complete the steps below to unlock.
               </p>
             </div>
          </div>

          <div className="p-8">
            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.button 
                  key={task.id}
                  onClick={() => !task.done && handleTaskClick(task.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={task.done}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all border ${
                    task.done 
                      ? 'bg-green-500/10 border-green-500/20 cursor-default' 
                      : 'bg-background border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      task.type === 'YouTube' ? 'bg-red-500/10 text-red-400' : 
                      task.type === 'Instagram' ? 'bg-pink-500/10 text-pink-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {task.type === "YouTube" && <Youtube size={20} />}
                      {task.type === "Instagram" && <Instagram size={20} />}
                      {task.type === "TikTok" && <span className="font-bold text-xs">TK</span>}
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${task.done ? 'text-green-400' : 'text-foreground'}`}>{task.label}</p>
                      <p className="text-xs text-muted-foreground">{task.action}</p>
                    </div>
                  </div>

                  {task.done ? (
                    <div className="bg-green-500/20 text-green-400 p-1.5 rounded-full">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="bg-accent text-muted-foreground p-1.5 rounded-full group-hover:bg-primary/20 group-hover:text-primary">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <button 
                disabled={!allDone}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  allDone 
                    ? 'bg-primary text-primary-foreground shadow-blue-500/20 hover:brightness-110 transform hover:-translate-y-1' 
                    : 'bg-accent text-muted-foreground cursor-not-allowed shadow-none'
                }`}
              >
                {allDone ? "Continue to Link" : "Complete Steps to Unlock"}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck size={12} />
                <span>Securely protected by CreatorLock</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
