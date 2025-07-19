import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  currentBaseSound: string;
  currentLayerSound: string;
  playLayeredSound: (baseSound: string, layerSound?: string) => void;
  pauseSound: () => void;
  toggleSound: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  playTypingSound: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

// Function to play UI sound effects
const playUISound = (soundPath: string, volume: number = 0.5) => {
  if (typeof window === 'undefined') return; // SSR check
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch(error => {
    console.log('Sound play failed:', error);
  });
};

// Audio manager for layered sounds with fade transitions
class LayeredAudioManager {
  private baseAudio: HTMLAudioElement | null = null;
  private layerAudio: HTMLAudioElement | null = null;
  private fadeInterval: NodeJS.Timeout | null = null;
  private isGloballyPlaying: boolean = true;

  constructor() {
    if (typeof window === 'undefined') return; // SSR check
  }

  private fadeAudio(audio: HTMLAudioElement, fromVolume: number, toVolume: number, duration: number = 2000): Promise<void> {
    return new Promise((resolve) => {
      const steps = 50;
      const stepTime = duration / steps;
      const stepSize = (toVolume - fromVolume) / steps;
      let currentStep = 0;

      audio.volume = fromVolume;

      const fadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = fromVolume + (stepSize * currentStep);
        audio.volume = Math.max(0, Math.min(1, newVolume));

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          if (toVolume === 0) {
            audio.pause();
          }
          resolve();
        }
      }, stepTime);
    });
  }

  async playLayeredSound(baseSound: string, layerSound?: string) {
    if (typeof window === 'undefined') return; // SSR check
    
    console.log('Playing layered sound:', { baseSound, layerSound });
    console.log('Current audio state:', { 
      hasBaseAudio: !!this.baseAudio, 
      hasLayerAudio: !!this.layerAudio,
      isGloballyPlaying: this.isGloballyPlaying 
    });
    
    // Force reload cyberpunk audio to apply new volume settings
    if (baseSound.includes('cyberpunk') && this.baseAudio && this.baseAudio.src.includes('cyberpunk')) {
      console.log('Force reloading cyberpunk audio for volume change');
      this.baseAudio.pause();
      this.baseAudio = null;
    }

    // Handle base sound
    if (!this.baseAudio || this.baseAudio.src !== new URL(baseSound, window.location.origin).href) {
      const oldBaseAudio = this.baseAudio;
      
      // Create new base audio
      this.baseAudio = new Audio(baseSound);
      this.baseAudio.loop = true;
      this.baseAudio.volume = 0;
      this.baseAudio.preload = 'auto';
      
      // Add error handling for audio loading
      this.baseAudio.addEventListener('error', (e) => {
        console.error('Base audio loading error:', e, 'for sound:', baseSound);
      });
      this.baseAudio.addEventListener('canplaythrough', () => {
        console.log('Base audio loaded and ready:', baseSound);
      });
      
      // Add fade effect for looping sounds like cyberpunk
      if (baseSound.includes('cyberpunk')) {
        this.baseAudio.addEventListener('timeupdate', () => {
          if (this.baseAudio) {
            const duration = this.baseAudio.duration;
            const currentTime = this.baseAudio.currentTime;
            const fadeTime = 2; // 2 seconds fade
            
            // Fade out near end
            if (duration - currentTime <= fadeTime && duration - currentTime > 0) {
              const fadeProgress = (duration - currentTime) / fadeTime;
              const currentVolume = this.baseAudio.volume;
              const targetVolume = 0.15 * fadeProgress;
              this.baseAudio.volume = Math.min(currentVolume, targetVolume);
            }
            // Fade in at beginning
            else if (currentTime <= fadeTime) {
              const fadeProgress = currentTime / fadeTime;
              this.baseAudio.volume = 0.15 * fadeProgress;
            }
            // Normal volume in middle
            else {
              this.baseAudio.volume = 0.15;
            }
          }
        });
      }

      // Set volume based on sound type
      let targetBaseVolume = 0.4;
      if (baseSound.includes('RainHeavyOnPlantsG')) {
        targetBaseVolume = 0.6;
      } else if (baseSound.includes('cyberpunk')) {
        targetBaseVolume = 0.15;
      }

      if (this.isGloballyPlaying) {
        try {
          await this.baseAudio.play();
          this.fadeAudio(this.baseAudio, 0, targetBaseVolume);
          console.log('Base audio started successfully:', baseSound);
        } catch (error) {
          console.log('Base audio play failed:', error);
        }
      }

      // Fade out old base audio
      if (oldBaseAudio) {
        this.fadeAudio(oldBaseAudio, oldBaseAudio.volume, 0).then(() => {
          oldBaseAudio.pause();
        });
      }
    }

    // Handle layer sound
    if (layerSound) {
      if (!this.layerAudio || this.layerAudio.src !== new URL(layerSound, window.location.origin).href) {
        const oldLayerAudio = this.layerAudio;
        
        // Create new layer audio
        this.layerAudio = new Audio(layerSound);
        this.layerAudio.loop = true;
        this.layerAudio.volume = 0;
        this.layerAudio.preload = 'auto';
        
        // Add error handling for audio loading
        this.layerAudio.addEventListener('error', (e) => {
          console.error('Layer audio loading error:', e, 'for sound:', layerSound);
        });
        this.layerAudio.addEventListener('canplaythrough', () => {
          console.log('Layer audio loaded and ready:', layerSound);
        });

        // Set volume based on sound type
        let targetLayerVolume = 0.3;
        if (layerSound.includes('Restaurant_Ambience') || layerSound.includes('restaurant')) {
          targetLayerVolume = 0.3;
        } else if (layerSound.includes('cooking')) {
          targetLayerVolume = 0.5;
        } else if (layerSound.includes('RainHeavyOnPlantsG')) {
          targetLayerVolume = 0.7;
        }

        if (this.isGloballyPlaying) {
          try {
            await this.layerAudio.play();
            this.fadeAudio(this.layerAudio, 0, targetLayerVolume);
            console.log('Layer audio started successfully:', layerSound);
          } catch (error) {
            console.log('Layer audio play failed:', error);
          }
        }

        // Fade out old layer audio
        if (oldLayerAudio) {
          this.fadeAudio(oldLayerAudio, oldLayerAudio.volume, 0).then(() => {
            oldLayerAudio.pause();
          });
        }
      }
    } else {
      // No layer sound, fade out current layer
      if (this.layerAudio) {
        this.fadeAudio(this.layerAudio, this.layerAudio.volume, 0).then(() => {
          if (this.layerAudio) {
            this.layerAudio.pause();
            this.layerAudio = null;
          }
        });
      }
    }
  }

  togglePlayback() {
    this.isGloballyPlaying = !this.isGloballyPlaying;

    if (this.isGloballyPlaying) {
      // Resume with fade in
      if (this.baseAudio) {
        let targetBaseVolume = 0.4;
        if (this.baseAudio.src.includes('RainHeavyOnPlantsG')) {
          targetBaseVolume = 0.6;
        } else if (this.baseAudio.src.includes('cyberpunk')) {
          targetBaseVolume = 0.15;
        }
        this.baseAudio.play().catch(() => {});
        this.fadeAudio(this.baseAudio, 0, targetBaseVolume);
      }
      if (this.layerAudio) {
        let targetLayerVolume = 0.3;
        if (this.layerAudio.src.includes('Restaurant_Ambience') || this.layerAudio.src.includes('restaurant')) {
          targetLayerVolume = 0.3;
        } else if (this.layerAudio.src.includes('cooking')) {
          targetLayerVolume = 0.5;
        } else if (this.layerAudio.src.includes('RainHeavyOnPlantsG')) {
          targetLayerVolume = 0.7;
        }
        this.layerAudio.play().catch(() => {});
        this.fadeAudio(this.layerAudio, 0, targetLayerVolume);
      }
    } else {
      // Pause with fade out
      if (this.baseAudio) {
        this.fadeAudio(this.baseAudio, this.baseAudio.volume, 0);
      }
      if (this.layerAudio) {
        this.fadeAudio(this.layerAudio, this.layerAudio.volume, 0);
      }
    }

    return this.isGloballyPlaying;
  }

  pause() {
    this.isGloballyPlaying = false;
    if (this.baseAudio) {
      this.fadeAudio(this.baseAudio, this.baseAudio.volume, 0);
    }
    if (this.layerAudio) {
      this.fadeAudio(this.layerAudio, this.layerAudio.volume, 0);
    }
  }
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentBaseSound, setCurrentBaseSound] = useState('/sounds/RainHeavyOnPlantsG_BT051501_2.wav');
  const [currentLayerSound, setCurrentLayerSound] = useState('');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioManagerRef = useRef<LayeredAudioManager | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioManagerRef.current = new LayeredAudioManager();
      
      // Add global click listener to enable audio on first user interaction
      const enableAudio = () => {
        setHasUserInteracted(true);
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
      };
      
      document.addEventListener('click', enableAudio);
      document.addEventListener('keydown', enableAudio);
      document.addEventListener('touchstart', enableAudio);
      
      return () => {
        // Cleanup on unmount
        if (audioManagerRef.current) {
          audioManagerRef.current.pause();
        }
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
      };
    }
  }, []);

  const playLayeredSound = useCallback((baseSound: string, layerSound?: string) => {
    setCurrentBaseSound(baseSound);
    setCurrentLayerSound(layerSound || '');
    
    if (audioManagerRef.current) {
      if (hasUserInteracted) {
        audioManagerRef.current.playLayeredSound(baseSound, layerSound);
      } else {
        // Store the sound to play after user interaction
        const playAfterInteraction = () => {
          if (audioManagerRef.current) {
            audioManagerRef.current.playLayeredSound(baseSound, layerSound);
          }
        };
        
        // Wait for user interaction
        const enableAndPlay = () => {
          setHasUserInteracted(true);
          playAfterInteraction();
          document.removeEventListener('click', enableAndPlay);
          document.removeEventListener('keydown', enableAndPlay);
          document.removeEventListener('touchstart', enableAndPlay);
        };
        
        document.addEventListener('click', enableAndPlay);
        document.addEventListener('keydown', enableAndPlay);
        document.addEventListener('touchstart', enableAndPlay);
      }
    }
  }, [hasUserInteracted]);

  const pauseSound = useCallback(() => {
    setIsPlaying(false);
    if (audioManagerRef.current) {
      audioManagerRef.current.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (audioManagerRef.current) {
      const newPlayingState = audioManagerRef.current.togglePlayback();
      setIsPlaying(newPlayingState);
    }
  }, []);

  const playClickSound = useCallback(() => {
    playUISound('/sounds/click.wav', 0.6);
  }, []);

  const playHoverSound = useCallback(() => {
    playUISound('/sounds/hover.wav', 0.6);
  }, []);

  const playTypingSound = useCallback(() => {
    playUISound('/sounds/type.wav', 0.5);
  }, []);

  return (
    <SoundContext.Provider 
      value={{ 
        isPlaying, 
        currentBaseSound,
        currentLayerSound,
        playLayeredSound, 
        pauseSound,
        toggleSound,
        playClickSound,
        playHoverSound,
        playTypingSound
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}; 