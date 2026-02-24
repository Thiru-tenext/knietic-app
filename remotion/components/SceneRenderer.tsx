import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SceneData } from '../types';
import { HighlightedText } from './HighlightedText';
import { MediaBackground } from './vfx/MediaBackground';

interface SceneRendererProps {
  scene: SceneData;
  primaryColor: string;
  styleMode: 'premium' | 'bold' | 'minimal';
  fontFamily?: 'inter' | 'playfair' | 'oswald' | 'bebas';
  index: number;
}

/**
 * Handles the physics, interpolation, and animation logic 
 * for a single isolated Scene within the master Sequence.
 * 
 * By encapsulating this here, the main Composition file stays 
 * completely clean of Math and Physics logic.
 */
export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  primaryColor,
  styleMode,
  fontFamily = 'inter',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Scale Animation Logic Layer
  const scale =
    styleMode === 'bold'
      ? spring({
          frame,
          fps,
          config: { damping: 12 },
        })
      : 1;

  // 2. Transform Logic Layer
  const yOffset =
    styleMode === 'premium'
      ? interpolate(
          spring({ frame, fps, config: { damping: 14 } }),
          [0, 1],
          [50, 0]
        )
      : 0;

  // 3. Opacity Logic Layer
  const opacity = interpolate(
    spring({ frame, fps, config: { damping: 14 } }),
    [0, 1],
    [0, 1]
  );

  // 4. Layout Logic Layer
  const layoutJustify = 
    scene.layoutAlign === 'top' ? 'flex-start' :
    scene.layoutAlign === 'bottom' ? 'flex-end' :
    'center';

  // 5. Typography Font Mapper
  const getFontFamilyString = () => {
    switch(fontFamily) {
      case 'playfair': return '"Playfair Display", serif';
      case 'oswald': return '"Oswald", sans-serif';
      case 'bebas': return '"Bebas Neue", sans-serif';
      case 'inter':
      default:
        return styleMode === 'minimal' ? 'monospace' : '"Inter", system-ui, sans-serif';
    }
  };

  return (
    <AbsoluteFill style={{ 
      justifyContent: layoutJustify, 
      alignItems: 'center',
      paddingTop: scene.layoutAlign === 'top' ? '80px' : 0,
      paddingBottom: scene.layoutAlign === 'bottom' ? '80px' : 0,
    }}>
      {/* Background Media Engine */}
      {scene.backgroundImageUrl && (
        <MediaBackground 
          imageUrl={scene.backgroundImageUrl} 
          opacity={scene.backgroundOpacity ?? 0.4} 
        />
      )}

      <h1
        style={{
          fontFamily: getFontFamilyString(),
          fontSize: styleMode === 'bold' ? '10em' : '8em',
          fontWeight: styleMode === 'minimal' ? 'normal' : 'bold',
          color: 'white',
          transform: `scale(${scale}) translateY(${yOffset}px)`,
          opacity: opacity,
          textAlign: 'center',
          margin: 0,
          padding: '0 40px',
        }}
      >
        <HighlightedText
          text={scene.text}
          wordsToHighlight={scene.emphasisWords}
          highlightColor={primaryColor}
          animation={scene.textAnimation}
          style={scene.textStyle}
        />
      </h1>
    </AbsoluteFill>
  );
};
