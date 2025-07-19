import { useCallback } from 'react';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';

export const useSoundEffects = () => {
  const { playClickSound, playHoverSound, playTypingSound } = useSimpleSoundContext();

  const withSoundEffects = useCallback((originalOnClick?: () => void, originalOnMouseEnter?: () => void) => {
    return {
      onClick: () => {
        playClickSound();
        if (originalOnClick) {
          originalOnClick();
        }
      },
      onMouseEnter: () => {
        playHoverSound();
        if (originalOnMouseEnter) {
          originalOnMouseEnter();
        }
      }
    };
  }, [playClickSound, playHoverSound]);

  const withTypingSound = useCallback((originalOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        playTypingSound();
        if (originalOnChange) {
          originalOnChange(e);
        }
      }
    };
  }, [playTypingSound]);

  return {
    playClickSound,
    playHoverSound,
    playTypingSound,
    withSoundEffects,
    withTypingSound
  };
}; 