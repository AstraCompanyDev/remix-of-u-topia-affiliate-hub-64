import { Link } from "react-router-dom";
import { Check } from "lucide-react";

type Pkg = {
  name: string;
  price: string;
  medal: string; // emoji medal/icon
  features: { label: string; highlight?: string }[];
  popular?: boolean;
  isEQ?: boolean;
};

const packages: Pkg[] = [
  {
    name: "STARTER",
    price: "$25",
    medal: "🥇",
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U Academy", highlight: "1 Month" },
    ],
  },
  {
    name: "BRONZE",
    price: "$100",
    medal: "🥉",
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U-Academy", highlight: "6 Month" },
      { label: "Flow 1", highlight: "DAO" },
      { label: "76.9 Shares" },
      { label: "U-Academy Pre Sale Bonus", highlight: "1 Month" },
    ],
  },
  {
    name: "SILVER",
    price: "$250",
    medal: "🥈",
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U-Academy", highlight: "12 Month" },
      { label: "Flow 2", highlight: "DAO" },
      { label: "201.9 Shares" },
      { label: "U-Academy Pre Sale Bonus", highlight: "3 Month" },
    ],
  },
  {
    name: "GOLD",
    price: "$500",
    medal: "🥇",
    popular: true,
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U-Center Access", highlight: "36 Month" },
      { label: "U-Academy", highlight: "18 Month" },
      { label: "U-Network - Webinars", highlight: "18 Month" },
      { label: "Flow 3", highlight: "DAO" },
      { label: "415.3 Shares" },
      { label: "U-Academy Pre Sale Bonus", highlight: "6 Month" },
    ],
  },
  {
    name: "PLATINUM",
    price: "$1,000",
    medal: "🏆",
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U-Center Access", highlight: "120 Month" },
      { label: "U-Academy", highlight: "36 Month" },
      { label: "U-Network - Webinars", highlight: "36 Month" },
      { label: "U-Events - Live/In Person", highlight: "2 Tickets" },
      { label: "U-AI", highlight: "6 Month" },
      { label: "Flow 4", highlight: "DAO" },
      { label: "869.2 Shares" },
      { label: "U-Academy Pre Sale Bonus", highlight: "12 Month" },
    ],
  },
  {
    name: "DIAMOND",
    price: "$2,500",
    medal: "💎",
    isEQ: true,
    features: [
      { label: "Community Platform Access", highlight: "Lifetime" },
      { label: "U-Center Access", highlight: "Lifetime" },
      { label: "U-Academy", highlight: "120 Month" },
      { label: "U-Network - Webinars", highlight: "120 Month" },
      { label: "U-Events - Live/In Person", highlight: "120 Month" },
      { label: "U-AI", highlight: "12 Month" },
      { label: "Flow 5", highlight: "DAO" },
      { label: "869.2 Shares" },
      { label: "U-AI Pre Sale Bonus", highlight: "6 Month" },
    ],
  },
];

export function InvestmentPackages() {
  return (
    <section className="relative bg-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-32 left-1/4 rounded-full blur-[120px] opacity-20 bg-primary/40 animate-float" />
        <div className="absolute w-[400px] h-[400px] bottom-0 right-1/4 rounded-full blur-[100px] opacity-15 bg-purple-500/30 animate-float animation-delay-2000" />
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm"
            style={{ animationDelay: "100ms" }}
          >
            Membership Packages
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
            style={{ animationDelay: "150ms" }}
          >
            Choose Your <span className="gradient-text">Path</span>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`group relative rounded-3xl border bg-[#0d1424] flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                pkg.popular
                  ? "border-primary/60 shadow-xl shadow-primary/20"
                  : pkg.isEQ
                  ? "border-purple-500/60 shadow-xl shadow-purple-500/20"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* EQ Badge (Diamond only) */}
              {pkg.isEQ && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-500 to-primary text-white text-xs font-bold tracking-wider">
                    EQ
                  </div>
                </div>
              )}

              {/* Header section with gradient background */}
              <div className="relative gradient-primary p-6 pb-8 overflow-hidden">
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Tier name pill */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="px-4 py-1.5 rounded-full bg-[#0d1424]/80 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-bold text-white tracking-widest">
                      {pkg.name}
                    </span>
                  </div>
                  {/* Medal icon */}
                  <div className="text-4xl drop-shadow-lg" aria-hidden="true">
                    {pkg.medal}
                  </div>
                </div>

                {/* Price */}
                <div className="relative flex items-end gap-2">
                  <span className="text-5xl font-black text-white leading-none tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-white/80 text-xs font-medium leading-tight pb-1">
                    Package
                    <br />
                    Price
                  </span>
                </div>
              </div>

              {/* Features list */}
              <div className="flex-1 p-6 pt-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white/80" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-gray-300 leading-snug">
                        {feature.label}
                        {feature.highlight && (
                          <>
                            {" "}
                            <span className="text-primary font-semibold">
                              ({feature.highlight})
                            </span>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA bar at bottom */}
              <div className="p-5 pt-0">
                <Link to="/purchase" className="block">
                  <button className="w-full py-3.5 rounded-2xl gradient-primary text-white font-bold text-xs tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all">
                    STARTING ON OCTOBER 2026
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
