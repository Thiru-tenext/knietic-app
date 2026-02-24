/**
 * Logger Utility
 * 
 * Centralized logging with severity levels and environment-specific behavior
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] ${message}${contextStr}`;
  }

  /**
   * Log debug message (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext): void {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, context));
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | string, context?: LogContext): void {
    const errorDetails = error instanceof Error ? error.stack : error;
    console.error(this.formatMessage(LogLevel.ERROR, message, { ...context, error: errorDetails }));
  }

  /**
   * Log performance metrics
   */
  performance(operation: string, durationMs: number, context?: LogContext): void {
    this.info(`Performance: ${operation} took ${durationMs}ms`, context);
  }
}

export const logger = new Logger();
