'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { PageNavigation } from '@/components/PageNavigation';

const DEFAULT_RESPONSE = "The mists are thick today. My vision is clouded, but the meal must go on.";

function HandTransitionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { playLayeredSound } = useSimpleSoundContext();
  const { withSoundEffects } = useSoundEffects();

  // Set cyberpunk background music + cooking layer for hand-transition page
  useEffect(() => {
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/cooking.mp3');
  }, [playLayeredSound]);

  useEffect(() => {
    const preloadResponse = async () => {
      const userInput = searchParams.get('input') || '';
      console.log('Generating AI response for input:', userInput);
      
      try {
        const response = await fetch('/api/generate-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: userInput
          })
        });

        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('AI Response received:', data.answer);
        setAiResponse(data.answer);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        // Generate a more varied fallback response based on input
        const fallbackResponses = [
          "The kitchen holds many secrets. Trust what your heart craves.",
          "Like seasoning a dish, balance is key. Follow your instincts.",
          "Fresh ingredients make the best meals. Your path looks promising.",
          "Sometimes the simplest recipe is the most satisfying.",
          "Good food takes time. Your patience will be rewarded."
        ];
        const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        setAiResponse(randomFallback);
      }
    };

    preloadResponse();
  }, [searchParams]);

  const handleSkip = () => {
    setIsTransitioning(true);
    const userInput = searchParams.get('input');
    // Switch to cyberpunk + restaurant layer for food-transition page
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/restaurant.wav');
    setTimeout(() => {
      router.push(`/food-transition?input=${userInput}&response=${encodeURIComponent(aiResponse || DEFAULT_RESPONSE)}`);
    }, 1000);
  };

  const skipButtonProps = withSoundEffects(handleSkip);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsTransitioning(true);
      const userInput = searchParams.get('input');
      // Switch to cyberpunk + restaurant layer for food-transition page
      playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/restaurant.wav');
      setTimeout(() => {
        router.push(`/food-transition?input=${userInput}&response=${encodeURIComponent(aiResponse || DEFAULT_RESPONSE)}`);
      }, 1000);
    };

    video.addEventListener('ended', handleVideoEnd);
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [router, searchParams, aiResponse, playLayeredSound]);

  return (
    <main className="relative min-h-screen w-full bg-black">
      <div className="absolute inset-0 w-screen h-screen">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            minWidth: '110%',
            minHeight: '110%',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.1)'
          }}
        >
          <source src="/videos/Hand.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Text overlay with gradient */}
      <div className="fixed inset-x-0 bottom-0">
        <div className="w-full h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>
      
      {/* Full Screen Content Container */}
      <div className="fixed inset-0 w-full h-full flex flex-col justify-end items-center z-30 pointer-events-none" style={{ paddingBottom: '3%' }}>
        <div className="flex flex-col items-center gap-4 pointer-events-auto mb-4">
          {/* Responsive Text */}
          <p className="text-white font-pt-mono font-bold text-shadow-xl text-center"
             style={{
               paddingLeft: '3%',
               paddingRight: '3%',
               fontSize: 'clamp(14px, 4vw, 20px)',
               lineHeight: 'clamp(22px, 6vw, 31px)',
               letterSpacing: 'clamp(1px, 0.3vw, 2.2px)'
             }}>
            Ren stirs… listens… something simmers in the silence.
          </p>
          
          {/* Skip Button */}
          <button 
            {...skipButtonProps}
            className="nav-button text-shadow-lg"
          >
            Skip
          </button>
        </div>
      </div>
      
      <PageNavigation />
    </main>
  );
}

export default function HandTransitionPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <HandTransitionContent />
    </Suspense>
  );
} 