import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface LightLeakProps {
  color: string;
  intensity?: number;
}

/**
 * Procedural Light Leaks
 * Uses Remotion math (interpolation & springs) to move a radial gradient dynamically
 * across the screen, creating organic light blooms associated with high-end cameras.
 */
export const LightLeakLayer: React.FC<LightLeakProps> = ({ color, intensity = 0.4 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Create a continuous sweeping motion across the screen X and Y over the composition life
  const moveX = interpolate(frame, [0, durationInFrames], [-20, 120]);
  const moveY = interpolate(frame, [0, durationInFrames], [120, -20]);

  // Make it pulse organically (sine wave using current frame)
  const pulse = Math.sin(frame / 15) * 0.1;
  const currentOpacity = intensity + pulse;

  return (
    <AbsoluteFill
      style={{
        zIndex: 10,
        pointerEvents: 'none',
        background: `radial-gradient(circle at ${moveX}% ${moveY}%, ${color} 0%, transparent 60%)`,
        opacity: currentOpacity,
        mixBlendMode: 'screen', // Crucial for VFX compositing
      }}
    />
  );
};
