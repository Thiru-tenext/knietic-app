'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TimelineEditor } from '@/app/components/TimelineEditor';
import { KineticTypographyProject } from '@/app/types';
import { SimpleStudioModal } from '@/app/components/SimpleStudioModal';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Target, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Volume2, 
  VolumeX,
  Sparkles,
  Layers,
  Zap,
  Globe,
  Maximize2
} from 'lucide-react';

type ViewMode = 'welcome' | 'edit';

export default function StudioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('welcome');
  const [projects, setProjects] = useState<KineticTypographyProject[]>([]);
  const [currentProject, setCurrentProject] = useState<KineticTypographyProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempProjectName, setTempProjectName] = useState('');
  const [initName, setInitName] = useState('');
  const [isNaming, setIsNaming] = useState(false);

  const handleStartNaming = () => {
    setIsNaming(true);
  };

  const handleConfirmName = (e: React.FormEvent) => {
    e.preventDefault();
    if (initName.trim()) {
      setIsModalOpen(true);
      setIsNaming(false);
    }
  };

  const onGenerateComplete = (data: any) => {
    // Simulated project creation
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      projectName: data.projectName,
      createdAt: new Date().toISOString(),
      status: 'Synthesis_Complete',
      timeline: {
        video: { width: 1080, height: 1920, fps: 30, totalFrames: 300 },
        audio: { url: '', tempo: 120 },
        scenes: []
      }
    } as unknown as KineticTypographyProject;

    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setIsModalOpen(false);
    setViewMode('edit');
  };

  if (viewMode === 'welcome') {
    return (
      <div className="min-h-screen bg-mirage-black font-sans selection:bg-mirage-lime selection:text-black overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mirage-lime/10 rounded-full blur-[160px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mirage-blue/10 rounded-full blur-[140px] -z-10" />

        <header className="absolute top-0 left-0 w-full z-50 p-8">
           <Link href="/" className="flex items-center gap-4 group w-max">
              <div className="w-10 h-10 bg-white/5 rounded-md border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-mirage-lime group-hover:text-black group-hover:rotate-12 duration-700">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                Kinetic<span className="text-mirage-lime">.studio</span>
              </span>
           </Link>
        </header>

        <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10">
          <div className="max-w-4xl w-full text-center space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                 <div className="h-px w-12 bg-mirage-lime/40" />
                 <span className="badge-mirage !bg-transparent !border-mirage-lime/30 !text-mirage-lime">Creative Intelligence v2.0</span>
                 <div className="h-px w-12 bg-mirage-lime/40" />
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-8">
                Welcome to the <br />
                <span className="text-mirage-gradient">Studio.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                Transform your raw ideas into high-fidelity kinetic typography ads in seconds. Start your next visual production now.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[120px]">
              {!isNaming ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
                  <button 
                    onClick={handleStartNaming}
                    className="btn-mirage-primary !px-12 !py-6 !text-2xl group shadow-glow-lime hover:scale-105 transition-all"
                  >
                    <Plus className="w-8 h-8 mr-4 group-hover:rotate-90 transition-transform duration-500" /> 
                    Initialize Project
                  </button>
                  
                  {projects.length > 0 && (
                    <button 
                      onClick={() => {/* logic to show archive */}}
                      className="btn-mirage-secondary !px-10 !py-6 !text-2xl hover:bg-white/10"
                    >
                      View Archive ({projects.length})
                    </button>
                  )}
                </div>
              ) : (
                <form 
                  onSubmit={handleConfirmName}
                  className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="relative group">
                    <input 
                      autoFocus
                      type="text"
                      value={initName}
                      onChange={(e) => setInitName(e.target.value)}
                      placeholder="Enter project name..."
                      className="w-full bg-white/5 border-2 border-white/10 rounded-md px-8 py-6 text-2xl font-black text-white outline-none focus:border-mirage-lime transition-all text-center"
                    />
                    <button 
                      type="submit"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-mirage-lime text-black rounded-md shadow-glow-lime hover:scale-110 transition-all"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mt-4">Press Enter to Begin Synthesis</p>
                </form>
              )}
            </div>
            
            <div className="pt-20 grid grid-cols-3 gap-12 opacity-40">
               <div className="flex flex-col items-center gap-2">
                 <Zap className="w-6 h-6 text-mirage-lime" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fast Generation</span>
               </div>
               <div className="flex flex-col items-center gap-2 text-mirage-blue">
                 <Sparkles className="w-6 h-6" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Enhancement</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Globe className="w-6 h-6 text-mirage-cyan" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Synthesis</span>
               </div>
            </div>
          </div>
        </main>

        <SimpleStudioModal 
          projectName={initName}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGenerate={onGenerateComplete}
        />
      </div>
    );
  }

  if (viewMode === 'edit' && currentProject) {
    return (
      <div className="w-screen h-screen bg-mirage-black flex flex-col overflow-hidden animate-in fade-in duration-1000">
        <header className="h-20 bg-mirage-dark/50 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setViewMode('welcome')}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-mirage-lime hover:text-black transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-1">Production Stage</span>
              <h1 className="text-2xl font-black text-white tracking-tighter">{currentProject.projectName}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-mirage-black rounded-2xl border border-white/5 shadow-inner">
               <div className="w-2.5 h-2.5 rounded-full bg-mirage-lime animate-pulse shadow-glow-lime-md" />
               <span className="text-[10px] font-black text-mirage-lime uppercase tracking-[0.2em]">Automated Sync Live</span>
            </div>
            <button className="btn-mirage-primary !px-6 !py-2.5 !text-[10px] !bg-white/10 !text-white hover:!bg-mirage-lime hover:!text-black !border-white/10">
               Manual Export
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <TimelineEditor 
            timeline={currentProject.timeline} 
            onSave={async (t) => { console.log('Saved', t); }}
            onExport={(t) => console.log('Export', t)}
          />
        </div>
      </div>
    );
  }

  return null;
}
