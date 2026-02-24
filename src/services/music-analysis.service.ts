/**
 * Music Analysis Service
 * 
 * Abstracted music analysis operations supporting multiple providers
 */

import { getEnv } from '@/src/config/environment';
import { logger } from '@/src/lib/logger';
import { ServiceError } from '@/src/lib/errors';
import { BeatAnalysisResult } from '@/src/types';

export interface MusicAnalysisProvider {
  analyzeBeat(musicUrl: string, fps: number): Promise<BeatAnalysisResult>;
  detectTempo(musicUrl: string): Promise<number>;
  detectEnergy(musicUrl: string): Promise<Array<{ frame: number; energy: 'high' | 'medium' | 'low' }>>;
}

/**
 * Mock music analysis provider (for development)
 */
class MockMusicAnalysisProvider implements MusicAnalysisProvider {
  async analyzeBeat(musicUrl: string, fps: number = 30): Promise<BeatAnalysisResult> {
    logger.debug('Mock music analysis: analyzing beats');
    await this.delay(500);

    return {
      tempo: 128,
      beats: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
      energyLevels: [
        { frame: 0, energy: 'low' },
        { frame: 30, energy: 'high' },
        { frame: 60, energy: 'medium' },
      ],
      peakFrames: [30, 90, 120],
    };
  }

  async detectTempo(musicUrl: string): Promise<number> {
    logger.debug('Mock music analysis: detecting tempo');
    return 128;
  }

  async detectEnergy(
    musicUrl: string
  ): Promise<Array<{ frame: number; energy: 'high' | 'medium' | 'low' }>> {
    logger.debug('Mock music analysis: detecting energy');
    return [
      { frame: 0, energy: 'low' },
      { frame: 30, energy: 'high' },
      { frame: 60, energy: 'medium' },
    ];
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Librosa music analysis provider (Python-based)
 */
class LibrosaProvider implements MusicAnalysisProvider {
  async analyzeBeat(musicUrl: string, fps: number = 30): Promise<BeatAnalysisResult> {
    // TODO: Call Python microservice or FFmpeg wrapper
    throw new ServiceError('Librosa', 'Not yet implemented');
  }

  async detectTempo(musicUrl: string): Promise<number> {
    // TODO: Call Python microservice
    throw new ServiceError('Librosa', 'Not yet implemented');
  }

  async detectEnergy(
    musicUrl: string
  ): Promise<Array<{ frame: number; energy: 'high' | 'medium' | 'low' }>> {
    // TODO: Call Python microservice
    throw new ServiceError('Librosa', 'Not yet implemented');
  }
}

/**
 * Spotify Web API based music analysis
 */
class SpotifyProvider implements MusicAnalysisProvider {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    if (!clientId || !clientSecret) {
      throw new ServiceError('Spotify', 'Credentials not configured');
    }
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async analyzeBeat(musicUrl: string, fps: number = 30): Promise<BeatAnalysisResult> {
    // TODO: Use Spotify Audio Analysis API
    throw new ServiceError('Spotify', 'Not yet implemented');
  }

  async detectTempo(musicUrl: string): Promise<number> {
    // TODO: Use Spotify API
    throw new ServiceError('Spotify', 'Not yet implemented');
  }

  async detectEnergy(
    musicUrl: string
  ): Promise<Array<{ frame: number; energy: 'high' | 'medium' | 'low' }>> {
    // TODO: Use Spotify API
    throw new ServiceError('Spotify', 'Not yet implemented');
  }
}

/**
 * Music analysis service factory
 */
function createMusicAnalysisProvider(): MusicAnalysisProvider {
  const service = getEnv('MUSIC_ANALYSIS_SERVICE');
  const mockMode = getEnv('ENABLE_MOCK_API');

  if (mockMode) {
    logger.info('Music analysis service initialized in mock mode');
    return new MockMusicAnalysisProvider();
  }

  if (service === 'spotify') {
    const clientId = getEnv('SPOTIFY_CLIENT_ID');
    const clientSecret = getEnv('SPOTIFY_CLIENT_SECRET');
    logger.info('Music analysis service initialized with Spotify API');
    return new SpotifyProvider(clientId, clientSecret);
  }

  if (service === 'librosa') {
    logger.info('Music analysis service initialized with Librosa');
    return new LibrosaProvider();
  }

  logger.info('Music analysis service using default mock implementation');
  return new MockMusicAnalysisProvider();
}

class MusicAnalysisService {
  private provider: MusicAnalysisProvider;

  constructor() {
    this.provider = createMusicAnalysisProvider();
  }

  async analyzeBeat(musicUrl: string, fps: number = 30): Promise<BeatAnalysisResult> {
    try {
      logger.info('Starting beat analysis', { musicUrl, fps });
      const result = await this.provider.analyzeBeat(musicUrl, fps);
      logger.info('Beat analysis completed', { beatsCount: result.beats.length });
      return result;
    } catch (error) {
      logger.error('Beat analysis failed', error instanceof Error ? error : new Error(String(error)), { musicUrl });
      throw error;
    }
  }

  async detectTempo(musicUrl: string): Promise<number> {
    try {
      logger.info('Detecting tempo', { musicUrl });
      const tempo = await this.provider.detectTempo(musicUrl);
      logger.info('Tempo detected', { tempo });
      return tempo;
    } catch (error) {
      logger.error('Tempo detection failed', error instanceof Error ? error : new Error(String(error)), { musicUrl });
      throw error;
    }
  }

  async detectEnergy(
    musicUrl: string
  ): Promise<Array<{ frame: number; energy: 'high' | 'medium' | 'low' }>> {
    try {
      logger.info('Detecting energy levels', { musicUrl });
      const energy = await this.provider.detectEnergy(musicUrl);
      logger.info('Energy levels detected', { energyPoints: energy.length });
      return energy;
    } catch (error) {
      logger.error('Energy detection failed', error instanceof Error ? error : new Error(String(error)), { musicUrl });
      throw error;
    }
  }
}

export const musicAnalysisService = new MusicAnalysisService();
