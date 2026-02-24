/**
 * API Client Utilities
 * 
 * HTTP client with built-in error handling, retries, and caching
 */

import { logger } from './logger';
import { NetworkError, TimeoutError, AppError } from './errors';
import { RETRY_CONFIG, HTTP_TIMEOUTS, HTTP_STATUS } from '@/src/constants/api';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheDuration?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

class ApiClient {
  private cache = new Map<string, { data: any; expiry: number }>();

  /**
   * Make HTTP request with automatic retries and error handling
   */
  async request<T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = HTTP_TIMEOUTS.STANDARD,
      retries = RETRY_CONFIG.MAX_ATTEMPTS,
      cache = false,
      cacheDuration = 300000, // 5 minutes default
    } = config;

    // Check cache
    if (method === 'GET' && cache) {
      const cached = this.getFromCache(url);
      if (cached) {
        logger.debug('Cache hit', { url });
        return {
          success: true,
          statusCode: HTTP_STATUS.OK,
          data: cached,
        };
      }
    }

    // Prepare request
    const defaults = {
      'Content-Type': 'application/json',
    };

    const fetchOptions: RequestInit = {
      method,
      headers: { ...defaults, ...headers },
      signal: AbortSignal.timeout(timeout),
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // Execute request with retries
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new AppError(
            data.error?.code || 'HTTP_ERROR',
            response.status,
            data.error?.message || `HTTP ${response.status}`,
            { url, attempt }
          );
        }

        // Cache successful GET requests
        if (method === 'GET' && cache) {
          this.setCache(url, data, cacheDuration);
        }

        logger.debug('API request successful', { url, method, attempt });

        return {
          success: true,
          statusCode: response.status,
          data,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt < retries) {
          const delay = this.calculateBackoffDelay(attempt);
          logger.warn(`API request failed, retrying in ${delay}ms`, {
            url,
            attempt,
            error: lastError.message,
          });
          await this.sleep(delay);
        }
      }
    }

    // All retries exhausted
    logger.error('API request failed after all retries', lastError, {
      url,
      method,
      attempts: retries,
    });

    return {
      success: false,
      statusCode: 500,
      error: {
        code: lastError instanceof AppError ? lastError.code : 'UNKNOWN_ERROR',
        message: lastError?.message || 'Request failed',
      },
    };
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PATCH', body });
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateBackoffDelay(attempt: number): number {
    const delay = Math.min(
      RETRY_CONFIG.INITIAL_DELAY_MS *
        Math.pow(RETRY_CONFIG.EXPONENTIAL_BASE, attempt - 1),
      RETRY_CONFIG.MAX_DELAY_MS
    );
    // Add jitter
    return delay + Math.random() * 1000;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get from cache
   */
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache
   */
  private setCache(key: string, data: any, duration: number): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + duration,
    });
  }

  /**
   * Clear cache
   */
  clearCache(pattern?: string): void {
    if (pattern) {
      const regex = new RegExp(pattern);
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}

export const apiClient = new ApiClient();
