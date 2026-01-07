import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      "Tier-based earning capacity",
      "Referral depth access (Level 1)",
      "Basic reward tracking dashboard",
      "Email support",
    ],
    highlights: ["Entry-level access", "Basic referral rewards", "Dashboard access"],
  },
  silver: {
    name: "Silver",
    price: "$250",
    image: badgeSilver,
    features: [
      "Enhanced earning capacity",
      "Referral depth access (Level 2)",
      "Priority reward tracking",
      "Shares eligibility (Basic)",
      "Priority email support",
    ],
    highlights: ["Enhanced earnings", "Level 2 referrals", "Shares eligibility"],
  },
  gold: {
    name: "Gold",
    price: "$500",
    image: badgeGold,
    features: [
      "Premium earning capacity",
      "Referral depth access (Level 3)",
      "Advanced analytics dashboard",
      "Shares and dividend eligibility",
      "Priority support + chat",
    ],
    highlights: ["Premium earnings", "Dividend eligibility", "Advanced analytics"],
  },
  platinum: {
    name: "Platinum",
    price: "$1,000",
    image: badgePlatinum,
    features: [
      "Elite earning capacity",
      "Referral depth access (Level 4)",
      "Full analytics suite",
      "Enhanced shares and dividends",
      "Dedicated account manager",
      "Early access to new features",
    ],
    highlights: ["Elite tier access", "Dedicated manager", "Early access perks"],
  },
  diamond: {
    name: "Diamond",
    price: "$2,500",
    image: badgeDiamond,
    features: [
      "Maximum earning potential",
      "Unlimited referral depth access",
      "Complete analytics and insights",
      "Maximum shares and dividend allocation",
      "VIP dedicated support",
      "Exclusive partner events",
      "Strategic partnership opportunities",
    ],
    highlights: ["Unlimited depth", "VIP support", "Partner events"],
  },
};

const packageOrder: PackageKey[] = ["bronze", "silver", "gold", "platinum", "diamond"];

const Purchase = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("bronze");
  const currentPackage = packages[selectedPackage];
  const otherPackages = packageOrder.filter((key) => key !== selectedPackage);

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
              <Link to="/purchase" className="text-white font-medium">
                Purchase
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
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-12 py-7 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mb-4"
            >
              Buy Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center">
              <img src={logoLight} alt="U-topia" className="h-6 invert dark:invert-0" />
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2024 U-topia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Purchase;
