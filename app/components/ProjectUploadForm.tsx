'use client';

import React, { useState, useEffect } from 'react';
import { UploadFormData } from '@/app/types';
import { 
  FileText, 
  Music, 
  Sparkles, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  Layout,
  Upload,
  Zap,
  PenTool,
  Target,
  Database,
  Cpu,
  Info,
  Image as ImageIcon,
  Video as VideoIcon,
  Activity,
  ShieldCheck,
  Globe,
  Monitor,
  ArrowRight
} from 'lucide-react';

interface ProjectUploadFormProps {
  onSubmit: (formData: UploadFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectUploadForm({ onSubmit, isLoading = false }: ProjectUploadFormProps) {
  const [formData, setFormData] = useState<Partial<UploadFormData>>({
    projectName: '',
    script: '',
    stylePrompt: '',
  });

  const [files, setFiles] = useState<{
    logo?: File;
    music?: File;
    productImages: File[];
    productVideos: File[];
  }>({
    productImages: [],
    productVideos: [],
  });

  const [step, setStep] = useState<'basic' | 'assets' | 'creativity'>('basic');
  const [error, setError] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [step]);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (step === 'basic') setStep('assets');
      else if (step === 'assets') setStep('creativity');
    }, 300);
  };

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (step === 'creativity') setStep('assets');
      else if (step === 'assets') setStep('basic');
    }, 300);
  };

  const StepIndicator = () => (
    <div className="mb-20 flex items-center justify-center gap-8 relative max-w-2xl mx-auto">
      {['basic', 'assets', 'creativity'].map((s, idx) => {
        const steps = ['basic', 'assets', 'creativity'];
        const currentIdx = steps.indexOf(step);
        const isActive = s === step;
        const isComplete = idx < currentIdx;
        
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-700 ${
                  isActive
                    ? 'bg-mirage-lime text-black shadow-glow-lime scale-110'
                    : isComplete
                    ? 'bg-white/10 text-mirage-lime border border-mirage-lime/30'
                    : 'bg-mirage-dark text-slate-700 border border-white/5'
                }`}
              >
                {isComplete ? <Check className="w-6 h-6" /> : idx + 1}
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-[8px] font-black tracking-[0.2em] transition-colors duration-700 uppercase ${isActive ? 'text-white' : 'text-slate-700'}`}>
                  {s}
                </span>
              </div>
            </div>
            {idx < 2 && (
              <div className={`flex-1 h-px bg-white/5 relative overflow-hidden mt-6`}>
                 <div className={`absolute inset-0 bg-mirage-lime transition-all duration-700 ease-in-out ${idx < currentIdx ? 'translate-x-0' : '-translate-x-full'}`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6">
      <StepIndicator />

      <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.98]'}`}>
        {error && (
          <div className="mb-12 p-6 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xl font-black rounded-2xl shadow-xl text-center flex items-center justify-center gap-4 backdrop-blur-3xl">
            <Info className="w-8 h-8" /> LOG_ERROR: {error.toUpperCase()}
          </div>
        )}

        {/* Step 1: Genesis Flow */}
        {step === 'basic' && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Project_Genesis</h2>
                <p className="text-xl text-slate-600 font-bold leading-tight max-w-xl">Initialize your production with a unique structural identity and narrative protocol.</p>
              </div>
              <div className="flex items-center gap-6 p-6 bg-white/[0.02] rounded-2xl border border-white/10 shadow-xl backdrop-blur-3xl">
                <div className="w-12 h-12 bg-mirage-lime text-black rounded-xl flex items-center justify-center shadow-glow-lime">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Operational</p>
                   <p className="text-sm font-black text-white">Kernel_Live</p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="group space-y-4">
                <div className="flex items-center justify-between px-2">
                   <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Production_Identity_Key</label>
                   <span className="badge-mirage !text-[8px] !px-3 !py-1">Mandatory_Ref</span>
                </div>
                <input
                  type="text"
                  value={formData.projectName || ''}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Input identity code..."
                  className="input-mirage !bg-transparent !border-white/10 focus:!border-mirage-lime/40 !text-3xl !py-6 !rounded-2xl"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Narrative_Synthesis_Block</label>
                   <div className="flex items-center gap-3 text-mirage-lime text-[8px] font-black uppercase bg-mirage-lime/5 px-4 py-2 rounded-full border border-mirage-lime/10">
                      <Cpu className="w-4 h-4" /> AI_Protocol_Active
                   </div>
                </div>
                <div className="relative">
                  <textarea
                    value={formData.script || ''}
                    onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                    placeholder="Input core narrative flux..."
                    className="input-mirage h-[300px] pt-16 !bg-transparent !border-white/10 focus:!border-mirage-lime/40 !text-xl !rounded-2xl"
                    required
                  />
                  <div className="absolute top-6 left-6 p-4 bg-mirage-dark rounded-xl shadow-xl border border-white/10 flex items-center gap-4 text-mirage-lime">
                     <PenTool className="w-5 h-5" />
                     <span className="text-[8px] font-black uppercase tracking-[0.4em]">Protocol_Ready</span>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-mirage-primary w-full py-6 text-xl shadow-glow-lime group !rounded-2xl">
              <span className="relative z-10 flex items-center justify-center gap-4 transition-transform group-hover:scale-105">
                 Initialize Synthesis <ChevronRight className="w-6 h-6" />
              </span>
            </button>
          </form>
        )}

        {/* Step 2: Vault Deposit */}
        {step === 'assets' && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-12">
            <div className="mb-12 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Asset_Vault</h2>
              <p className="text-xl text-slate-600 font-bold leading-tight max-w-xl">Deposit high-resolution visual and audio components for spectral processing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <FileUploadBox
                label="Brandmark_Vector"
                icon={<Target className="w-10 h-10" />}
                accept=".png,.svg,.jpg"
                onFile={(file) => setFiles({ ...files, logo: file })}
                file={files.logo}
                description="SVG / Alpha Master"
              />
              <FileUploadBox
                label="Primary_Score"
                icon={<Music className="w-10 h-10" />}
                accept=".mp3,.wav"
                onFile={(file) => setFiles({ ...files, music: file })}
                file={files.music}
                description="WAV / Master Profile"
              />
              <div className="md:col-span-2 space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Spectral_Gallery</label>
                    <div className="flex items-center gap-3 text-mirage-lime bg-mirage-lime/5 px-4 py-2 rounded-2xl text-[8px] font-black uppercase tracking-widest border border-mirage-lime/20">
                       <Sparkles className="w-4 h-4 fill-current animate-pulse" /> Parallel_DPI_Scale_Active
                    </div>
                 </div>
                 <MultiFileUploadBox
                  onFiles={(fs) => setFiles({ ...files, productImages: fs })}
                  files={files.productImages}
                 />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <button type="button" onClick={handleBack} className="btn-mirage-secondary w-full sm:w-1/3 py-5 text-xl !rounded-2xl">
                 Config_Return
              </button>
              <button type="submit" className="btn-mirage-primary flex-1 py-5 text-xl shadow-glow-lime !rounded-2xl">
                 Advance to Synthesis <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Synthesis Manifest */}
        {step === 'creativity' && (
          <form onSubmit={async (e) => { 
            e.preventDefault(); 
            await onSubmit({
              projectName: formData.projectName || '',
              script: formData.script || '',
              stylePrompt: formData.stylePrompt || '',
              logo: files.logo,
              music: files.music!,
              productImages: files.productImages,
              productVideos: files.productVideos,
            });
          }} className="space-y-12">
             <div className="mb-12 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Final_Synthesis</h2>
              <p className="text-xl text-slate-600 font-bold leading-tight max-w-2xl">Direct the visual trajectory and stylistic parameters of the global synthesis engine.</p>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Aesthetic_Trajectory</label>
                   <div className="badge-mirage !bg-mirage-blue/10 !text-mirage-blue !border-mirage-blue/20 !text-[8px] !px-3 !py-1">Vision_Sync Active</div>
                </div>
                <textarea
                  value={formData.stylePrompt || ''}
                  onChange={(e) => setFormData({ ...formData, stylePrompt: e.target.value })}
                  placeholder="Futuristic, high-contrast, atmospheric..."
                  className="input-mirage h-[200px] pt-10 !bg-transparent !border-white/10 focus:!border-mirage-lime/40 !text-3xl font-bold !rounded-2xl"
                />
              </div>

              <div className="mirage-card bg-mirage-black text-white !p-0 overflow-hidden shadow-2xl border-white/10 relative border-2 !rounded-[2rem]">
                 <div className="absolute inset-0 bg-mirage-lime/5 pointer-events-none" />
                 
                 <div className="px-10 py-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between relative z-10 backdrop-blur-3xl">
                    <div className="flex items-center gap-6">
                       <Cpu className="w-6 h-6 text-mirage-lime animate-pulse" />
                       <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30">Master_Synthesis_Manifest</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-mirage-lime text-black rounded-full shadow-glow-lime">
                       <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-widest">PRO_READY</span>
                    </div>
                 </div>
                 
                 <div className="p-10 grid md:grid-cols-3 gap-10 relative z-10">
                    <div className="space-y-2">
                      <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">INIT_ID</span>
                      <p className="text-2xl font-black text-white truncate leading-none">{formData.projectName}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">SPECTRAL_SCORE</span>
                      <p className="text-2xl font-black text-mirage-lime truncate leading-none">{files.music?.name || 'Null_Ref'}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">LAYER_TOTAL</span>
                      <p className="text-2xl font-black text-white leading-none">{[files.logo, ...files.productImages].filter(f => f).length} Elements</p>
                    </div>
                 </div>

                 <div className="px-10 py-6 bg-white/[0.02] flex items-center gap-4 relative z-10">
                    <Activity className="w-5 h-5 text-mirage-lime animate-pulse" />
                    <p className="text-sm font-bold text-slate-600 italic">Spectral analysis will initiate upon master confirmation.</p>
                 </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <button type="button" onClick={handleBack} className="btn-mirage-secondary w-full sm:w-1/3 py-5 text-xl !rounded-2xl">
                 Return_to_Vault
              </button>
              <button type="submit" disabled={isLoading} className="btn-mirage-primary flex-1 py-5 text-xl shadow-glow-lime relative overflow-hidden group !rounded-2xl">
                {isLoading ? (
                  <span className="flex items-center gap-4 relative z-10">
                     <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                     SYNTHESIZING...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center gap-4 group-hover:scale-105 transition-transform">
                       EXECUTE_MASTER_SYNTH <Zap className="w-6 h-6 fill-current shadow-glow-lime" />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function FileUploadBox({ label, icon, accept, onFile, file, description }: { label: string, icon: React.ReactNode, accept: string, onFile: (f: File) => void, file?: File, description?: string }) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className="space-y-6 group">
      <div className="flex items-center justify-between px-2">
        <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] leading-none">{label}</label>
      </div>
      <label 
        className={`block cursor-pointer outline-none transition-all duration-700`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files) onFile(e.dataTransfer.files[0]); }}
      >
        <input type="file" accept={accept} onChange={(e) => e.target.files && onFile(e.target.files[0])} className="hidden" />
        <div className={`mirage-card !p-12 flex flex-col items-center justify-center text-center transition-all duration-700 !rounded-[2.5rem] border-2 ${
          file 
            ? 'bg-mirage-lime/5 border-mirage-lime shadow-glow-lime scale-[1.03]' 
            : isDragOver 
            ? 'bg-white/10 border-mirage-lime scale-[0.98]' 
            : 'bg-white/[0.02] border-white/5 hover:border-white/20'
        }`}>
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-10 transition-all duration-700 shadow-xl relative ${file ? 'bg-mirage-lime text-black rotate-12 scale-110' : 'bg-mirage-black text-slate-600 group-hover:bg-white/5 group-hover:text-mirage-lime group-hover:-rotate-6'}`}>
             {file ? <Check className="w-10 h-10" /> : icon}
          </div>
          <div className="space-y-4">
            <p className={`text-2xl font-black tracking-tighter transition-colors duration-700 ${file ? 'text-white' : 'text-slate-600 group-hover:text-white'}`}>
              {file ? file.name : `Inject_${label}`}
            </p>
            {!file && <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.4em] group-hover:text-slate-400 transition-colors">{description || 'Operational Drag + Drop'}</p>}
          </div>
        </div>
      </label>
    </div>
  );
}

function MultiFileUploadBox({ onFiles, files }: { onFiles: (fs: File[]) => void, files: File[] }) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div 
      className={`bg-white/[0.01] backdrop-blur-3xl border-2 border-dashed rounded-[3rem] p-16 group transition-all duration-700 relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center ${
        isDragOver ? 'border-mirage-lime bg-white/[0.03] scale-[0.98]' : 'border-white/5 hover:border-white/10'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files) onFiles([...files, ...Array.from(e.dataTransfer.files)]); }}
    >
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-px bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-12 left-1/2 -translate-x-1/2 w-px bg-white/5 pointer-events-none" />

      <label className="flex flex-col items-center justify-center cursor-pointer relative z-10 transition-all duration-700 hover:scale-105">
        <input type="file" multiple onChange={(e) => onFiles([...files, ...Array.from(e.target.files || [])])} className="hidden" />
        <div className="w-24 h-24 rounded-2xl bg-mirage-dark border border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:bg-mirage-lime group-hover:text-black transition-all duration-700 group-hover:rotate-180">
          <Upload className="w-10 h-10" />
        </div>
        <div className="text-center space-y-4">
           <p className="text-3xl font-black text-slate-800 group-hover:text-white transition-all duration-700 tracking-tighter">Inject_Structural_Media</p>
           <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.4em] group-hover:text-mirage-lime transition-colors">Parallel_DPI_Synthesis_Protocol</p>
        </div>
      </label>
      
      {files.length > 0 && (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 w-full">
          {files.map((f, i) => (
            <div key={i} className="p-4 bg-mirage-dark border border-white/10 rounded-2xl flex items-center justify-between group/item animate-fade-in shadow-xl hover:border-mirage-lime/40 transition-all duration-700">
              <span className="text-[10px] font-black text-white/40 truncate pr-4 group-hover/item:text-white transition-colors">{f.name}</span>
              <button 
                onClick={(e) => { e.preventDefault(); onFiles(files.filter((_, idx) => idx !== i)); }} 
                className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-700 hover:text-white hover:bg-rose-500/80 transition-all"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
