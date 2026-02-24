'use client';

import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Music, 
  Video, 
  Image as ImageIcon, 
  Type, 
  Sparkles, 
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SimpleStudioModalProps {
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: any) => void;
}

export function SimpleStudioModal({ projectName, isOpen, onClose, onGenerate }: SimpleStudioModalProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  
  const [files, setFiles] = useState<{
    logo: File | null;
    music: File | null;
    video: File | null;
    images: File[];
  }>({
    logo: null,
    music: null,
    video: null,
    images: []
  });

  const [textData, setTextData] = useState({
    script: '',
    prompt: ''
  });

  if (!isOpen) return null;

  const handleFileChange = (type: keyof typeof files, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (type === 'images') {
      setFiles(prev => ({ ...prev, images: [...prev.images, ...Array.from(selectedFiles)] }));
    } else {
      setFiles(prev => ({ ...prev, [type]: selectedFiles[0] }));
    }
  };

  const startGeneration = async () => {
    setIsGenerating(true);
    
    const steps = [
      "Analyzing music with Librosa beat tracking...",
      "Extracting onset patterns via FFmpeg...",
      "Enhancing script with AI narrative engine...",
      "Synthesizing kinetic typography layers...",
      "Matching transitions to audio peaks...",
      "Finalizing Remotion project structure..."
    ];

    for (const stepText of steps) {
      setStatus(stepText);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    onGenerate({
      ...files,
      ...textData,
      projectName
    });
  };

  const renderContent = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-mirage-lime/20 blur-3xl rounded-full animate-pulse" />
            <Loader2 className="w-16 h-16 text-mirage-lime animate-spin relative z-10" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Generating Your Masterpiece</h3>
          <p className="text-slate-400 font-medium animate-pulse">{status}</p>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Brand Logo</label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-md hover:border-mirage-lime/40 hover:bg-white/[0.02] cursor-pointer transition-all group">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('logo', e)} />
              {files.logo ? (
                <div className="flex items-center gap-3 text-mirage-lime font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="truncate max-w-[150px]">{files.logo.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-600 group-hover:text-mirage-lime mb-2 transition-colors" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-300 transition-colors">Upload Logo</span>
                </>
              )}
            </label>
          </div>

          {/* Music Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Background Music</label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-md hover:border-mirage-lime/40 hover:bg-white/[0.02] cursor-pointer transition-all group">
              <input type="file" className="hidden" accept="audio/*" onChange={(e) => handleFileChange('music', e)} />
              {files.music ? (
                <div className="flex items-center gap-3 text-mirage-lime font-bold">
                  <Music className="w-5 h-5" />
                  <span className="truncate max-w-[150px]">{files.music.name}</span>
                </div>
              ) : (
                <>
                  <Music className="w-6 h-6 text-slate-600 group-hover:text-mirage-lime mb-2 transition-colors" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-300 transition-colors">Select Audio</span>
                </>
              )}
            </label>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Base Video (Optional)</label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-md hover:border-mirage-lime/40 hover:bg-white/[0.02] cursor-pointer transition-all group">
              <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileChange('video', e)} />
              {files.video ? (
                <div className="flex items-center gap-3 text-mirage-lime font-bold">
                  <Video className="w-5 h-5" />
                  <span className="truncate max-w-[150px]">{files.video.name}</span>
                </div>
              ) : (
                <>
                  <Video className="w-6 h-6 text-slate-600 group-hover:text-mirage-lime mb-2 transition-colors" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-300 transition-colors">Add Video</span>
                </>
              )}
            </label>
          </div>

          {/* Images Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Product Images</label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/5 rounded-md hover:border-mirage-lime/40 hover:bg-white/[0.02] cursor-pointer transition-all group">
              <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handleFileChange('images', e)} />
              {files.images.length > 0 ? (
                <div className="flex items-center gap-3 text-mirage-lime font-bold">
                  <ImageIcon className="w-5 h-5" />
                  <span>{files.images.length} Images selected</span>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-slate-600 group-hover:text-mirage-lime mb-2 transition-colors" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-300 transition-colors">Upload Images</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Script Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Ad Script</label>
            <span className="text-[10px] font-black text-mirage-lime/60 italic">AI will enhance this</span>
          </div>
          <div className="relative group">
            <textarea 
              value={textData.script}
              onChange={(e) => setTextData(prev => ({ ...prev, script: e.target.value }))}
              placeholder="Enter your video script here..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-md p-6 text-slate-200 font-bold focus:outline-none focus:border-mirage-lime/40 focus:ring-4 focus:ring-mirage-lime/5 transition-all min-h-[120px]"
            />
            <Type className="absolute top-6 right-6 w-5 h-5 text-slate-700" />
          </div>
        </div>

        {/* Prompt Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Style Prompt</label>
          <div className="relative group">
            <textarea 
              value={textData.prompt}
              onChange={(e) => setTextData(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="Describe the mood: Colorful, Minimalistic, Tech-focused, Apple-style..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-md p-6 text-slate-200 font-bold focus:outline-none focus:border-mirage-lime/40 focus:ring-4 focus:ring-mirage-lime/5 transition-all min-h-[100px]"
            />
            <Sparkles className="absolute top-6 right-6 w-5 h-5 text-slate-700" />
          </div>
        </div>

        <button 
          onClick={startGeneration}
          disabled={!textData.script || !files.music}
          className="w-full btn-mirage-primary !py-5 !rounded-md group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Initialize Generation <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-mirage-black/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-mirage-dark border border-white/10 rounded-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 shrink-0">
          <div>
            <span className="text-[10px] font-black text-mirage-lime uppercase tracking-[0.4em] mb-1 block">New Project</span>
            <h2 className="text-3xl font-black text-white tracking-tighter">{projectName}</h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </div>

        {/* Footer Info */}
        {!isGenerating && (
          <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-center gap-4">
             <div className="flex items-center gap-2">
               <AlertCircle className="w-4 h-4 text-slate-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">AI synthesis takes ~10s</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
