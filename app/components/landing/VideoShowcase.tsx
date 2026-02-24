"use client";

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Activity, ShieldCheck, Target, Play } from 'lucide-react';

export function VideoShowcase() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="bg-mirage-black pb-64 relative overflow-hidden">
      {/* Decorative Spotlights */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-mirage-lime/5 rounded-full blur-[180px] -z-10" />

      <div className="clean-container">
        <div className="reveal">
          <div className="relative w-full aspect-video rounded-[4rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group bg-mirage-dark">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105 opacity-80"
            >
              <source src="/assets/video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Cinematic Layout */}
            <div className="absolute inset-0 bg-gradient-to-t from-mirage-black via-transparent to-mirage-black/40 pointer-events-none" />
            
            {/* Visual Crosshairs */}
            <div className="absolute inset-20 border border-white/[0.03] pointer-events-none">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mirage-lime/20" />
               <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mirage-lime/20" />
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mirage-lime/20" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mirage-lime/20" />
            </div>

            {/* Floating Protocol Labels */}
            <div className="absolute top-16 left-16 flex flex-col gap-6">
              <div className="flex items-center gap-4 px-8 py-4 bg-white/[0.03] backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl">
                <Sparkles className="w-6 h-6 text-mirage-lime" />
                <span className="text-xl font-black text-white tracking-tighter">AI_SYNTH_04_MASTER</span>
              </div>
              
              <div className="flex items-center gap-8 px-8 py-3 bg-mirage-black/60 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-xl">
                 <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-mirage-lime animate-pulse" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Flux: Stable</span>
                 </div>
                 <div className="w-px h-4 bg-white/10" />
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-mirage-lime" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Kernel Sec</span>
                 </div>
              </div>
            </div>

            {/* Big Center Play Icon (Only on Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
               <div className="w-32 h-32 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-mirage-lime shadow-[0_0_80px_rgba(212,255,113,0.2)]">
                  <Play className="w-12 h-12 fill-current" />
               </div>
            </div>

            {/* Audio Control Hub */}
            <div className="absolute bottom-16 right-16 z-20">
              <button
                onClick={toggleMute}
                className="relative p-8 bg-mirage-lime text-black rounded-3xl hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(212,255,113,0.3)] group-hover:shadow-[0_0_80px_rgba(212,255,113,0.5)]"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-9 h-9" /> : <Volume2 className="w-9 h-9" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
