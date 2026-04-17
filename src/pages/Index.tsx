import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import logoLight from "@/assets/u-center-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0f1a]">
      {/* ============================================================
          HERO — The Learning Home of the U-TOPIA Ecosystem
         ============================================================ */}
      <div className="relative bg-[#0a0f1a] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/60 via-[#0a0f1a]/40 to-[#0a0f1a] pointer-events-none" />

        <div className="relative z-20">
          <Header />
        </div>

        <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
          <div className="flex flex-col items-center text-center gap-8 sm:gap-12">
            <div className="max-w-3xl">
              <div
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: '100ms' }}
              >
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse"></span>
                  The Learning Home of the U-TOPIA Ecosystem
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up leading-tight"
                style={{ animationDelay: '200ms' }}
              >
                <span className="text-white">Welcome to </span>
                <span className="gradient-text">U CENTER</span>
              </h1>

              <p
                className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '300ms' }}
              >
                Where understanding comes first — <span className="gradient-text font-semibold">and everything else follows.</span>
              </p>

              <div
                className="flex flex-row justify-center gap-2 sm:gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <Link to="/auth">
                  <Button className="gradient-primary text-white font-semibold px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:opacity-90 transition-all">
                    Start Learning
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

              <div
                className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '500ms' }}
              >
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Open</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Governance</p>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Shared</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Treasury</p>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Education</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">First</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================
          MEET U-TOPIA — The Ecosystem (river / watershed)
         ============================================================ */}
      <section className="relative bg-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-32 left-1/4 rounded-full blur-[120px] opacity-20 bg-primary/40 animate-float" />
          <div className="absolute w-[400px] h-[400px] bottom-0 right-1/4 rounded-full blur-[100px] opacity-15 bg-purple-500/30 animate-float animation-delay-2000" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm"
              style={{ animationDelay: '100ms' }}
            >
              The Ecosystem
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
              style={{ animationDelay: '150ms' }}
            >
              Meet <span className="gradient-text">U-TOPIA</span>
            </h2>
            <p
              className="text-lg md:text-xl text-gray-400 mb-10 opacity-0 animate-fade-in-up leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              A family of companies built on one belief: business should serve everyone it touches. Each is its own tributary, all flowing into the same shared home — <span className="text-white font-semibold">U CENTER</span>.
            </p>

            <blockquote
              className="relative max-w-3xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm p-8 md:p-10">
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                  Built to flow value toward people — not extract it from them.
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT IS A DAO — Open Rules / Community Votes / Permanent Record
         ============================================================ */}
      <section className="relative bg-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[400px] h-[400px] -top-20 right-1/4 rounded-full blur-[120px] opacity-15 bg-primary/30 animate-float" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm"
                style={{ animationDelay: '100ms' }}
              >
                Understanding the Foundation
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
                style={{ animationDelay: '150ms' }}
              >
                What Is a <span className="gradient-text">DAO?</span>
              </h2>
              <p
                className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                A <span className="text-white">Decentralized Autonomous Organization</span> — a community that runs itself by shared, transparent rules.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {/* Open Rules */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Open Rules</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Transparent code, readable by anyone — changeable only by the community.
                </p>
              </div>

              {/* Community Votes */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Community Votes</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Decisions are made by members, not executives. Your voice counts.
                </p>
              </div>

              {/* Permanent Record */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Permanent Record</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every transaction lives on a public blockchain — no one can erase or alter it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE BIG IDEA — Stakeholder Capitalism
         ============================================================ */}
      <section className="relative bg-gradient-to-b from-[#0a0f1a] via-[#0d1526] to-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] top-1/3 -left-32 rounded-full blur-[120px] opacity-15 bg-purple-500/30 animate-float" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm tracking-widest uppercase"
                style={{ animationDelay: '100ms' }}
              >
                The Big Idea
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight leading-tight"
                style={{ animationDelay: '150ms' }}
              >
                Stakeholder Capitalism: <br className="hidden md:block" />
                <span className="gradient-text">An Economy That Works for Everyone</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="space-y-5 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  For decades, business served only its shareholders. Stakeholder capitalism is the alternative — a business is responsible to <span className="text-white">everyone it affects</span>.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  But statements aren't systems. <span className="text-white">U CENTER is the mechanism</span> — transparent, community-governed, automatic.
                </p>
              </div>

              {/* Stat Card */}
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1f35] to-[#0a1628] p-8 md:p-10">
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-6">CEO-to-Worker Pay Ratio</p>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-gray-400 text-sm">1965</span>
                        <span className="text-3xl md:text-4xl font-bold text-white">21<span className="text-primary">×</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[6%] bg-gradient-to-r from-primary/60 to-purple-500/60 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-gray-400 text-sm">2021</span>
                        <span className="text-3xl md:text-4xl font-bold text-white">350<span className="text-primary">×</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-full gradient-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                    Wealth did not spread. It pooled — like water behind a dam, rising higher and higher at the top while the communities below ran dry.
                  </p>
                </div>
              </div>
            </div>

            <blockquote
              className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                "The question was never whether businesses <span className="gradient-text not-italic font-bold">should</span> serve their communities. The question was always: how do you make sure they actually do?"
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================================
          EDUCATION FIRST — 4 cards
         ============================================================ */}
      <section className="relative bg-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[450px] h-[450px] top-0 right-0 rounded-full blur-[120px] opacity-15 bg-primary/30 animate-float" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 max-w-4xl mx-auto">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm tracking-widest uppercase"
                style={{ animationDelay: '100ms' }}
              >
                Education First
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight leading-tight"
                style={{ animationDelay: '150ms' }}
              >
                Learning Is Not a Feature Here. <br className="hidden md:block" />
                It Is the <span className="gradient-text">Foundation.</span>
              </h2>
              <p
                className="text-lg md:text-xl text-gray-400 opacity-0 animate-fade-in-up leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                Most people arrive with the same honest admission: <span className="text-white italic">"I don't really understand how money works."</span> That is not a weakness. That is the starting line — and it's exactly where U CENTER meets you.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {[
                {
                  title: "How Wealth Flows",
                  desc: "Understand how value moves through economies, communities, and systems — and why it so often gets stuck.",
                  icon: (
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ),
                },
                {
                  title: "Governance & DAOs",
                  desc: "Learn what decentralized governance really means and how communities can hold real power.",
                  icon: (
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 21h18"/>
                      <path d="M5 21V10l7-5 7 5v11"/>
                      <path d="M9 21v-6h6v6"/>
                    </svg>
                  ),
                },
                {
                  title: "Stakeholder Thinking",
                  desc: "Discover what it means to have a genuine stake in an ecosystem — not just as a customer, but as a co-owner.",
                  icon: (
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                },
                {
                  title: "Blockchain Basics",
                  desc: "Demystify the technology behind transparent, tamper-proof ledgers — in plain, human language.",
                  icon: (
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-7 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <p
              className="text-center text-gray-500 text-base mt-12 max-w-3xl mx-auto opacity-0 animate-fade-in-up leading-relaxed"
              style={{ animationDelay: '400ms' }}
            >
              Every piece of education U CENTER offers returns to the same question: <span className="text-white">does this help you understand your world more clearly?</span> If yes, it belongs here. If it only serves to impress or confuse, it does not.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          PUTTING IT TOGETHER — U-TOPIA, U CENTER, and You
         ============================================================ */}
      <section className="relative bg-gradient-to-b from-[#0a0f1a] via-[#0d1526] to-[#0a0f1a] py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-10 bg-gradient-to-r from-primary/40 to-purple-500/40" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0 animate-fade-in-up backdrop-blur-sm tracking-widest uppercase"
                style={{ animationDelay: '100ms' }}
              >
                Putting It Together
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight"
                style={{ animationDelay: '150ms' }}
              >
                U-TOPIA, U CENTER, <span className="gradient-text">and You</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center">
                <div className="w-14 h-14 rounded-full gradient-primary mx-auto mb-5 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">1</div>
                <h3 className="text-xl font-bold text-white mb-3">U-TOPIA</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The <span className="text-white">ecosystem</span> — a growing family of companies built on the principle that business should benefit everyone it touches.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center shadow-lg shadow-primary/10">
                <div className="w-14 h-14 rounded-full gradient-primary mx-auto mb-5 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">2</div>
                <h3 className="text-xl font-bold text-white mb-3">U CENTER</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The <span className="text-white">shared home</span> of that ecosystem — the governance layer, the educational foundation, and the community infrastructure.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] p-8 text-center">
                <div className="w-14 h-14 rounded-full gradient-primary mx-auto mb-5 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">3</div>
                <h3 className="text-xl font-bold text-white mb-3">You</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A <span className="text-white">stakeholder</span>. Not a user. Not a customer number. A genuine participant with a voice in how the ecosystem grows.
                </p>
              </div>
            </div>

            <div
              className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: '350ms' }}
            >
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
                The U CENTER community treasury — the shared pool of resources that belongs to all members — grows as the ecosystem grows. Decisions about how it is used are made openly, by the community, through transparent governance. <span className="text-white">It belongs to the watershed, and the watershed is all of us.</span>
              </p>

              <blockquote className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm p-8">
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic">
                  "You do not need to understand everything on day one. You only need to take the first step: <span className="gradient-text not-italic font-bold">come learn</span>. The river will do the rest."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INVESTMENT PACKAGES (kept)
         ============================================================ */}
      <InvestmentPackages />

      {/* ============================================================
          FAQ — kept, on dark background
         ============================================================ */}
      <section className="relative bg-[#0a0f1a] py-24 overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-6 opacity-0 animate-fade-in-up backdrop-blur-sm"
                style={{ animationDelay: '100ms' }}
              >
                Got Questions?
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '150ms' }}
              >
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p
                className="text-lg text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
              >
                Everything you need to know about joining U CENTER
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '250ms' }}
            >
              {/* Left Column */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      Is participation in U CENTER an investment?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      No. Participation in U CENTER does not constitute an investment. All content is provided for educational purposes only, and any rewards are performance-based and depend on real platform activity, eligibility, and compliance checks.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      Do I need a technical background to participate?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      No. You don't need to be a software engineer or know anything about blockchain to start. U CENTER is built around education — we meet you where you are and walk you through every concept in plain language.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      How does community governance actually work?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      Decisions about shared resources are made through open votes proportional to each member's contribution and participation. Results are recorded permanently on a public blockchain — a shared, tamper-proof ledger that belongs to everyone and is controlled by no one.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Right Column */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-4"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      What's the difference between U-TOPIA and U CENTER?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      U-TOPIA is the broader ecosystem — a family of companies built on stakeholder principles. U CENTER is the shared home of that ecosystem: the governance layer, the educational foundation, and the community infrastructure that ties it all together.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      What is the community treasury?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      The U CENTER community treasury is a shared pool of resources that belongs to all members. It grows as the ecosystem grows, and decisions about how it is used are made openly, by the community, through transparent on-chain governance — not by an executive or board.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-6"
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f1f35] to-[#0a1628] overflow-hidden data-[state=open]:border-primary/40 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <span className="text-left text-base font-semibold text-white group-hover:text-primary transition-colors">
                      How do I take the first step?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      Create a free account and start exploring U CENTER's educational foundation. You don't need to understand everything on day one — you only need to come learn. The river will do the rest.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
         ============================================================ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0f1a] to-[#0d1526] border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-primary/40 to-purple-500/40" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative container mx-auto px-6 text-center">
          <div
            className="max-w-3xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
              Take the First Step
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Come <span className="gradient-text">Learn.</span><br />
              The River Will Do the Rest.
            </h2>

            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Step into a community that is actively learning, actively building, and actively governing an economy designed to be worthy of the trust people place in it.
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
                  Download Overview
                </Button>
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-10 max-w-xl mx-auto leading-relaxed">
              Participation in U CENTER does not constitute an investment. All content is provided for educational purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
         ============================================================ */}
      <footer className="bg-[#0a0f1a] py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoLight} alt="U CENTER" className="h-8" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                The Learning Home of the U-TOPIA Ecosystem — where understanding comes first, and everything else follows.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5">Follow U-TOPIA</h4>
              <ul className="space-y-3">
                <li><a href="https://t.me/+G6ntSwYCzjJkNzE0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Telegram</a></li>
                <li><a href="https://x.com/UCoinOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">X (Twitter)</a></li>
                <li><a href="https://www.linkedin.com/company/u-topia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/ucoinofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Instagram</a></li>
                <li><a href="https://discord.gg/qZB83k5HmX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5">Legal</h4>
              <ul className="space-y-3">
                <li><a href="https://docsend.com/view/3wjptrvw2c35gj8p" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="https://docsend.com/view/pehz2xqa23xw3pyc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-center text-gray-500 text-sm">
              © U CENTER · The Learning Home of the U-TOPIA Ecosystem · 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
