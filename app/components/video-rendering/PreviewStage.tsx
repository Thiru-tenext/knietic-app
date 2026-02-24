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
  onFrameUpdate?: (frame: number) => void;
}

export const PreviewStage = ({ videoProps, totalDuration, videoUrl, onFrameUpdate }: PreviewStageProps) => {
  const resolutionString = videoProps.resolution || '1080x1920';
  const [widthStr, heightStr] = resolutionString.split('x');
  const compositionWidth = parseInt(widthStr, 10) || 1080;
  const compositionHeight = parseInt(heightStr, 10) || 1920;
  
  const isLandscape = compositionWidth > compositionHeight;
  const maxWidth = isLandscape ? '1000px' : '450px';

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const { current } = playerRef;
    if (current && onFrameUpdate) {
      const onFrame = (e: any) => {
        onFrameUpdate(e.detail.frame);
      };
      current.addEventListener("frameupdate", onFrame);
      return () => current.removeEventListener("frameupdate", onFrame);
    }
  }, [onFrameUpdate]);

  return (
    <div className="flex-1 bg-mirage-black relative overflow-hidden flex flex-col pt-10">
      {/* Dynamic Ambient Background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[160px] pointer-events-none mix-blend-screen opacity-[0.05] transition-colors duration-1000"
        style={{ backgroundColor: videoProps.primaryColor }}
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-10 flex flex-col relative z-10 gap-8">
        
        {/* Cinematic Header Control Bar */}
        <div className="flex items-center justify-between bg-mirage-dark/50 border border-white/5 rounded-md px-8 py-4 shadow-2xl backdrop-blur-3xl">
           <div className="flex items-center gap-6">
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
             </div>
             <div className="w-px h-6 bg-white/5" />
              <div className="flex items-center gap-3">
                {isLandscape ? <Tv className="w-4 h-4 text-mirage-cyan" /> : <Smartphone className="w-4 h-4 text-mirage-cyan" />}
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">MASTER_CANVAS</span>
              </div>
           </div>

           <div className="flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-3 bg-mirage-lime/10 px-4 py-1.5 rounded-md border border-mirage-lime/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-mirage-lime shadow-glow-lime animate-pulse" />
                 <span className="text-[9px] font-black text-mirage-lime tracking-[0.2em] uppercase">Stream_Active</span>
              </div>
              <div className="flex items-center gap-8 text-[11px] font-black font-mono text-white/20 uppercase tracking-tighter">
                 <div className="flex flex-col items-end">
                    <span className="text-[7px] text-white/10 mb-0.5">Resolution</span>
                    <span className="text-white text-[10px] tracking-widest">{compositionWidth}×{compositionHeight}</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[7px] text-white/10 mb-0.5">Frequency</span>
                    <span className="text-white text-[10px] tracking-widest">30 FPS</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[7px] text-white/10 mb-0.5">Runtime</span>
                    <span className="text-white text-[10px] tracking-widest">{(totalDuration/30).toFixed(2)}S</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Studio Preview Environment */}
        <div className="flex-1 flex items-center justify-center p-12 relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.02] pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.02] pointer-events-none" />
          
          <div 
            className="w-full max-h-[75vh] rounded-md overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-4 border-white/5 bg-black relative mx-auto transition-all duration-700 hover:scale-[1.01]"
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
              ref={playerRef}
              controls
              autoPlay
              loop
            />
          </div>
        </div>

        {/* Pro Render Alert */}
        {videoUrl && (
          <div className="absolute bottom-16 right-16 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 z-50">
            <div className="bg-mirage-dark/90 backdrop-blur-2xl border border-white/10 rounded-md p-8 flex flex-col items-center gap-6 w-80 shadow-2xl">
              <div className="w-16 h-16 bg-mirage-lime rounded-md flex items-center justify-center shadow-glow-lime hover:rotate-12 transition-transform cursor-pointer">
                <Download className="w-7 h-7 text-black" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-black text-white tracking-tighter uppercase">Synthesis_Final</p>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Master node ready for deployment.</p>
              </div>
              <a
                href={videoUrl}
                download="kinetic-studio-master.mp4"
                className="w-full bg-mirage-lime text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-md text-center shadow-glow-lime hover:scale-105 active:scale-95 transition-all"
              >
                Download_Master_V4
              </a>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};
