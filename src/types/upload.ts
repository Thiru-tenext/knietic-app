/**
 * Upload and Form Types
 */

/**
 * Uploaded assets
 */
export interface UploadedAssets {
  logo?: {
    url: string;
    format: 'png' | 'svg';
    size: number;
  };
  productImages?: {
    url: string;
    format: string;
    size: number;
  }[];
  productVideos?: {
    url: string;
    duration: number;
    size: number;
  }[];
  backgroundAssets?: {
    url: string;
    type: 'image' | 'video';
    size: number;
  }[];
  musicFile?: {
    url: string;
    format: 'mp3' | 'wav' | 'aac' | 'm4a';
    duration: number;
    size: number;
  };
}

/**
 * Upload form data
 */
export interface UploadFormData {
  projectName: string;
  script: string;
  stylePrompt: string;
  files: {
    logo?: File;
    music?: File;
    productImages?: File[];
    productVideos?: File[];
  };
}

/**
 * Form validation error
 */
export interface FormValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Form state
 */
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: FormValidationError[];
  touched: Record<string, boolean>;
}
