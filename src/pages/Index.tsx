import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 animate-float" />
        <div className="orb orb-accent w-[400px] h-[400px] top-1/3 -right-20 animate-float animation-delay-2000" />
        <div className="orb orb-primary w-[300px] h-[300px] bottom-20 left-1/4 animate-float animation-delay-1000" />
      </div>

      {/* Hero gradient overlay */}
      <div className="fixed inset-0 hero-gradient pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation placeholder */}
        <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">U+</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                U-topia <span className="text-primary">Affiliate Hub</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Rewards
              </a>
              <Button variant="accent" size="sm">
                Join Now
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section - Placeholder */}
        <section className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                Earn through real platform activity
              </span>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <span className="text-foreground">Build with </span>
              <span className="gradient-text text-glow">U-topia</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              A digital financial ecosystem that rewards growth, usage, and contribution. 
              Incentives aligned with real economic activity, not hype.
            </p>

            <p 
              className="text-xl md:text-2xl font-semibold text-foreground mb-12 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '350ms' }}
            >
              Real products. Real users. <span className="text-primary">Real rewards.</span>
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <Button variant="hero" size="xl">
                Get Started
              </Button>
              <Button variant="glass" size="xl">
                Learn How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid - Placeholder */}
        <section className="container mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="glass-card p-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${400 + item * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl font-bold">{item}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Feature {item}
                </h3>
                <p className="text-muted-foreground">
                  Your feature description will go here. Add your content to customize this section.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer placeholder */}
        <footer className="container mx-auto px-6 py-12 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">U+</span>
              <span className="text-muted-foreground">U-topia Affiliate Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 U-topia. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
