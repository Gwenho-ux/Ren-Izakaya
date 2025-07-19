'use client';

import { NeonButton } from '@/components/NeonButton';
import { Modal } from '@/components/Modal';
import { PageNavigation } from '@/components/PageNavigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { CONTENT } from '@/constants/content';

export default function WondersPage() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { playLayeredSound } = useSimpleSoundContext();
  const { withSoundEffects } = useSoundEffects();

  // Set cyberpunk background music + inside rain layer for wonders page
  useEffect(() => {
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/insiderain.mp3');
  }, [playLayeredSound]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleWhisper = () => {
    if (!inputText.trim()) return;
    // Switch to cyberpunk + cooking layer for hand-transition page
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/cooking.mp3');
    // Navigate to hand transition with the input text as a query parameter
    router.push(`/hand-transition?input=${encodeURIComponent(inputText.trim())}`);
  };

  const openModal = (modalName: string) => () => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const whoAreYouProps = withSoundEffects(openModal('whoAreYou'));
  const whatShouldIDoProps = withSoundEffects(openModal('whatShouldIDo'));
  const { withTypingSound } = useSoundEffects();
  const inputProps = withTypingSound(handleInputChange);

  return (
    <main className="fixed inset-0 w-screen h-screen bg-dark overflow-hidden">
      <PageNavigation />

      {/* Background Video */}
      <div className="fixed inset-0 w-screen h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <source src="/videos/man.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/30 z-10" />

      {/* Content Container - Positioned at bottom of screen */}
      <div className="w-full h-full flex flex-col justify-end items-center">
        <div className="mb-4 w-[631px] max-w-[90vw]" style={{ marginBottom: '3%' }}>
          {/* Interaction Section */}
          <div className="w-full flex flex-col items-center gap-[24px]">
            {/* Quote Section - moved above buttons */}
            <div className="w-full max-w-[688px] px-4 md:px-8 lg:px-16">
              <div className="relative">
                <div className="absolute inset-0 bg-black/70 blur-[46.7px] rounded-lg" />
                <div className="absolute inset-0 bg-black/30 rounded-lg" />
                <p className="relative text-white text-center font-pt-mono text-[14px] font-bold leading-[22px] tracking-[1.5px] p-4 md:p-6 lg:p-8 text-shadow-xl" style={{ fontSize: '16px', fontWeight: '700' }}>
                  {CONTENT.wonders.quote}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="w-full px-4 md:px-8 lg:px-16 flex flex-row justify-between items-center">
              <button 
                {...whoAreYouProps}
                className="me-4 quick-action-button flex-1 bg-black/50 text-[#FF3E3C] text-shadow-lg"
                style={{ marginRight: '10px' }}
              >
                {CONTENT.wonders.quickActions[0]}
              </button>
              <button 
                {...whatShouldIDoProps}
                className="quick-action-button flex-1 bg-black/50 text-[#FF3E3C] text-shadow-lg"
              >
                {CONTENT.wonders.quickActions[1]}
              </button>

            </div>

            {/* Question Input */}
            <div className="w-full px-4 md:px-8 lg:px-16">
              <div className="w-full flex py-[19px] items-center gap-[10px] flex-shrink-0 self-stretch rounded-[5px] input-gradient-border">
                <input
                  type="text"
                  placeholder={CONTENT.wonders.inputPlaceholder}
                  value={inputText}
                  {...inputProps}
                  style={{ color: '#FFFFFF'}}
                  className="w-full px-[41px] bg-transparent text-white text-center font-pt-mono leading-[31px] tracking-[2.2px] outline-none appearance-none border-none focus:ring-0 focus:outline-none placeholder:text-[#BEABAC] placeholder:text-[16px] placeholder:font-bold placeholder:font-pt-mono placeholder:leading-[22px] placeholder:tracking-[1.5px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputText.trim()) {
                      handleWhisper();
                    }
                  }}
                />
              </div>
            </div>

            {/* Whisper Button */}
            <div className="w-full flex justify-center">
              <NeonButton disabled={!inputText.trim()} onClick={handleWhisper}>
                <span className="text-shadow-lg">{CONTENT.wonders.whisperButton}</span>
              </NeonButton>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'whoAreYou'}
        onClose={closeModal}
        title={CONTENT.modals.whoAreYou.title}
        content={CONTENT.modals.whoAreYou.content}
      />
      
      <Modal
        isOpen={activeModal === 'whatShouldIDo'}
        onClose={closeModal}
        title={CONTENT.modals.whatShouldIDo.title}
        content={CONTENT.modals.whatShouldIDo.content}
      />
    </main>
  );
} 