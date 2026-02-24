/**
 * API Middleware
 * 
 * Common middleware for API route handlers
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/src/lib/logger';
import { AppError, handleError } from '@/src/lib/errors';
import { HTTP_STATUS } from '@/src/constants/api';

/**
 * Request ID middleware generator
 */
export function withRequestId(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    const requestId = req.headers.get('x-request-id') || `req_${Date.now()}_${Math.random()}`;
    req.headers.set('x-request-id', requestId);

    logger.debug('Request started', {
      method: req.method,
      url: req.url,
      requestId,
    });

    return handler(req, context);
  };
}

/**
 * Error handling middleware
 */
export function withErrorHandling(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any) => {
    try {
      return await handler(req, context);
    } catch (error) {
      logger.error('Request error', error instanceof Error ? error : new Error(String(error)), {
        method: req.method,
        url: req.url,
      });

      const errorResponse = handleError(error);

      return NextResponse.json(
        {
          success: false,
          error: {
            code: errorResponse.code,
            message: errorResponse.message,
          },
        },
        { status: errorResponse.statusCode }
      );
    }
  };
}

/**
 * JSON body parsing middleware
 */
export async function parseJsonBody(req: NextRequest) {
  try {
    return await req.json();
  } catch (error) {
    throw new AppError(
      'INVALID_JSON',
      HTTP_STATUS.BAD_REQUEST,
      'Invalid JSON in request body'
    );
  }
}

/**
 * Method validation middleware
 */
export function validateMethod(allowedMethods: string[]) {
  return (handler: (req: NextRequest, context: any) => Promise<NextResponse>) => {
    return async (req: NextRequest, context: any) => {
      if (!allowedMethods.includes(req.method)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'METHOD_NOT_ALLOWED',
              message: `Method ${req.method} not allowed`,
            },
          },
          { status: HTTP_STATUS.BAD_REQUEST }
        );
      }

      return handler(req, context);
    };
  };
}

/**
 * CORS middleware
 */
export function withCors(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: HTTP_STATUS.OK,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const response = await handler(req, context);

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  };
}

/**
 * Rate limiting middleware (basic implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(
  maxRequests: number = 60,
  windowMs: number = 60000
) {
  return (handler: (req: NextRequest, context: any) => Promise<NextResponse>) => {
    return async (req: NextRequest, context: any) => {
      const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();

      const record = requestCounts.get(clientIp);

      if (record && record.resetTime > now) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: 'RATE_LIMIT_EXCEEDED',
                message: 'Too many requests',
              },
            },
            { status: HTTP_STATUS.RATE_LIMITED }
          );
        }
        record.count++;
      } else {
        requestCounts.set(clientIp, {
          count: 1,
          resetTime: now + windowMs,
        });
      }

      return handler(req, context);
    };
  };
}

/**
 * Compose multiple middleware
 */
export function compose(
  ...middleware: Array<(handler: any) => any>
) {
  return (handler: any) => {
    return middleware.reduceRight((acc, fn) => fn(acc), handler);
  };
}
