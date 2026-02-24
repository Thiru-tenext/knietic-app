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
    <nav className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-8 shrink-0 relative z-20">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 ring-1 ring-white/10">
          <Target className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Kinetic<span className="text-indigo-600">.studio</span></span>
      </Link>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSaveDraft}
          className="text-sm font-bold px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors text-slate-500"
        >
          Save Progress
        </button>
        <button 
          onClick={onRender}
          disabled={rendering}
          className="group relative flex items-center gap-2 text-sm font-bold px-8 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all disabled:opacity-50 overflow-hidden shadow-lg shadow-indigo-100"
        >
          {rendering ? <Wand2 className="w-4 h-4 animate-pulse text-white/50" /> : <Play className="w-4 h-4" />}
          <span className="relative z-10">{rendering ? "Rendering..." : "Export Video"}</span>
        </button>
      </div>
    </nav>
  );
};
