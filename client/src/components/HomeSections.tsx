import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20 relative overflow-hidden">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(to right, #ff0000 1px, transparent 1px), linear-gradient(to bottom, #ff0000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl px-4"
      >
        <h1 className="text-5xl md:text-8xl font-bold font-mono tracking-tighter mb-6 text-red-600 uppercase">
          Lock Your<br />Content
        </h1>
        <p className="text-red-700 text-sm md:text-base max-w-lg mx-auto mb-10 font-mono leading-relaxed tracking-wide">
          GATE YOUR FILES. GROW YOUR SOCIALS.<br />
          THE STRICTEST WAY TO CONVERT AUDIENCE INTO FOLLOWERS.
        </p>
        
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-black font-bold px-10 py-4 text-sm tracking-widest uppercase border border-red-600 hover:bg-black hover:text-red-600 transition-colors"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

const features = [
  { title: "CREATE UNLOCK LINKS", desc: "Gate any URL behind social actions." },
  { title: "ADD CONNECTIONS", desc: "YouTube, Instagram, TikTok supported." },
  { title: "HOST FILES", desc: "Direct file hosting for your assets." },
  { title: "ENCOURAGE SUPPORT", desc: "Convert traffic into subscribers." },
  { title: "TRACK ENGAGEMENT", desc: "Monitor clicks and unlocks." },
  { title: "SHARE ANYWHERE", desc: "One link for all platforms." },
];

export function ServicesGrid() {
  return (
    <section className="py-20 border-t border-red-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-red-900">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
            className="border-r border-b border-red-900 p-10 hover:bg-red-950/10 transition-colors group cursor-default"
          >
            <h3 className="text-red-600 font-mono font-bold text-lg mb-4 uppercase group-hover:underline decoration-1 underline-offset-4">
              {feature.title}
            </h3>
            <p className="text-red-800 text-xs font-mono uppercase tracking-wide">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-b border-red-900">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-mono font-bold text-red-600 mb-8 uppercase">About System</h2>
        <p className="text-red-700 font-mono text-sm leading-8">
          This platform operates on a simple principle: Value for Value. 
          You provide content; your audience provides attention. 
          We facilitate the exchange with zero friction and zero distraction.
          No ads. No clutter. Just raw engagement mechanics.
        </p>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-xl">
        <h2 className="text-3xl font-mono font-bold text-red-600 mb-8 uppercase">Contact Protocol</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs text-red-600 font-mono uppercase">Identifier / Name</label>
            <input 
              type="text" 
              className="w-full bg-black border border-red-800 p-3 text-red-500 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-red-600 font-mono uppercase">Communication / Email</label>
            <input 
              type="email" 
              className="w-full bg-black border border-red-800 p-3 text-red-500 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-red-600 font-mono uppercase">Payload / Message</label>
            <textarea 
              rows={4}
              className="w-full bg-black border border-red-800 p-3 text-red-500 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <button className="w-full bg-red-900/20 hover:bg-red-600 hover:text-black text-red-600 border border-red-600 py-3 font-mono text-xs uppercase tracking-widest transition-all">
            Transmit Data
          </button>
        </form>
      </div>
    </section>
  );
}
