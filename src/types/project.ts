/**
 * Project Types
 */

/**
 * Project status
 */
export type ProjectStatus = 'draft' | 'processing' | 'ready' | 'completed' | 'error';

/**
 * Project metadata
 */
export interface ProjectMetadata {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
  tags?: string[];
}

/**
 * Project data
 */
export interface Project extends ProjectMetadata {
  script: string;
  stylePrompt: string;
  assets?: {
    logo?: string;
    music: string;
    images?: string[];
    videos?: string[];
  };
  beatAnalysis?: {
    tempo: number;
    beats: number[];
  };
  timeline?: any; // AnimationTimeline type
  videoUrl?: string;
  errorMessage?: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  script: string;
  stylePrompt: string;
  music: File;
  logo?: File;
  images?: File[];
  videos?: File[];
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  script?: string;
  stylePrompt?: string;
  timeline?: any;
}
