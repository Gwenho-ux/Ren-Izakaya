'use client';

import { useEffect, useRef, useCallback } from 'react';
import { AudioToggleButton } from './AudioToggleButton';
import '../styles/components/AudioToggleButton.css';

interface BackgroundSoundProps {
  soundPath: string;
  className?: string;
  volume?: number;
  isGloballyPlaying?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const FADE_DURATION = 1000; // 1 second fade

export const BackgroundSound = ({ 
  soundPath,
  volume = 1,
  className = '',
  isGloballyPlaying = true,
  onPlayStateChange = () => {}
}: BackgroundSoundProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fadeVolume = useCallback((from: number, to: number, duration: number) => {
    if (!audioRef.current) return;

    // Clear any existing fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 20; // Number of steps in the fade
    const stepTime = duration / steps;
    const stepSize = (to - from) / steps;
    let currentStep = 0;

    audioRef.current.volume = from;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      
      currentStep++;
      const newVolume = from + (stepSize * currentStep);
      audioRef.current.volume = Math.max(0, Math.min(volume, newVolume));

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        // If we faded to 0, pause the audio
        if (to === 0 && audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, stepTime);
  }, [volume]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isGloballyPlaying) {
          // Fade out then pause
          fadeVolume(volume, 0, FADE_DURATION);
          onPlayStateChange(false);
        } else {
          audioRef.current.volume = 0;
          await audioRef.current.play();
          // Fade in after starting playback
          fadeVolume(0, volume, FADE_DURATION);
          onPlayStateChange(true);
        }
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    }
  };

  // Handle sound source changes with fade effect
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0; // Start silent
      
      const handleError = (e: Event) => {
        console.error('Audio error:', e);
        onPlayStateChange(false);
      };

      audio.addEventListener('error', handleError);

      // If should be playing, start playback with fade
      if (isGloballyPlaying) {
        audio.play().then(() => {
          fadeVolume(0, volume, FADE_DURATION);
        }).catch(error => {
          console.error('Playback failed:', error);
          onPlayStateChange(false);
        });
      }

      return () => {
        // Cleanup: fade out before unmounting
        fadeVolume(audio.volume, 0, FADE_DURATION/2);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [soundPath, isGloballyPlaying, onPlayStateChange, volume, fadeVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src={soundPath}
        loop
        preload="auto"
      />
      {/* Updated button styling with darker background */}
      <div 
        className={`${className}`}
        style={{
          position: 'fixed',
          zIndex: 50,
          top: '2vh',
          right: '2vw'
        }}
      >
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 25px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
        >
          <AudioToggleButton
            isPlaying={isGloballyPlaying}
            onClick={togglePlay}
          />
        </div>
      </div>
    </div>
  );
}; 