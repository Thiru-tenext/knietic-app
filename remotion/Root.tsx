import { Composition } from 'remotion';
import { KineticText } from './KineticText';
import { defaultMyCompProps, KineticVideoProps } from './types';
import React from 'react';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="KineticText"
				component={KineticText as React.FC<any>}
				durationInFrames={120}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={defaultMyCompProps}
				calculateMetadata={({ props }) => {
					const resolutionString = (props as unknown as KineticVideoProps).resolution || '1080x1920';
					const [widthStr, heightStr] = resolutionString.split('x');
					return {
						width: parseInt(widthStr, 10) || 1080,
						height: parseInt(heightStr, 10) || 1920,
					};
				}}
			/>
		</>
	);
};
