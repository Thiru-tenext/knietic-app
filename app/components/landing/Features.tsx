"use client";

import React, { useState, useRef } from 'react';
import { Sparkles, Music, Cpu, Zap, Layout, Clock, Volume2, VolumeX, ShieldCheck, Activity, Target } from 'lucide-react';

export function Features() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const features = [
    {
      title: "Content Analysis",
      description: "AI-driven structural parsing of your narrative assets to determine optimal motion cadence.",
      icon: <Target className="w-8 h-8 text-mirage-lime" />,
    },
    {
      title: "Rhythmic Syncing",
      description: "Deep frequency analysis to align typography transformations with your score's peak flux.",
      icon: <Music className="w-8 h-8 text-mirage-lime" />,
    },
    {
      title: "Kinetic Layouts",
      description: "Mathematically precise layout generation that adapts to any target resolution or ratio.",
      icon: <Layout className="w-8 h-8 text-mirage-lime" />,
    },
    {
      title: "Live Synthesis",
      description: "Instantaneous visual feedback as you modify the synthesis parameters in the studio environment.",
      icon: <Zap className="w-8 h-8 text-mirage-lime" />,
    },
    {
      title: "Director Presets",
      description: "Professional stylistic trajectories curated by industry-leading motion architects.",
      icon: <Cpu className="w-8 h-8 text-mirage-lime" />,
    },
    {
      title: "Cloud Compilation",
      description: "Master-grade rendering up to 4K resolution on our distributed operational infrastructure.",
      icon: <Clock className="w-8 h-8 text-mirage-lime" />,
    }
  ];

  return (
    <section id="features" className="py-64 bg-mirage-black relative overflow-hidden">
      {/* Decorative Gradient Beams */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="clean-container">
        <div className="flex flex-col lg:flex-row gap-32 items-center mb-56 reveal">
          <div className="lg:w-1/2">
            <div className="badge-mirage mb-10">Operational Capabilities</div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 leading-[0.9] tracking-tighter">
              Structural features <br />
              for <span className="text-mirage-gradient">Motion Architects.</span>
            </h2>
            <p className="text-2xl text-slate-500 max-w-2xl leading-relaxed font-bold">
              We've re-engineered the complex landscape of motion graphics into a singular, high-fidelity workflow for the modern enterprise.
            </p>
            
            <div className="mt-16 grid grid-cols-2 gap-12">
               <div className="flex flex-col border-l-2 border-mirage-lime/40 pl-8">
                  <span className="text-5xl font-black text-white leading-none mb-3">0.02s</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Latency_Flux</span>
               </div>
               <div className="flex flex-col border-l-2 border-white/5 pl-8">
                  <span className="text-5xl font-black text-white leading-none mb-3">4K+</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Master_Out</span>
               </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="relative group">
               {/* Internal Glow */}
               <div className="absolute inset-x-[-40px] inset-y-[-20px] bg-mirage-lime/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <div className="mirage-card !p-4 relative z-10 !rounded-[3.5rem] bg-mirage-dark/60">
                 <div className="aspect-[16/10] bg-black rounded-[2.5rem] overflow-hidden relative">
                   <video 
                     ref={videoRef}
                     autoPlay 
                     loop 
                     muted={isMuted} 
                     playsInline 
                     className="w-full h-full object-cover opacity-60 transition-transform duration-[4000ms] group-hover:scale-105"
                   >
                     <source src="/assets/video1.mp4" type="video/mp4" />
                   </video>
                   
                   <div className="absolute inset-0 bg-gradient-to-tr from-mirage-black/60 to-transparent pointer-events-none" />
                   
                   <button 
                     onClick={toggleMute}
                     className="absolute bottom-10 right-10 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl text-white hover:bg-white/10 transition-all shadow-2xl"
                   >
                     {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                   </button>
                 </div>
                 
                 <div className="absolute -top-6 -right-6 px-8 py-4 bg-mirage-lime rounded-3xl shadow-[0_20px_60px_rgba(212,255,113,0.3)] flex items-center gap-4 animate-float-gentle text-black">
                    <div className="w-3 h-3 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)] animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-widest">Protocol_Live</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 reveal-stagger">
          {features.map((feature, idx) => (
            <div key={idx} className="mirage-card flex flex-col items-start group relative overflow-hidden bg-white/[0.02] border-white/5 shadow-2xl">
               <div className="absolute inset-0 bg-mirage-lime/10 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 pointer-events-none" />
               <div className="w-20 h-20 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:bg-mirage-lime group-hover:text-black group-hover:shadow-glow-lime relative z-10">
                 {feature.icon}
               </div>
               <h3 className="text-3xl font-black text-white mb-6 tracking-tighter relative z-10 group-hover:text-mirage-lime transition-colors">{feature.title}</h3>
               <p className="text-xl text-slate-500 font-bold leading-relaxed relative z-10 group-hover:text-slate-300 transition-colors">
                 {feature.description}
               </p>
               {/* Decorative Unit Identifier */}
               <div className="absolute top-10 right-10 text-[8px] font-black text-white/10 group-hover:text-mirage-lime/40 uppercase tracking-[0.5em] transition-colors">
                  Unit_Ref_0{idx + 1}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
