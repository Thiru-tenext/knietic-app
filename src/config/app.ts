/**
 * Application Configuration
 * 
 * Central configuration object that combines all config sources
 */

import { getEnvironment, EnvironmentConfig } from './environment';

export interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  storage: {
    provider: string;
    bucket?: string;
    region?: string;
  };
  ai: {
    provider: string;
    model: string;
    apiKey?: string;
  };
  features: {
    mockApi: boolean;
    beatAnalysis: boolean;
    aiEnhancement: boolean;
  };
}

/**
 * Build application configuration from environment
 */
function buildAppConfig(env: EnvironmentConfig): AppConfig {
  return {
    app: {
      name: env.NEXT_PUBLIC_APP_NAME,
      version: '1.0.0',
      environment: env.NODE_ENV,
    },
    api: {
      baseUrl: env.NEXT_PUBLIC_API_URL,
      timeout: parseInt(env.API_TIMEOUT_MS, 10),
    },
    storage: {
      provider: env.STORAGE_PROVIDER,
      bucket: env.AWS_BUCKET_NAME,
      region: env.AWS_REGION,
    },
    ai: {
      provider: env.AI_MODEL.includes('gpt') ? 'openai' : env.AI_MODEL.includes('gemini') ? 'gemini' : 'anthropic',
      model: env.AI_MODEL,
      apiKey: env.GEMINI_API_KEY || env.OPENAI_API_KEY || env.ANTHROPIC_API_KEY,
    },
    features: {
      mockApi: env.ENABLE_MOCK_API,
      beatAnalysis: env.ENABLE_BEAT_ANALYSIS,
      aiEnhancement: env.ENABLE_AI_ENHANCEMENT,
    },
  };
}

let appConfig: AppConfig | null = null;

/**
 * Get application configuration (singleton)
 */
export function getConfig(): AppConfig {
  if (!appConfig) {
    const env = getEnvironment();
    appConfig = buildAppConfig(env);
  }
  return appConfig;
}

/**
 * Get a specific config section
 */
export function getConfigSection<K extends keyof AppConfig>(
  section: K
): AppConfig[K] {
  return getConfig()[section];
}

/**
 * Validate critical configuration on startup
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const config = getConfig();
  const errors: string[] = [];

  // Validate required settings
  if (!config.app.name) {
    errors.push('Application name is not configured');
  }

  if (!config.api.baseUrl) {
    errors.push('API base URL is not configured');
  }

  if (
    config.features.aiEnhancement &&
    !config.ai.apiKey
  ) {
    errors.push('AI service is enabled but API key is not configured');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default getConfig;
