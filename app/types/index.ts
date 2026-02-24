// Core types and schemas for the kinetic typography SaaS product

export type VideoResolution = '1080x1920' | '1920x1080' | '720x1280';

export interface UploadedAssets {
  logo?: {
    url: string;
    format: 'png' | 'svg';
  };
  productImages?: {
    url: string;
    format: string;
  }[];
  productVideos?: {
    url: string;
    duration: number; // in seconds
  }[];
  backgroundAssets?: {
    url: string;
    type: 'image' | 'video';
  }[];
  musicFile: {
    url: string;
    format: 'mp3' | 'wav';
    duration: number; // in seconds
  };
}

export interface BeatAnalysisResult {
  tempo: number; // BPM
  beats: number[]; // Beat frame numbers at 30fps
  energyLevels: Array<{
    frame: number;
    energy: 'high' | 'medium' | 'low';
  }>;
  peakFrames: number[]; // Frames with highest energy
}

export interface ScriptEnhancementResult {
  originalScript: string;
  enhancedScript: string;
  emphasizedWords: string[]; // Words to animate on beats
}

export interface AnimationType {
  type: 'slideUp' | 'fadeIn' | 'scaleImpact' | 'letterByLetter' | 'beatBounce' | 'fadeOut' | 'slideDown';
  duration: number; // in frames
  easing: 'easeOut' | 'easeInOut' | 'easeIn' | 'linear';
}

export interface LayerStyle {
  fontSize?: number;
  color?: string;
  fontWeight?: 'normal' | 'bold' | '700' | '600' | '400';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  opacity?: number;
  letterSpacing?: number;
}

export interface TextLayer {
  type: 'text';
  content: string;
  animation: AnimationType;
  style: LayerStyle;
  beatSync: boolean; // Whether to animate on beat frames
  startFrame?: number;
}

export interface ImageLayer {
  type: 'image';
  src: string; // URL to image
  animation: AnimationType;
  style: {
    width?: number;
    height?: number;
    opacity?: number;
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  };
  beatSync: boolean;
  startFrame?: number;
}

export interface VideoLayer {
  type: 'video';
  src: string; // URL to video
  animation: AnimationType;
  style: {
    width?: number;
    height?: number;
    opacity?: number;
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  };
  beatSync: boolean;
  startFrame?: number;
  duration?: number; // Duration in frames
}

export interface LogoLayer {
  type: 'logo';
  src: string;
  animation: AnimationType;
  style: {
    width?: number;
    height?: number;
    opacity?: number;
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  };
  beatSync: boolean;
  startFrame?: number;
}

export type Layer = TextLayer | ImageLayer | VideoLayer | LogoLayer;

export interface Scene {
  id: string;
  startFrame: number;
  endFrame: number;
  layers: Layer[];
  transition?: {
    type: 'fade' | 'flash' | 'wipe' | 'zoom';
    duration: number; // in frames
  };
}

export interface VideoConfiguration {
  fps: number;
  width: number;
  height: number;
  totalFrames: number;
  background: {
    type: 'solid' | 'gradient' | 'video';
    color?: string;
    gradientStart?: string;
    gradientEnd?: string;
    videoUrl?: string;
  };
}

export interface AnimationTimeline {
  id?: string;
  projectName: string;
  video: VideoConfiguration;
  audio: {
    musicUrl: string;
    beats: number[];
    tempo: number;
  };
  scenes: Scene[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KineticTypographyProject {
  id: string;
  userId: string;
  projectName: string;
  
  // Original inputs
  originalScript: string;
  stylePrompt: string;
  
  // Processed data
  enhancedScript: string;
  beatAnalysis: BeatAnalysisResult;
  uploadedAssets: UploadedAssets;
  
  // Generated timeline
  timeline: AnimationTimeline;
  
  // Output
  videoUrl?: string;
  thumbnailUrl?: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadFormData {
  logo?: File;
  productImages?: File[];
  productVideos?: File[];
  backgroundAssets?: File[];
  music: File;
  script: string;
  stylePrompt: string;
  projectName: string;
}

export interface TimelineEditorState {
  timeline: AnimationTimeline;
  selectedSceneId?: string;
  selectedLayerId?: string;
  isPlaying: boolean;
  currentFrame: number;
  zoom: number; // Zoom level for timeline
}
