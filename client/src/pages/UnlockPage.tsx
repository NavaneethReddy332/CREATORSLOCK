import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Unlock, ArrowRight, ShieldCheck, Terminal } from "lucide-react";

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
    <div className="min-h-screen bg-black font-mono flex items-center justify-center p-4">
      
      <div className="w-full max-w-[320px] border border-gray-800 bg-black relative">
        {/* CORNER MARKERS */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-blue-600"></div>
        <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-blue-600"></div>
        <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-blue-600"></div>
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-blue-600"></div>

        {/* HEADER */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/10">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-blue-500" />
            <span className="text-[10px] text-white uppercase tracking-widest">SECURE.GATE</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${allDone ? 'bg-blue-600' : 'bg-gray-800'}`}></div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              {allDone ? (
                <Unlock size={24} className="text-blue-500" />
              ) : (
                <Lock size={24} className="text-gray-600" />
              )}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
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
                    ? 'border-blue-900/50 bg-blue-900/10 text-blue-400' 
                    : 'border-gray-800 bg-black text-gray-500 hover:border-gray-600 hover:text-white'
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
                ? 'bg-blue-600 text-white hover:bg-blue-500' 
                : 'bg-gray-900 text-gray-600 cursor-not-allowed'
            }`}
          >
            {allDone ? "ACCESS GRANTED" : "AWAITING AUTH"}
          </button>

        </div>

        {/* FOOTER */}
        <div className="p-2 border-t border-gray-800 flex justify-center">
          <span className="text-[8px] text-gray-700 uppercase">Encrypted by YOU RISE</span>
        </div>

      </div>
    </div>
  );
}
