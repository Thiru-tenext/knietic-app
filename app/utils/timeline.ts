import {
  AnimationTimeline,
  BeatAnalysisResult,
  ScriptEnhancementResult,
  Layer,
  Scene,
} from '@/app/types';

/**
 * Timeline Processing Utilities
 * Functions for working with animation timelines
 */

/**
 * Validates a timeline against the schema
 */
export function validateTimeline(timeline: AnimationTimeline): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!timeline.video) errors.push('Missing video configuration');
  if (!timeline.audio) errors.push('Missing audio configuration');
  if (!timeline.scenes || timeline.scenes.length === 0) errors.push('No scenes defined');

  // Validate video config
  if (timeline.video) {
    if (timeline.video.fps <= 0) errors.push('Invalid FPS value');
    if (timeline.video.width <= 0 || timeline.video.height <= 0)
      errors.push('Invalid video dimensions');
    if (timeline.video.totalFrames <= 0) errors.push('Invalid total frames');
  }

  // Validate scenes
  timeline.scenes?.forEach((scene, idx) => {
    if (!scene.id) errors.push(`Scene ${idx} missing ID`);
    if (scene.startFrame < 0) errors.push(`Scene ${idx} has negative startFrame`);
    if (scene.endFrame <= scene.startFrame)
      errors.push(`Scene ${idx} endFrame must be greater than startFrame`);
    if (!scene.layers || scene.layers.length === 0)
      errors.push(`Scene ${idx} has no layers`);
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate total duration in seconds
 */
export function getTotalDuration(timeline: AnimationTimeline): number {
  return timeline.video.totalFrames / timeline.video.fps;
}

/**
 * Get frame number from time in seconds
 */
export function secondsToFrame(seconds: number, fps: number = 30): number {
  return Math.round(seconds * fps);
}

/**
 * Get time in seconds from frame number
 */
export function frameToSeconds(frame: number, fps: number = 30): number {
  return frame / fps;
}

/**
 * Find scenes that overlap with given frame range
 */
export function getScenesInFrameRange(
  timeline: AnimationTimeline,
  startFrame: number,
  endFrame: number
): Scene[] {
  return timeline.scenes.filter(
    (scene) => !(scene.endFrame < startFrame || scene.startFrame > endFrame)
  );
}

/**
 * Get all layers at a specific frame
 */
export function getLayersAtFrame(timeline: AnimationTimeline, frame: number): Layer[] {
  const layers: Layer[] = [];
  timeline.scenes.forEach((scene) => {
    if (frame >= scene.startFrame && frame < scene.endFrame) {
      layers.push(...scene.layers);
    }
  });
  return layers;
}

/**
 * Find beat-synced words based on emphasized words and beats
 */
export function alignWordsWithBeats(
  script: string,
  emphasizedWords: string[],
  beats: number[]
): Array<{ word: string; frame: number }> {
  const result: Array<{ word: string; frame: number }> = [];

  emphasizedWords.forEach((word, idx) => {
    if (idx < beats.length) {
      result.push({
        word,
        frame: beats[idx],
      });
    }
  });

  return result;
}

/**
 * Calculate scene durations in a balanced way
 */
export function calculateSceneDurations(
  scriptSections: string[],
  totalFrames: number,
  fps: number = 30
): Array<{ section: string; startFrame: number; endFrame: number }> {
  const durationPerSection = Math.floor(totalFrames / scriptSections.length);
  // Initialize result array with explicit type annotation to satisfy TypeScript
  const result: Array<{ section: string; startFrame: number; endFrame: number }> = [];

  scriptSections.forEach((section, idx) => {
    const startFrame = idx * durationPerSection;
    // Last section gets remainder frames
    const endFrame = idx === scriptSections.length - 1
      ? totalFrames
      : (idx + 1) * durationPerSection;

    result.push({
      section,
      startFrame,
      endFrame,
    });
  });

  return result;
}

/**
 * Generate keyframe points for smooth animation transitions
 */
export function generateKeyframes(
  startValue: number,
  endValue: number,
  duration: number,
  easing: 'easeOut' | 'easeInOut' | 'easeIn' | 'linear' = 'easeOut'
): number[] {
  const keyframes: number[] = [];
  const steps = Math.max(2, Math.floor(duration / 5)); // One keyframe every 5 frames

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let easedT = t;

    if (easing === 'easeOut') {
      easedT = 1 - Math.pow(1 - t, 3);
    } else if (easing === 'easeInOut') {
      easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    } else if (easing === 'easeIn') {
      easedT = t * t * t;
    }

    const value = startValue + (endValue - startValue) * easedT;
    keyframes.push(Math.round(value));
  }

  return keyframes;
}

/**
 * Export timeline as JSON
 */
export function exportTimelineAsJSON(timeline: AnimationTimeline): string {
  return JSON.stringify(timeline, null, 2);
}

/**
 * Import timeline from JSON string
 */
export function importTimelineFromJSON(jsonString: string): AnimationTimeline {
  return JSON.parse(jsonString);
}

/**
 * Create a copy of timeline for editing
 */
export function cloneTimeline(timeline: AnimationTimeline): AnimationTimeline {
  return JSON.parse(JSON.stringify(timeline));
}

/**
 * Get animation duration in seconds
 */
export function getAnimationDuration(
  layerStartFrame: number,
  layerAnimationDuration: number,
  fps: number = 30
): number {
  return (layerStartFrame + layerAnimationDuration) / fps;
}

/**
 * Calculate optimal font size based on video resolution
 */
export function getResponsiveFontSize(
  baseSize: number,
  videoWidth: number,
  videoHeight: number
): number {
  const pixelDensity = Math.sqrt(videoWidth * videoHeight) / 1080;
  return Math.round(baseSize * pixelDensity);
}

/**
 * Convert rgb to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * Convert hex to rgb
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

/**
 * Generate unique scene ID
 */
export function generateSceneId(): string {
  return `scene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate unique layer ID
 */
export function generateLayerId(): string {
  return `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
