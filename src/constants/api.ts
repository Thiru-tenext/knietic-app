/**
 * API Configuration Constants
 * 
 * Defines all API-related settings and endpoints
 */

/**
 * API route definitions
 */
export const API_ROUTES = {
  // Upload
  UPLOAD: '/api/upload',
  
  // Analysis
  BEAT_ANALYSIS: '/api/beat-analysis',
  SCRIPT_ENHANCEMENT: '/api/script-enhancement',
  
  // Generation
  GENERATE_TIMELINE: '/api/generate-timeline',
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECT_DETAIL: (id: string) => `/api/projects/${id}`,
  
  // Rendering
  RENDER: '/api/render',
  
  // Health checks
  HEALTH: '/api/health',
} as const;

/**
 * HTTP timeouts (in milliseconds)
 */
export const HTTP_TIMEOUTS = {
  SHORT: 5000,        // 5 seconds - quick operations
  STANDARD: 30000,    // 30 seconds - normal API calls
  LONG: 120000,       // 2 minutes - file uploads
  VERY_LONG: 300000,  // 5 minutes - video rendering
} as const;

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Request headers
 */
export const REQUEST_HEADERS = {
  CONTENT_TYPE: 'application/json',
  AUTHORIZATION: 'Authorization',
  X_REQUEST_ID: 'X-Request-ID',
  X_API_KEY: 'X-API-Key',
  USER_AGENT: 'User-Agent',
} as const;

/**
 * File upload configuration
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
  MAX_PROJECT_SIZE: 2 * 1024 * 1024 * 1024, // 2GB
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
  ALLOWED_VIDEO_FORMATS: ['mp4', 'mov', 'webm', 'avi'],
  ALLOWED_AUDIO_FORMATS: ['mp3', 'wav', 'aac', 'm4a', 'ogg'],
  CHUNK_SIZE: 5 * 1024 * 1024, // 5MB chunks
} as const;

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  INITIAL_DELAY_MS: 1000,
  MAX_DELAY_MS: 30000,
  EXPONENTIAL_BASE: 2,
} as const;

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  BEAT_ANALYSIS_TTL: 3600000, // 1 hour
  SCRIPT_ENHANCEMENT_TTL: 3600000, // 1 hour
  TIMELINE_GENERATION_TTL: 1800000, // 30 minutes
  PROJECT_DATA_TTL: 300000, // 5 minutes
} as const;

/**
 * Batch processing configuration
 */
export const BATCH_CONFIG = {
  MAX_BATCH_SIZE: 10,
  BATCH_TIMEOUT_MS: 300000, // 5 minutes
} as const;

/**
 * Rate limiting
 */
export const RATE_LIMITING = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 1000,
  BURST_LIMIT: 10,
} as const;
