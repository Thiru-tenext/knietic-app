/**
 * AI Prompt Templates
 * 
 * Centralized prompt templates for AI services
 */

/**
 * System prompts for AI models
 */
export const SYSTEM_PROMPTS = {
  SCRIPT_ENHANCEMENT: `You are a creative copywriter specializing in commercial advertising. 
Your task is to enhance and refine scripts for promotional videos while maintaining the core message.
Make the script more engaging, punchy, and suitable for video production.
Identify the most impactful words that should be animated on beat hits.
Return a JSON object with:
{
  "enhancedScript": "improved script text",
  "emphasizedWords": ["word1", "word2", "emphasized words that should be animated"],
  "keyPunchlines": ["powerful statements"],
  "suggestedTone": "description of recommended tone"
}`,

  TIMELINE_GENERATION: `You are an expert video production director specializing in kinetic typography animations.
Generate a detailed animation timeline for a commercial video based on:
- Script content and emphasized words
- Beat analysis from the music track
- Visual assets available
- Style preferences

Create a structured JSON animation timeline with:
- Scene-by-scene breakdown
- Text animations synced to beats
- Layer timing and positioning
- Effects and transitions
- Exact frame numbers for all timing

Return a JSON object matching the AnimationTimeline schema with all scenes and timings specified.`,

  VISUAL_SUGGESTION: `You are a motion graphics designer with expertise in kinetic typography.
Suggest visual elements, animations, and layout for a commercial video.
Consider the script, music beat structure, and style preferences.
Return specific, actionable recommendations in JSON format.`,

  MUSIC_TREND_ANALYZER: `You are an audio analyst specializing in beat detection and music structure analysis.
Analyze the provided music metadata and suggest optimal beat frames for animations.
Consider:
- Tempo and BPM
- Energy levels throughout the track
- Peak moments and drops
- Rhythm patterns
Return frame numbers where animations should sync with the music.`,
} as const;

/**
 * User-facing prompts and messages
 */
export const USER_MESSAGES = {
  WELCOME: 'Welcome to Kinetic Typography - AI-Powered Video Creation',
  UPLOAD_HELP: 'Upload your creative assets (logo, images, music, script) to get started',
  PROCESSING: 'Processing your content...',
  ANALYSIS_IN_PROGRESS: 'Analyzing audio and generating timeline...',
  ENHANCEMENT_IN_PROGRESS: 'Enhancing your script with AI...',
  RENDERING_IN_PROGRESS: 'Rendering your video (this may take a few minutes)...',
  SUCCESS: 'Your video has been created successfully!',
  ERROR_RETRY: 'An error occurred. Please try again.',
} as const;

/**
 * Validation prompts
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_FILE_TYPE: 'Invalid file type. Please check the requirements.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed size',
  NAME_TOO_SHORT: 'Name must be at least 3 characters',
  NAME_TOO_LONG: 'Name must not exceed 100 characters',
  SCRIPT_TOO_SHORT: 'Script must be at least 10 characters',
  SCRIPT_TOO_LONG: 'Script must not exceed 5000 characters',
} as const;

/**
 * API prompt templates for requests
 */
export const API_PROMPTS = {
  BEAT_ANALYSIS_USER_PROMPT: (bpm: number, duration: number) =>
    `Analyze this music and provide beat detection. 
      The music is ${bpm} BPM and ${duration} seconds long.
      Provide beat frame positions at 30fps.`,

  SCRIPT_ENHANCEMENT_USER_PROMPT: (originalScript: string, stylePrompt: string) =>
    `Please enhance this script for a commercial video: "${originalScript}"
      
      Style preferences: ${stylePrompt}
      
      Make it more engaging and identify key animated words.`,

  TIMELINE_GENERATION_USER_PROMPT: (
    script: string,
    beats: number[],
    duration: number,
    stylePrompt: string
  ) =>
    `Generate an animation timeline for this:
      
      Script: "${script}"
      Music beats (frames): ${beats.join(', ')}
      Video duration: ${duration} seconds
      Style: ${stylePrompt}
      
      Create a detailed scene-by-scene breakdown with exact frame timings.`,
} as const;

/**
 * Error message templates
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',
  INVALID_REQUEST: 'Invalid request. Please check your input.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  FILE_UPLOAD_ERROR: 'Failed to upload file. Please try again.',
  RENDERING_ERROR: 'Failed to render video. Please try again.',
  ANALYSIS_ERROR: 'Failed to analyze content. Please try again.',
} as const;
