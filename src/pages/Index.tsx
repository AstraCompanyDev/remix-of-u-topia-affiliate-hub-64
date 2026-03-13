import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MembershipTiers } from "@/components/MembershipTiers";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { VisionCardSelector } from "@/components/VisionCardSelector";
import logoLight from "@/assets/u-center-logo.png";
import logoDark from "@/assets/u-topia-logo-dark.png";
import membershipBadge from "@/assets/membership-badge.png";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Dark Background */}
      <div className="relative bg-[#0a0f1a] overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/60 via-[#0a0f1a]/40 to-[#0a0f1a] pointer-events-none" />

        {/* Navigation */}
        <div className="relative z-20">
          <Header />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
          <div className="flex flex-col items-center text-center gap-8 sm:gap-12">
            <div className="max-w-2xl">
              {/* Badge */}
              <div 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse"></span>
                  A DAO supporting the future of banking
                </span>
              </div>
              
              {/* Headline */}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up leading-tight whitespace-nowrap"
                style={{ animationDelay: '200ms' }}
              >
                <span className="text-white">Welcome to </span>
                <span className="gradient-text">U-Center</span>
              </h1>
              
              {/* Subheadline */}
              <p 
                className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto opacity-0 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                U-Center is a DAO dedicated to supporting the development of U-Topia — the future of banking. 
                Join the community shaping a new financial era.
              </p>

              {/* Tagline */}
              <p 
                className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-8 sm:mb-10 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '350ms' }}
              >
                Real products. Real users. <span className="text-primary">Real rewards.</span>
              </p>

              {/* CTAs */}
              <div 
                className="flex flex-row justify-center gap-2 sm:gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <Link to="/auth">
                  <Button className="gradient-primary text-white font-semibold px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:opacity-90 transition-all">
                    Get Started
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <a 
                  href="https://drive.google.com/file/d/1LGOKXC00DI94vpzfBhKNPhxGH0hmHNzj/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-full transition-all">
                    Learn More
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div 
                className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '500ms' }}
              >
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Real Activity</p>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Verified</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Transactions</p>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Global</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Rewards Network</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Light sections below */}
      <div className="bg-background">

        {/* U-Topia Vision Section */}
        <section className="relative py-28 overflow-hidden bg-background">

          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                The Future of Banking
              </span>

              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 opacity-0 animate-fade-in-up tracking-tight leading-tight"
                style={{ animationDelay: '150ms' }}
              >
                U-Topia — Your Bank, Your Rules
              </h2>

              <p 
                className="text-lg md:text-xl text-muted-foreground mb-6 opacity-0 animate-fade-in-up leading-relaxed max-w-3xl mx-auto"
                style={{ animationDelay: '200ms' }}
              >
                U-Center is a DAO supporting the development of U-Topia — pioneering the future of banking through emerging technology. True ownership of your funds, the ability to earn with your bank, and no middlemen standing in your way.
              </p>

              <p 
                className="text-xl md:text-2xl font-semibold text-foreground mb-10 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '250ms' }}
              >
                Secure your financial future. <span className="text-primary">Get your piece of the pie.</span>
              </p>

              <div 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                <VisionCardSelector />
              </div>

              <div 
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: '350ms' }}
              >
                <Link to="/auth">
                  <Button size="lg" className="group gap-2 text-base px-8 py-6 rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                    Join Today
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* What is a Co-Operative DAO Section */}
      <section className="relative bg-[#0a0f1a] py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[400px] h-[400px] -top-20 right-1/4 rounded-full blur-[120px] opacity-15 bg-primary/30 animate-float" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                Understanding the Model
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
                style={{ animationDelay: '150ms' }}
              >
                What is a{" "}
                <span className="gradient-text">
                  Co-Operative DAO?
                </span>
              </h2>
              <p
                className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                A Co-Operative DAO (Decentralized Autonomous Organization) is a community-owned entity where members collectively govern, invest, and share in the rewards — with no central authority calling the shots.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {/* Pillar 1 */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Community Owned</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every member has a voice. Decisions are made collectively through transparent on-chain governance — not by executives behind closed doors.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Shared Rewards</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Profits don't go to shareholders on Wall Street. Revenue is distributed back to the members who contribute to and grow the ecosystem.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Fully Transparent</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  All transactions, governance votes, and treasury movements are recorded on-chain. Complete transparency with no hidden fees or agendas.
                </p>
              </div>
            </div>

            <p
              className="text-center text-gray-500 text-base mt-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
              style={{ animationDelay: '400ms' }}
            >
              U-Center operates as a Co-Operative DAO — meaning when you invest, you're not just a customer. You're an owner, a decision-maker, and a beneficiary of the platform's success.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Packages Section - Dark */}
      <InvestmentPackages />

      <div className="bg-background">
        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
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

            {/* FAQ Two Columns */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '250ms' }}
            >
              {/* Left Column */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem 
                  value="item-1" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Is this an investment or guaranteed income program?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      No. The U-topia Affiliate Program is not an investment, and it does not offer guaranteed income. Rewards are performance-based and depend on real platform activity, eligibility, and compliance checks.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-2" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      How are rewards generated?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Rewards are generated from verified activity on U-topia's platform, such as account usage, payments, subscriptions, and card activity. There are no rewards for sign-ups alone or inactive users.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-3" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Do I earn commissions when someone just signs up?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      <strong>No.</strong> Commissions are earned only after the referred user purchases a package. Signing up alone does not generate commissions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Right Column */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem 
                  value="item-4" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Do I need to sell products or handle payments?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      No. You do not process transactions or handle customer funds. U-topia's core products handle all financial activity. Affiliates focus on introductions and growth.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-5" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      Is there a limit to how much I can earn?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Yes. Earning capacity is defined by participation tiers, referral depth limits, and reward caps. This ensures the program remains fair, sustainable, and transparent.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-6" 
                  className="glass-card border-none rounded-2xl overflow-hidden data-[state=open]:border-primary/30 transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      When and how are payouts made?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Payout timing depends on the reward type. Some commissions are processed quickly after validation, while bonuses and incentives may follow scheduled payout cycles.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1a] to-[#0d1526]">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-primary/40 to-cyan-500/40" />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          <div className="relative container mx-auto px-6 text-center">
            <div 
              className="max-w-3xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.5 10c-.83 0-1.5.67-1.5 1.5v5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5z"/>
                  <path d="M20.5 10H19V8.5c0-.83-.67-1.5-1.5-1.5S16 7.67 16 8.5V10h-2V8.5c0-.83-.67-1.5-1.5-1.5S11 7.67 11 8.5V10H9V8.5c0-.83-.67-1.5-1.5-1.5S6 7.67 6 8.5V10H4.5c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5h16c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5z"/>
                </svg>
                Start Today
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Ready to <span className="gradient-text">Build</span> Your Future?
              </h2>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join the U-topia Affiliate Program and start building with a platform designed for long-term growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth">
                  <Button 
                    variant="hero" 
                    className="group gap-3 min-w-[200px]"
                  >
                    Create Account
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Button>
                </Link>
                
                <a 
                  href="https://drive.google.com/file/d/1LGOKXC00DI94vpzfBhKNPhxGH0hmHNzj/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-3 min-w-[200px] border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-2xl"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Program Overview
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#0a0f1a] py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              {/* Brand Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src={logoLight} alt="U-topia" className="h-8" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  U-topia puts YOU first – connecting modern banking, digital assets, and cross-chain opportunities in one universal wallet.
                </p>
              </div>

              {/* Follow U-topia */}
              <div>
                <h4 className="text-white font-semibold mb-5">Follow U-topia</h4>
                <ul className="space-y-3">
                  <li><a href="https://t.me/+G6ntSwYCzjJkNzE0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Telegram</a></li>
                  <li><a href="https://x.com/UCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">X (Twitter)</a></li>
                  <li><a href="https://www.linkedin.com/company/u-topia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">LinkedIn</a></li>
                  <li><a href="https://www.instagram.com/ucoinofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Instagram</a></li>
                  <li><a href="https://discord.gg/qZB83k5HmX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Discord</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-5">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="https://docsend.com/view/3wjptrvw2c35gj8p" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="https://docsend.com/view/pehz2xqa23xw3pyc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-center text-gray-500 text-sm">
                © U-topia 2026, All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
