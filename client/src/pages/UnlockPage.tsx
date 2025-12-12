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
    <div className="min-h-screen bg-black font-sans flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        <div className="bg-black rounded-3xl shadow-xl shadow-blue-900/10 overflow-hidden border border-gray-800">
          
          {/* Header Section */}
          <div className="bg-gray-900/50 p-8 text-white text-center relative overflow-hidden border-b border-gray-800">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,#fff_0%,transparent_50%)]"></div>
             
             <div className="relative z-10">
               <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-500 ${allDone ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-800 text-white backdrop-blur-sm'}`}>
                  {allDone ? <Unlock size={32} /> : <Lock size={32} />}
               </div>
               <h1 className="text-xl font-bold mb-2">Exclusive Content</h1>
               <p className="text-gray-400 text-sm">
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
                      ? 'bg-blue-900/10 border-blue-900/30 cursor-default' 
                      : 'bg-black border-gray-800 hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 text-gray-400 border border-gray-800`}>
                      {task.type === "YouTube" && <Youtube size={20} />}
                      {task.type === "Instagram" && <Instagram size={20} />}
                      {task.type === "TikTok" && <span className="font-bold text-xs">TK</span>}
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${task.done ? 'text-blue-400' : 'text-white'}`}>{task.label}</p>
                      <p className="text-xs text-gray-500">{task.action}</p>
                    </div>
                  </div>

                  {task.done ? (
                    <div className="bg-blue-600/20 text-blue-400 p-1.5 rounded-full">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="bg-gray-900 text-gray-500 p-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
                    ? 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500 transform hover:-translate-y-1' 
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed shadow-none border border-gray-800'
                }`}
              >
                {allDone ? "Continue to Link" : "Complete Steps to Unlock"}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
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
