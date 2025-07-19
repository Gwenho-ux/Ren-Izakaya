'use client';

import { useState, useEffect } from 'react';

interface AudioEnableOverlayProps {
  show: boolean;
  onEnable: () => void;
}

export const AudioEnableOverlay = ({ show, onEnable }: AudioEnableOverlayProps) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  if (!isVisible) return null;

  const handleClick = () => {
    setIsVisible(false);
    onEnable();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
      onClick={handleClick}
    >
      <div className="bg-black/80 border border-white/20 rounded-lg p-6 text-center max-w-md mx-4">
        <div className="text-white mb-4">
          <div className="text-2xl mb-2">🔊</div>
          <h3 className="text-lg font-pt-mono mb-2">Enable Audio</h3>
          <p className="text-sm text-white/80">
            Click anywhere to enable sound and music
          </p>
        </div>
        <button 
          onClick={handleClick}
          className="nav-button"
        >
          Enable Sound
        </button>
      </div>
    </div>
  );
}; 