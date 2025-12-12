import { Link } from "wouter";
import { Link2, BarChart3, Shield, Zap, Users, Rocket, ArrowRight, Check } from "lucide-react";

export function Hero() {
  return (
    <div className="w-full">
      <section className="max-w-5xl mx-auto px-3 py-10 md:py-14">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-secondary text-primary px-2.5 py-1 rounded text-xs font-medium mb-4">
            <Zap size={12} />
            <span>The smart way to grow your audience</span>
          </div>
          
          <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            Turn Every Link Into
            <span className="text-primary block mt-1">Audience Growth</span>
          </h1>
          
          <p className="text-sm text-muted-foreground mb-5 max-w-lg mx-auto">
            Lock your best content behind social follows. Your visitors subscribe, 
            follow, and engage before unlocking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/auth" data-testid="button-hero-start">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 w-full sm:w-auto">
                Start Growing Free
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/unlock/demo-123" data-testid="button-hero-demo">
              <button className="bg-card border border-border text-foreground px-4 py-2 rounded text-xs font-medium w-full sm:w-auto">
                See It In Action
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <div className="bg-card border border-border rounded p-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Creators", value: "10K+", icon: Users },
                { label: "Links Generated", value: "500K+", icon: Link2 },
                { label: "New Followers", value: "2M+", icon: Rocket },
                { label: "Conversion Rate", value: "73%", icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center mx-auto mb-2">
                    <stat.icon size={14} className="text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-3 py-10">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-foreground mb-2">How It Works</h2>
          <p className="text-sm text-muted-foreground">Three steps to start growing</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Create Your Lock", desc: "Paste any URL and choose required social actions.", icon: Link2 },
            { step: "2", title: "Share Your Link", desc: "Share your locked link anywhere.", icon: Rocket },
            { step: "3", title: "Watch Growth Happen", desc: "Visitors complete actions, you gain followers.", icon: BarChart3 },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded p-4">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center mb-3">
                <item.icon size={14} className="text-white" />
              </div>
              <div className="text-xs font-medium text-primary mb-1">STEP {item.step}</div>
              <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-3 py-10">
        <div className="bg-card border border-border rounded p-5 md:p-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-4">
                Everything You Need to
                <span className="text-primary block">Grow Your Audience</span>
              </h2>
              <div className="space-y-2">
                {[
                  "Connect YouTube, Instagram, TikTok & more",
                  "Beautiful, branded unlock pages",
                  "Real-time analytics dashboard",
                  "Unlimited locked links",
                  "Works with any content or URL",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-xs text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/auth" data-testid="button-features-start">
                <button className="mt-5 bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-medium flex items-center gap-1.5">
                  Get Started Now
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
            <div className="bg-secondary rounded p-4">
              <div className="bg-card border border-border rounded p-4 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Shield size={14} className="text-primary" />
                  <span className="text-xs font-medium">Content Locked</span>
                </div>
                {["Subscribe on YouTube", "Follow on Instagram"].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <span className="text-xs">{task}</span>
                    <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                      <Check size={10} className="text-primary" />
                    </div>
                  </div>
                ))}
                <button className="w-full bg-primary text-primary-foreground py-2 rounded text-xs font-medium">
                  Unlock Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-3 py-10">
        <div className="bg-primary rounded p-5 md:p-6 text-center text-white">
          <h2 className="text-lg font-medium mb-2">Ready to Grow Your Audience?</h2>
          <p className="text-xs opacity-80 mb-4 max-w-md mx-auto">
            Join thousands of creators using YouRise to turn every piece of content into growth.
          </p>
          <Link href="/auth" data-testid="button-cta-start">
            <button className="bg-white text-primary px-4 py-2 rounded text-xs font-medium inline-flex items-center gap-1.5">
              Start Free Today
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export function ServicesGrid() { return null; }
export function AboutSection() { return null; }
export function ContactSection() { return null; }
