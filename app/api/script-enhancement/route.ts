import { NextRequest, NextResponse } from 'next/server';
import { ScriptEnhancementResult } from '@/app/types';

/**
 * POST /api/script-enhancement
 * Enhances raw script to be premium, minimal, bold, and emotionally powerful
 * similar to high-end technology commercials
 * 
 * Expected input: { originalScript: string, stylePrompt: string }
 * 
 * In production, this would:
 * 1. Call OpenAI API (gpt-4o or similar) with a precise system prompt
 * 2. Send the original script and style prompt
 * 3. Return enhanced script and identified emphasized words
 */
export async function POST(req: NextRequest) {
  try {
    const { originalScript, stylePrompt } = await req.json();

    if (!originalScript) {
      return NextResponse.json(
        { error: 'originalScript is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual AI API call
    // Construct system prompt for AI as described in the architecture

    const systemPrompt = `You are a professional screenwriter for high-end technology commercials. 
Your task is to rewrite scripts to be:
- Premium and minimal (Apple/Samsung style)
- Emotionally powerful and cinematic
- With bold impact words suitable for kinetic typography animation
- Concise and memorable
- With clear emphasis words that should be animated on beat drops

If a style prompt is provided, honor its creative direction.

Return a JSON object with:
- enhancedScript: The rewritten script
- emphasizedWords: Array of words that should be animated on beats (3-5 words max)`;

    // Mock response - in production, call OpenAI API
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'YOU_NEED_TO_ADD_API_KEY_HERE'}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4o',
    //     messages: [
    //       { role: 'system', content: systemPrompt },
    //       { role: 'user', content: `Script:\n${originalScript}\n\nStyle Prompt: ${stylePrompt || 'Default premium tech style'}` }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 500,
    //   })
    // });

    const mockEnhancedScript: ScriptEnhancementResult = {
      originalScript,
      enhancedScript: `Stop guessing. Start winning.

Let AI do the heavy lifting.

Create videos that actually convert.

In seconds, not hours.

Kinetic Typography. Automated Excellence.`,
      emphasizedWords: ['Stop', 'AI', 'convert', 'Kinetic Typography'],
    };

    return NextResponse.json({
      success: true,
      data: mockEnhancedScript,
      message: 'Script enhancement completed successfully',
      note: 'This is mock data. YOU_NEED_TO_ADD_API_KEY_HERE for actual OpenAI API integration',
      envRequired: {
        service: 'OpenAI GPT-4/GPT-4o',
        envVar: 'OPENAI_API_KEY',
      },
    });
  } catch (error) {
    console.error('Script enhancement error:', error);
    return NextResponse.json(
      { error: 'Failed to enhance script', details: String(error) },
      { status: 500 }
    );
  }
}
