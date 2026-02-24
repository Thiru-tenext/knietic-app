/**
 * AI Service
 * 
 * Abstracted AI/LLM operations supporting multiple providers
 */

import { getEnv } from '@/src/config/environment';
import { logger } from '@/src/lib/logger';
import { ServiceError } from '@/src/lib/errors';
import { SYSTEM_PROMPTS } from '@/src/constants/prompts';

export interface AIProvider {
  enhance(script: string, stylePrompt: string): Promise<{ enhancedScript: string; emphasizedWords: string[] }>;
  generateTimeline(prompt: string): Promise<any>;
  analyzeAudio(audioPath: string): Promise<any>;
}

/**
 * Mock AI provider (for development)
 */
class MockAIProvider implements AIProvider {
  async enhance(script: string, stylePrompt: string) {
    logger.debug('Mock AI: enhancing script');
    await this.delay(1000); // Simulate processing

    return {
      enhancedScript: `${script} - Enhanced with ${stylePrompt}`,
      emphasizedWords: script.split(' ').slice(0, 5),
    };
  }

  async generateTimeline(prompt: string) {
    logger.debug('Mock AI: generating timeline');
    await this.delay(2000);

    return {
      scenes: [
        {
          id: 'scene_1',
          startFrame: 0,
          duration: 120,
          content: 'Title scene',
        },
      ],
    };
  }

  async analyzeAudio(audioPath: string) {
    logger.debug('Mock AI: analyzing audio');
    await this.delay(1500);

    return {
      tempo: 128,
      beats: [15, 30, 45, 60, 75, 90, 105, 120],
      energy: 'high',
    };
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * OpenAI provider
 */
class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new ServiceError('OpenAI', 'API key not configured');
    }
    this.apiKey = apiKey;
  }

  async enhance(script: string, stylePrompt: string) {
    // TODO: Implement OpenAI API call
    throw new ServiceError('OpenAI', 'Not yet implemented');
  }

  async generateTimeline(prompt: string) {
    // TODO: Implement OpenAI API call
    throw new ServiceError('OpenAI', 'Not yet implemented');
  }

  async analyzeAudio(audioPath: string) {
    // TODO: Implement OpenAI Whisper API call
    throw new ServiceError('OpenAI', 'Not yet implemented');
  }
}

/**
 * Anthropic Claude provider
 */
class AnthropicProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new ServiceError('Anthropic', 'API key not configured');
    }
    this.apiKey = apiKey;
  }

  async enhance(script: string, stylePrompt: string) {
    // TODO: Implement Anthropic API call
    throw new ServiceError('Anthropic', 'Not yet implemented');
  }

  async generateTimeline(prompt: string) {
    // TODO: Implement Anthropic API call
    throw new ServiceError('Anthropic', 'Not yet implemented');
  }

  async analyzeAudio(audioPath: string) {
    // TODO: Implement audio analysis
    throw new ServiceError('Anthropic', 'Not yet implemented');
  }
}

/**
 * AI service factory
 */
function createAIProvider(): AIProvider {
  const aiModel = getEnv('AI_MODEL');
  const mockMode = getEnv('ENABLE_MOCK_API');

  if (mockMode) {
    logger.info('AI service initialized in mock mode');
    return new MockAIProvider();
  }

  if (aiModel.includes('gpt')) {
    const apiKey = getEnv('OPENAI_API_KEY');
    logger.info('AI service initialized with OpenAI');
    return new OpenAIProvider(apiKey);
  }

  if (aiModel.includes('claude')) {
    const apiKey = getEnv('ANTHROPIC_API_KEY');
    logger.info('AI service initialized with Anthropic');
    return new AnthropicProvider(apiKey);
  }

  logger.warn(`Unknown AI model: ${aiModel}, falling back to mock`);
  return new MockAIProvider();
}

class AIService {
  private provider: AIProvider;

  constructor() {
    this.provider = createAIProvider();
  }

  async enhanceScript(script: string, stylePrompt: string) {
    try {
      logger.info('Enhancing script with AI');
      const result = await this.provider.enhance(script, stylePrompt);
      logger.info('Script enhanced successfully');
      return result;
    } catch (error) {
      logger.error('Failed to enhance script', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  async generateTimeline(prompt: string) {
    try {
      logger.info('Generating timeline with AI');
      const result = await this.provider.generateTimeline(prompt);
      logger.info('Timeline generated successfully');
      return result;
    } catch (error) {
      logger.error('Failed to generate timeline', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  async analyzeAudio(audioPath: string) {
    try {
      logger.info('Analyzing audio with AI');
      const result = await this.provider.analyzeAudio(audioPath);
      logger.info('Audio analyzed successfully');
      return result;
    } catch (error) {
      logger.error('Failed to analyze audio', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  getSystemPrompt(type: 'script-enhancement' | 'timeline-generation'): string {
    const prompts: Record<string, string> = {
      'script-enhancement': SYSTEM_PROMPTS.SCRIPT_ENHANCEMENT,
      'timeline-generation': SYSTEM_PROMPTS.TIMELINE_GENERATION,
    };
    return prompts[type] || '';
  }
}

export const aiService = new AIService();
