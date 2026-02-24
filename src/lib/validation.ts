/**
 * Validation Utilities
 * 
 * Input validation and sanitization functions
 */

import { ValidationError } from './errors';

/**
 * Validate file extension
 */
export function validateFileExtension(
  filename: string,
  allowedExtensions: string[]
): boolean {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  return allowedExtensions.includes(extension);
}

/**
 * Validate file size
 */
export function validateFileSize(fileSize: number, maxSize: number): boolean {
  return fileSize <= maxSize;
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate string length
 */
export function validateStringLength(
  value: string,
  minLength: number,
  maxLength: number
): boolean {
  return value.length >= minLength && value.length <= maxLength;
}

/**
 * Validate project name
 */
export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name is required' };
  }

  if (name.length < 3) {
    return { valid: false, error: 'Project name must be at least 3 characters' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Project name must not exceed 100 characters' };
  }

  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    return { valid: false, error: 'Project name contains invalid characters' };
  }

  return { valid: true };
}

/**
 * Validate script
 */
export function validateScript(script: string): { valid: boolean; error?: string } {
  if (!script || script.trim().length === 0) {
    return { valid: false, error: 'Script is required' };
  }

  if (script.length < 10) {
    return { valid: false, error: 'Script must be at least 10 characters' };
  }

  if (script.length > 5000) {
    return { valid: false, error: 'Script must not exceed 5000 characters' };
  }

  return { valid: true };
}

/**
 * Validate style prompt
 */
export function validateStylePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Style prompt is required' };
  }

  if (prompt.length < 5) {
    return { valid: false, error: 'Style prompt must be at least 5 characters' };
  }

  if (prompt.length > 1000) {
    return { valid: false, error: 'Style prompt must not exceed 1000 characters' };
  }

  return { valid: true };
}

/**
 * Batch validate fields
 */
export function validateFields(
  data: Record<string, any>,
  rules: Record<string, (value: any) => { valid: boolean; error?: string }>
): { valid: boolean; errors?: Record<string, string[]> } {
  const errors: Record<string, string[]> = {};

  for (const [field, rule] of Object.entries(rules)) {
    const result = rule(data[field]);
    if (!result.valid && result.error) {
      errors[field] = errors[field] || [];
      errors[field].push(result.error);
    }
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().slice(0, 10000); // Prevent XSS, limit size
}

/**
 * Sanitize object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]);
    }
  }

  return sanitized;
}

/**
 * Validate resolution string
 */
export function validateResolution(resolution: string): boolean {
  const resolutionPattern = /^\d+x\d+$/;
  return resolutionPattern.test(resolution);
}

/**
 * Validate FPS value
 */
export function validateFps(fps: number): boolean {
  const validFps = [24, 30, 60];
  return validFps.includes(fps);
}
