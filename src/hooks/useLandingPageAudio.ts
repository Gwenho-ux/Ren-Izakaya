import { useEffect } from 'react';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';

const LANDING_PAGE_SOUNDS = {
  RAIN: '/sounds/outsiderain.wav',
  BACKGROUND_MUSIC: '/sounds/backgroundmusic.mp3',
  TRANSITION_MUSIC: '/sounds/cyberpunk.mp3',
} as const;

export const useLandingPageAudio = () => {
  const { playLayeredSound } = useSimpleSoundContext();

  // Set up landing page ambient sounds
  useEffect(() => {
    console.log('🏠 HOME PAGE: Setting up outside rain sound + background music');
    playLayeredSound(LANDING_PAGE_SOUNDS.RAIN, LANDING_PAGE_SOUNDS.BACKGROUND_MUSIC);
  }, [playLayeredSound]);

  const playTransitionMusic = () => {
    playLayeredSound(LANDING_PAGE_SOUNDS.TRANSITION_MUSIC, undefined);
  };

  return { playTransitionMusic };
}; 