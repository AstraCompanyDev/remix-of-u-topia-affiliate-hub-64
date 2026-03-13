import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MembershipTiers } from "@/components/MembershipTiers";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import logoLight from "@/assets/u-center-logo.png";
import logoDark from "@/assets/u-topia-logo-dark.png";
import heroVisual from "@/assets/hero-visual-new.png";
import membershipBadge from "@/assets/membership-badge.png";
import visionOwnership from "@/assets/vision-ownership.jpg";
import visionEarn from "@/assets/vision-earn.jpg";
import visionTech from "@/assets/vision-tech.jpg";

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
        <div className="relative z-20">
          <Header />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">
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
                className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-xl opacity-0 animate-fade-in-up"
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
                className="flex flex-row gap-2 sm:gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <Link to="/auth">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
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
                className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 opacity-0 animate-fade-in-up"
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

            {/* Right visual - Hero Image */}
            <div 
              className="flex-1 flex justify-center lg:justify-end opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative animate-hero-float group cursor-pointer">
                <img 
                  src={heroVisual} 
                  alt="U-topia Financial Dashboard" 
                  className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl drop-shadow-[0_20px_60px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_25px_80px_rgba(0,180,216,0.5)]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Light sections below */}
      <div className="bg-background">

        {/* U-Topia Vision Section */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-background to-[#0a0f1a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-15 bg-gradient-to-r from-primary/30 to-cyan-500/30" />
          </div>

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
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                <div className="group rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={visionOwnership} alt="True Ownership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">True Ownership</h3>
                    <p className="text-sm text-muted-foreground">Your assets remain yours. Non-custodial accounts and full transparency over every transaction.</p>
                  </div>
                </div>

                <div className="group rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={visionEarn} alt="Earn With Your Bank" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">Earn With Your Bank</h3>
                    <p className="text-sm text-muted-foreground">Generate real rewards from everyday banking activity — payments, savings, and referrals.</p>
                  </div>
                </div>

                <div className="group rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={visionTech} alt="Emerging Technology" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">Emerging Technology</h3>
                    <p className="text-sm text-muted-foreground">Built on cutting-edge fintech and blockchain infrastructure for a borderless financial future.</p>
                  </div>
                </div>
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

      {/* Investment Packages Section - Dark */}
      <InvestmentPackages />

      <div className="bg-background">
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
                    Do I earn commissions when someone just signs up?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>No.</strong> Commissions are earned only after the referred user purchases a package. Signing up alone does not generate commissions. The referred user must complete a package purchase (Bronze, Silver, Gold, Platinum, or Diamond) and the transaction must be confirmed.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-4" 
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
                value="item-5" 
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
                value="item-6" 
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
                Ready to <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">Build</span> Your Future?
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
