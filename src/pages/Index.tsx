import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logoLight from "@/assets/u-topia-logo-light.png";
import logoDark from "@/assets/u-topia-logo-dark.png";
import heroVisual from "@/assets/hero-visual.png";
import membershipBadge from "@/assets/membership-badge.png";
import badgeBronze from "@/assets/badge-bronze.png";
import badgePlatinum from "@/assets/badge-platinum.png";
import badgeSilver from "@/assets/badge-silver.png";
import badgeGold from "@/assets/badge-gold.png";
import badgeDiamond from "@/assets/badge-diamond.png";

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
            <div className="flex items-center">
              <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
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
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">
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
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up leading-tight"
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

            {/* Right visual - Floating hero image */}
            <div 
              className="flex-1 flex justify-center lg:justify-end opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative">
                <img 
                  src={heroVisual} 
                  alt="U-topia Virtual Card and Rewards" 
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float-gentle drop-shadow-2xl"
                />
                {/* Glow effect behind image */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-primary/40 rounded-full scale-75" />
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

        {/* Membership Tiers Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Premium dark background with depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d18] via-[#0a1628] to-[#060d18]" />
          
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[500px] h-[500px] -top-32 left-1/4 rounded-full blur-[120px] opacity-20 bg-primary/40 animate-float" />
            <div className="absolute w-[400px] h-[400px] bottom-0 right-1/4 rounded-full blur-[100px] opacity-15 bg-cyan-500/30 animate-float animation-delay-2000" />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          <div className="relative container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm"
                style={{ animationDelay: '100ms' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Participation Levels
              </span>
              <h2 
                className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
                style={{ animationDelay: '150ms' }}
              >
                Choose Your <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">Tier</span>
              </h2>
              <p 
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                Unlock greater earning potential with higher membership tiers
              </p>
            </div>

            {/* Tier Cards Grid */}
            <div 
              className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6 opacity-0 animate-fade-in-up pt-6"
              style={{ animationDelay: '250ms' }}
            >
              {/* Bronze */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-[#0f1f35] to-[#0a1628] border border-white/[0.08] transition-all duration-500 hover:border-orange-500/40 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/10 backdrop-blur-sm">
                  {/* Glow ring behind badge */}
                  <div className="absolute top-12 w-28 h-28 rounded-full bg-orange-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge Image */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={badgeBronze} alt="Bronze Badge" className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  
                  {/* Tier Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Bronze</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Depth 1</p>
                  
                  {/* Divider */}
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-6" />
                  
                  {/* Price */}
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">$100</p>
                </div>
              </div>

              {/* Silver */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-[#0f1f35] to-[#0a1628] border border-white/[0.08] transition-all duration-500 hover:border-gray-400/40 hover:-translate-y-3 hover:shadow-2xl hover:shadow-gray-400/10 backdrop-blur-sm">
                  <div className="absolute top-12 w-28 h-28 rounded-full bg-gray-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={badgeSilver} alt="Silver Badge" className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Silver</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Depth 2</p>
                  
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent mb-6" />
                  
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">$250</p>
                </div>
              </div>

              {/* Gold - Featured */}
              <div className="group relative col-span-2 md:col-span-1 overflow-visible">
                {/* Premium glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-amber-400 to-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                
                {/* Most Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative px-4 py-1.5 bg-gradient-to-r from-primary to-amber-500 rounded-full shadow-lg shadow-primary/40">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Most Popular</span>
                    {/* Sparkle */}
                    <div className="absolute -right-1 -top-1 w-3 h-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-amber-300">
                        <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7l2-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-full flex flex-col items-center p-8 pt-10 rounded-3xl bg-gradient-to-b from-[#1a2d4a] via-[#0f1f35] to-[#0a1628] border-2 border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary backdrop-blur-sm">
                  <div className="absolute top-16 w-32 h-32 rounded-full bg-amber-500/15 blur-2xl" />
                  
                  <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={badgeGold} alt="Gold Badge" className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Gold</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Depth 3</p>
                  
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-6" />
                  
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">$500</p>
                </div>
              </div>

              {/* Platinum */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-400/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-[#0f1f35] to-[#0a1628] border border-white/[0.08] transition-all duration-500 hover:border-slate-400/40 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-400/10 backdrop-blur-sm">
                  <div className="absolute top-12 w-28 h-28 rounded-full bg-slate-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={badgePlatinum} alt="Platinum Badge" className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Platinum</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Depth 4</p>
                  
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent mb-6" />
                  
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">$1,000</p>
                </div>
              </div>

              {/* Diamond */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-[#0f1f35] to-[#0a1628] border border-white/[0.08] transition-all duration-500 hover:border-cyan-400/40 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-400/10 backdrop-blur-sm">
                  <div className="absolute top-12 w-28 h-28 rounded-full bg-cyan-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={badgeDiamond} alt="Diamond Badge" className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Diamond</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Depth 5</p>
                  
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-6" />
                  
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">$2,500</p>
                </div>
              </div>
            </div>

            {/* Footer note with icon */}
            <div 
              className="flex items-center justify-center gap-3 mt-16 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '350ms' }}
            >
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-600" />
              <p className="text-center text-sm text-gray-500">
                Higher tiers unlock greater referral depth and reward limits
              </p>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-600" />
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="relative py-28 overflow-hidden bg-background">
          {/* Subtle background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] top-0 right-1/4 rounded-full blur-[150px] opacity-20 bg-primary/20" />
            <div className="absolute w-[400px] h-[400px] bottom-0 left-1/4 rounded-full blur-[120px] opacity-15 bg-cyan-500/15" />
          </div>
          
          <div className="relative container mx-auto px-6">
            {/* Header Content - Centered */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              {/* Section Tag */}
              <span 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Perfect For You
              </span>
              
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 opacity-0 animate-fade-in-up tracking-tight"
                style={{ animationDelay: '150ms' }}
              >
                Who This <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">Is For</span>
              </h2>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground mb-10 opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                If you believe in building networks around real products and genuine value creation, this program is designed for you.
              </p>
              
              {/* CTA Button */}
              <div 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: '250ms' }}
              >
                <Button size="lg" className="group gap-2 text-base px-8 py-6 rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            {/* Cards Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Row 1 */}
              {/* Card 1 - Entrepreneurs */}
              <div 
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                <div className="relative p-8 rounded-2xl bg-card/50 border border-border/80 hover:border-primary/40 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Entrepreneurs & Creators</h3>
                  <p className="text-muted-foreground leading-relaxed">Visionaries who turn ideas into income streams and build audiences that trust them.</p>
                </div>
              </div>
              
              {/* Card 2 - Business Owners */}
              <div 
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: '350ms' }}
              >
                <div className="relative p-8 rounded-2xl bg-card/50 border border-border/80 hover:border-cyan-400/40 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/10 backdrop-blur-sm h-full">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Business Owners</h3>
                  <p className="text-muted-foreground leading-relaxed">Leaders and consultants seeking new revenue channels aligned with their expertise.</p>
                </div>
              </div>
              
              {/* Row 2 */}
              {/* Card 3 - Community Builders */}
              <div 
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <div className="relative p-8 rounded-2xl bg-card/50 border border-border/80 hover:border-amber-400/40 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-400/10 backdrop-blur-sm h-full">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Community Builders</h3>
                  <p className="text-muted-foreground leading-relaxed">Connectors who nurture engaged communities and foster meaningful relationships.</p>
                </div>
              </div>
              
              {/* Card 4 - Growth Partners */}
              <div 
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: '450ms' }}
              >
                <div className="relative p-8 rounded-2xl bg-card/50 border border-border/80 hover:border-emerald-400/40 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-400/10 backdrop-blur-sm h-full">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <svg className="w-7 h-7 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Growth-Focused Partners</h3>
                  <p className="text-muted-foreground leading-relaxed">Ambitious individuals driven by results and long-term wealth building strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span 
                className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                Got Questions?
              </span>
              <h2 
                className="text-3xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '150ms' }}
              >
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p 
                className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                Everything you need to know about the U-topia Affiliate Program
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion 
              type="single" 
              defaultValue="item-1" 
              collapsible 
              className="space-y-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '250ms' }}
            >
              <AccordionItem 
                value="item-1" 
                className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <span className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Is this an investment or guaranteed income program?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    No. The U-topia Affiliate Program is not an investment, and it does not offer guaranteed income. Rewards are performance-based and depend on real platform activity, eligibility, and compliance checks.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-2" 
                className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <span className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    How are rewards generated?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Rewards are generated from verified activity on U-topia's platform, such as account usage, payments, subscriptions, and card activity. There are no rewards for sign-ups alone or inactive users.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-3" 
                className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <span className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Do I need to sell products or handle payments?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    No. You do not process transactions or handle customer funds. U-topia's core products handle all financial activity. Affiliates focus on introductions and growth.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-4" 
                className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <span className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Is there a limit to how much I can earn?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Yes. Earning capacity is defined by participation tiers, referral depth limits, and reward caps. This ensures the program remains fair, sustainable, and transparent.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-5" 
                className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <span className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    When and how are payouts made?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Payout timing depends on the reward type. Some commissions are processed quickly after validation, while bonuses and incentives may follow scheduled payout cycles. All payouts are subject to verification and compliance checks.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA Below FAQ */}
            <div 
              className="text-center mt-12 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <p className="text-muted-foreground mb-6">Still have questions?</p>
              <Button variant="outline" size="lg" className="gap-2 rounded-full px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Contact Support
              </Button>
            </div>
          </div>
        </section>

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
