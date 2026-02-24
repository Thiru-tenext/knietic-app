/**
 * UI Configuration Constants
 * 
 * Defines all UI-related settings and styles
 */

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

/**
 * Z-index hierarchy
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  BASE: 10,
  DROPDOWN: 100,
  STICKY: 200,
  FIXED: 300,
  MODAL_BACKDROP: 400,
  MODAL: 500,
  TOOLTIP: 600,
  NOTIFICATION: 700,
} as const;

/**
 * Color palette
 */
export const COLORS = {
  // Primary
  PRIMARY: '#10b981',
  PRIMARY_LIGHT: '#6ee7b7',
  PRIMARY_DARK: '#047857',
  
  // Secondary
  SECONDARY: '#f59e0b',
  SECONDARY_LIGHT: '#fcd34d',
  SECONDARY_DARK: '#d97706',
  
  // Neutral
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#374151',
  GRAY_800: '#1f2937',
  GRAY_900: '#111827',
  
  // Status
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  
  // Mirage theme
  MIRAGE_LIME: '#84ff00',
  MIRAGE_DARK: '#0a0e27',
} as const;

/**
 * Form field configurations
 */
export const FORM_CONFIG = {
  MIN_PROJECT_NAME_LENGTH: 3,
  MAX_PROJECT_NAME_LENGTH: 100,
  MIN_SCRIPT_LENGTH: 10,
  MAX_SCRIPT_LENGTH: 5000,
  MIN_STYLE_PROMPT_LENGTH: 5,
  MAX_STYLE_PROMPT_LENGTH: 1000,
} as const;

/**
 * Notification settings
 */
export const NOTIFICATION_CONFIG = {
  AUTO_CLOSE_DURATION: 5000, // 5 seconds
  MAX_NOTIFICATIONS: 5,
  POSITION: 'top-right' as const,
} as const;

/**
 * Modal configurations
 */
export const MODAL_CONFIG = {
  ANIMATION_DURATION: ANIMATION_DURATION.NORMAL,
  BACKDROP_COLOR: 'rgba(0, 0, 0, 0.5)',
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/**
 * Table configurations
 */
export const TABLE_CONFIG = {
  ROWS_PER_PAGE: 10,
  COMPACT_ROWS_PER_PAGE: 5,
} as const;
