import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface NoiseLayerProps {
  opacity?: number;
}

/**
 * DSA Concept: Pseudo-Random Number Generation (PRNG) / Hashing
 * Using SVG turbulence as a mathematical noise function (O(1) complexity per pixel).
 * 
 * This creates a cinematic "film grain" effect without loading heavy MP4 overlay files,
 * making the render exponentially faster while retaining premium aesthetics.
 */
export const NoiseLayer: React.FC<NoiseLayerProps> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Change the noise pattern slightly every few frames to simulate organic film grain
  const seed = Math.floor(frame / 3);

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <filter id={`noise-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
            seed={seed}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${seed})`} opacity="1" />
      </svg>
    </AbsoluteFill>
  );
};
