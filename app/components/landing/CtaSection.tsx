import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Command, Cpu } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-48 px-6 bg-white overflow-hidden relative kinetic-grid">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.03]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/[0.03]" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="kinetic-tag mb-10 mx-auto">
          <Sparkles className="w-3 h-3 text-iris" />
          <span>Final Synthesis Entry</span>
        </div>

        <h2 className="text-6xl md:text-9xl font-black text-slate-900 mb-10 tracking-tighter uppercase italic leading-[0.85]">
           Create your <br />
           <span className="text-kinetic-gradient">Masterwork.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
          The engine is live. The blueprint is valid. Initialize your commercial campaign with AI intelligence today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link 
            href="/studio"
            className="px-16 py-6 bg-[#09090b] text-white text-[12px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 hover:scale-105 transition-all shadow-2xl shadow-black/10 flex items-center gap-3"
          >
            Enter Studio Workbench <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/studio"
            className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2"
          >
            <Command className="w-4 h-4" /> View Documentation
          </Link>
        </div>

        {/* Technical Footer Indicator */}
        <div className="mt-32 pt-12 border-t border-black/[0.03] flex justify-center gap-16 opacity-30">
           <div className="flex items-center gap-4">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Compute Ready</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-iris animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Secure Handshake v4.2</span>
           </div>
        </div>
      </div>
    </section>
  );
}
