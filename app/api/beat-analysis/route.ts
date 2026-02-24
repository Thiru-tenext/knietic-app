/**
 * Beat Analysis API Route
 * 
 * Uses the beat-analysis service and dynamic configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withCors } from '@/src/middleware';
import { beatAnalysisService } from '@/src/services/beat-analysis.service';
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
  const { musicFileUrl, fps = 30 } = body;

  if (!musicFileUrl) {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_INPUT',
          message: 'musicFileUrl is required',
        },
      },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  logger.info('Starting beat analysis', { musicFileUrl, fps });

  try {
    const result = await beatAnalysisService.analyzeBeat({
      musicFileUrl,
      fps,
    });

    logger.info('Beat analysis completed', {
      beats: result.beats.length,
      tempo: result.tempo,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Beat analysis completed successfully',
    });
  } catch (error) {
    logger.error('Beat analysis error', error as Error, { musicFileUrl });
    throw error;
  }
}

export const POST = withErrorHandling(withCors(handler));
export const OPTIONS = withCors(async () => new NextResponse(null, { status: 200 }));
