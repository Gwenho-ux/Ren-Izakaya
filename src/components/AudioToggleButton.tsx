import React from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface AudioToggleButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  className?: string;
}

export const AudioToggleButton: React.FC<AudioToggleButtonProps> = ({
  isPlaying,
  onClick,
  className = ''
}) => {
  const { withSoundEffects } = useSoundEffects();
  const buttonProps = withSoundEffects(onClick);

  return (
    <button
      {...buttonProps}
      className={`audio-toggle-button ${className}`}
      aria-label={isPlaying ? 'Pause Sound' : 'Play Sound'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

// These are placeholder SVGs - replace with your custom SVGs
const PlayIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="md:w-6 md:h-6"
  >
    {/* Add your play icon SVG path here */}
    <path 
      d="M8 5v14l11-7z" 
      fill="currentColor"
    />
  </svg>
);

const PauseIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="md:w-6 md:h-6"
  >
    {/* Add your pause icon SVG path here */}
    <path 
      d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" 
      fill="currentColor"
    />
  </svg>
); 