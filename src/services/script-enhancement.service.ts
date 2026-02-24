/**
 * Script Enhancement Service
 * 
 * Handles AI-powered script enhancement and analysis
 */

import { ScriptEnhancementResult } from '@/src/types';
import { logger, ValidationError } from '@/src/lib';
import { getConfig } from '@/src/config';
import { validateScript } from '@/src/lib/validation';
import { SYSTEM_PROMPTS, API_PROMPTS } from '@/src/constants/prompts';

export interface ScriptEnhancementInput {
  originalScript: string;
  stylePrompt: string;
}

class ScriptEnhancementService {
  /**
   * Enhance script with AI
   */
  async enhanceScript(input: ScriptEnhancementInput): Promise<ScriptEnhancementResult> {
    const { originalScript, stylePrompt } = input;

    // Validate input
    const scriptValidation = validateScript(originalScript);
    if (!scriptValidation.valid) {
      throw new ValidationError(scriptValidation.error || 'Invalid script');
    }

    logger.debug('Starting script enhancement', { scriptLength: originalScript.length });

    const config = getConfig();

    try {
      if (config.features.mockApi) {
        return this.getMockEnhancedScript(originalScript, stylePrompt);
      }

      if (config.features.aiEnhancement) {
        return await this.enhanceWithAI(originalScript, stylePrompt);
      }

      return this.getMockEnhancedScript(originalScript, stylePrompt);
    } catch (error) {
      logger.error('Script enhancement failed', error as Error);
      throw error;
    }
  }

  /**
   * Get mock enhanced script for development
   */
  private getMockEnhancedScript(
    originalScript: string,
    _stylePrompt: string
  ): ScriptEnhancementResult {
    // Simple mock enhancement (capitalize and add emphasis)
    const words = originalScript.split(/\s+/);
    const emphasized = words.filter((word) => word.length > 5).slice(0, 5);

    return {
      originalScript,
      enhancedScript: `✨ ${originalScript} ✨`,
      emphasizedWords: emphasized,
    };
  }

  /**
   * Enhance with AI
   */
  private async enhanceWithAI(
    originalScript: string,
    stylePrompt: string
  ): Promise<ScriptEnhancementResult> {
    const config = getConfig();
    const apiKey = config.ai.apiKey;
    const provider = config.ai.provider;

    if (!apiKey) {
      throw new ValidationError('AI service enabled but API key is missing');
    }

    logger.info(`Calling ${provider} for script enhancement`);

    let enhancedContent: string;

    if (provider === 'gemini') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.ai.model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional scriptwriter and motion graphics director. Rewrite the user's script to be more cinematic and impactful. Also, identify 3-5 key words or phrases that should be emphasized in the animation.\n\nScript: ${originalScript}\nStyle Direction: ${stylePrompt}\n\nRespond ONLY with a JSON object: { "enhancedScript": "the rewritten script", "emphasizedWords": ["word1", "word2", ...] }`
            }]
          }],
          generationConfig: {
            response_mime_type: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
      }

      const aiResponse = await response.json();
      enhancedContent = aiResponse.candidates[0].content.parts[0].text;
    } else {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: config.ai.model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional scriptwriter and motion graphics director. Rewrite the user\'s script to be more cinematic and impactful. Also, identify 3-5 key words or phrases that should be emphasized in the animation.'
            },
            {
              role: 'user',
              content: `Script: ${originalScript}\nStyle Direction: ${stylePrompt}\n\nRespond ONLY with a JSON object: { "enhancedScript": "the rewritten script", "emphasizedWords": ["word1", "word2", ...] }`
            }
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const aiResponse = await response.json();
      enhancedContent = aiResponse.choices[0].message.content;
    }

    const data = JSON.parse(enhancedContent);

    return {
      originalScript,
      enhancedScript: data.enhancedScript,
      emphasizedWords: data.emphasizedWords,
    };
  }

  /**
   * Extract emphasis points from script
   */
  extractEmphasisPoints(script: string): string[] {
    // Split into sentences
    const sentences = script.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    // Get last word from each sentence (often emphatic)
    return sentences
      .map((sentence) => {
        const words = sentence.trim().split(/\s+/);
        return words[words.length - 1];
      })
      .filter((word) => word && word.length > 3);
  }

  /**
   * Analyze script tone
   */
  analyzeTone(
    script: string
  ): {
    tone: string;
    energy: 'low' | 'medium' | 'high';
    sentiment: 'positive' | 'neutral' | 'negative';
  } {
    const exclamationCount = (script.match(/!/g) || []).length;
    const questionCount = (script.match(/\?/g) || []).length;
    const hasEmojis = /[\u{1F300}-\u{1F9FF}]/u.test(script);

    let energy: 'low' | 'medium' | 'high' = 'medium';
    if (exclamationCount > 2 || hasEmojis) energy = 'high';
    if (questionCount > 2) energy = 'low';

    return {
      tone: hasEmojis ? 'playful' : exclamationCount > 1 ? 'energetic' : 'calm',
      energy,
      sentiment: 'positive', // Simplified
    };
  }
}

export const scriptEnhancementService = new ScriptEnhancementService();
