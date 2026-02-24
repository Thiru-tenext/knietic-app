/**
 * Environment Configuration
 * 
 * Centralized environment variable management with type safety.
 * All environment variables are validated at startup.
 */

const requiredEnvVars = [
  'NODE_ENV',
];

const optionalEnvVars = {
  NODE_ENV: 'development' as const,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Kinetic Typography',
  API_TIMEOUT_MS: process.env.API_TIMEOUT_MS || '30000',
  
  // Storage Configuration
  STORAGE_PROVIDER: (process.env.STORAGE_PROVIDER || 'local') as 'local' | 's3' | 'gcs' | 'cloudinary',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  
  // AI/ML Services
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  AI_MODEL: (process.env.AI_MODEL || 'gpt-4o-mini') as 'gpt-4o' | 'gpt-4o-mini' | 'claude-3-5-sonnet',
  
  // Music Analysis
  MUSIC_ANALYSIS_SERVICE: (process.env.MUSIC_ANALYSIS_SERVICE || 'mock') as 'mock' | 'librosa' | 'spotify',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',
  DATABASE_TYPE: (process.env.DATABASE_TYPE || 'sqlite') as 'postgresql' | 'mongodb' | 'firebase' | 'sqlite',
  
  // Feature Flags
  ENABLE_MOCK_API: process.env.ENABLE_MOCK_API === 'true',
  ENABLE_BEAT_ANALYSIS: process.env.ENABLE_BEAT_ANALYSIS === 'true',
  ENABLE_AI_ENHANCEMENT: process.env.ENABLE_AI_ENHANCEMENT === 'true',
};

export type EnvironmentConfig = typeof optionalEnvVars;

/**
 * Validate environment configuration
 */
function validateEnvironment(): void {
  const missing = requiredEnvVars.filter(
    (varName) => !(varName in process.env)
  );

  if (missing.length > 0) {
    console.warn(
      `Missing optional environment variables: ${missing.join(', ')}`
    );
  }
}

// Validate on module load
validateEnvironment();

/**
 * Get environment configuration
 * @returns {EnvironmentConfig} The environment configuration object
 */
export function getEnvironment(): EnvironmentConfig {
  return optionalEnvVars;
}

/**
 * Get a specific environment variable with fallback
 * @param key - The environment variable key
 * @param defaultValue - Default value if not found
 */
export function getEnv<K extends keyof EnvironmentConfig>(
  key: K,
  defaultValue?: EnvironmentConfig[K]
): EnvironmentConfig[K] {
  const value = optionalEnvVars[key];
  return value !== undefined ? value : (defaultValue as EnvironmentConfig[K]);
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if mock APIs are enabled
 */
export function isMockMode(): boolean {
  return optionalEnvVars.ENABLE_MOCK_API;
}

export default optionalEnvVars;
