import React from 'react';
import { AbsoluteFill, Audio } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { KineticVideoProps } from './types';
import { SceneRenderer } from './components/SceneRenderer';
import { getTransitionComponent, getStandardTiming } from './components/transitions/TransitionEngine';
import { NoiseLayer } from './components/vfx/NoiseLayer';
import { LightLeakLayer } from './components/vfx/LightLeakLayer';

export const KineticText: React.FC<KineticVideoProps> = ({
  scenes,
  primaryColor,
  backgroundColor,
  styleMode,
  enableGlobalVfx = true,
  audioUrl,
  audioVolume = 0.8,
  fontFamily = 'inter',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Background Audio Engine */}
      {audioUrl && (
        <Audio 
          src={audioUrl} 
          volume={audioVolume} 
        />
      )}

      <TransitionSeries>
        {scenes.map((scene, index) => {
          // Resolve transition math factory inside the loop
          const transitionProps = scene.transitionType && scene.transitionType !== 'none'
            ? getTransitionComponent(scene.transitionType)
            : null;

          const seq = (
            <TransitionSeries.Sequence key={`${scene.id}-seq`} durationInFrames={Math.max(15, scene.durationInFrames)}>
              <SceneRenderer
                scene={scene}
                primaryColor={primaryColor}
                styleMode={styleMode}
                fontFamily={fontFamily}
                index={index}
              />
            </TransitionSeries.Sequence>
          );

          // Only apply transition if one is selected and it's not the last scene
          const trans = transitionProps && index < scenes.length - 1 ? (
            <TransitionSeries.Transition
              key={`${scene.id}-trans`}
              presentation={transitionProps}
              timing={getStandardTiming(10)}
            />
          ) : null;

          return [seq, trans];
        })}
      </TransitionSeries>

      {/* Global VFX Engine composited over the sequence layer */}
      {enableGlobalVfx && (
        <>
          <NoiseLayer opacity={0.06} />
          <LightLeakLayer color={primaryColor} intensity={0.3} />
        </>
      )}
    </AbsoluteFill>
  );
};
