/**
 * Video Configuration Constants
 * 
 * Defines all video-related settings and defaults
 */

/**
 * Supported video resolutions
 */
export const VIDEO_RESOLUTIONS = {
  PORTRAIT_1080: { width: 1080, height: 1920, label: '1080x1920 (Portrait)' },
  LANDSCAPE_1920: { width: 1920, height: 1080, label: '1920x1080 (Landscape)' },
  MOBILE_720: { width: 720, height: 1280, label: '720x1280 (Mobile)' },
  SQUARE_1080: { width: 1080, height: 1080, label: '1080x1080 (Square)' },
  SQUARE_512: { width: 512, height: 512, label: '512x512 (Square)' },
} as const;

/**
 * Default video configuration
 */
export const DEFAULT_VIDEO_CONFIG = {
  fps: 30,
  duration: 10, // seconds
  codec: 'h264',
  quality: 'high' as const,
  resolution: VIDEO_RESOLUTIONS.PORTRAIT_1080,
} as const;

/**
 * Video frame rates
 */
export const VIDEO_FPS = {
  CINEMA_24: 24,
  STANDARD_30: 30,
  SMOOTH_60: 60,
} as const;

/**
 * Video quality presets
 */
export const VIDEO_QUALITY = {
  LOW: { bitrate: '2000k', crf: 28 },
  MEDIUM: { bitrate: '5000k', crf: 23 },
  HIGH: { bitrate: '10000k', crf: 18 },
  ULTRA: { bitrate: '20000k', crf: 13 },
} as const;

/**
 * Video timing constants
 */
export const VIDEO_TIMING = {
  MIN_DURATION_FRAMES: 30, // 1 second at 30fps
  MAX_DURATION_FRAMES: 18000, // 10 minutes at 30fps
  MIN_DURATION_SECONDS: 1,
  MAX_DURATION_SECONDS: 600, // 10 minutes
} as const;

/**
 * Background types and configurations
 */
export const BACKGROUND_TYPES = {
  SOLID: 'solid',
  GRADIENT: 'gradient',
  VIDEO: 'video',
  IMAGE: 'image',
  ANIMATED: 'animated',
} as const;

export const DEFAULT_BACKGROUND = {
  type: BACKGROUND_TYPES.SOLID,
  color: '#000000',
} as const;

/**
 * Layer types and configurations
 */
export const LAYER_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  LOGO: 'logo',
  SHAPE: 'shape',
  EFFECTS: 'effects',
} as const;

/**
 * Animation presets
 */
export const ANIMATION_PRESETS = {
  FADE_IN: {
    type: 'fadeIn',
    duration: 30, // frames
    easing: 'easeOut' as const,
  },
  FADE_OUT: {
    type: 'fadeOut',
    duration: 30,
    easing: 'easeOut' as const,
  },
  SLIDE_UP: {
    type: 'slideUp',
    duration: 20,
    easing: 'easeOut' as const,
  },
  SLIDE_DOWN: {
    type: 'slideDown',
    duration: 20,
    easing: 'easeOut' as const,
  },
  SCALE_IMPACT: {
    type: 'scaleImpact',
    duration: 15,
    easing: 'easeOut' as const,
  },
  BEAT_BOUNCE: {
    type: 'beatBounce',
    duration: 10,
    easing: 'easeInOut' as const,
  },
  LETTER_BY_LETTER: {
    type: 'letterByLetter',
    duration: 60,
    easing: 'easeOut' as const,
  },
} as const;

/**
 * Easing functions
 */
export const EASING_FUNCTIONS = {
  LINEAR: 'linear',
  EASE_IN: 'easeIn',
  EASE_OUT: 'easeOut',
  EASE_IN_OUT: 'easeInOut',
} as const;

/**
 * Text layer positions
 */
export const TEXT_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  CENTER_LEFT: 'center-left',
  CENTER: 'center',
  CENTER_RIGHT: 'center-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

/**
 * Font weight options
 */
export const FONT_WEIGHTS = {
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  EXTRA_BOLD: 800,
  BLACK: 900,
} as const;

/**
 * Rendering options
 */
export const RENDERING_OPTIONS = {
  FORMAT: 'mp4' as const,
  AUDIO_CODEC: 'aac',
  VIDEO_CODEC: 'h264',
  CONTAINER: 'mp4',
} as const;
