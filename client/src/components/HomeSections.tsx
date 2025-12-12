import { motion } from "framer-motion";
import { Link } from "wouter";
import { Link as LinkIcon, Share2, Lock, BarChart3, Users, Zap, ArrowRight, Activity, Database, Globe } from "lucide-react";

export function Hero() {
  return (
    <div className="w-full max-w-[1200px] mx-auto border-x border-gray-800 min-h-screen flex flex-col">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="border-b border-gray-800 p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-1 bg-blue-600"></div>
            <span className="text-[9px] text-blue-500 uppercase tracking-widest">Protocol initialized</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-medium text-white uppercase leading-[0.9] tracking-tighter mb-6">
            Control<br/>
            Access<br/>
            Parameters
          </h1>
          <p className="text-[11px] text-gray-500 max-w-sm leading-relaxed border-l border-gray-800 pl-4">
            A precise mechanism for content distribution. Gate URLs behind mandatory interaction protocols. Zero latency. Zero friction.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ backgroundColor: "#1e40af", color: "#ffffff" }}
              className="bg-blue-900/20 text-blue-500 border border-blue-900/50 px-6 py-3 text-[10px] uppercase tracking-widest w-full text-center hover:border-blue-600 transition-colors"
            >
              Start Sequence
            </motion.button>
          </Link>
          <div className="flex justify-between items-center text-[9px] text-gray-700 px-1">
             <span>V.2.0.4</span>
             <span>SECURE</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRICS BAR */}
      <section className="border-b border-gray-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
        {[
          { label: "Active Nodes", val: "8,492" },
          { label: "Gateways", val: "24.5k" },
          { label: "Throughput", val: "99.9%" },
          { label: "Latency", val: "<40ms" }
        ].map((stat, i) => (
          <div key={i} className="p-4 hover:bg-gray-900/30 transition-colors">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-sm text-white font-mono">{stat.val}</p>
          </div>
        ))}
      </section>

      {/* SECTION 3: FEATURES GRID */}
      <section className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
        
        {/* COL 1 */}
        <div className="p-8 flex flex-col justify-between hover:bg-gray-900/10 transition-colors">
          <div>
            <div className="w-6 h-6 border border-gray-800 flex items-center justify-center mb-6 text-gray-400">
              <LinkIcon size={12} />
            </div>
            <h3 className="text-white text-xs mb-2">Smart Linking</h3>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Generate encrypted gateways for any URL. Direct traffic flow through mandatory checkpoints.
            </p>
          </div>
          <div className="border-t border-dotted border-gray-800 mt-8 pt-2">
             <span className="text-[9px] text-gray-700">MOD.01</span>
          </div>
        </div>

        {/* COL 2 */}
        <div className="p-8 flex flex-col justify-between hover:bg-gray-900/10 transition-colors">
          <div>
            <div className="w-6 h-6 border border-gray-800 flex items-center justify-center mb-6 text-gray-400">
              <Database size={12} />
            </div>
            <h3 className="text-white text-xs mb-2">Secure Storage</h3>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Files hosted in secure vaults. Access granted only upon verification of social protocols.
            </p>
          </div>
          <div className="border-t border-dotted border-gray-800 mt-8 pt-2">
             <span className="text-[9px] text-gray-700">MOD.02</span>
          </div>
        </div>

        {/* COL 3 */}
        <div className="p-8 flex flex-col justify-between hover:bg-gray-900/10 transition-colors">
          <div>
            <div className="w-6 h-6 border border-gray-800 flex items-center justify-center mb-6 text-gray-400">
              <Activity size={12} />
            </div>
            <h3 className="text-white text-xs mb-2">Real-time Telemetry</h3>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Monitor engagement metrics with millisecond precision. Full audit logs of user interaction.
            </p>
          </div>
          <div className="border-t border-dotted border-gray-800 mt-8 pt-2">
             <span className="text-[9px] text-gray-700">MOD.03</span>
          </div>
        </div>

      </section>

      {/* SECTION 4: CONTACT / TERMINAL */}
      <section id="contact" className="border-t border-gray-800 p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
             <h2 className="text-white text-sm mb-6 flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-600"></span>
               TRANSMISSION UPLINK
             </h2>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-[9px] text-gray-600 uppercase">Identity</label>
                   <input type="text" className="w-full bg-black border border-gray-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none transition-colors" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[9px] text-gray-600 uppercase">Frequency</label>
                   <input type="email" className="w-full bg-black border border-gray-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none transition-colors" />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-[9px] text-gray-600 uppercase">Payload</label>
                 <textarea rows={3} className="w-full bg-black border border-gray-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none transition-colors"></textarea>
               </div>
               <button className="bg-white text-black px-6 py-2 text-[10px] uppercase font-bold hover:bg-blue-600 hover:text-white transition-colors w-full md:w-auto">
                 Transmit
               </button>
             </form>
          </div>

          <div className="font-mono text-[10px] text-gray-600 space-y-2 hidden md:block">
            <p className="text-blue-500">&gt;&gt; SYSTEM READY</p>
            <p>&gt;&gt; LISTENING ON PORT 443...</p>
            <p>&gt;&gt; WAITING FOR INPUT...</p>
            <div className="h-32 border-l border-dotted border-gray-800 ml-1 mt-4"></div>
          </div>
        </div>
      </section>

    </div>
  );
}

// These are kept empty to satisfy imports if any, but logic moved to Hero
export function ServicesGrid() { return null; }
export function AboutSection() { return null; }
export function ContactSection() { return null; }
