'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex justify-center pointer-events-none pt-8 px-6 transition-all duration-700">
      <nav 
        className={`pointer-events-auto transition-all duration-700 flex items-center justify-between border shadow-3xl overflow-hidden
        ${scrolled 
          ? 'w-full max-w-2xl rounded-full px-8 py-3 bg-mirage-dark/60 backdrop-blur-3xl border-white/10' 
          : 'w-full max-w-7xl rounded-none py-8 px-0 bg-transparent border-transparent shadow-none'
        }`}
      >
        <Link href="/" className="flex items-center gap-4 group">
          <div className={`relative bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:bg-mirage-lime group-hover:text-black transition-all duration-500 overflow-hidden ${scrolled ? 'w-10 h-10 p-2' : 'w-14 h-14 p-3 scale-110'}`}>
            <Target className="w-full h-full relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-mirage-lime/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Running scan line */}
            <div className="absolute inset-0 w-full h-[2px] bg-mirage-lime/40 -translate-y-full group-hover:animate-scan-fast" />
          </div>
          <span className={`font-black tracking-tighter text-white transition-all duration-500 relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-mirage-lime group-hover:to-white group-hover:bg-[length:200%_auto] group-hover:animate-gradient-x ${scrolled ? 'text-xl' : 'text-4xl'}`}>
            Kinetic<span className="text-mirage-lime transition-colors group-hover:text-inherit">.ai</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Workflow', 'Pricing'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-black text-slate-400 hover:text-mirage-lime uppercase tracking-[0.3em] transition-all duration-500 ${scrolled ? 'text-[9px]' : 'text-sm'}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/studio"
            className={`hidden sm:flex items-center gap-2 bg-mirage-lime text-black font-black rounded-full transition-all duration-500 shadow-glow-lime hover:scale-105 active:scale-95 group ${scrolled ? 'px-6 py-2.5 text-[10px]' : 'px-10 py-4 text-sm'}`}
          >
            Launch Studio <ArrowRight className={`${scrolled ? 'w-3 h-3' : 'w-5 h-5'} group-hover:translate-x-1 transition-transform`} />
          </Link>
          <button 
            className="md:hidden p-3 text-white hover:bg-white/5 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-4 bg-mirage-dark/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-700 shadow-4xl">
            {['Features', 'Workflow', 'Pricing'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-black text-white hover:text-mirage-lime transition-colors tracking-tighter"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/studio"
              className="w-full py-6 bg-mirage-lime text-black text-center text-2xl font-black rounded-2xl shadow-glow-lime"
              onClick={() => setMobileMenuOpen(false)}
            >
              Launch Studio
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
