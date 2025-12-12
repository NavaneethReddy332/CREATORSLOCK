import { motion } from "framer-motion";
import { Link } from "wouter";
import { Link as LinkIcon, Share2, Lock, BarChart3, Users, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#3333330a_1px,transparent_1px),linear-gradient(to_bottom,#3333330a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl px-4 flex flex-col items-center"
      >
        <span className="bg-gray-900 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-gray-800 inline-block">
          New: TikTok Integration Available
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Unlock the power of<br />
          <span className="text-blue-500">hidden content.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The simplest way to grow your audience. Lock your exclusive files and links behind social actions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-500 transition-all border border-blue-500"
            >
              Start for Free
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white font-semibold px-8 py-4 rounded-xl text-lg border border-gray-700 hover:bg-gray-900 transition-all"
          >
            View Demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

const features = [
  { icon: LinkIcon, title: "Smart Links", desc: "Gate any URL behind social actions instantly." },
  { icon: Users, title: "Grow Audience", desc: "Convert casual visitors into loyal followers." },
  { icon: Lock, title: "Secure Hosting", desc: "We host your files securely until unlocked." },
  { icon: Zap, title: "Instant Setup", desc: "No coding required. Live in seconds." },
  { icon: BarChart3, title: "Analytics", desc: "Track every click and unlock in real-time." },
  { icon: Share2, title: "Viral Sharing", desc: "Optimized for sharing across all platforms." },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-black rounded-3xl border border-gray-800 shadow-sm mx-4 md:mx-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Everything you need</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Powerful tools to help you manage your content and grow your reach, all in one simple dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gray-900/20 hover:bg-gray-900 hover:shadow-xl transition-all border border-gray-800 hover:border-gray-700 group"
            >
              <div className="w-12 h-12 bg-gray-900 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-gray-800">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
           <div className="bg-black p-6 rounded-2xl border border-gray-800 shadow-sm hover:border-blue-900 transition-colors">
             <span className="text-5xl font-bold text-gray-800 block mb-4">01</span>
             <h4 className="text-lg font-bold text-white mb-2">Create Link</h4>
             <p className="text-gray-500">Upload your file or paste your destination link.</p>
           </div>
           <div className="bg-black p-6 rounded-2xl border border-gray-800 shadow-sm hover:border-blue-900 transition-colors">
             <span className="text-5xl font-bold text-gray-800 block mb-4">02</span>
             <h4 className="text-lg font-bold text-white mb-2">Set Tasks</h4>
             <p className="text-gray-500">Choose what users must do (Subscribe, Follow, Like).</p>
           </div>
           <div className="bg-black p-6 rounded-2xl border border-gray-800 shadow-sm hover:border-blue-900 transition-colors">
             <span className="text-5xl font-bold text-gray-800 block mb-4">03</span>
             <h4 className="text-lg font-bold text-white mb-2">Get Results</h4>
             <p className="text-gray-500">Watch your social metrics grow automatically.</p>
           </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black text-white rounded-t-[3rem] mt-20 border-t border-gray-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Get in touch</h2>
        <p className="text-gray-500 mb-12">Have questions? We're here to help you get the most out of Creator Lock.</p>
        
        <form className="space-y-4 text-left bg-gray-900/20 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Name</label>
              <input 
                type="text" 
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-700"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Email</label>
              <input 
                type="email" 
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-700"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-700"
              placeholder="How can we help?"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
