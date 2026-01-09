import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoLight from "@/assets/u-topia-logo-light.png";
import badgeBronze from "@/assets/badge-bronze.png";
import badgeSilver from "@/assets/badge-silver.png";
import badgeGold from "@/assets/badge-gold.png";
import badgePlatinum from "@/assets/badge-platinum.png";
import badgeDiamond from "@/assets/badge-diamond.png";

type PackageKey = "bronze" | "silver" | "gold" | "platinum" | "diamond";

interface PackageInfo {
  name: string;
  price: string;
  image: string;
  features: string[];
  highlights: string[];
}

const packages: Record<PackageKey, PackageInfo> = {
  bronze: {
    name: "Bronze",
    price: "$100",
    image: badgeBronze,
    features: [
      "100 Share Allocation",
      "Maximum Referral Capacity: 3",
      "Commission Depth: 1 layer",
      "Maximum Reward Rate: Up to 2%",
    ],
    highlights: ["100 Shares", "3 Referrals", "Entry-level passive income"],
  },
  silver: {
    name: "Silver",
    price: "$250",
    image: badgeSilver,
    features: [
      "250 Share Allocation",
      "Maximum Referral Capacity: 9",
      "Commission Depth: 2 layers",
      "Maximum Reward Rate: Up to 3%",
    ],
    highlights: ["250 Shares", "9 Referrals", "Mid-tier dividends"],
  },
  gold: {
    name: "Gold",
    price: "$500",
    image: badgeGold,
    features: [
      "500 Share Allocation",
      "Maximum Referral Capacity: 27",
      "Commission Depth: 3 layers",
      "Maximum Reward Rate: Up to 4%",
    ],
    highlights: ["500 Shares", "27 Referrals", "LP growth eligible"],
  },
  platinum: {
    name: "Platinum",
    price: "$1,000",
    image: badgePlatinum,
    features: [
      "1,000 Share Allocation",
      "Maximum Referral Capacity: 81",
      "Commission Depth: 4 layers",
      "Maximum Reward Rate: Up to 5%",
    ],
    highlights: ["1,000 Shares", "81 Referrals", "Higher passive rewards"],
  },
  diamond: {
    name: "Diamond",
    price: "$2,500",
    image: badgeDiamond,
    features: [
      "2,500 Share Allocation",
      "Maximum Referral Capacity: 243",
      "Commission Depth: 5 layers",
      "Maximum Reward Rate: Up to 6%",
    ],
    highlights: ["2,500 Shares", "243 Referrals", "Top-tier dividends"],
  },
};

const packageOrder: PackageKey[] = ["bronze", "silver", "gold", "platinum", "diamond"];

const Purchase = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const initialPackage = (searchParams.get("tier") as PackageKey) || "bronze";
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>(
    packageOrder.includes(initialPackage) ? initialPackage : "bronze"
  );

  useEffect(() => {
    const tier = searchParams.get("tier") as PackageKey;
    if (tier && packageOrder.includes(tier)) {
      setSelectedPackage(tier);
    }
  }, [searchParams]);

  const currentPackage = packages[selectedPackage];
  const otherPackages = packageOrder.filter((key) => key !== selectedPackage);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: { tier: selectedPackage },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0f1a] border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={logoLight} alt="U-topia" className="h-8 md:h-10" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/refer-and-earn" className="text-gray-400 hover:text-white transition-colors">
                Refer & Earn
              </Link>
              <Link to="/purchase" className="text-white font-medium">
                Purchase
              </Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Join Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Product Detail Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Product Image */}
          <div className="relative">
            <div className="product-image-card p-8 md:p-12 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-2xl opacity-60" />
                <img
                  src={currentPackage.image}
                  alt={`${currentPackage.name} Package`}
                  className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {currentPackage.name} <span className="gradient-text">Package</span>
            </h1>

            <p className="text-5xl md:text-6xl font-bold text-primary mb-8">
              {currentPackage.price}
            </p>

            <Button
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-12 py-7 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mb-4"
            >
              {isLoading ? "Processing..." : "Buy Now"}
              {!isLoading && (
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </Button>

            <p className="text-sm text-muted-foreground mb-8">
              Rewards are performance-based. Terms apply.
            </p>

            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">What's included</h3>
              <ul className="space-y-4">
                {currentPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selector Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Explore Other <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-muted-foreground mt-2">Select a package to view details</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherPackages.map((key) => {
            const pkg = packages[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPackage(key)}
                className="package-selector-card p-6 text-left group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                    <p className="text-xl font-bold text-primary">{pkg.price}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about the U-topia Affiliate Program
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" defaultValue="item-1" collapsible className="space-y-4">
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
        </div>
      </section>

      {/* Footer */}
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
  );
};

export default Purchase;
