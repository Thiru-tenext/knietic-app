"use client";

import { useState, useMemo, useEffect } from "react";
import { defaultMyCompProps, KineticVideoProps } from "@/remotion/types";
import { EditorNavbar } from "../components/video-rendering/EditorNavbar";
import { EditorSidebar } from "../components/video-rendering/EditorSidebar";
import { PreviewStage } from "../components/video-rendering/PreviewStage";
import { Info, ShieldCheck, Target } from "lucide-react";

export default function Home() {
  const [props, setProps] = useState<KineticVideoProps>(defaultMyCompProps);
  const [rendering, setRendering] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("kinetic_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.audioUrl && parsed.audioUrl.includes('pixabay.com')) {
           parsed.audioUrl = '';
        }
        setProps(parsed);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem("kinetic_draft", JSON.stringify(props));
    alert("Draft saved successfully!");
  };

  const totalDuration = useMemo(() => {
    let duration = 0;
    for (let i = 0; i < props.scenes.length; i++) {
      const scene = props.scenes[i];
      duration += Math.max(15, scene.durationInFrames);
      if (i < props.scenes.length - 1 && scene.transitionType && scene.transitionType !== 'none') {
        duration -= 10;
      }
    }
    return duration;
  }, [props.scenes]);

  const handleRender = async () => {
    setRendering(true);
    setVideoUrl(null);
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...props, durationInFrames: totalDuration }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || "Unknown render error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      alert(`Failed to render video: ${err.message}`);
    } finally {
      setRendering(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-mirage-black text-slate-300 font-sans overflow-hidden">
      <EditorNavbar rendering={rendering} onRender={handleRender} onSaveDraft={handleSaveDraft} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <EditorSidebar 
          videoProps={props} 
          setVideoProps={setProps} 
          currentFrame={currentFrame}
        />
        <PreviewStage 
          videoProps={props} 
          totalDuration={totalDuration} 
          videoUrl={videoUrl} 
          onFrameUpdate={setCurrentFrame}
        />
      </div>

      {/* Floating Status / Pro Layer */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 px-6 py-2.5 bg-mirage-dark/90 backdrop-blur-2xl border border-white/5 rounded-md shadow-2xl z-50 pointer-events-none">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-3.5 h-3.5 text-mirage-lime" />
             <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] leading-none">Kernel_Secured</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-3">
             <Target className="w-3.5 h-3.5 text-mirage-cyan" />
             <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] leading-none">AI_SYNC_v4.2</span>
          </div>
      </div> */}
    </div>
  );
}
