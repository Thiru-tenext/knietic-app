"use client";

import Link from "next/link";
import { Target, Play, Wand2 } from "lucide-react";

interface EditorNavbarProps {
  rendering: boolean;
  onRender: () => void;
  onSaveDraft?: () => void;
}

export const EditorNavbar = ({ rendering, onRender, onSaveDraft }: EditorNavbarProps) => {
  return (
    <nav className="h-16 border-b border-white/5 bg-mirage-dark/50 backdrop-blur-3xl flex items-center justify-between px-8 shrink-0 relative z-20">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
        <div className="w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group-hover:bg-mirage-lime group-hover:text-black transition-all duration-500">
          <Target className="w-5 h-5" />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase">Kinetic<span className="text-mirage-lime">.studio</span></span>
      </Link>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSaveDraft}
          className="text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          Save_Draft
        </button>
        <button 
          onClick={onRender}
          disabled={rendering}
          className="group relative flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 bg-mirage-lime text-black rounded-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-glow-lime-md"
        >
          {rendering ? <Wand2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          <span className="relative z-10">{rendering ? "Synthesizing..." : "Export_Master"}</span>
        </button>
      </div>
    </nav>
  );
};
