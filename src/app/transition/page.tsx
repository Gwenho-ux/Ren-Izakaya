'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import { PageNavigation } from '@/components/PageNavigation';

export default function TransitionPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playLayeredSound } = useSimpleSoundContext();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsTransitioning(true);
      // Wait for fade to black to complete before navigating
      setTimeout(() => {
        router.push('/wonders');
      }, 1000);
    };

    video.addEventListener('ended', handleVideoEnd);
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [router]);

  // Set cyberpunk background music + inside rain layer for transition page
  useEffect(() => {
    // Set cyberpunk base + inside rain layer when this page loads
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/insiderain.mp3');
  }, [playLayeredSound]);

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
          <source src="/videos/transition1.mp4" type="video/mp4" />
        </video>
      </div>
      
      <PageNavigation />
    </main>
  );
} 