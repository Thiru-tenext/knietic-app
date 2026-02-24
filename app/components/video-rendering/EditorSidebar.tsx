"use client";

import { KineticVideoProps } from "@/remotion/types";
import { Settings, Paintbrush2, LayoutTemplate, Plus, Trash2, Database, Activity, Layout, Layers } from "lucide-react";

interface EditorSidebarProps {
  videoProps: KineticVideoProps;
  setVideoProps: (props: KineticVideoProps) => void;
}

export const EditorSidebar = ({ videoProps, setVideoProps }: EditorSidebarProps) => {

  const updateSceneText = (index: number, newText: string) => {
    const newScenes = [...videoProps.scenes];
    newScenes[index] = { ...newScenes[index], text: newText };
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  const updateSceneEmphasis = (index: number, emphasisString: string) => {
    const newScenes = [...videoProps.scenes];
    const words = emphasisString.split(',').map(w => w.trim()).filter(Boolean);
    newScenes[index] = { ...newScenes[index], emphasisWords: words };
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  const addScene = () => {
    const newId = `scene-${Date.now()}`;
    setVideoProps({
      ...videoProps,
      scenes: [...videoProps.scenes, { id: newId, text: "New Sequence", durationInFrames: 45 }]
    });
  };

  const removeScene = (index: number) => {
    if (videoProps.scenes.length <= 1) return;
    const newScenes = videoProps.scenes.filter((_, i) => i !== index);
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  return (
    <div className="w-full md:w-[480px] bg-white border-r border-slate-100 flex flex-col shrink-0 relative z-10">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between sticky top-0 z-20 bg-white">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-indigo-600" />
          <span className="text-lg font-bold text-slate-900 tracking-tight">Project configurations</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-8 space-y-10">
          
          {/* Global Settings Card */}
          <div className="mirage-card bg-white !p-0 overflow-hidden shadow-xl border-slate-100">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <Paintbrush2 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Directorial controls</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Motif & Font */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-400">Motif</span>
                  <div className="relative">
                    <select
                      value={videoProps.styleMode}
                      onChange={(e) => setVideoProps({ ...videoProps, styleMode: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="premium">Apple Premium</option>
                      <option value="bold">TikTok Trend</option>
                      <option value="minimal">Studio Mono</option>
                    </select>
                    <LayoutTemplate className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-400">Font family</span>
                  <div className="relative">
                    <select
                      value={videoProps.fontFamily || 'inter'}
                      onChange={(e) => setVideoProps({ ...videoProps, fontFamily: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="inter">Inter Display</option>
                      <option value="playfair">Classic Serif</option>
                      <option value="bebas">Bold Headline</option>
                    </select>
                    <LayoutTemplate className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </label>

                <label className="flex flex-col gap-2 col-span-2">
                  <span className="text-xs font-bold text-slate-400">Format & Resolution</span>
                  <div className="relative">
                    <select
                      value={videoProps.resolution || '1080x1920'}
                      onChange={(e) => setVideoProps({ ...videoProps, resolution: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="1080x1920">Vertical (9:16) — Reels / Shorts</option>
                      <option value="1920x1080">Landscape (16:9) — YouTube</option>
                      <option value="1080x1080">Square (1:1) — Instagram</option>
                      <option value="3840x2160">Master 4K (Ultra High Fidelity)</option>
                    </select>
                    <LayoutTemplate className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </label>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-400">Accent color</span>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-2 focus-within:border-indigo-600 focus-within:bg-white transition-all">
                    <input
                      type="color"
                      value={videoProps.primaryColor}
                      onChange={(e) => setVideoProps({ ...videoProps, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-sm"
                    />
                    <input
                      type="text"
                      value={videoProps.primaryColor}
                      onChange={(e) => setVideoProps({ ...videoProps, primaryColor: e.target.value })}
                      className="w-full bg-transparent text-sm font-bold text-slate-900 uppercase focus:outline-none"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-400">Background</span>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-2 focus-within:border-indigo-600 focus-within:bg-white transition-all">
                    <input
                      type="color"
                      value={videoProps.backgroundColor}
                      onChange={(e) => setVideoProps({ ...videoProps, backgroundColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-sm"
                    />
                    <input
                      type="text"
                      value={videoProps.backgroundColor}
                      onChange={(e) => setVideoProps({ ...videoProps, backgroundColor: e.target.value })}
                      className="w-full bg-transparent text-sm font-bold text-slate-900 uppercase focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="h-px bg-slate-100 my-2" />

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">Master Cinematic VFX</span>
                <div className="relative inline-block w-10 h-6 rounded-full bg-slate-100 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={videoProps.enableGlobalVfx ?? true}
                      onChange={(e) => setVideoProps({ ...videoProps, enableGlobalVfx: e.target.checked })}
                      className="opacity-0 w-0 h-0"
                    />
                    <span 
                      className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 transform ${videoProps.enableGlobalVfx ? 'translate-x-4 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'translate-x-0 bg-slate-300'}`}
                    />
                </div>
              </label>

            </div>
          </div>

          {/* Timeline Scenes */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Production timeline</h3>
              </div>
              <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {videoProps.scenes.length}
              </span>
            </div>

            <div className="space-y-6">
              {videoProps.scenes.map((scene, index) => (
                <div key={scene.id} className="group relative mirage-card !p-0 overflow-hidden shadow-lg border-slate-100 bg-white hover:shadow-2xl transition-all duration-500">
                  {/* Scene Header */}
                  <div className="bg-slate-50/50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-[11px] font-black text-white">
                        {index + 1}
                      </div>
                      <span className="text-sm font-bold text-slate-400">Sequence</span>
                    </div>
                    
                    <button 
                      onClick={() => removeScene(index)}
                      disabled={videoProps.scenes.length <= 1}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Scene Body */}
                  <div className="p-5 space-y-6">
                    <textarea
                      value={scene.text}
                      onChange={(e) => updateSceneText(index, e.target.value)}
                      className="w-full bg-transparent text-slate-900 text-xl font-bold placeholder-slate-200 resize-none h-16 outline-none focus:text-indigo-600 transition-colors leading-tight"
                      placeholder="Type narration script..."
                    />

                    <div className="grid grid-cols-1 gap-6 pb-6 border-b border-slate-50">
                       <label className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-slate-400">Emphasis keyphrases</span>
                        <input
                          type="text"
                          value={scene.emphasisWords?.join(', ') || ""}
                          onChange={(e) => updateSceneEmphasis(index, e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-indigo-600 focus:border-indigo-600 focus:bg-white outline-none transition-all"
                          placeholder="word1, word2..."
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col gap-2 relative">
                        <span className="text-xs font-bold text-slate-400">Animation motif</span>
                        <select
                          value={scene.textAnimation || 'fade'}
                          onChange={(e) => {
                            const newScenes = [...videoProps.scenes];
                            newScenes[index].textAnimation = e.target.value as any;
                            setVideoProps({ ...videoProps, scenes: newScenes });
                          }}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none appearance-none cursor-pointer"
                        >
                          <option value="fade">Smooth Fade</option>
                          <option value="fade-up">Rise Up</option>
                          <option value="pop-in">Dynamic Pop</option>
                          <option value="typing">Digital Typing</option>
                        </select>
                        <LayoutTemplate className="w-4 h-4 absolute right-3 bottom-3 text-slate-300 pointer-events-none" />
                      </label>

                      <label className="flex flex-col gap-2 relative">
                        <span className="text-xs font-bold text-slate-400">Visual style</span>
                        <select
                          value={scene.textStyle || 'none'}
                          onChange={(e) => {
                            const newScenes = [...videoProps.scenes];
                            newScenes[index].textStyle = e.target.value as any;
                            setVideoProps({ ...videoProps, scenes: newScenes });
                          }}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none appearance-none cursor-pointer"
                        >
                          <option value="none">Solid High-Contrast</option>
                          <option value="neon">Neon Ambient Glow</option>
                          <option value="outline">Architectural Outline</option>
                        </select>
                        <LayoutTemplate className="w-4 h-4 absolute right-3 bottom-3 text-slate-300 pointer-events-none" />
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400">Duration</span>
                          <input 
                            type="number"
                            value={scene.durationInFrames}
                            onChange={(e) => {
                              const newScenes = [...videoProps.scenes];
                              const parsed = parseInt(e.target.value);
                              newScenes[index].durationInFrames = isNaN(parsed) ? 0 : parsed;
                              setVideoProps({ ...videoProps, scenes: newScenes });
                            }}
                            className="bg-transparent text-right text-lg font-black text-slate-900 w-16 outline-none"
                          />
                          <span className="text-xs font-bold text-slate-300 ml-1">fr</span>
                       </div>
                       <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400">Pos</span>
                          <select
                            value={scene.layoutAlign || 'center'}
                            onChange={(e) => {
                              const newScenes = [...videoProps.scenes];
                              newScenes[index].layoutAlign = e.target.value as any;
                              setVideoProps({ ...videoProps, scenes: newScenes });
                            }}
                            className="bg-transparent text-right text-sm font-black text-indigo-600 outline-none appearance-none cursor-pointer"
                          >
                            <option value="top">Top</option>
                            <option value="center">Mid</option>
                            <option value="bottom">Btm</option>
                          </select>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addScene}
              className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 text-lg font-bold hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Append narration sequence
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
