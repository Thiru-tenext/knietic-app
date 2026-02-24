/**
 * Animation and Timeline Types
 */

/**
 * Supported animation types
 */
export type AnimationType =
  | 'slideUp'
  | 'fadeIn'
  | 'scaleImpact'
  | 'letterByLetter'
  | 'beatBounce'
  | 'fadeOut'
  | 'slideDown';

/**
 * Easing function types
 */
export type EasingFunction = 'easeOut' | 'easeInOut' | 'easeIn' | 'linear';

/**
 * Layer types
 */
export type LayerType = 'text' | 'image' | 'video' | 'logo' | 'shape' | 'effects';

/**
 * Text position types
 */
export type TextPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Energy level types
 */
export type EnergyLevel = 'high' | 'medium' | 'low';

/**
 * Animation configuration
 */
export interface Animation {
  type: AnimationType;
  duration: number; // in frames
  easing: EasingFunction;
  delay?: number; // in frames
  repeat?: number;
}

/**
 * Text layer style
 */
export interface TextLayerStyle {
  fontSize?: number;
  color?: string;
  fontWeight?: number | 'normal' | 'bold';
  fontFamily?: string;
  opacity?: number;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  textShadow?: string;
}

/**
 * Base layer properties
 */
export interface BaseLayer {
  id: string;
  type: LayerType;
  animation?: Animation;
  beatSync?: boolean;
  startFrame?: number;
  duration?: number;
  visible?: boolean;
  locked?: boolean;
}

/**
 * Text layer
 */
export interface TextLayer extends BaseLayer {
  type: 'text';
  content: string;
  style: TextLayerStyle;
  position?: TextPosition;
}

/**
 * Image layer
 */
export interface ImageLayer extends BaseLayer {
  type: 'image';
  src: string;
  width?: number;
  height?: number;
  position?: TextPosition;
  opacity?: number;
}

/**
 * Video layer
 */
export interface VideoLayer extends BaseLayer {
  type: 'video';
  src: string;
  width?: number;
  height?: number;
  volume?: number;
  loop?: boolean;
}

/**
 * Logo layer
 */
export interface LogoLayer extends BaseLayer {
  type: 'logo';
  src: string;
  width?: number;
  height?: number;
  position?: TextPosition;
}

/**
 * Union of all layer types
 */
export type Layer = TextLayer | ImageLayer | VideoLayer | LogoLayer;

/**
 * Scene in animation timeline
 */
export interface Scene {
  id: string;
  name: string;
  startFrame: number;
  endFrame: number;
  duration: number; // in frames
  layers: Layer[];
  backgroundColor?: string;
  backgroundImage?: string;
  transitions?: {
    type: string;
    duration: number;
  };
}

/**
 * Video configuration
 */
export interface VideoConfig {
  fps: number;
  width: number;
  height: number;
  duration: number; // in seconds
  totalFrames: number;
  codec?: string;
  quality?: 'low' | 'medium' | 'high' | 'ultra';
}

/**
 * Audio configuration in timeline
 */
export interface AudioConfig {
  musicUrl: string;
  beats: number[]; // Frame numbers
  tempo: number; // BPM
  volume?: number;
  fadeIn?: number; // frames
  fadeOut?: number; // frames
}

/**
 * Background configuration
 */
export interface Background {
  type: 'solid' | 'gradient' | 'video' | 'image';
  color?: string;
  gradient?: {
    start: string;
    end: string;
    angle?: number;
  };
  image?: string;
  video?: string;
}

/**
 * Complete animation timeline
 */
export interface AnimationTimeline {
  id: string;
  projectName: string;
  description?: string;
  video: VideoConfig;
  audio?: AudioConfig;
  background?: Background;
  scenes: Scene[];
  metadata?: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

/**
 * Energy level data
 */
export interface EnergyLevelData {
  frame: number;
  energy: EnergyLevel;
}

/**
 * Beat analysis result
 */
export interface BeatAnalysisResult {
  tempo: number; // BPM
  beats: number[]; // Beat frame numbers
  energyLevels: EnergyLevelData[];
  peakFrames: number[];
}

/**
 * Script enhancement result
 */
export interface ScriptEnhancementResult {
  originalScript: string;
  enhancedScript: string;
  emphasizedWords: string[];
}
