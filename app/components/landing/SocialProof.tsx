import React from 'react';

export function SocialProof() {
  const partners = [
    { name: 'TikTok', symbol: '⌘' },
    { name: 'Instagram', symbol: '◈' },
    { name: 'YouTube', symbol: '►' },
    { name: 'Meta', symbol: '∞' },
    { name: 'Snapchat', symbol: '❖' },
  ];

  return (
    <section className="bg-mirage-black py-32 relative overflow-hidden">
      {/* Structural Beams */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="clean-container">
        <div className="text-center mb-24 reveal">
           <span className="text-sm font-black text-slate-700 uppercase tracking-[0.5em]">Global Ecosystem Integration</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 reveal-stagger">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-6 group cursor-default transition-all duration-1000 grayscale opacity-20 hover:grayscale-0 hover:opacity-100">
              <div className="w-16 h-16 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-4xl text-slate-300 group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                 {partner.symbol}
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-500 group-hover:text-white transition-colors duration-700">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
