import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Unlock, Youtube, Instagram, ArrowRight } from "lucide-react";

export default function UnlockPage() {
  const [tasks, setTasks] = useState([
    { id: 1, type: "YouTube", action: "Subscribe", label: "Visit YouTube Channel", done: false, url: "#" },
    { id: 2, type: "Instagram", action: "Follow", label: "Check Instagram Profile", done: false, url: "#" },
    { id: 3, type: "TikTok", action: "Follow", label: "Visit TikTok", done: false, url: "#" }
  ]);

  const allDone = tasks.every(t => t.done);

  const handleTaskClick = (id: number) => {
    // Simulate visiting link then marking done
    window.open("#", "_blank");
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  return (
    <div className="min-h-screen bg-black text-red-600 font-sans flex items-center justify-center p-4">
      
      <div className="w-full max-w-md border border-red-600 p-1 relative">
        {/* Decorative Corners */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-600"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-600"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-600"></div>

        <div className="bg-black p-8 border border-red-900/30">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 border-2 border-red-600 rounded-full mx-auto flex items-center justify-center mb-4">
               {allDone ? <Unlock size={24} /> : <Lock size={24} />}
            </div>
            <h1 className="text-2xl font-mono font-bold uppercase mb-2">Restricted Content</h1>
            <p className="text-xs font-mono text-red-800 uppercase tracking-widest">
              Complete tasks to decrypt link
            </p>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div 
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className={`border ${task.done ? 'border-red-900 bg-red-950/10' : 'border-red-600'} p-4 flex items-center justify-between transition-colors`}
              >
                <div className="flex items-center gap-3">
                  {task.type === "YouTube" && <Youtube size={16} />}
                  {task.type === "Instagram" && <Instagram size={16} />}
                  {task.type === "TikTok" && <div className="w-4 h-4 border border-red-600 flex items-center justify-center text-[8px] font-bold">T</div>}
                  <span className="text-sm font-mono uppercase">{task.label}</span>
                </div>

                {task.done ? (
                  <div className="bg-red-900/20 p-1 rounded-sm">
                    <Check size={14} className="text-red-500" />
                  </div>
                ) : (
                  <button 
                    onClick={() => handleTaskClick(task.id)}
                    className="bg-red-600 text-black text-[10px] font-bold px-3 py-1 uppercase hover:bg-white transition-colors"
                  >
                    Visit
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <button 
              disabled={!allDone}
              className={`w-full py-4 font-mono font-bold uppercase tracking-widest text-sm border transition-all ${
                allDone 
                  ? 'bg-red-600 text-black border-red-600 hover:bg-white hover:text-black cursor-pointer' 
                  : 'bg-transparent text-red-900 border-red-900 cursor-not-allowed opacity-50'
              }`}
            >
              {allDone ? "Access Granted // Get Link" : "Access Denied // Tasks Pending"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
