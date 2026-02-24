import React from "react";

export function SocialProof() {
  const partners = [
    { name: "TikTok", symbol: "⌘" },
    { name: "Instagram", symbol: "◈" },
    { name: "YouTube", symbol: "►" },
    { name: "Meta", symbol: "∞" },
    { name: "Snapchat", symbol: "❖" },
    { name: "LinkedIn", symbol: "linked" },
    { name: "Twitter", symbol: "𝕏" },
    { name: "Pinterest", symbol: "📌" },
  ];

  // Quadruple array for seamless infinite loop on any screen size
  const scrollingPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="bg-mirage-black py-16 relative overflow-hidden">
      {/* Top & Bottom Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-black text-slate-700 uppercase tracking-[0.5em]">
            Global Ecosystem Integration
          </span>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-mirage-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-mirage-black to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-24 hover:[animation-play-state:paused] py-4">
            {scrollingPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-6 group cursor-default grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-4xl text-slate-300 group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                  {partner.symbol}
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-500 group-hover:text-white whitespace-nowrap transition-colors duration-700">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}