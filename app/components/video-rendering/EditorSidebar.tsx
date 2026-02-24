"use client";

import { useState, useMemo } from "react";
import { KineticVideoProps } from "@/remotion/types";
import { 
  Settings, 
  Paintbrush2, 
  LayoutTemplate, 
  Plus, 
  Trash2, 
  Database, 
  Activity, 
  Layout, 
  Layers, 
  Music, 
  Image as ImageIcon, 
  Sparkles,
  Copy,
  ArrowUp,
  ArrowDown,
  Monitor,
  Maximize
} from "lucide-react";

interface EditorSidebarProps {
  videoProps: KineticVideoProps;
  setVideoProps: (props: KineticVideoProps) => void;
  currentFrame?: number;
}

export const EditorSidebar = ({ videoProps, setVideoProps, currentFrame = 0 }: EditorSidebarProps) => {

  // Calculate which scene is active based on current frame
  const activeSceneIndex = useMemo(() => {
    let frameCounter = 0;
    for (let i = 0; i < videoProps.scenes.length; i++) {
      const scene = videoProps.scenes[i];
      const duration = Math.max(15, scene.durationInFrames);
      const transitionDuration = (i < videoProps.scenes.length - 1 && scene.transitionType && scene.transitionType !== 'none') ? 10 : 0;
      
      const sceneEnd = frameCounter + duration;
      if (currentFrame >= frameCounter && currentFrame < sceneEnd) {
        return i;
      }
      frameCounter += (duration - transitionDuration);
    }
    return -1;
  }, [videoProps.scenes, currentFrame]);

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

  const duplicateScene = (index: number) => {
    const sceneToDuplicate = videoProps.scenes[index];
    const newScene = { ...sceneToDuplicate, id: `scene-${Date.now()}` };
    const newScenes = [...videoProps.scenes];
    newScenes.splice(index + 1, 0, newScene);
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  const moveScene = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === videoProps.scenes.length - 1) return;

    const newScenes = [...videoProps.scenes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newScenes[index], newScenes[targetIndex]] = [newScenes[targetIndex], newScenes[index]];
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  const removeScene = (index: number) => {
    if (videoProps.scenes.length <= 1) return;
    const newScenes = videoProps.scenes.filter((_, i) => i !== index);
    setVideoProps({ ...videoProps, scenes: newScenes });
  };

  return (
    <div className="w-full md:w-[320px] bg-mirage-dark border-r border-white/5 flex flex-col shrink-0 relative z-10">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 z-20 bg-mirage-dark/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/10">
            <Settings className="w-3 h-3 text-mirage-lime" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Configuration</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 bg-mirage-black/30">
        <div className="p-5 space-y-6">
          
          {/* Global Settings Card */}
          <div className="bg-white/5 rounded-md overflow-hidden border border-white/5 shadow-2xl">
            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
              <Paintbrush2 className="w-3 h-3 text-mirage-lime" />
              <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Global_Vision</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5 font-sans">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Motif</span>
                  <div className="relative">
                    <select
                      value={videoProps.styleMode}
                      onChange={(e) => setVideoProps({ ...videoProps, styleMode: e.target.value as any })}
                      className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <option value="premium">Apple</option>
                      <option value="bold">TikTok</option>
                      <option value="minimal">Minimal</option>
                    </select>
                    <LayoutTemplate className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5 font-sans">
                   <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Type</span>
                  <div className="relative">
                    <select
                      value={videoProps.fontFamily || 'inter'}
                      onChange={(e) => setVideoProps({ ...videoProps, fontFamily: e.target.value as any })}
                      className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <option value="inter">Inter</option>
                      <option value="playfair">Playfair</option>
                      <option value="oswald">Oswald</option>
                      <option value="bebas">Bebas</option>
                    </select>
                    <LayoutTemplate className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5 col-span-2 font-sans">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Format</span>
                  <div className="relative">
                    <select
                      value={videoProps.resolution || '1080x1920'}
                      onChange={(e) => setVideoProps({ ...videoProps, resolution: e.target.value as any })}
                      className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <optgroup label="Mobile">
                        <option value="1080x1920">Vertical (9:16)</option>
                        <option value="1080x1350">Portrait (4:5)</option>
                        <option value="1080x1080">Square (1:1)</option>
                      </optgroup>
                      <optgroup label="Desktop">
                        <option value="1920x1080">Landscape (16:9)</option>
                        <option value="3840x2160">4K (16:9)</option>
                      </optgroup>
                    </select>
                    <Maximize className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </label>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5 font-sans">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Primary</span>
                  <div className="flex items-center gap-2 bg-mirage-black border border-white/10 rounded-md p-1 focus-within:border-mirage-lime">
                    <input
                      type="color"
                      value={videoProps.primaryColor}
                      onChange={(e) => setVideoProps({ ...videoProps, primaryColor: e.target.value })}
                      className="w-5 h-5 rounded-sm cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={videoProps.primaryColor}
                      onChange={(e) => setVideoProps({ ...videoProps, primaryColor: e.target.value })}
                      className="w-full bg-transparent text-[8px] font-black text-white uppercase focus:outline-none"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5 font-sans">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Background</span>
                  <div className="flex items-center gap-2 bg-mirage-black border border-white/10 rounded-md p-1 focus-within:border-mirage-lime">
                    <input
                      type="color"
                      value={videoProps.backgroundColor}
                      onChange={(e) => setVideoProps({ ...videoProps, backgroundColor: e.target.value })}
                      className="w-5 h-5 rounded-sm cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={videoProps.backgroundColor}
                      onChange={(e) => setVideoProps({ ...videoProps, backgroundColor: e.target.value })}
                      className="w-full bg-transparent text-[8px] font-black text-white uppercase focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="h-px bg-white/5 my-1" />

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/40 group-hover:text-mirage-lime transition-colors uppercase tracking-[0.2em]">Post_FX_Engine</span>
                </div>
                <div className="relative inline-block w-7 h-3.5 rounded-full bg-mirage-black border border-white/10">
                    <input
                      type="checkbox"
                      checked={videoProps.enableGlobalVfx ?? true}
                      onChange={(e) => setVideoProps({ ...videoProps, enableGlobalVfx: e.target.checked })}
                      className="opacity-0 w-0 h-0"
                    />
                    <span 
                      className={`absolute left-0.5 top-0.5 w-2 rounded-full transition-all duration-300 transform ${videoProps.enableGlobalVfx ? 'translate-x-3.5 bg-mirage-lime' : 'translate-x-0 bg-white/10'}`}
                      style={{ height: 'calc(100% - 4px)' }}
                    />
                </div>
              </label>

            </div>
          </div>

          {/* Audio Settings Card */}
          <div className="bg-white/5 rounded-md overflow-hidden border border-white/5 shadow-2xl">
            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
              <Music className="w-3 h-3 text-mirage-lime" />
              <h3 className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Acoustic_Arch</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <label className="flex flex-col gap-1.5 font-sans">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Audio_Source</span>
                <input
                  type="text"
                  value={videoProps.audioUrl || ""}
                  onChange={(e) => setVideoProps({ ...videoProps, audioUrl: e.target.value })}
                  className="w-full bg-mirage-black border border-white/10 rounded-md px-3 py-2 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none placeholder:text-white/5"
                  placeholder="Paste URL..."
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Master_Gain</span>
                  <span className="text-[9px] font-black text-mirage-lime">{Math.round((videoProps.audioVolume ?? 0.8) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={videoProps.audioVolume ?? 0.8}
                  onChange={(e) => setVideoProps({ ...videoProps, audioVolume: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-mirage-lime"
                />
              </label>
            </div>
          </div>

          {/* Timeline Scenes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                   <LayoutTemplate className="w-3 h-3 text-mirage-lime" />
                </div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Timeline</h3>
              </div>
              <span className="text-[8px] font-black text-mirage-lime bg-mirage-lime/10 px-2.5 py-1 rounded-md border border-mirage-lime/20">
                {videoProps.scenes.length} CHAPTERS
              </span>
            </div>

            <div className="space-y-4">
              {videoProps.scenes.map((scene, index) => {
                const isActive = index === activeSceneIndex;
                return (
                  <div 
                    key={scene.id} 
                    className={`group relative bg-white/5 rounded-md overflow-hidden border transition-all duration-300 ${
                      isActive 
                        ? 'border-mirage-lime/50 bg-mirage-lime/[0.03] shadow-glow-lime-md' 
                        : 'border-white/5'
                    }`}
                  >
                    {/* Scene Header */}
                    <div className={`px-4 py-2.5 border-b flex items-center justify-between transition-colors ${
                      isActive ? 'bg-mirage-lime/10 border-mirage-lime/20' : 'bg-white/[0.02] border-white/5'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black transition-all ${
                          isActive ? 'bg-mirage-lime text-black ring-2 ring-mirage-lime/20' : 'bg-white/10 text-white/50'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${
                          isActive ? 'text-white' : 'text-white/20'
                        }`}>
                          CHAPTER
                        </span>
                      </div>
                    
                      <div className="flex items-center gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => moveScene(index, 'up')} disabled={index === 0} className="p-1 text-white/20 hover:text-mirage-lime disabled:opacity-0"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => moveScene(index, 'down')} disabled={index === videoProps.scenes.length - 1} className="p-1 text-white/20 hover:text-mirage-lime disabled:opacity-0"><ArrowDown className="w-3 h-3" /></button>
                        <button onClick={() => duplicateScene(index)} className="p-1 text-white/20 hover:text-mirage-lime"><Copy className="w-3 h-3" /></button>
                        <button onClick={() => removeScene(index)} disabled={videoProps.scenes.length <= 1} className="p-1 text-white/20 hover:text-rose-500 disabled:opacity-0"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    
                    {/* Scene Body */}
                    <div className="p-4 space-y-4">
                      <div className="relative">
                        <textarea
                          value={scene.text}
                          onChange={(e) => updateSceneText(index, e.target.value)}
                          className="w-full bg-mirage-black/50 border border-white/5 rounded-md p-3 text-white text-[11px] font-black placeholder-white/5 resize-none h-16 outline-none focus:border-mirage-lime focus:bg-mirage-black transition-all"
                          placeholder="Enter narrative text..."
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="flex flex-col gap-1.5">
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Emphasis</span>
                          <input
                            type="text"
                            value={scene.emphasisWords?.join(', ') || ""}
                            onChange={(e) => updateSceneEmphasis(index, e.target.value)}
                            className="w-full bg-mirage-black border border-white/10 rounded-md px-3 py-2 text-[10px] font-black text-mirage-lime outline-none focus:border-mirage-lime"
                            placeholder="word1, word2..."
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1.5 relative font-sans">
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Motion</span>
                          <select
                            value={scene.textAnimation || 'fade'}
                            onChange={(e) => {
                              const newScenes = [...videoProps.scenes];
                              newScenes[index].textAnimation = e.target.value as any;
                              setVideoProps({ ...videoProps, scenes: newScenes });
                            }}
                            className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer"
                          >
                            <option value="fade">Fade</option>
                            <option value="fade-up">Rise</option>
                            <option value="pop-in">Pop</option>
                            <option value="typing">Type</option>
                          </select>
                        </label>

                        <label className="flex flex-col gap-1.5 relative font-sans">
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Style</span>
                          <select
                            value={scene.textStyle || 'none'}
                            onChange={(e) => {
                              const newScenes = [...videoProps.scenes];
                              newScenes[index].textStyle = e.target.value as any;
                              setVideoProps({ ...videoProps, scenes: newScenes });
                            }}
                            className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer"
                          >
                            <option value="none">Solid</option>
                            <option value="neon">Neon</option>
                            <option value="outline">Stroke</option>
                            <option value="shadow">Depth</option>
                          </select>
                        </label>
                      </div>

                      {/* Transition Selection */}
                      <label className="flex flex-col gap-1.5 relative font-sans">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Transition</span>
                        <select
                          value={scene.transitionType || 'none'}
                          onChange={(e) => {
                            const newScenes = [...videoProps.scenes];
                            newScenes[index].transitionType = e.target.value as any;
                            setVideoProps({ ...videoProps, scenes: newScenes });
                          }}
                          className="w-full bg-mirage-black border border-white/10 rounded-md py-2 px-3 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none appearance-none cursor-pointer"
                        >
                          <option value="none">None</option>
                          <option value="fade">Fade</option>
                          <option value="slide">Slide</option>
                          <option value="flip">Flip</option>
                        </select>
                      </label>

                      {/* Background Asset */}
                      <label className="flex flex-col gap-1.5 font-sans">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-0.5">Visual_URL</span>
                        <input
                          type="text"
                          value={scene.backgroundImageUrl || ""}
                          onChange={(e) => {
                            const newScenes = [...videoProps.scenes];
                            newScenes[index].backgroundImageUrl = e.target.value;
                            setVideoProps({ ...videoProps, scenes: newScenes });
                          }}
                          className="w-full bg-mirage-black border border-white/10 rounded-md px-3 py-2 text-[10px] font-black text-white/80 focus:border-mirage-lime outline-none placeholder:text-white/5"
                          placeholder="Image/Video URL..."
                        />
                      </label>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-md p-2 flex items-center justify-between">
                            <span className="text-[7px] font-black text-white/20 uppercase">FRX</span>
                            <input 
                              type="number"
                              value={scene.durationInFrames}
                              onChange={(e) => {
                                const newScenes = [...videoProps.scenes];
                                const parsed = parseInt(e.target.value);
                                newScenes[index].durationInFrames = isNaN(parsed) ? 0 : parsed;
                                setVideoProps({ ...videoProps, scenes: newScenes });
                              }}
                              className="bg-transparent text-right text-[10px] font-black text-white w-10 outline-none"
                            />
                        </div>
                        <div className="flex-1 bg-mirage-lime/5 border border-mirage-lime/10 rounded-md p-2 flex items-center justify-between">
                            <span className="text-[7px] font-black text-mirage-lime/40 uppercase">POS</span>
                            <select
                              value={scene.layoutAlign || 'center'}
                              onChange={(e) => {
                                const newScenes = [...videoProps.scenes];
                                newScenes[index].layoutAlign = e.target.value as any;
                                setVideoProps({ ...videoProps, scenes: newScenes });
                              }}
                              className="bg-transparent text-right text-[9px] font-black text-mirage-lime outline-none appearance-none cursor-pointer"
                            >
                              <option value="top">Top</option>
                              <option value="center">Mid</option>
                              <option value="bottom">Btm</option>
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={addScene}
              className="w-full py-5 bg-white/[0.02] border-2 border-dashed border-white/5 rounded-md text-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:border-mirage-lime/30 hover:bg-mirage-lime/5 hover:text-mirage-lime transition-all flex items-center justify-center gap-3 group"
            >
              <Plus className="w-4 h-4" />
              Append Sequence Node
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
