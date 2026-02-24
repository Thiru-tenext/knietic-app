/**
 * Script Enhancement API Route
 * 
 * Uses the script-enhancement service and dynamic configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withCors } from '@/src/middleware';
import { scriptEnhancementService } from '@/src/services/script-enhancement.service';
import { parseJsonBody } from '@/src/middleware/api';
import { logger } from '@/src/lib/logger';
import { HTTP_STATUS } from '@/src/constants/api';

async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: { code: 'METHOD_NOT_ALLOWED', message: 'POST only' } },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const body = await parseJsonBody(req);
  const { originalScript, stylePrompt } = body;

  if (!originalScript || !stylePrompt) {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_INPUT',
          message: 'originalScript and stylePrompt are required',
        },
      },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  logger.info('Starting script enhancement', {
    scriptLength: originalScript.length,
  });

  try {
    const result = await scriptEnhancementService.enhanceScript({
      originalScript,
      stylePrompt,
    });

    logger.info('Script enhancement completed', {
      emphasizedWords: result.emphasizedWords.length,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Script enhanced successfully',
    });
  } catch (error) {
    logger.error('Script enhancement error', error as Error);
    throw error;
  }
}

export const POST = withErrorHandling(withCors(handler));
export const OPTIONS = withCors(async () => new NextResponse(null, { status: 200 }));
