"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Upload, Palette, Download, ArrowRight, Volume2, VolumeX, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export function HowItWorks() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const steps = [
    {
      title: "Narrative Intake",
      description: "Initialize your genesis block. Our AI protocols parse your script for rhythmic cadence.",
      icon: <Upload className="w-9 h-9 text-mirage-lime" />,
    },
    {
      title: "Spectral Styling",
      description: "Select from professional trajectory presets or synthesize a custom motion identity.",
      icon: <Palette className="w-9 h-9 text-white" />,
    },
    {
      title: "Master Compilation",
      description: "Execute the master render protocol. Receive high-fidelity 4K assets in instantaneous flux.",
      icon: <Download className="w-9 h-9 text-mirage-lime" />,
    }
  ];

  return (
    <section id="workflow" className="py-64 bg-mirage-black relative overflow-hidden">
      {/* Decorative Spotlights */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-mirage-lime/5 rounded-full blur-[160px] -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-mirage-blue/5 rounded-full blur-[140px] -z-10" />

      <div className="clean-container">
        <div className="text-center mb-48 reveal">
          <div className="badge-mirage mb-12">Automated Synthesis Workflow</div>
          <h2 className="text-7xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none">
            Simple, automated <br />
            <span className="text-mirage-gradient">Synthesis chain.</span>
          </h2>
          <p className="text-3xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-bold">
            Our architecturally crafted chain takes you from raw narrative to master-grade video in instantaneous temporal flux.
          </p>
        </div>

        <div className="relative mb-64 reveal-stagger">
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-px bg-white/5 -z-10" />
          
          <div className="grid lg:grid-cols-3 gap-24">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-mirage-dark border border-white/5 rounded-[3.5rem] flex items-center justify-center mb-12 shadow-3xl group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 transition-all duration-700 group-hover:scale-110">
                    <div className="relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-12deg]">
                       {step.icon}
                    </div>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">{step.title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-sm font-bold group-hover:text-slate-300 transition-colors">
                    {step.description}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                   <div className="hidden lg:flex absolute top-[48px] -right-12 items-center justify-center text-white/10 group-hover:text-mirage-lime/40 transition-colors duration-700">
                      <ArrowRight className="w-12 h-12" />
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Master CTA Card */}
        <div className="mirage-card !p-0 overflow-hidden !rounded-[5rem] border-white/10 shadow-[0_100px_200px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row items-center relative group reveal">
           <div className="absolute inset-0 bg-mirage-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[80px]" />
           
           <div className="p-16 lg:p-24 lg:w-1/2 relative z-10 space-y-12">
              <div className="flex items-center gap-6 text-mirage-lime">
                 <Zap className="w-8 h-8 fill-current shadow-glow-lime" />
                 <span className="text-sm font-black uppercase tracking-[0.4em]">Protocol_Ready</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] text-white tracking-tighter">
                Ready to transform <br />
                your <span className="text-mirage-lime">Process?</span>
              </h2>
              <p className="text-slate-500 text-2xl mb-16 max-w-md leading-relaxed font-bold">Secure your place in the future of automated, high-fidelity motion graphics synthesis.</p>
              
              <div className="flex flex-wrap gap-8 items-center">
                 <Link href="/studio" className="btn-mirage-primary !px-16 !py-8 text-2xl shadow-glow-lime hover:scale-110 transition-transform duration-500">
                    Initialize Studio <ArrowRight className="w-8 h-8 ml-3 transition-transform group-hover:translate-x-2" />
                 </Link>
                 <div className="flex items-center gap-4 text-white/20">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encryption</span>
                 </div>
              </div>
           </div>
           
           <div className="lg:w-1/2 w-full relative p-6 lg:p-12">
              <div className="aspect-video bg-black rounded-[4rem] overflow-hidden relative shadow-4xl group-hover:scale-[1.02] transition-transform duration-1000 border border-white/10">
                 <video 
                   ref={videoRef}
                   autoPlay 
                   loop 
                   muted={isMuted} 
                   playsInline 
                   className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                 >
                   <source src="/assets/video2.mp4" type="video/mp4" />
                 </video>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                 
                 <div className="absolute top-10 left-10 flex items-center gap-4 px-6 py-3 bg-white/[0.03] backdrop-blur-3xl rounded-2xl border border-white/10">
                    <Activity className="w-5 h-5 text-mirage-lime animate-pulse" />
                    <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase">Synth_Kernel_02</span>
                 </div>

                 <button 
                   onClick={toggleMute}
                   className="absolute bottom-10 right-10 p-6 bg-mirage-lime text-black rounded-3xl shadow-glow-lime hover:scale-110 active:scale-95 transition-all z-20"
                 >
                   {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                 </button>
              </div>
              
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-mirage-dark border border-white/5 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-4xl animate-float-gentle">
                 <Sparkles className="w-8 h-8 text-mirage-lime mb-3" />
                 <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Master</span>
                 <span className="text-xl font-black text-white">4K_MASTER</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
