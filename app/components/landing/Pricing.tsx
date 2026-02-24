import React from 'react';
import { Check, Zap, Cpu, ShieldCheck } from 'lucide-react';

export function Pricing() {
  const tiers = [
    {
      name: "Standard_Kernel",
      price: "29",
      description: "Perfect for individuals starting with AI-driven motion synthesis.",
      features: ["5 Synthetic Master Renders", "1080p Resolution Profile", "Basic Narrative Patterns", "Standard Operational Logic"],
      featured: false,
      tag: "Starter"
    },
    {
      name: "Professional_Node",
      price: "79",
      description: "Optimized for elite content architects and growing brands.",
      features: ["Unlimited Master Renders", "4K Ultra-High Fidelity", "Full Spectral Library", "Priority Stream Logic", "AI Narrative Synthesis Assistant"],
      featured: true,
      tag: "Architect's Choice"
    },
    {
      name: "Enterprise_Suite",
      price: "249",
      description: "Bespoke operational protocols for large structural teams.",
      features: ["Custom Style Engine Node", "Direct API Protocol Access", "White Label Manifests", "Dedicated Compilation Server", "Multi-user Root Access"],
      featured: false,
      tag: "The Grid"
    }
  ];

  return (
    <section id="pricing" className="py-48 bg-mirage-black relative overflow-hidden">
      <div className="clean-container">
        <div className="text-center mb-40 reveal">
          <div className="badge-mirage mb-10">Monetization Protocols</div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Structural pricing <br />
            <span className="text-mirage-gradient">for every scale.</span>
          </h2>
          <p className="text-2xl text-slate-500 max-w-xl mx-auto leading-relaxed font-bold">
            Select the operational tier that aligns with your architectural flux. 
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-stretch">
          {tiers.map((tier) => (
            <div key={tier.name} className={`reveal flex flex-col h-full mirage-card !p-12 transition-all duration-1000 relative group border-2 ${tier.featured ? 'border-mirage-lime shadow-glow-lime hover:scale-[1.03] z-10 bg-white/[0.03]' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}>
              
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
                 {tier.featured ? <Cpu className="w-10 h-10 text-mirage-lime" /> : <ShieldCheck className="w-8 h-8 text-white" />}
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 rounded-full bg-mirage-lime animate-pulse" />
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">{tier.tag}</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-none">{tier.name}</h3>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-7xl font-black text-white tracking-tighter">${tier.price}</span>
                  <span className="text-xl text-slate-700 font-black uppercase tracking-widest">/Prot</span>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed font-bold min-h-[70px]">
                  {tier.description}
                </p>
              </div>

              <div className="w-full h-px bg-white/5 mb-12" />

              <div className="flex-1 space-y-6 mb-16">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 group/item">
                    <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${tier.featured ? 'bg-mirage-lime/10 border-mirage-lime/20 text-mirage-lime shadow-glow-lime' : 'bg-white/5 border-white/5 text-slate-600 group-hover:border-white/10 group-hover:text-white'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-lg text-slate-500 font-bold group-hover/item:text-slate-200 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-6 px-10 rounded-[2rem] text-xl font-black transition-all flex items-center justify-center gap-4 active:scale-95 shadow-3xl group overflow-hidden relative ${
                tier.featured 
                ? 'bg-mirage-lime text-black hover:bg-white shadow-glow-lime' 
                : 'bg-white/5 border-2 border-white/5 text-white hover:bg-white/10 hover:border-white/10'
              }`}>
                <span className="relative z-10 flex items-center gap-4">
                  Initialize Plan <Zap className={`w-6 h-6 ${tier.featured ? 'fill-current' : 'opacity-30'}`} />
                </span>
                {tier.featured && <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />}
              </button>

              {tier.featured && (
                <div className="absolute -bottom-6 left-10 right-10 flex justify-center">
                   <div className="px-8 py-2.5 bg-mirage-lime text-black text-[8px] font-black uppercase tracking-[0.5em] rounded-full shadow-glow-lime">Recommended_Sync_v4.2</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
