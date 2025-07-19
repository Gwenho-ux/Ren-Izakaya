import React, { useEffect } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, children }) => {
  const { withSoundEffects } = useSoundEffects();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const closeButtonProps = withSoundEffects(onClose);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-[99999]"
      style={{
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'auto'
      }}
    >
      {/* Black Overlay Backdrop */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(2px)',
          zIndex: 1
        }}
        onClick={onClose}
      />

      {/* Modal Content - PERFECTLY CENTERED */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          width: '734px',
          height: '325px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          padding: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '5px',
          border: '1px solid #CF6261',
          background: 'linear-gradient(90deg, #000 0%, #331110 100%)',
          zIndex: 2
        }}
      >
        {/* Close Button - Top Right Corner */}
        <button
          {...closeButtonProps}
          className="absolute text-[#CF6261] hover:text-red-400 transition-colors font-bold leading-none"
          style={{
            top: '15px',
            right: '15px',
            fontSize: '24px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 3
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Title with top spacing */}
        <h2 
          className="text-center font-pt-mono font-bold"
          style={{
            color: 'red',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '31px',
            letterSpacing: '2.2px',
            margin: '20px 40px 10px 0', // Added 20px top margin for spacing
            paddingTop: '10px' // Additional top padding
          }}
        >
          {title}
        </h2>

        {/* Content */}
        <div 
          className="text-center font-pt-mono whitespace-pre-line overflow-y-auto"
          style={{
            color: '#FFF',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '31px',
            letterSpacing: '1.98px',
            padding: '0 20px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {content}
        </div>

        {/* Additional children content */}
        {children}
      </div>
    </div>
  );
}; 