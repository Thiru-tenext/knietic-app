'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-mirage-black">
      {/* Cinematic Spotlights */}
      <div className="spotlight w-[1000px] h-[600px] top-[-100px] left-1/2 -translate-x-1/2 opacity-40" />
      <div className="spotlight w-[600px] h-[600px] bottom-[-200px] right-[-100px] bg-mirage-purple/10 opacity-20" />
      
      {/* Technical Scanning Line */}
      <div className="scan-line" />

      <div className="clean-container relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* <div className="inline-flex items-center gap-6 mb-10 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-2xl reveal animate-float-gentle">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mirage-lime" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Verified Engine v4.2</span>
             </div>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-mirage-lime" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Zero-Latency Synthesis</span>
             </div>
          </div> */}

          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-white mb-10 leading-[0.85] reveal">
            Synthesize <br />
            <span className="text-mirage-gradient">Motion Graphics.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-tight font-bold reveal">
            The architecturally crafted creative engine for professional video SaaS. <br className="hidden md:block" />
            Designed for high-impact cinematic reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 reveal">
            <Link href="/video-rendering" className="btn-mirage-primary shadow-glow-lime">
              Launch Master Studio <ArrowRight className="w-6 h-6 ml-1" />
            </Link>
            <button className="flex items-center gap-4 text-xl font-black text-white hover:text-mirage-lime transition-all group">
               <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                  <Play className="w-7 h-7 fill-current ml-1" />
               </div>
               Watch Reel
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Beams */}
      <div className="beam-line top-[20%] left-0 w-full opacity-20" />
      <div className="beam-line bottom-[20%] left-0 w-full opacity-10" />

      {/* Floating Metrics */}
      <div className="absolute bottom-20 left-12 hidden xl:flex flex-col gap-8 reveal">
         <div className="flex flex-col border-l-2 border-mirage-lime/30 pl-6">
            <span className="text-sm font-black text-mirage-lime uppercase tracking-widest mb-1">Status</span>
            <span className="text-4xl font-black text-white">Live_01</span>
         </div>
         <div className="flex flex-col border-l-2 border-white/5 pl-6">
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Latency</span>
            <span className="text-4xl font-black text-white">12ms</span>
         </div>
      </div>
    </section>
  );
}
