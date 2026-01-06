import { Button } from "@/components/ui/button";
import logoLight from "@/assets/u-topia-logo-light.png";
import logoDark from "@/assets/u-topia-logo-dark.png";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Dark Background */}
      <div className="relative bg-[#0a0f1a] overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full blur-3xl opacity-20 bg-primary/30 animate-float" />
          <div className="absolute w-[400px] h-[400px] top-1/3 -right-20 rounded-full blur-3xl opacity-15 bg-blue-500/30 animate-float animation-delay-2000" />
          <div className="absolute w-[300px] h-[300px] bottom-20 left-1/4 rounded-full blur-3xl opacity-20 bg-primary/20 animate-float animation-delay-1000" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1a] pointer-events-none" />

        {/* Navigation */}
        <header className="relative z-20 container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
              <span className="text-lg font-semibold text-primary">Affiliate Hub</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Rewards
              </a>
              <Button variant="default" size="sm">
                Join Now
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Content */}
        <section className="relative z-10 container mx-auto px-6 pt-16 pb-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Earn through real platform activity
              </span>
            </div>
            
            {/* Headline */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up leading-tight"
              style={{ animationDelay: '200ms' }}
            >
              <span className="text-white">Build with </span>
              <span className="gradient-text">U-topia</span>
            </h1>
            
            {/* Subheadline */}
            <p 
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              A digital financial ecosystem that rewards growth, usage, and contribution. 
              Incentives aligned with real economic activity, not hype.
            </p>

            {/* Tagline */}
            <p 
              className="text-xl md:text-2xl font-semibold text-white mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '350ms' }}
            >
              Real products. Real users. <span className="text-primary">Real rewards.</span>
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 text-base rounded-full transition-all">
                Learn How It Works
              </Button>
            </div>

            {/* Stats */}
            <div 
              className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
                <p className="text-gray-500 text-sm mt-1">Real Activity</p>
              </div>
              <div className="w-px bg-white/10 hidden md:block"></div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">Verified</p>
                <p className="text-gray-500 text-sm mt-1">Transactions</p>
              </div>
              <div className="w-px bg-white/10 hidden md:block"></div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">Global</p>
                <p className="text-gray-500 text-sm mt-1">Rewards Network</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Light sections below */}
      <div className="bg-background">
        {/* Features Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '450ms' }}
            >
              Earn From <span className="gradient-text">Real Activity</span>
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground opacity-0 animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              The U-topia Affiliate Program allows participants to earn rewards by introducing users and businesses to U-topia's financial products and services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              className="glass-card p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Accounts & Financial Services
              </h3>
              <p className="text-muted-foreground">
                Earn from user signups, account activations, and ongoing financial service usage within the platform.
              </p>
            </div>

            <div 
              className="glass-card p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Payments & Merchant Transactions
              </h3>
              <p className="text-muted-foreground">
                Generate rewards from payment processing, merchant integrations, and transaction volume across the network.
              </p>
            </div>

            <div 
              className="glass-card p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '800ms' }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Card Usage & Subscriptions
              </h3>
              <p className="text-muted-foreground">
                Benefit from card activations, recurring subscription payments, and sustained user engagement.
              </p>
            </div>
          </div>

          <p 
            className="text-left text-sm text-muted-foreground/70 italic opacity-0 animate-fade-in-up"
            style={{ animationDelay: '900ms' }}
          >
            *There are no guaranteed returns. Rewards are earned through participation and sustained activity.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span 
                className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                Simple Process
              </span>
              <h2 
                className="text-3xl md:text-5xl font-bold text-foreground opacity-0 animate-fade-in-up"
                style={{ animationDelay: '150ms' }}
              >
                How It <span className="gradient-text">Works</span>
              </h2>
            </div>

            {/* Steps Container */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div 
                  className="group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '200ms' }}
                >
                  <div className="relative glass-card p-6 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/25">
                        1
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-4 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Join the Program
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Activate your participation tier and gain access to referral and reward tools.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div 
                  className="group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  <div className="relative glass-card p-6 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/25">
                        2
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-4 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Introduce Users
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share U-topia with individuals and merchants who benefit from our platform.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div 
                  className="group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  <div className="relative glass-card p-6 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/25">
                        3
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-4 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Activity Happens
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Users transact, subscribe, and use real financial products.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div 
                  className="group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '500ms' }}
                >
                  <div className="relative glass-card p-6 h-full transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/25">
                        4
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-4 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Rewards Calculated
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Commissions and bonuses are calculated from completed and verified activity.
                    </p>
                  </div>
                </div>

                {/* Step 5 - Final/Success */}
                <div 
                  className="group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '600ms' }}
                >
                  <div className="relative glass-card p-6 h-full border-emerald-500/30 bg-emerald-50 transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-4 mb-5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Get Paid
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Eligible rewards are distributed following validation and compliance checks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logoDark} alt="U-topia" className="h-6" />
              <span className="text-muted-foreground">Affiliate Hub</span>
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
