import { TransitionType } from './components/transitions/TransitionEngine';

export type TextAnimationType = 'fade' | 'pop-in' | 'fade-up' | 'typing' | 'glitch';
export type TextStyleType = 'none' | 'neon' | 'outline' | 'shadow';

export interface SceneData {
  id: string;
  text: string;
  durationInFrames: number;
  emphasisWords?: string[]; // Words to highlight or animate differently
  transitionType?: TransitionType;
  backgroundImageUrl?: string;
  backgroundOpacity?: number; // 0 to 1
  layoutAlign?: 'center' | 'top' | 'bottom';
  textAnimation?: TextAnimationType;
  textStyle?: TextStyleType;
}

export type VideoResolution =
  | '1080x1080' // 1:1 Instagram/Facebook
  | '1080x1350' // 4:5 Instagram feed
  | '1080x1920' // 9:16 Reels/Shorts
  | '1920x1080' // 16:9 YouTube
  | '3840x2160' // 16:9 4K YouTube
  | '3840x1600' // 21:9 Cinematic
  | '1080x1620' // 2:3 Pinterest
  | '1080x1440'; // 3:4 Mobile ads

export interface KineticVideoProps {
  scenes: SceneData[];
  primaryColor: string;
  backgroundColor: string;
  styleMode: 'premium' | 'bold' | 'minimal';
  enableGlobalVfx?: boolean;
  audioUrl?: string;
  audioVolume?: number; // 0 to 1
  fontFamily?: 'inter' | 'playfair' | 'oswald' | 'bebas';
  resolution?: VideoResolution;
}

export const defaultMyCompProps: KineticVideoProps = {
  scenes: [
    { id: '1', text: 'Introducing the future', durationInFrames: 60, emphasisWords: ['future'], transitionType: 'fade', backgroundImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', backgroundOpacity: 0.3 },
    { id: '2', text: 'Zero cables.', durationInFrames: 45, transitionType: 'slide', backgroundImageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', backgroundOpacity: 0.2 },
    { id: '3', text: 'Maximum power.', durationInFrames: 45, emphasisWords: ['Maximum'], transitionType: 'clockWipe' },
    { id: '4', text: 'Available now.', durationInFrames: 60, transitionType: 'none' },
  ],
  primaryColor: '#3b82f6', // Tailwind blue-500
  backgroundColor: '#0a0a0a', // Tailwind neutral-950
  styleMode: 'premium',
  enableGlobalVfx: true,
  audioUrl: '', // Provide your own raw MP3 URL here
  audioVolume: 0.8,
  fontFamily: 'inter',
};
