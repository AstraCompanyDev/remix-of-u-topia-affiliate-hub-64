import { useState } from "react";
import { Shield, TrendingUp, Cpu } from "lucide-react";
import visionOwnership from "@/assets/vision-ownership-new.jpg";
import visionEarn from "@/assets/vision-earn-new.jpg";
import visionTech from "@/assets/vision-tech-new.jpg";

const visionCards = [
  {
    id: "ownership",
    title: "True Ownership",
    description:
      "Your assets remain yours. Non-custodial accounts and full transparency over every transaction. No middlemen, no restrictions.",
    image: visionOwnership,
    icon: Shield,
  },
  {
    id: "earn",
    title: "Earn With Your Bank",
    description:
      "Generate real rewards from everyday banking activity — payments, savings, and referrals. Your bank works for you.",
    image: visionEarn,
    icon: TrendingUp,
  },
  {
    id: "technology",
    title: "Emerging Technology",
    description:
      "Built on cutting-edge fintech and blockchain infrastructure for a borderless financial future. Secure, fast, global.",
    image: visionTech,
    icon: Cpu,
  },
];

export function VisionCardSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = visionCards[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:gap-5">
      {/* Active card — large featured display */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px] group">
        {/* Background image with transition */}
        {visionCards.map((card, i) => (
          <img
            key={card.id}
            src={card.image}
            alt={card.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg border border-primary/40 bg-primary/10 backdrop-blur-sm flex items-center justify-center">
              <active.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {active.title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
            {active.description}
          </p>
        </div>
      </div>

      {/* Selector cards — stacked on the right */}
      <div className="flex flex-row lg:flex-col gap-3 lg:w-52">
        {visionCards.map((card, i) => {
          const Icon = card.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 lg:flex-initial rounded-xl border p-4 lg:p-5 text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isActive
                    ? "bg-primary/20 border border-primary/30"
                    : "bg-muted border border-border"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-semibold block transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {card.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
