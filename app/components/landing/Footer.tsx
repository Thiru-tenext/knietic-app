import React from 'react';
import Link from 'next/link';
import { Target, Github, Twitter, Linkedin, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export function Footer() {
  const sections = [
    {
      title: "Engine_Core",
      links: ["Features", "Workflow", "Pricing", "Documentation"]
    },
    {
      title: "The_Registry",
      links: ["About Us", "Our Engine", "Brand Assets", "Contact"]
    },
    {
      title: "Protocols",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"]
    }
  ];

  return (
    <footer className="bg-mirage-black pt-32 pb-16 overflow-hidden relative border-t border-white/5">
      {/* Decorative Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-mirage-lime/5 rounded-full blur-[180px] -z-10" />

      <div className="clean-container">
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          
          <div className="lg:col-span-6 space-y-8">
            <Link href="/" className="flex items-center gap-6 group mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 duration-700">
                <Target className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  Kinetic<span className="text-mirage-lime">.ai</span>
                </span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em] mt-1 font-mono">Operational_SaaS v4.2</span>
              </div>
            </Link>
            
            <p className="max-w-xl text-xl font-bold text-slate-500 leading-tight">
              Automating professional motion graphics synthesis for elite content architects globally.
            </p>
            
            <div className="flex gap-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <button key={i} className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-mirage-lime hover:border-mirage-lime/30 transition-all duration-700 shadow-xl group">
                  <Icon className="w-5 h-5 transition-all group-hover:scale-110" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map(link => (
                    <li key={link}>
                      <Link href="#" className="text-base font-bold text-slate-500 hover:text-mirage-lime transition-all duration-500 flex items-center gap-2 group">
                        {link} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Brand Watermark */}
        <div className="relative mb-12 select-none pointer-events-none reveal flex justify-center overflow-hidden">
           <h2 className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-black leading-none text-white/[0.06] tracking-[-0.08em] whitespace-nowrap border-y border-white/[0.02] py-4">
              KINETIC ENGINE
           </h2>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <p className="text-xl font-bold text-slate-700">
            © 2026 Kinetic AI Synthesis Core. All parameters reserved.
          </p>
          <div className="flex items-center gap-16">
             <div className="flex items-center gap-4 px-8 py-3 bg-white/[0.02] rounded-full border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-mirage-lime shadow-[0_0_15px_rgba(212,255,113,0.8)] animate-pulse" />
                <span className="text-xs font-black text-mirage-lime uppercase tracking-widest">Master_System_Live</span>
             </div>
             <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-slate-700" />
                   <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Root_Verified</span>
                </div>
                <div className="w-px h-6 bg-white/5" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono">B0x-42_OK</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
