import React from 'react';
import { linearTiming, TransitionPresentation } from '@remotion/transitions';
import { flip } from '@remotion/transitions/flip';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';
import { wipe } from '@remotion/transitions/wipe';
import { clockWipe } from '@remotion/transitions/clock-wipe';

export type TransitionType = 'fade' | 'slide' | 'flip' | 'wipe' | 'clockWipe' | 'none';

interface TransitionEngineProps {
  type: TransitionType;
  durationInFrames?: number;
}

/**
 * Returns the preset standard linear timing to be used across the app
 */
export const getStandardTiming = (duration: number = 10) => {
  return linearTiming({ durationInFrames: duration });
};

/**
 * Factory pattern to return the exact physics and math transition
 * required by Remotion's TransitionSeries based on a string mapping.
 */
export const getTransitionComponent = (type: TransitionType): TransitionPresentation<any> | null => {
  switch (type) {
    case 'slide':
      return slide({ direction: 'from-right' }) as any;
    case 'flip':
      return flip({ direction: 'from-bottom' }) as any;
    case 'wipe':
      return wipe() as any;
    case 'clockWipe':
      return clockWipe({ width: 320, height: 320 }) as any;
    case 'fade':
      return fade() as any;
    case 'none':
    default:
      return null;
  }
};
