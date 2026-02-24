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
        <aside className="w-[480px] bg-mirage-dark border-r border-white/5 flex flex-col shrink-0 shadow-3xl z-20 overflow-hidden relative">
          {/* Top Nav Line */}
          <div className="absolute top-0 right-0 w-px h-full bg-mirage-lime/10" />
          
          <div className="p-16 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex flex-col gap-2">
               <span className="text-[10px] font-black text-mirage-lime uppercase tracking-[0.5em]">Sequence_Nodes</span>
               <h3 className="text-4xl font-black text-white tracking-tighter">Timeline_Core</h3>
            </div>
            <button
              onClick={() => {
                const lastScene = timeline.scenes[timeline.scenes.length - 1];
                const newStartFrame = lastScene ? lastScene.endFrame : 0;
                const newScene: Scene = { id: generateSceneId(), startFrame: newStartFrame, endFrame: newStartFrame + 60, layers: [] };
                setTimeline({ ...timeline, scenes: [...timeline.scenes, newScene] });
              }}
              className="w-20 h-20 rounded-[2.25rem] bg-mirage-lime text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,255,113,0.3)] group"
            >
              <Plus className="w-10 h-10 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar bg-mirage-black/50">
            {timeline.scenes.map((scene, idx) => (
              <div
                key={scene.id}
                onClick={() => setEditorState({ ...editorState, selectedSceneId: scene.id })}
                className={`p-10 rounded-[3rem] border-2 transition-all duration-1000 cursor-pointer group relative overflow-hidden ${
                  editorState.selectedSceneId === scene.id
                    ? 'border-mirage-lime bg-mirage-lime/[0.03] shadow-[0_0_80px_rgba(212,255,113,0.1)] scale-[1.03] z-10'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 hover:shadow-2xl'
                }`}
              >
                {editorState.selectedSceneId === scene.id && (
                  <div className="absolute top-0 right-0 w-40 h-40 bg-mirage-lime/10 blur-[50px] rounded-full -mr-16 -mt-16" />
                )}
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl transition-all duration-1000 ${editorState.selectedSceneId === scene.id ? 'bg-mirage-lime text-black shadow-glow-lime rotate-12' : 'bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:rotate-6'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xl font-black tracking-tight ${editorState.selectedSceneId === scene.id ? 'text-white' : 'text-slate-500'}`}>Unit_Protocol</span>
                        <div className="flex items-center gap-4 mt-2">
                           <div className={`w-2 h-2 rounded-full ${editorState.selectedSceneId === scene.id ? 'bg-mirage-lime animate-pulse shadow-glow-lime' : 'bg-white/10'}`} />
                           <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Buffer: OK</span>
                        </div>
                      </div>
                   </div>
                   <button
                    onClick={(e) => { e.stopPropagation(); setTimeline({ ...timeline, scenes: timeline.scenes.filter((s) => s.id !== scene.id) }); }}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${editorState.selectedSceneId === scene.id ? 'text-white/20 hover:text-white hover:bg-rose-500' : 'opacity-0 group-hover:opacity-100 text-white/5 hover:text-white hover:bg-rose-500'}`}
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between relative z-10 pt-8 border-t border-white/5 transition-all duration-1000">
                    <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-full border border-white/5">
                       <Clock className="w-5 h-5 text-mirage-lime" />
                       <span className="text-xl font-black text-white font-mono tracking-tighter pt-0.5">
                          {scene.startFrame.toString().padStart(3, '0')} — {scene.endFrame.toString().padStart(3, '0')}
                       </span>
                    </div>
                    <span className={`text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] transition-all ${editorState.selectedSceneId === scene.id ? 'bg-mirage-lime text-black' : 'bg-white/5 text-slate-600'}`}>
                       {((scene.endFrame - scene.startFrame) / fps).toFixed(1)}S_REF
                    </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Global Synthesis Canvas */}
        <main className="flex-1 flex flex-col bg-mirage-black overflow-hidden relative">
           {selectedScene ? (
             <div className="flex-1 overflow-y-auto p-24 custom-scrollbar reveal">
               <div className="max-w-7xl mx-auto space-y-32">
                  <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-16 pb-20 border-b border-white/5">
                     <div className="space-y-8">
                        <div className="badge-mirage px-6 tracking-[0.5em]">Structural ID // {selectedScene.id.slice(0, 8).toUpperCase()}</div>
                        <h2 className="text-9xl md:text-[11rem] font-black text-white tracking-tighter leading-[0.8] transition-all">
                          Kinetic <br /> 
                          <span className="text-mirage-gradient">Synthesis_Node.</span>
                        </h2>
                        <p className="text-4xl text-slate-600 font-bold max-w-4xl leading-tight">
                          Modify the temporal boundaries and motion attributes of this specific sequence unit within the master synthesis engine.
                        </p>
                     </div>
                     <div className="flex gap-8">
                        <button className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:shadow-3xl transition-all shadow-sm group">
                           <Settings className="w-10 h-10 transition-transform group-hover:rotate-180" />
                        </button>
                        <button className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:shadow-3xl transition-all shadow-sm group">
                           <Maximize2 className="w-10 h-10 transition-transform group-hover:scale-125" />
                        </button>
                     </div>
                  </header>

                  <div className="grid xl:grid-cols-2 gap-20">
                     {/* Temporal Controller */}
                     <div className="mirage-card bg-mirage-dark/40 border-white/10 relative group !p-16 border-2">
                        <div className="absolute top-12 right-12">
                           <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center text-mirage-lime transition-all group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 group-hover:scale-110 shadow-3xl">
                             <Box className="w-10 h-10" />
                           </div>
                        </div>
                        <div className="mb-20">
                           <h4 className="text-4xl font-black text-white tracking-tighter">Temporal Alignment</h4>
                           <p className="text-[10px] font-black text-slate-600 mt-4 uppercase tracking-[0.5em] font-mono">ENGINE_SYNC_V4.2_OK</p>
                        </div>
                        
                        <div className="space-y-16">
                           <div className="group space-y-6">
                              <p className="text-xs font-black text-white/40 uppercase tracking-[0.4em] ml-2">INIT_FRAME_REF</p>
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
                                  className="input-mirage !py-12 !text-8xl pr-32 !bg-transparent !border-white/5 focus:!border-mirage-lime/40"
                                />
                                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-sm font-black text-white/10 tracking-[0.5em]">FRX</span>
                              </div>
                           </div>
                           <div className="group space-y-6">
                              <p className="text-xs font-black text-white/40 uppercase tracking-[0.4em] ml-2">TERMINAL_FRAME_REF</p>
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
                                  className="input-mirage !py-12 !text-8xl pr-32 !bg-transparent !border-white/5 focus:!border-mirage-lime/40"
                                />
                                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-sm font-black text-white/10 tracking-[0.5em]">FRX</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Spectral Dash */}
                     <div className="mirage-card bg-mirage-black text-white border-white/5 shadow-[0_100px_200px_rgba(0,0,0,0.5)] relative overflow-hidden group !p-16 border-2">
                        <div className="absolute inset-0 bg-mirage-lime/5 opacity-0 group-hover:opacity-100 blur-[120px] transition-opacity duration-1000 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mirage-blue/10 blur-[150px] rounded-full pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                           <div className="flex items-center justify-between mb-24">
                              <div className="flex items-center gap-8">
                                 <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2.25rem] flex items-center justify-center text-mirage-lime shadow-glow-lime transition-transform group-hover:scale-110">
                                    <Activity className="w-10 h-10" />
                                 </div>
                                 <div className="flex flex-col">
                                    <h4 className="text-4xl font-black text-white tracking-tighter">Synthesis Engine</h4>
                                    <p className="text-[10px] font-black text-mirage-lime/50 uppercase tracking-[0.5em] mt-2">SPECTRAL_FLUX_ACTIVE</p>
                                 </div>
                              </div>
                              <Cpu className="w-12 h-12 text-white/10 group-hover:text-mirage-lime/40 transition-all duration-1000" />
                           </div>

                           <div className="space-y-16">
                              <div className="flex items-center justify-between border-b border-white/5 pb-12">
                                 <div className="space-y-4">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">UNIT_INTERVAL</span>
                                    <p className="text-7xl font-black text-white tracking-tighter leading-none">{(selectedScene.endFrame - selectedScene.startFrame)}<span className="text-2xl font-bold text-white/10 ml-4 tracking-widest uppercase">Frames</span></p>
                                 </div>
                                 <div className="text-right space-y-4">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">TEMPO_LOCK</span>
                                    <p className="text-7xl font-black text-mirage-lime tracking-tighter leading-none font-mono">{timeline.audio.tempo}<span className="text-2xl font-bold text-mirage-lime/20 ml-4 uppercase">BPM</span></p>
                                 </div>
                              </div>
                              
                              <div className="flex-1 flex flex-col justify-end bg-white/[0.02] border border-white/5 rounded-[4rem] p-16 shadow-inner group-hover:border-mirage-lime/20 transition-all duration-1000 mt-8 min-h-[300px]">
                                 <div className="space-y-6">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">CHRONO_REFERENCE</span>
                                    <p className="text-[10rem] font-black text-white tracking-[-0.05em] leading-none mb-2">{frameToSeconds(selectedScene.endFrame - selectedScene.startFrame, fps).toFixed(2)}<span className="text-4xl text-white/10 ml-4">SEC</span></p>
                                 </div>
                                 <div className="mt-12 flex items-center gap-6">
                                    <div className="px-6 py-2 bg-mirage-lime text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-glow-lime">Steady_State</div>
                                    <div className="w-px h-4 bg-white/10" />
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Global Clock Synced</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Refinement Protocol Portal */}
                  <button className="w-full p-20 mirage-card hover:bg-white/[0.03] transition-all duration-1000 flex items-center justify-between group !rounded-[5rem] border-2 border-white/5 relative overflow-hidden reveal shadow-4xl hover:border-mirage-lime/40">
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-mirage-lime opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                     <div className="flex items-center gap-20 relative z-10">
                        <div className="w-28 h-28 rounded-[3rem] bg-mirage-dark border border-white/10 shadow-3xl flex items-center justify-center text-mirage-lime group-hover:scale-125 group-hover:-rotate-9 transition-all duration-1000 group-hover:bg-mirage-lime group-hover:text-black">
                           <Layout className="w-12 h-12" />
                        </div>
                        <div className="text-left space-y-3">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Architectural Bridge</p>
                           <p className="text-6xl font-black text-white tracking-tighter leading-none">Modify Spectral Layers</p>
                        </div>
                     </div>
                     <div className="w-24 h-24 rounded-full bg-white/5 text-mirage-lime border border-white/10 flex items-center justify-center group-hover:bg-mirage-lime group-hover:text-black shadow-glow-lime transition-all duration-1000 relative z-10 group-hover:translate-x-10">
                        <ChevronRight className="w-12 h-12" />
                     </div>
                  </button>
               </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-32 bg-mirage-black reveal">
                <div className="relative mb-24 animate-float-gentle">
                   <div className="absolute inset-0 bg-mirage-lime/10 blur-[150px] rounded-full scale-150 animate-pulse" />
                   <div className="w-64 h-64 rounded-[4.5rem] bg-mirage-dark border-4 border-white/5 shadow-4xl flex items-center justify-center relative">
                      <Layers className="w-28 h-28 text-white/10" />
                   </div>
                   <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-mirage-lime rounded-[2.25rem] flex items-center justify-center text-black shadow-glow-lime animate-bounce">
                      <Zap className="w-10 h-10 fill-current" />
                   </div>
                </div>
                <h4 className="text-8xl font-black text-white mb-10 tracking-tighter leading-none uppercase">Suite_Inactive</h4>
                <p className="text-4xl text-slate-700 max-w-3xl leading-tight font-bold">Select a structural sequence unit from the temporal explorer to engage the synthesis environment.</p>
                <div className="mt-20 flex items-center gap-8 px-10 py-5 bg-white/[0.02] rounded-3xl border border-white/5 backdrop-blur-3xl">
                    <Activity className="w-6 h-6 text-mirage-lime animate-pulse" />
                    <span className="text-sm font-black text-white/30 uppercase tracking-[0.5em]">Kernel_Idle_Ready</span>
                </div>
             </div>
           )}
        </main>
      </div>

      {/* Synthesis Control Hub */}
      <footer className="bg-mirage-dark border-t border-white/10 p-16 flex items-center justify-between z-50 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] reveal overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mirage-lime/30 to-transparent" />
        
        <div className="flex items-center gap-24 relative z-10">
           {/* Play Pulse */}
           <div className="relative group">
              <div className="absolute inset-[-30px] bg-mirage-lime blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />
              <button className="w-28 h-28 bg-mirage-lime text-black rounded-[3rem] flex items-center justify-center shadow-glow-lime hover:scale-110 active:scale-95 transition-all duration-700 relative group-hover:bg-white">
                 <Play className="w-12 h-12 fill-current ml-1" />
              </button>
           </div>
           
           <div className="flex flex-col gap-10">
              <div className="flex items-center gap-12">
                 <div className="px-10 py-4 bg-mirage-black/80 border border-white/10 rounded-2xl flex items-center gap-6 shadow-3xl">
                    <Clock className="w-7 h-7 text-mirage-lime" />
                    <span className="text-5xl font-black font-mono text-white tracking-[0.1em] leading-none pt-2">00:00:00</span>
                 </div>
                 <div className="flex-1 w-[600px] h-4 bg-white/5 rounded-full overflow-hidden relative border border-white/10 group cursor-pointer shadow-inner">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-mirage-lime rounded-full shadow-glow-lime transition-all duration-700 relative">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-black rounded-full shadow-3xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    {/* Architectural Spectral Wave */}
                    <div className="absolute inset-x-8 inset-y-0.5 flex items-center justify-between gap-1 pointer-events-none opacity-20">
                       {[...Array(120)].map((_, i) => (
                         <div key={i} className="w-px bg-white rounded-full" style={{ height: `${10 + Math.random() * 80}%` }} />
                       ))}
                    </div>
                 </div>
                 <span className="text-3xl font-black font-mono text-white/20 pt-1">
                    {frameToSeconds(timeline.video.totalFrames, fps).toFixed(2)}S
                 </span>
              </div>
              
              <div className="flex items-center gap-16">
                 <div className="flex items-center gap-4">
                    <Music className="w-5 h-5 text-mirage-lime animate-pulse" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Audio_Ref_Lock</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Waves className="w-5 h-5 text-mirage-lime" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Flux_Calibration: Active</span>
                 </div>
                 <div className="w-px h-4 bg-white/10" />
                 <div className="flex items-center gap-4">
                    <Sparkles className="w-5 h-5 text-mirage-lime" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Quality: Ultra_Master_P0</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-24 relative z-10 text-right">
           <div className="pr-16 border-r border-white/10 h-24 flex flex-col justify-center gap-3">
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">Operational_Flow</p>
              <div className="flex items-center justify-end gap-4 text-4xl font-black text-white leading-none">
                 <span className="text-mirage-lime">ULTRA</span>_RENDER_OS
              </div>
           </div>
           <div className="h-24 flex flex-col justify-center gap-2">
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] leading-none mb-3">Synthesis_Runtime</p>
              <p className="text-[9rem] font-black text-white tracking-[-0.05em] leading-[0.7]">
                 {frameToSeconds(timeline.video.totalFrames, fps).toFixed(1)}<span className="text-4xl text-white/5 ml-4">TS</span>
              </p>
           </div>
        </div>
      </footer>
    </div>
  );
}
