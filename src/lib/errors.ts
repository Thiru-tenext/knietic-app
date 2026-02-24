/**
 * Error Handling Utilities
 * 
 * Custom error classes and error handling utilities
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public context?: Record<string, any>,
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    if (originalError) {
      this.stack = originalError.stack;
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string[]>) {
    super('VALIDATION_ERROR', 400, message, { fields });
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super('AUTHENTICATION_ERROR', 401, message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super('AUTHORIZATION_ERROR', 403, message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super('NOT_FOUND', 404, message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', 409, message);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super('RATE_LIMIT_ERROR', 429, message);
    this.name = 'RateLimitError';
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'Request timeout') {
    super('TIMEOUT_ERROR', 504, message);
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error') {
    super('NETWORK_ERROR', 503, message);
    this.name = 'NetworkError';
  }
}

export class ServiceError extends AppError {
  constructor(service: string, message: string) {
    super('SERVICE_ERROR', 500, `${service} service error: ${message}`);
    this.name = 'ServiceError';
  }
}

/**
 * Create an error response
 */
export function createErrorResponse(error: Error | AppError) {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      context: error.context,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred',
    statusCode: 500,
  };
}

/**
 * Handle error with logging and formatting
 */
export function handleError(error: unknown, context?: Record<string, any>) {
  const appError = error instanceof AppError ? error : new AppError(
    'UNKNOWN_ERROR',
    500,
    error instanceof Error ? error.message : 'An unexpected error occurred',
    context,
    error instanceof Error ? error : undefined
  );

  return createErrorResponse(appError);
}
