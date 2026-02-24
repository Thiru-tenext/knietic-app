import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, random } from 'remotion';
import { TextAnimationType, TextStyleType } from '../types';

interface HighlightedTextProps {
  text: string;
  wordsToHighlight: string[] | undefined;
  highlightColor: string;
  animation?: TextAnimationType;
  style?: TextStyleType;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  wordsToHighlight,
  highlightColor,
  animation = 'fade',
  style = 'none',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emphasisSet = new Set(
    (wordsToHighlight || []).map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
  );

  const words = text.split(' ');
  
  // Calculate character total for typing effect timing
  let charCounter = 0;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {words.map((word, wordIndex) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHighlighted = emphasisSet.has(cleanWord);
        const color = isHighlighted ? highlightColor : 'inherit';

        // Styling interpolations
        let customStyle: React.CSSProperties = {
          color,
          display: 'inline-block',
          marginRight: '0.25em',
          whiteSpace: 'pre',
        };

        if (style === 'neon' && isHighlighted) {
          customStyle.textShadow = `0 0 10px ${highlightColor}, 0 0 20px ${highlightColor}, 0 0 40px ${highlightColor}`;
          customStyle.color = '#fff';
        } else if (style === 'outline') {
          customStyle.WebkitTextStroke = `2px ${color}`;
          customStyle.color = 'transparent';
           if (style === 'outline' && isHighlighted) {
              customStyle.WebkitTextStroke = `4px ${color}`;
           }
        } else if (style === 'shadow') {
          customStyle.filter = `drop-shadow(0px 10px 15px rgba(0,0,0,0.8))`;
        }

        // Animation interpolations mapped over words
        if (animation === 'fade') {
           const opacity = interpolate(frame - (wordIndex * 2), [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
           customStyle.opacity = opacity;
        } 
        else if (animation === 'pop-in') {
           const scale = spring({ frame: frame - (wordIndex * 3), fps, config: { damping: 12 } });
           customStyle.transform = `scale(${scale})`;
        }
        else if (animation === 'fade-up') {
           const yOffset = interpolate(spring({ frame: frame - (wordIndex * 3), fps, config: { damping: 14 } }), [0, 1], [50, 0]);
           const opacity = interpolate(frame - (wordIndex * 3), [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
           customStyle.transform = `translateY(${yOffset}px)`;
           customStyle.opacity = opacity;
        }
        else if (animation === 'glitch') {
           // Random jump every few frames for a glitch effect
           const r = random(`${wordIndex}-${Math.floor(frame / 4)}`);
           const isGlitching = r > 0.8;
           const xOffset = isGlitching ? interpolate(r, [0.8, 1], [-10, 10]) : 0;
           const skew = isGlitching ? interpolate(r, [0.8, 1], [-20, 20]) : 0;
           customStyle.transform = `translateX(${xOffset}px) skewX(${skew}deg)`;
           if (isGlitching && style !== 'outline') {
              customStyle.textShadow = `2px 0 red, -2px 0 cyan`;
           }
        }

        // --- TYPING EFFECT (Character granularity) ---
        if (animation === 'typing') {
           return (
             <span key={`${word}-${wordIndex}`} style={customStyle}>
               {word.split('').map((char, charIndex) => {
                 const currentGlobalCharIndex = charCounter++;
                 // Reveal 1 character every 2 frames
                 const isVisible = frame > (currentGlobalCharIndex * 2);
                 return (
                   <span key={`${char}-${charIndex}`} style={{ opacity: isVisible ? 1 : 0 }}>
                     {char}
                   </span>
                 );
               })}
             </span>
           );
        }

        // Standard word-level return for other animations
        charCounter += word.length + 1; // +1 for space
        return (
          <span key={`${word}-${wordIndex}`} style={customStyle}>
            {word}
          </span>
        );
      })}
    </div>
  );
};
