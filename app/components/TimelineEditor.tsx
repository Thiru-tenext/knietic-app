'use client';

import React, { useState, useEffect } from 'react';
import { AnimationTimeline, TimelineEditorState, Scene } from '@/app/types';
import { frameToSeconds, generateSceneId } from '@/app/utils/timeline';
import { 
  Play, 
  Plus, 
  Trash2, 
  Clock, 
  Layers,
  ChevronRight,
  Database,
  Terminal,
  Activity,
  Zap,
  Box,
  Layout,
  Settings,
  Maximize2,
  Cpu,
  Monitor,
  Music,
  Waves,
  Sparkles,
  Search,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface TimelineEditorProps {
  timeline: AnimationTimeline;
  onSave: (timeline: AnimationTimeline) => Promise<void>;
  onExport: (timeline: AnimationTimeline) => void;
  onRender?: (timeline: AnimationTimeline) => Promise<void>;
}

export function TimelineEditor({
  timeline: initialTimeline,
  onSave,
  onExport,
  onRender,
}: TimelineEditorProps) {
  const [timeline, setTimeline] = useState<AnimationTimeline>(initialTimeline);
  const [editorState, setEditorState] = useState<TimelineEditorState>({
    timeline,
    isPlaying: false,
    currentFrame: 0,
    zoom: 1,
    selectedSceneId: timeline.scenes[0]?.id,
  });

  const fps = timeline.video.fps;
  const selectedScene = timeline.scenes.find((s) => s.id === editorState.selectedSceneId);

  return (
    <div className="w-full h-full bg-mirage-black flex flex-col overflow-hidden font-sans">
      <div className="flex-1 flex overflow-hidden">
        
        {/* Architect Sidebar */}
        <aside className="w-[320px] bg-mirage-dark border-r border-white/5 flex flex-col shrink-0 shadow-xl z-20 overflow-hidden relative">
          {/* Top Nav Line */}
          <div className="absolute top-0 right-0 w-px h-full bg-mirage-lime/10" />
          
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-mirage-lime uppercase tracking-[0.4em]">Sequence_Nodes</span>
               <h3 className="text-xl font-black text-white tracking-tighter">Timeline_Core</h3>
            </div>
            <button
              onClick={() => {
                const lastScene = timeline.scenes[timeline.scenes.length - 1];
                const newStartFrame = lastScene ? lastScene.endFrame : 0;
                const newScene: Scene = { id: generateSceneId(), startFrame: newStartFrame, endFrame: newStartFrame + 60, layers: [] };
                setTimeline({ ...timeline, scenes: [...timeline.scenes, newScene] });
              }}
              className="w-10 h-10 rounded-xl bg-mirage-lime text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,255,113,0.3)] group"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-mirage-black/50">
            {timeline.scenes.map((scene, idx) => (
              <div
                key={scene.id}
                onClick={() => setEditorState({ ...editorState, selectedSceneId: scene.id })}
                className={`p-6 rounded-2xl border-2 transition-all duration-700 cursor-pointer group relative overflow-hidden ${
                  editorState.selectedSceneId === scene.id
                    ? 'border-mirage-lime bg-mirage-lime/[0.03] shadow-lg scale-[1.02] z-10'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                {editorState.selectedSceneId === scene.id && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-mirage-lime/10 blur-[30px] rounded-full -mr-12 -mt-12" />
                )}
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-700 ${editorState.selectedSceneId === scene.id ? 'bg-mirage-lime text-black shadow-glow-lime' : 'bg-white/5 text-slate-500'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-black tracking-tight ${editorState.selectedSceneId === scene.id ? 'text-white' : 'text-slate-500'}`}>Unit_Protocol</span>
                        <div className="flex items-center gap-2 mt-1">
                           <div className={`w-1.5 h-1.5 rounded-full ${editorState.selectedSceneId === scene.id ? 'bg-mirage-lime animate-pulse' : 'bg-white/10'}`} />
                           <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">Buffer: OK</span>
                        </div>
                      </div>
                   </div>
                   <button
                    onClick={(e) => { e.stopPropagation(); setTimeline({ ...timeline, scenes: timeline.scenes.filter((s) => s.id !== scene.id) }); }}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${editorState.selectedSceneId === scene.id ? 'text-white/20 hover:text-white hover:bg-rose-500' : 'opacity-0 group-hover:opacity-100 text-white/5 hover:text-white hover:bg-rose-500'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/5">
                       <Clock className="w-3.5 h-3.5 text-mirage-lime" />
                       <span className="text-sm font-black text-white font-mono tracking-tighter">
                          {scene.startFrame.toString().padStart(3, '0')} — {scene.endFrame.toString().padStart(3, '0')}
                       </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Global Synthesis Canvas */}
        <main className="flex-1 flex flex-col bg-mirage-black overflow-hidden relative">
           {selectedScene ? (
             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar reveal">
               <div className="max-w-5xl mx-auto space-y-12">
                  <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-white/5">
                     <div className="space-y-4">
                        <div className="badge-mirage px-4 tracking-[0.4em] !text-[8px]">ID // {selectedScene.id.slice(0, 8).toUpperCase()}</div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none transition-all">
                          Kinetic <br /> 
                          <span className="text-mirage-gradient">Synthesis_Node.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-bold max-w-2xl leading-tight">
                          Modify the temporal boundaries and motion attributes of this sequence unit.
                        </p>
                     </div>
                     <div className="flex gap-4">
                        <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-xl">
                           <Settings className="w-6 h-6" />
                        </button>
                        <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-xl">
                           <Maximize2 className="w-6 h-6" />
                        </button>
                     </div>
                  </header>

                  <div className="grid lg:grid-cols-2 gap-10">
                     {/* Temporal Controller */}
                     <div className="mirage-card bg-mirage-dark/40 border-white/10 relative group !p-8 border-2 !rounded-3xl">
                        <div className="absolute top-6 right-6">
                           <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-mirage-lime transition-all group-hover:bg-mirage-lime group-hover:text-black shadow-xl">
                             <Box className="w-5 h-5" />
                           </div>
                        </div>
                        <div className="mb-10">
                           <h4 className="text-2xl font-black text-white tracking-tighter">Temporal Alignment</h4>
                           <p className="text-[8px] font-black text-slate-600 mt-2 uppercase tracking-[0.4em]">SYNC_OK_V4.2</p>
                        </div>
                        
                        <div className="space-y-8">
                           <div className="group space-y-3">
                              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] ml-1">INIT_FRAME</p>
                              <div className="relative">
                                <input 
                                  type="number" 
                                  value={selectedScene.startFrame}
                                  onChange={(e) => {
                                    const updated = timeline.scenes.map(s => 
                                      s.id === selectedScene.id ? {...s, startFrame: parseInt(e.target.value)} : s
                                    );
                                    setTimeline({...timeline, scenes: updated});
                                  }}
                                  className="input-mirage !py-6 !text-4xl pr-20 !bg-transparent !border-white/5 focus:!border-mirage-lime/40 !rounded-2xl"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/10 tracking-widest">FRX</span>
                              </div>
                           </div>
                           <div className="group space-y-3">
                              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] ml-1">TERM_FRAME</p>
                              <div className="relative">
                                <input 
                                  type="number" 
                                  value={selectedScene.endFrame}
                                  onChange={(e) => {
                                    const updated = timeline.scenes.map(s => 
                                      s.id === selectedScene.id ? {...s, endFrame: parseInt(e.target.value)} : s
                                    );
                                    setTimeline({...timeline, scenes: updated});
                                  }}
                                  className="input-mirage !py-6 !text-4xl pr-20 !bg-transparent !border-white/5 focus:!border-mirage-lime/40 !rounded-2xl"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/10 tracking-widest">FRX</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Spectral Dash */}
                     <div className="mirage-card bg-mirage-black text-white border-white/5 shadow-2xl relative overflow-hidden group !p-8 border-2 !rounded-3xl">
                        <div className="relative z-10 flex flex-col h-full">
                           <div className="flex items-center justify-between mb-12">
                              <div className="flex items-center gap-6">
                                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-mirage-lime shadow-glow-lime">
                                    <Activity className="w-6 h-6" />
                                 </div>
                                 <div className="flex flex-col">
                                    <h4 className="text-2xl font-black text-white tracking-tighter">Synthesis Engine</h4>
                                    <p className="text-[8px] font-black text-mirage-lime/50 uppercase tracking-[0.4em] mt-1">FLUX_ACTIVE</p>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-8">
                              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                 <div className="space-y-2">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">INTERVAL</span>
                                    <p className="text-4xl font-black text-white tracking-tighter leading-none">{(selectedScene.endFrame - selectedScene.startFrame)}<span className="text-xs font-bold text-white/10 ml-2">FR</span></p>
                                 </div>
                                 <div className="text-right space-y-2">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">TEMPO</span>
                                    <p className="text-4xl font-black text-mirage-lime tracking-tighter leading-none font-mono">{timeline.audio.tempo}<span className="text-xs font-bold text-mirage-lime/20 ml-2">BPM</span></p>
                                 </div>
                              </div>
                              
                              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 shadow-inner group-hover:border-mirage-lime/20 transition-all duration-700 min-h-[150px] flex flex-col justify-end">
                                 <div className="space-y-2">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">CHRONO_REF</span>
                                    <p className="text-5xl font-black text-white tracking-tight leading-none">{frameToSeconds(selectedScene.endFrame - selectedScene.startFrame, fps).toFixed(2)}<span className="text-xl text-white/10 ml-2">SEC</span></p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Refinement Protocol Portal */}
                  <button className="w-full p-10 mirage-card hover:bg-white/[0.03] transition-all duration-700 flex items-center justify-between group !rounded-3xl border-2 border-white/5 relative overflow-hidden reveal shadow-xl hover:border-mirage-lime/40">
                     <div className="flex items-center gap-10 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-mirage-dark border border-white/10 shadow-xl flex items-center justify-center text-mirage-lime group-hover:bg-mirage-lime group-hover:text-black transition-all duration-700">
                           <Layout className="w-8 h-8" />
                        </div>
                        <div className="text-left space-y-1">
                           <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">Architectural Bridge</p>
                           <p className="text-3xl font-black text-white tracking-tighter leading-none">Modify Spectral Layers</p>
                        </div>
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-white/5 text-mirage-lime border border-white/10 flex items-center justify-center group-hover:bg-mirage-lime group-hover:text-black shadow-glow-lime transition-all duration-700 relative z-10">
                        <ChevronRight className="w-6 h-6" />
                     </div>
                  </button>
               </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-mirage-black reveal">
                <div className="relative mb-12 animate-float-gentle">
                   <div className="absolute inset-0 bg-mirage-lime/10 blur-[100px] rounded-full scale-150 animate-pulse" />
                   <div className="w-32 h-32 rounded-[2rem] bg-mirage-dark border-2 border-white/5 shadow-xl flex items-center justify-center relative">
                      <Layers className="w-14 h-14 text-white/10" />
                   </div>
                </div>
                <h4 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">Suite_Inactive</h4>
                <p className="text-xl text-slate-700 max-w-xl leading-tight font-bold">Select a sequence unit from the explorer to engage the environment.</p>
             </div>
           )}
        </main>
      </div>

      {/* Synthesis Control Hub */}
      <footer className="bg-mirage-dark border-t border-white/10 p-8 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-12 relative z-10">
           <button className="w-14 h-14 bg-mirage-lime text-black rounded-2xl flex items-center justify-center shadow-glow-lime hover:scale-110 active:scale-95 transition-all duration-700">
              <Play className="w-6 h-6 fill-current ml-1" />
           </button>
           
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-8">
                 <div className="px-5 py-2 bg-mirage-black/80 border border-white/10 rounded-xl flex items-center gap-3">
                    <Clock className="w-4 h-4 text-mirage-lime" />
                    <span className="text-2xl font-black font-mono text-white pt-1">00:00:00</span>
                 </div>
                 <div className="w-[300px] h-2 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-mirage-lime rounded-full shadow-glow-lime" />
                 </div>
                 <span className="text-xl font-black font-mono text-white/20">
                    {frameToSeconds(timeline.video.totalFrames, fps).toFixed(2)}S
                 </span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-8 text-right">
           <div className="hidden md:flex flex-col">
              <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">Runtime</p>
              <p className="text-4xl font-black text-white tracking-tighter leading-none">
                 {frameToSeconds(timeline.video.totalFrames, fps).toFixed(1)}<span className="text-sm text-white/5 ml-2">TS</span>
              </p>
           </div>
        </div>
      </footer>
    </div>
  );
}
