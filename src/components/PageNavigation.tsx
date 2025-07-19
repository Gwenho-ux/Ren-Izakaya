'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaPlay, FaPause } from 'react-icons/fa';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const PageNavigation = () => {
  const router = useRouter();
  const { isPlaying, toggleSound, playClickSound, playHoverSound } = useSimpleSoundContext();
  const { withSoundEffects } = useSoundEffects();

  const handleGoHome = () => {
    router.push('/');
  };

  const homeButtonProps = withSoundEffects(handleGoHome);

  return (
    <>
      {/* Home Button - Top Left */}
      <div 
        style={{
          position: 'fixed',
          zIndex: 50,
          top: '2vh',
          left: '2vw'
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
          <button 
            {...homeButtonProps}
            style={{
              background: 'none',
              border: 'none',
              padding: '12px',
              cursor: 'pointer',
              color: 'white',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              playHoverSound();
              e.currentTarget.style.color = '#CB9191';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            <FaHome style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>

      {/* Sound Button - Next to Home Button */}
      <div 
        style={{
          position: 'fixed',
          zIndex: 50,
          top: '2vh',
          left: 'calc(2vw + 48px + 16px)' // 2vw (home button left) + 48px (home button width) + 16px (gap)
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
          <button 
            onClick={() => {
              playClickSound();
              toggleSound();
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '12px',
              cursor: 'pointer',
              color: 'white',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              playHoverSound();
              e.currentTarget.style.color = '#CB9191';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            {isPlaying ? (
              <FaPause style={{ width: '16px', height: '16px' }} />
            ) : (
              <FaPlay style={{ width: '16px', height: '16px' }} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}; 