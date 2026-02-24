import { NextRequest, NextResponse } from 'next/server';
import { AnimationTimeline, BeatAnalysisResult, UploadedAssets } from '@/app/types';

/**
 * POST /api/generate-timeline
 * Master AI system that generates structured animation timeline JSON
 * Acts as a professional motion graphics director
 * 
 * Expected input:
 * {
 *   enhancedScript: string,
 *   originalScript: string,
 *   stylePrompt: string,
 *   beatAnalysis: BeatAnalysisResult,
 *   uploadedAssets: UploadedAssets,
 *   videoWidth: number,
 *   videoHeight: number,
 *   fps: number
 * }
 * 
 * In production, this would:
 * 1. Call Claude/GPT-4 with MASTER_SYSTEM_PROMPT
 * 2. Send all inputs in structured format
 * 3. Return validated JSON timeline
 */
export async function POST(req: NextRequest) {
  try {
    const {
      enhancedScript,
      originalScript,
      stylePrompt,
      beatAnalysis,
      uploadedAssets,
      videoWidth = 1080,
      videoHeight = 1920,
      fps = 30,
      projectName = 'Untitled Project',
    } = await req.json();

    if (!enhancedScript || !beatAnalysis) {
      return NextResponse.json(
        {
          error: 'enhancedScript and beatAnalysis are required',
        },
        { status: 400 }
      );
    }

    // MASTER SYSTEM PROMPT - this is the core AI instruction set
    const masterSystemPrompt = `You are a professional motion graphics director and video timeline architect.

Your job is to generate a structured JSON animation timeline for a kinetic typography commercial advertisement.

STRICT RULES:
- Output ONLY valid JSON that matches the specified schema exactly
- Use frame-based timing with the provided FPS
- Align important words with provided beat frames
- Use cinematic pacing similar to Apple or Samsung commercials
- Highlight emotionally powerful words on high-energy beats
- Maintain minimal premium design unless otherwise specified
- Avoid overcrowding scenes
- Use 1–2 strong words per beat impact
- Distribute scenes evenly across total duration
- Ensure transitions are smooth and professional
- Total video duration should optimally be 600-900 frames (20-30 seconds at 30fps)

INPUT DATA PROVIDED:
1. Enhanced Script: The rewritten premium script
2. Original Script: User's raw input
3. Style Prompt: Creative direction from user
4. Video Dimensions: Width x Height in pixels
5. FPS: Frames per second
6. Beat Frames: Array of frame numbers where music beats occur
7. Tempo: BPM of the music
8. Uploaded Assets: Logo, product images, product videos, background assets

RESPONSE SCHEMA (MUST be valid JSON):
{
  "id": "generated_id",
  "projectName": "string",
  "video": {
    "fps": number,
    "width": number,
    "height": number,
    "totalFrames": number,
    "background": {
      "type": "solid|gradient|video",
      "color": "hex_color_or_null",
      "gradientStart": "hex_color_or_null",
      "gradientEnd": "hex_color_or_null",
      "videoUrl": "url_or_null"
    }
  },
  "audio": {
    "musicUrl": "string",
    "beats": [array_of_beat_frame_numbers],
    "tempo": number
  },
  "scenes": [
    {
      "id": "scene_1",
      "startFrame": number,
      "endFrame": number,
      "layers": [
        {
          "type": "text|image|video|logo",
          "content": "for_text_layers",
          "src": "url_for_image_video_logo",
          "animation": {
            "type": "slideUp|fadeIn|scaleImpact|letterByLetter|beatBounce|fadeOut|slideDown",
            "duration": number_in_frames,
            "easing": "easeOut|easeInOut|easeIn|linear"
          },
          "style": {
            "fontSize": number_or_null,
            "color": "hex_color_or_null",
            "fontWeight": "bold|600|700|400",
            "position": "center|top|bottom|left|right",
            "opacity": number_0_to_1,
            "letterSpacing": number_or_null
          },
          "beatSync": boolean,
          "startFrame": number_or_null
        }
      ],
      "transition": {
        "type": "fade|flash|wipe|zoom",
        "duration": number_in_frames
      }
    }
  ]
}

ANIMATION GUIDELINES:
- slideUp: Text/object enters from bottom moving upward
- fadeIn: Gradually appears from transparent
- scaleImpact: Starts small and scales to full size with punch
- letterByLetter: Text appears one letter at a time
- beatBounce: Object bounces on beat frames for emphasis
- fadeOut: Gradually disappears
- slideDown: Text/object exits downward

BEAT SYNC STRATEGY:
- Identify 3-5 most important/emphasized words
- Place these on high-energy beat frames
- Use scaleImpact or beatBounce animation for beat-synced words
- This creates the illusion of "impact" synchronized with music

CINEMATIC STRUCTURE (typical example):
1. Opening Scene (0-60 frames): Logo reveal or hook headline
2. Middle Scenes (60-480 frames): Script unfolds with emphasis on key points
3. Closing Scene (480-600 frames): Call-to-action with product showcase

Your output MUST be valid, parseable JSON with no markdown formatting, explanation text, or code blocks.`;

    // TODO: Replace with actual API call to Claude/OpenAI
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'YOU_NEED_TO_ADD_API_KEY_HERE'}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4o',
    //     messages: [
    //       { role: 'system', content: masterSystemPrompt },
    //       {
    //         role: 'user',
    //         content: `Generate timeline for:
    //
    // Enhanced Script: ${enhancedScript}
    // Style: ${stylePrompt}
    // Beats: ${beatAnalysis.beats.join(', ')}
    // Tempo: ${beatAnalysis.tempo} BPM
    // Video: ${videoWidth}x${videoHeight} @ ${fps}fps
    // Assets: ${JSON.stringify(uploadedAssets, null, 2)}`
    //       }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 3000,
    //   })
    // });

    // Mock timeline response - structure based on the MASTER_SYSTEM_PROMPT requirements
    const totalFrames = 600; // 20 seconds at 30fps
    
    const mockTimeline: AnimationTimeline = {
      id: `project_${Date.now()}`,
      projectName,
      video: {
        fps,
        width: videoWidth,
        height: videoHeight,
        totalFrames,
        background: {
          type: 'solid',
          color: '#000000',
        },
      },
      audio: {
        musicUrl: uploadedAssets.musicFile.url,
        beats: beatAnalysis.beats,
        tempo: beatAnalysis.tempo,
      },
      scenes: [
        {
          id: 'scene_intro',
          startFrame: 0,
          endFrame: 100,
          layers: [
            {
              type: 'logo',
              src: uploadedAssets.logo?.url || '',
              animation: {
                type: 'scaleImpact',
                duration: 40,
                easing: 'easeOut',
              },
              style: {
                width: 200,
                height: 200,
                position: 'center',
                opacity: 1,
              },
              beatSync: false,
              startFrame: 20,
            },
          ],
          transition: {
            type: 'fade',
            duration: 15,
          },
        },
        {
          id: 'scene_hook',
          startFrame: 100,
          endFrame: 250,
          layers: [
            {
              type: 'text',
              content: 'Stop guessing.',
              animation: {
                type: 'slideUp',
                duration: 30,
                easing: 'easeOut',
              },
              style: {
                fontSize: 80,
                color: '#ffffff',
                fontWeight: 'bold',
                position: 'center',
                opacity: 1,
              },
              beatSync: true,
              startFrame: 110,
            },
            {
              type: 'text',
              content: 'Start winning.',
              animation: {
                type: 'slideUp',
                duration: 30,
                easing: 'easeOut',
              },
              style: {
                fontSize: 80,
                color: '#3b82f6', // Blue
                fontWeight: 'bold',
                position: 'center',
                opacity: 1,
              },
              beatSync: true,
              startFrame: 150,
            },
          ],
          transition: {
            type: 'fade',
            duration: 15,
          },
        },
        {
          id: 'scene_value',
          startFrame: 250,
          endFrame: 450,
          layers: [
            {
              type: 'text',
              content: 'Let AI do the heavy lifting.',
              animation: {
                type: 'letterByLetter',
                duration: 60,
                easing: 'easeOut',
              },
              style: {
                fontSize: 60,
                color: '#ffffff',
                fontWeight: '600',
                position: 'center',
                opacity: 1,
              },
              beatSync: true,
              startFrame: 270,
            },
            {
              type: 'image',
              src: uploadedAssets.productImages?.[0]?.url || '',
              animation: {
                type: 'fadeIn',
                duration: 45,
                easing: 'easeOut',
              },
              style: {
                width: 400,
                height: 300,
                position: 'center',
                opacity: 1,
              },
              beatSync: false,
              startFrame: 350,
            },
          ],
          transition: {
            type: 'fade',
            duration: 15,
          },
        },
        {
          id: 'scene_cta',
          startFrame: 450,
          endFrame: 600,
          layers: [
            {
              type: 'text',
              content: 'Kinetic Typography',
              animation: {
                type: 'scaleImpact',
                duration: 50,
                easing: 'easeOut',
              },
              style: {
                fontSize: 70,
                color: '#3b82f6',
                fontWeight: 'bold',
                position: 'center',
                opacity: 1,
              },
              beatSync: true,
              startFrame: 470,
            },
            {
              type: 'text',
              content: 'Automated Excellence',
              animation: {
                type: 'slideUp',
                duration: 30,
                easing: 'easeOut',
              },
              style: {
                fontSize: 50,
                color: '#ffffff',
                fontWeight: '400',
                position: 'center',
                opacity: 0.8,
              },
              beatSync: false,
              startFrame: 530,
            },
          ],
          transition: {
            type: 'fade',
            duration: 30,
          },
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockTimeline,
      message: 'Timeline generated successfully',
      note: 'This is mock data. YOU_NEED_TO_ADD_API_KEY_HERE for actual OpenAI/Claude API integration',
      envRequired: {
        service: 'OpenAI GPT-4o or Anthropic Claude',
        envVar: 'OPENAI_API_KEY or ANTHROPIC_API_KEY',
      },
      instructions: {
        step1: 'Set up environment variable for AI service (OpenAI or Claude)',
        step2: 'Uncomment the API call in this route',
        step3: 'Implement error handling and response parsing',
        step4: 'Add timeline validation against schema',
      },
    });
  } catch (error) {
    console.error('Timeline generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate timeline', details: String(error) },
      { status: 500 }
    );
  }
}
