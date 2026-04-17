import { useState } from "react";
import { Network, Building2, Users } from "lucide-react";
import utopiaImg from "@/assets/ecosystem-utopia.jpg";
import ucenterImg from "@/assets/ecosystem-ucenter.jpg";
import youImg from "@/assets/ecosystem-you.jpg";

type Card = {
  id: string;
  title: string;
  short: string;
  description: string;
  image: string;
  Icon: typeof Network;
};

const cards: Card[] = [
  {
    id: "utopia",
    title: "U-TOPIA",
    short: "The Ecosystem",
    description:
      "A family of companies built to benefit everyone they touch — banking, products, and services that flow value back to the community.",
    image: utopiaImg,
    Icon: Network,
  },
  {
    id: "ucenter",
    title: "U CENTER",
    short: "The Shared Home",
    description:
      "Governance, education, and community infrastructure. Where understanding comes first and stakeholders shape what gets built.",
    image: ucenterImg,
    Icon: Building2,
  },
  {
    id: "you",
    title: "YOU",
    short: "The Stakeholder",
    description:
      "A real voice in how it grows. Earn dividends, vote on decisions, and benefit directly from the value you help create.",
    image: youImg,
    Icon: Users,
  },
];

export function EcosystemCards() {
  const [activeId, setActiveId] = useState<string>("ucenter");

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:h-[520px]">
      {cards.map((card) => {
        const isActive = activeId === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onMouseEnter={() => setActiveId(card.id)}
            onFocus={() => setActiveId(card.id)}
            onClick={() => setActiveId(card.id)}
            aria-expanded={isActive}
            aria-label={`${card.title} — ${card.short}`}
            className={[
              "group relative overflow-hidden rounded-3xl border text-left",
              "transition-[flex-grow,border-color] duration-700 ease-out",
              "min-h-[180px] md:min-h-0 md:h-full",
              isActive
                ? "md:flex-[3] border-primary/40 shadow-2xl shadow-primary/10"
                : "md:flex-[1] border-white/10 hover:border-white/20",
            ].join(" ")}
          >
            {/* Background image */}
            <img
              src={card.image}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className={[
                "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                isActive ? "opacity-90 scale-100" : "opacity-40 scale-105",
              ].join(" ")}
            />

            {/* Gradient overlay */}
            <div
              className={[
                "absolute inset-0 transition-opacity duration-700",
                isActive
                  ? "bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/70 to-[#0a0f1a]/20"
                  : "bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/85 to-[#0a0f1a]/60",
              ].join(" ")}
            />

            {/* Content */}
            <div className="relative h-full w-full flex flex-col justify-end p-6 md:p-8">
              {/* Icon badge */}
              <div
                className={[
                  "w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-4",
                  "transition-all duration-500",
                  isActive ? "bg-primary/20 border-primary/40" : "",
                ].join(" ")}
              >
                <card.Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>

              {/* Short label */}
              <p
                className={[
                  "text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-500",
                  isActive ? "text-primary" : "text-gray-400",
                ].join(" ")}
              >
                {card.short}
              </p>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                {card.title}
              </h3>

              {/* Expanding description */}
              <div
                className={[
                  "grid transition-all duration-700 ease-out",
                  isActive
                    ? "grid-rows-[1fr] opacity-100 mt-1"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
