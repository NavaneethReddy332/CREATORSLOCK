import { motion } from "framer-motion";
import { Link } from "wouter";
import { Link2, BarChart3, Shield, Zap, Users, Rocket, ArrowRight, Check } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Hero() {
  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Zap size={14} />
            <span>The smart way to grow your audience</span>
          </motion.div>
          
          <motion.h1 
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
          >
            Turn Every Link Into
            <span className="gradient-text block mt-2">Audience Growth</span>
          </motion.h1>
          
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          >
            Lock your best content behind social follows. Your visitors subscribe, 
            follow, and engage before unlocking. Simple, effective, powerful.
          </motion.p>
          
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth" data-testid="button-hero-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="gradient-primary text-white px-8 py-4 rounded-full text-base font-semibold shadow-glow flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Start Growing Free
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/unlock/demo-123" data-testid="button-hero-demo">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border-2 border-border text-foreground px-8 py-4 rounded-full text-base font-semibold shadow-soft w-full sm:w-auto"
              >
                See It In Action
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="gradient-border p-1 rounded-2xl shadow-card max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { label: "Active Creators", value: "10K+", icon: Users },
                  { label: "Links Generated", value: "500K+", icon: Link2 },
                  { label: "New Followers", value: "2M+", icon: Rocket },
                  { label: "Conversion Rate", value: "73%", icon: BarChart3 },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon size={20} className="text-primary" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start growing your audience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              step: "1", 
              title: "Create Your Lock", 
              desc: "Paste any URL and choose which social actions are required to unlock it.",
              icon: Link2
            },
            { 
              step: "2", 
              title: "Share Your Link", 
              desc: "Share your locked link anywhere - social media, emails, or your website.",
              icon: Rocket
            },
            { 
              step: "3", 
              title: "Watch Growth Happen", 
              desc: "Visitors complete actions to unlock content, and you gain real followers.",
              icon: BarChart3
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-border/50 relative overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 right-0 w-20 h-20 gradient-primary opacity-5 rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <item.icon size={24} className="text-white" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">STEP {item.step}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-border/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Everything You Need to
                <span className="gradient-text block">Grow Your Audience</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Connect YouTube, Instagram, TikTok & more",
                  "Beautiful, branded unlock pages",
                  "Real-time analytics dashboard",
                  "Unlimited locked links",
                  "Works with any content or URL",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/auth" data-testid="button-features-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 gradient-primary text-white px-6 py-3 rounded-full text-base font-semibold shadow-glow flex items-center gap-2"
                >
                  Get Started Now
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 via-pink-500/20 to-blue-500/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="w-full max-w-xs bg-white rounded-xl shadow-card p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Shield size={20} className="text-primary" />
                    <span className="font-semibold">Content Locked</span>
                  </div>
                  {["Subscribe on YouTube", "Follow on Instagram"].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-sm">{task}</span>
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <Check size={12} className="text-primary" />
                      </div>
                    </div>
                  ))}
                  <button className="w-full gradient-primary text-white py-3 rounded-lg font-medium">
                    Unlock Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="gradient-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Audience?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Join thousands of creators using YouRise to turn every piece of content into growth.
            </p>
            <Link href="/auth" data-testid="button-cta-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-primary px-8 py-4 rounded-full text-base font-semibold shadow-lg inline-flex items-center gap-2"
              >
                Start Free Today
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesGrid() { return null; }
export function AboutSection() { return null; }
export function ContactSection() { return null; }
