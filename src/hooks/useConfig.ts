/**
 * Configuration Hook
 * 
 * React hook for accessing application configuration
 */

'use client';

import { getConfig, getEnv } from '@/src/config';

/**
 * Hook to get application configuration
 */
export function useConfig() {
  return getConfig();
}

/**
 * Hook to get specific environment variable
 */
export function useEnv(key: string, defaultValue?: any) {
  try {
    return getEnv(key as any, defaultValue);
  } catch {
    return defaultValue;
  }
}

/**
 * Hook to check if feature is enabled
 */
export function useFeature(featureName: keyof ReturnType<typeof getConfig>['features']) {
  const config = getConfig();
  return config.features[featureName];
}
