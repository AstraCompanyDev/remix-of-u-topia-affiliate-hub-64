import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import cardStarter from "@/assets/card-starter.jpg";
import cardBuilder from "@/assets/card-builder.jpg";
import cardElite from "@/assets/card-elite.jpg";

const packages = [
  {
    name: "Starter Pack",
    price: "$25",
    image: cardStarter,
    popular: false,
    features: [
      "Entry-Level Access",
      "Basic Crypto Card",
      "Refer & Earn 5%",
      "Community Access",
      "Monthly Reports",
    ],
  },
  {
    name: "Bronze",
    price: "$100",
    image: cardStarter,
    popular: false,
    features: [
      "3% Monthly Dividends",
      "Bronze Crypto Card",
      "Refer & Earn 8%",
      "Community Access",
      "Monthly Reports",
    ],
  },
  {
    name: "Silver",
    price: "$200",
    image: cardBuilder,
    popular: false,
    features: [
      "5% Monthly Dividends",
      "Silver Crypto Card",
      "Refer & Earn 10%",
      "Priority Support",
      "Monthly Reports",
    ],
  },
  {
    name: "Gold",
    price: "$500",
    image: cardBuilder,
    popular: true,
    features: [
      "8% Monthly Dividends",
      "Gold Crypto Card",
      "Refer & Earn 15%",
      "Priority Support",
      "Exclusive Events",
    ],
  },
  {
    name: "Platinum",
    price: "$1,000",
    image: cardElite,
    popular: false,
    features: [
      "10% Monthly Dividends",
      "Platinum Crypto Card",
      "Refer & Earn 18%",
      "VIP Support",
      "Global Retreats",
    ],
  },
  {
    name: "Diamond",
    price: "$2,500",
    image: cardElite,
    popular: false,
    features: [
      "12% Monthly Dividends",
      "Black Crypto Card",
      "Refer & Earn 20%",
      "VIP Concierge",
      "Exclusive Retreats",
    ],
  },
];

export function InvestmentPackages() {
  return (
    <section className="relative bg-[#0a0f1a] py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-32 left-1/4 rounded-full blur-[120px] opacity-20 bg-primary/40 animate-float" />
        <div className="absolute w-[400px] h-[400px] bottom-0 right-1/4 rounded-full blur-[100px] opacity-15 bg-cyan-500/30 animate-float animation-delay-2000" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm"
            style={{ animationDelay: "100ms" }}
          >
            Investment Packages
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
            style={{ animationDelay: "150ms" }}
          >
            Choose Your Path to{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
              Financial Freedom
            </span>
          </h2>
          <p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Select the package that fits your goals. Earn dividends, get
            rewarded for referrals, and unlock exclusive benefits.
          </p>
        </div>

        {/* Cards Grid - 2 rows of 3 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`group relative rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                pkg.popular
                  ? "border-primary/60 shadow-lg shadow-primary/10"
                  : "border-white/10 hover:border-white/20"
              } bg-gradient-to-b from-[#0f1f35] to-[#0a1628]`}
            >
              {/* Most Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-5 py-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full shadow-lg shadow-primary/40">
                    <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              {/* Card Image */}
              <div className="p-5 pb-0">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#080d18]">
                  <img
                    src={pkg.image}
                    alt={`${pkg.name} card`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <h3 className="text-xl font-bold text-white mb-1">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-white">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 text-sm">one-time</span>
                </div>

                {/* CTA */}
                <Link to="/purchase" className="block">
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      pkg.popular
                        ? "bg-gradient-to-r from-primary to-blue-500 text-white hover:shadow-lg hover:shadow-primary/30"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
