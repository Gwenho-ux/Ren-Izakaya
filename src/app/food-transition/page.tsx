'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultPage } from '@/components/ResultPage';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import { PageNavigation } from '@/components/PageNavigation';

const DEFAULT_RESPONSE = "The mists are thick today. My vision is clouded, but the meal must go on.";

function FoodTransitionContent() {
  const searchParams = useSearchParams();
  const { playLayeredSound } = useSimpleSoundContext();
  const [aiResponse] = useState<string>(
    decodeURIComponent(searchParams.get('response') || '') || DEFAULT_RESPONSE
  );

  // Set cyberpunk background music + restaurant layer for food-transition page
  useEffect(() => {
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/restaurant.wav');
  }, [playLayeredSound]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <ResultPage 
          aiResponse={aiResponse}
        />
      </div>
      
      <PageNavigation />
    </div>
  );
}

export default function FoodTransitionPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <FoodTransitionContent />
    </Suspense>
  );
} 