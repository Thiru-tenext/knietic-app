/**
 * API Request Hook
 * 
 * React hook for making API requests with built-in error handling
 */

'use client';

import { useState, useCallback } from 'react';
import { apiClient } from '@/src/lib/api-client';
import { logger } from '@/src/lib/logger';

export interface UseApiOptions {
  autoFetch?: boolean;
  cache?: boolean;
  cacheDuration?: number;
  timeout?: number;
}

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  statusCode: number | null;
}

/**
 * Hook for making API requests
 */
export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    statusCode: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await apiClient.get<T>(url, {
        cache: options.cache,
        cacheDuration: options.cacheDuration,
        timeout: options.timeout,
      });

      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          statusCode: response.statusCode,
        });
      } else {
        const error = new Error(response.error?.message || 'Request failed');
        setState({
          data: null,
          loading: false,
          error,
          statusCode: response.statusCode,
        });
        logger.error('API request failed', error);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({
        data: null,
        loading: false,
        error: err,
        statusCode: null,
      });
      logger.error('API request error', err);
    }
  }, [url, options]);

  return {
    ...state,
    refetch: fetch,
  };
}

/**
 * Hook for POST requests
 */
export function usePost<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    statusCode: null,
  });

  const post = useCallback(
    async (body: any) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiClient.post<T>(url, body, {
          timeout: options.timeout,
        });

        if (response.success) {
          setState({
            data: response.data || null,
            loading: false,
            error: null,
            statusCode: response.statusCode,
          });
        } else {
          const error = new Error(response.error?.message || 'Request failed');
          setState({
            data: null,
            loading: false,
            error,
            statusCode: response.statusCode,
          });
          logger.error('POST request failed', error);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({
          data: null,
          loading: false,
          error: err,
          statusCode: null,
        });
        logger.error('POST request error', err);
      }
    },
    [url, options]
  );

  return {
    ...state,
    post,
  };
}
