'use client';

import { BlurOverlay } from '@/components/BlurOverlay';
import { NeonButton } from '@/components/NeonButton';
import { CONTENT } from '@/constants/content';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface LandingPageContentProps {
  onTransition: () => void;
  onOpenModal: () => void;
}

export const LandingPageContent = ({ onTransition, onOpenModal }: LandingPageContentProps) => {
  const { withSoundEffects } = useSoundEffects();
  
  const whyAmIHereProps = withSoundEffects(onOpenModal);

  return (
    <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 z-20 w-full max-w-[700px] px-6 md:px-12 lg:px-16">
      <div className="flex flex-col items-center w-full" style={{ gap: '24px' }}>
        {/* Description Text */}
        <div className="relative w-full px-4 md:px-8">
          <BlurOverlay className="rounded-lg -z-10" />
          <div className="text-bg-dark rounded-lg" style={{ width: '100%', boxSizing: 'border-box', padding: '24px' }}>
            <p className="description-text" style={{ 
              fontWeight: 'bold',
              fontSize: 'clamp(12px, 4vw, 16px)',
              textAlign: 'center', 
              lineHeight: '1.55em', 
              letterSpacing: '0.11em',
              margin: 0,
              width: '100%',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal'
            }}>
              {CONTENT.main.description}
            </p>
          </div>
        </div>

        {/* Enter with wonders button */}
        <div onClick={onTransition}>
          <NeonButton>
            <span className="text-shadow-xl">{CONTENT.main.buttonText}</span>
          </NeonButton>
        </div>

        {/* Why Am I Here button */}
        <button 
          className="header-link text-shadow-xl text-bg-dark inline-block w-auto text-center"
          {...whyAmIHereProps}
        >
          Why Am I Here?
        </button>
      </div>
    </div>
  );
}; 