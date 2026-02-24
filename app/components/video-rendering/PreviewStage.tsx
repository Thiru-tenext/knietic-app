"use client";

import React from "react";
import { Player } from "@remotion/player";
import { KineticText } from "@/remotion/KineticText";
import { KineticVideoProps } from "@/remotion/types";
import { Download, Monitor, Activity, Radio, Cpu, Smartphone, Tv } from "lucide-react";

interface PreviewStageProps {
  videoProps: KineticVideoProps;
  totalDuration: number;
  videoUrl: string | null;
}

export const PreviewStage = ({ videoProps, totalDuration, videoUrl }: PreviewStageProps) => {
  const resolutionString = videoProps.resolution || '1080x1920';
  const [widthStr, heightStr] = resolutionString.split('x');
  const compositionWidth = parseInt(widthStr, 10) || 1080;
  const compositionHeight = parseInt(heightStr, 10) || 1920;
  
  const isLandscape = compositionWidth > compositionHeight;
  const maxWidth = isLandscape ? '1000px' : '450px';

  return (
    <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col pt-10">
      {/* Dynamic Ambient Background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[160px] pointer-events-none mix-blend-multiply opacity-[0.03] transition-colors duration-1000"
        style={{ backgroundColor: videoProps.primaryColor }}
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-10 flex flex-col relative z-10 gap-8">
        
        {/* Cinematic Header Control Bar */}
        <div className="flex items-center justify-between bg-white border border-slate-100 rounded-[2rem] px-8 py-4 shadow-xl">
           <div className="flex items-center gap-6">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
             </div>
             <div className="w-px h-6 bg-slate-100" />
             <div className="flex items-center gap-3">
                {isLandscape ? <Tv className="w-5 h-5 text-indigo-400" /> : <Smartphone className="w-5 h-5 text-indigo-400" />}
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">MASTER_CANVAS</span>
             </div>
           </div>

           <div className="flex items-center gap-10">
             <div className="hidden lg:flex items-center gap-3 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 tracking-widest uppercase">Stream: Active</span>
             </div>
             <div className="flex items-center gap-8 text-[11px] font-black font-mono text-slate-300 uppercase tracking-tighter">
                <div className="flex flex-col items-end">
                   <span className="text-[8px] text-slate-400 mb-0.5">Resolution</span>
                   <span className="text-slate-900 text-sm tracking-widest">{compositionWidth}×{compositionHeight}</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[8px] text-slate-400 mb-0.5">Frequency</span>
                   <span className="text-slate-900 text-sm tracking-widest">30 FPS</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[8px] text-slate-400 mb-0.5">Runtime</span>
                   <span className="text-slate-900 text-sm tracking-widest">{(totalDuration/30).toFixed(2)}S</span>
                </div>
             </div>
           </div>
        </div>

        {/* Studio Preview Environment */}
        <div className="flex-1 flex items-center justify-center p-12 relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-100 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-slate-100 pointer-events-none" />
          
          <div 
            className="w-full max-h-[75vh] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] ring-8 ring-white bg-slate-100 relative mx-auto transition-all duration-700 hover:scale-[1.01]"
            style={{ 
              aspectRatio: `${compositionWidth} / ${compositionHeight}`,
              maxWidth: maxWidth 
            }}
          >
            <Player
              component={KineticText as React.FC<any>}
              inputProps={videoProps}
              durationInFrames={totalDuration || 1}
              fps={30}
              compositionWidth={compositionWidth}
              compositionHeight={compositionHeight}
              style={{
                width: "100%",
                height: "100%",
                display: 'block'
              }}
              controls
              autoPlay
              loop
            />
          </div>
        </div>

        {/* Pro Render Alert */}
        {videoUrl && (
          <div className="absolute bottom-16 right-16 flex flex-col gap-3 animate-fade-in z-50">
            <div className="mirage-card !p-8 border-emerald-100 bg-white/95 backdrop-blur-xl flex flex-col items-center gap-6 w-80 shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-emerald-200 rotate-12 transition-transform hover:rotate-0">
                <Download className="w-8 h-8 text-white" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-black text-slate-900 tracking-tighter">Render finalized.</p>
                <p className="text-sm font-bold text-slate-400">Master production ready for export.</p>
              </div>
              <a
                href={videoUrl}
                download="kinetic-studio-master.mp4"
                className="btn-primary w-full !bg-emerald-500 !py-4 shadow-emerald-100"
              >
                Download MP4 Master
              </a>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};
