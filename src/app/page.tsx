'use client';

import { VideoBackground } from '@/components/VideoBackground';
import { Modal } from '@/components/Modal';
import { LandingPageContent } from '@/components/LandingPageContent';
import { DecorativeElements } from '@/components/DecorativeElements';
import { PageNavigation } from '@/components/PageNavigation';
import { CONTENT } from '@/constants/content';
import { useRouter } from 'next/navigation';
import { useLandingPageAudio } from '@/hooks/useLandingPageAudio';
import { useWhyAmIHereModal } from '@/hooks/useWhyAmIHereModal';

export default function Home() {
  const router = useRouter();
  
  // Custom hooks for audio and modal management
  const { playTransitionMusic } = useLandingPageAudio();
  const { isOpen: isWhyAmIHereOpen, openModal, closeModal } = useWhyAmIHereModal();

  const handleTransition = () => {
    playTransitionMusic();
    router.push('/transition');
  };

  return (
    <>
      <main className="fixed inset-0 w-full h-full overflow-hidden max-w-full">
        <VideoBackground videoPath="/videos/background.mp4" />
        
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center h-screen">
            <LandingPageContent 
              onTransition={handleTransition}
              onOpenModal={openModal}
            />
            <DecorativeElements />
          </div>
        </div>
        
        <PageNavigation />
      </main>

      <Modal
        isOpen={isWhyAmIHereOpen}
        onClose={closeModal}
        title={CONTENT.modals.whyAmIHere.title}
        content={CONTENT.modals.whyAmIHere.content}
      />
    </>
  );
}
