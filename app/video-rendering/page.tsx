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
    <div className="flex flex-col h-screen bg-white text-slate-900 font-sans overflow-hidden">
      <EditorNavbar rendering={rendering} onRender={handleRender} onSaveDraft={handleSaveDraft} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <EditorSidebar videoProps={props} setVideoProps={setProps} />
        <PreviewStage videoProps={props} totalDuration={totalDuration} videoUrl={videoUrl} />
      </div>

      {/* Floating Status / Pro Layer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 px-8 py-3 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-full shadow-2xl z-50 pointer-events-none">
         <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Kernel Secured</span>
         </div>
         <div className="w-px h-4 bg-slate-200" />
         <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">AI SYNC v4.2</span>
         </div>
      </div>
    </div>
  );
}
