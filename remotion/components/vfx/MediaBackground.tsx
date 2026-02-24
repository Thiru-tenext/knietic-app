import React from 'react';
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface MediaBackgroundProps {
  imageUrl?: string;
  opacity?: number;
}

/**
 * Renders a dynamically scaling, slow-panning media background 
 * for cinematic typography. Uses Remotion's optimized `<Img>` tag.
 */
export const MediaBackground: React.FC<MediaBackgroundProps> = ({ 
  imageUrl, 
  opacity = 0.4 
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scale up very slowly to give a "Ken Burns" subtle panning effect
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1.05, 1.15],
    { extrapolateRight: 'clamp' }
  );

  if (!imageUrl) return null;

  return (
    <AbsoluteFill style={{ zIndex: -1, overflow: 'hidden', opacity }}>
      <Img 
        src={imageUrl} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: `scale(${scale})`,
        }} 
      />
    </AbsoluteFill>
  );
};
