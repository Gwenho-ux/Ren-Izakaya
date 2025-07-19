import { useState, useEffect } from 'react';
import { NeonButton } from '@/components/NeonButton';
import { Modal } from '@/components/Modal';
import { AttributeScale } from './AttributeScale';
import { foods } from '@/data/foods';
import { Food } from '@/types/food';
import { CONTENT } from '@/constants/content';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import Image from 'next/image';

import '@/styles/scrollbar.css';

interface ResultPageProps {
  aiResponse: string;
}

export const ResultPage = ({ aiResponse }: ResultPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [isBreakCycleModalOpen, setIsBreakCycleModalOpen] = useState(false);
  const { withSoundEffects } = useSoundEffects();
  const { playLayeredSound } = useSimpleSoundContext();

  // Get user's original question
  const userQuestion = searchParams.get('input') || '';

  // Select a random food when component mounts
  const [selectedFood] = useState<Food>(() => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
  });

  // Set cyberpunk background music + restaurant layer for result page
  useEffect(() => {
    playLayeredSound('/sounds/cyberpunk.mp3', '/sounds/restaurant.wav');
  }, [playLayeredSound]);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
  };

  const handleVideoError = (e: unknown) => {
    console.error('Video loading error:', e);
    setIsError(true);
  };



  const handleBreakCycleClick = () => {
    setIsBreakCycleModalOpen(true);
  };

  const handleShareFate = () => {
    // Create Twitter share content
    const tweetText = `Just discovered my fate at the Izakaya Between Worlds! 🍜✨

My dish: ${selectedFood.name}
${selectedFood.description}

Ren's wisdom: "${aiResponse}"

#IzakayaBetweenWorlds #Fate #DigitalFortune`;

    // Encode the tweet text for URL
    const encodedTweet = encodeURIComponent(tweetText);

    // Create Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`;

    // Open Twitter in a new window
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const closeModal = () => setIsBreakCycleModalOpen(false);

  const reloadButtonProps = withSoundEffects(() => window.location.reload());
  const breakCycleButtonProps = withSoundEffects(handleBreakCycleClick);
  const shareFateButtonProps = withSoundEffects(handleShareFate);

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Something went wrong. Please try again.</p>
          <button
            {...reloadButtonProps}
            className="nav-button mt-4"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="fixed inset-0 w-screen h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            key={selectedFood.videoPath}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className="absolute top-0 left-0 w-full h-full object-contain"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              objectFit: 'cover',
              objectPosition: 'bottom'
            }}
          >
            <source src={selectedFood.videoPath} type="video/mp4" />
          </video>
        </div>

        {/* Dark overlay for better content visibility */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Ask Again Button - Text button (Both mobile and desktop) */}
        <div className="fixed top-[2vh] right-[3vw] z-30">
          <button
            {...withSoundEffects(() => router.push('/wonders'))}
            className="header-link text-shadow-xl text-bg-dark inline-block w-auto text-center"
            style={{
              color: '#FFF',
              fontFamily: 'PT Mono',
              fontSize: 'clamp(12px, 4vw, 16px)',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '27px',
              letterSpacing: '1.76px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Ask Again
          </button>
        </div>

        {/* Mobile Layout (< 830px) */}
        <div className="max-[830px]:flex hidden flex-col h-screen relative z-20" style={{ paddingTop: 'calc(2vh + 64px + 12px)', paddingBottom: '24px', paddingLeft: '3vw', paddingRight: '3vw' }}>
          {/* Main Content Container */}
          <div className="flex-1 overflow-y-auto" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '20px'
          }}>
            {/* User's Question */}
            {userQuestion && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'PT Mono',
                  fontSize: 'clamp(12px, 4vw, 16px)',
                  fontWeight: 400,
                  lineHeight: '1.5',
                  letterSpacing: '1px',
                  textAlign: 'left'
                }}>
                  Your question: &quot;{userQuestion}&quot;
                </p>
              </div>
            )}

            {/* Ren's Answer */}
            <div style={{ marginBottom: '12px' }}>
              <h2 className="text-[#FF3E3C] font-semibold font-pt-mono mb-2" style={{
                fontSize: 'clamp(12px, 4vw, 16px)',
                textAlign: 'left'
              }}>
                Ren&apos;s Answer
              </h2>
              <p style={{
                color: '#FFF',
                fontFamily: 'PT Mono',
                fontSize: 'clamp(12px, 4vw, 16px)',
                fontWeight: 400,
                lineHeight: '1.5',
                letterSpacing: '1px',
                textAlign: 'left'
              }}>
                &quot;{aiResponse}&quot;
              </p>
            </div>

            {/* Divider */}
            <div className="w-full" style={{ marginBottom: '12px' }}>
              <div style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.5)',
                opacity: 0.7
              }} />
            </div>

            {/* Food Details */}
            <div style={{ marginBottom: '12px' }}>
              {/* Food Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Image
                  src={`/images/${selectedFood.id}.png`}
                  alt={selectedFood.name}
                  width={300}
                  height={300}
                  style={{
                    height: '300px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h2 className="text-[#FF3E3C] font-semibold font-pt-mono" style={{
                fontSize: 'clamp(12px, 4vw, 16px)',
                textAlign: 'left',
                marginBottom: '12px'
              }}>
                {selectedFood.type}
              </h2>
              <h1 className="text-white font-['Public Sans'] font-black" style={{
                fontSize: '24px',
                lineHeight: '1.2',
                textAlign: 'left',
                marginBottom: '12px'
              }}>
                {selectedFood.name}
              </h1>
              <p style={{
                color: '#FFF',
                fontFamily: 'PT Mono',
                fontSize: 'clamp(12px, 4vw, 16px)',
                fontWeight: 400,
                lineHeight: '1.5',
                letterSpacing: '1px',
                textAlign: 'left',
                margin: 0
              }}>
                {selectedFood.description}
              </p>
            </div>

            {/* Attributes */}
            <div style={{ marginBottom: '12px' }}>
              <h2 className="text-[#FF3E3C] font-semibold font-pt-mono mb-2" style={{
                fontSize: 'clamp(12px, 4vw, 16px)',
                textAlign: 'left'
              }}>
                Attributes
              </h2>
              <div className="space-y-2">
                <AttributeScale leftLabel="Bitter" rightLabel="Sweet" value={selectedFood.attributes.taste} />
                <AttributeScale leftLabel="Cold" rightLabel="Hot" value={selectedFood.attributes.temperature} />
                <AttributeScale leftLabel="Common" rightLabel="Rare" value={selectedFood.attributes.rarity} />
              </div>
            </div>
          </div>

          {/* Action Buttons for Mobile */}
          <div style={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'stretch',
            paddingRight: '4px'
          }}>
            <div style={{ fontSize: '11px', flex: 1, minWidth: 0 }}>
              <NeonButton
                {...breakCycleButtonProps}
                className="w-full text-center flex items-center justify-center text-xs"
              >
                Break Your Cycle
              </NeonButton>
            </div>
            <div style={{ flexShrink: 0 }}>
              <NeonButton
                {...shareFateButtonProps}
                variant="square"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.025 0.655762H13.172L8.482 6.02976L14 13.3438H9.68L6.294 8.90876L2.424 13.3438H0.275L5.291 7.59376L0 0.656762H4.43L7.486 4.70976L11.025 0.655762ZM10.27 12.0558H11.46L3.78 1.87676H2.504L10.27 12.0558Z" fill="currentColor" />
                </svg>
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Desktop Layout (>= 830px) */}
        <div className="min-[830px]:block hidden">
          {/* Scrollable Content Container */}
          <div style={{
            position: 'fixed',
            top: 'calc(2vh + 64px)',
            right: '3vw',
            bottom: '140px',
            width: '650px',
            zIndex: 20,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div
              className="w-full overflow-y-auto"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
                alignItems: 'flex-end',
                position: 'relative',
                zIndex: 1,
                padding: '40px',
                borderRadius: '20px'
              }}
            >
              {/* Blurred edge background */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  zIndex: -1,
                  mask: `
                    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
                    linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
                  `,
                  WebkitMask: `
                    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
                    linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
                  `,
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />

              {/* Additional soft edge blur */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '-20px',
                  bottom: '-20px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  filter: 'blur(20px)',
                  borderRadius: '40px',
                  zIndex: -2
                }}
              />

              {/* 1. User's Question Section */}
              {userQuestion && (
                <div className="w-full flex flex-col gap-[0px]" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/70 blur-[46.7px]" style={{ borderRadius: '20px' }} />
                    <div className="relative w-full flex flex-col gap-[0px] bg-black/60 backdrop-blur-sm p-3" style={{ borderRadius: '20px' }}>
                      <p className="text-right" style={{
                        marginTop: '6px',
                        marginBottom: '6px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'PT Mono',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '27px',
                        letterSpacing: '1.76px'
                      }}>
                        Your question: &quot;{userQuestion}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Ren's Answer Section */}
              <div className="w-full flex flex-col gap-[0px]" style={{ marginTop: '8px', marginBottom: '8px' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-black/70 blur-[46.7px]" style={{ borderRadius: '20px' }} />
                  <div className="relative w-full flex flex-col gap-[0px] bg-black/60 backdrop-blur-sm p-3" style={{ borderRadius: '20px' }}>
                    <h2 className="text-[#FF3E3C] text-sm md:text-base font-semibold font-pt-mono text-right" style={{ marginTop: '6px', marginBottom: '6px' }}>
                      Ren&apos;s Answer
                    </h2>
                    <p className="text-right" style={{
                      marginTop: '6px',
                      marginBottom: '6px',
                      color: '#FFF',
                      fontFamily: 'PT Mono',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '27px',
                      letterSpacing: '1.76px'
                    }}>
                      &quot;{aiResponse}&quot;
                    </p>
                    <p className="text-right italic" style={{
                      marginTop: '4px',
                      marginBottom: '6px',
                      color: '#FFF',
                      fontFamily: 'PT Mono',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '27px',
                      letterSpacing: '1.76px'
                    }}>
                      Here&apos;s what I got you...
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Divider Line */}
              <div className="w-full" style={{ marginTop: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '100%',
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  opacity: 0.7
                }} />
              </div>

              {/* 4. Food Details Section */}
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                textAlign: 'right',
                marginTop: '8px',
                marginBottom: '8px'
              }}>
                <h2 className="text-[#FF3E3C] text-sm md:text-base font-semibold font-pt-mono text-right" style={{ marginTop: '6px', marginBottom: '6px' }}>
                  {selectedFood.type}
                </h2>
                <h1 className="text-white font-['Public Sans'] text-[32px] md:text-[40px] font-black leading-[34px] md:leading-[42px] tracking-[2.5px] md:tracking-[3.5px] bg-transparent text-right" style={{ marginTop: '6px', marginBottom: '6px' }}>
                  {selectedFood.name}
                </h1>
                <p className="text-right" style={{
                  marginTop: '6px',
                  marginBottom: '8px',
                  color: '#FFF',
                  fontFamily: 'PT Mono',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '27px',
                  letterSpacing: '1.76px'
                }}>
                  {selectedFood.description}
                </p>
              </div>

              {/* 4. Attributes Section */}
              <div className="relative w-full" style={{ marginTop: '8px', marginBottom: '8px' }}>
                <div className="absolute inset-0 bg-black/70 blur-[46.7px]" style={{ borderRadius: '20px' }} />
                <div className="relative w-full bg-black/60 backdrop-blur-sm p-3" style={{ borderRadius: '20px' }}>
                  {/* Section Title */}
                  <h2 className="text-[#FF3E3C] text-sm md:text-base font-semibold font-pt-mono text-right" style={{ marginTop: '6px', marginBottom: '8px' }}>
                    Attributes
                  </h2>

                  {/* Attributes Grid */}
                  <div style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr'
                  }}>
                    <AttributeScale leftLabel="Bitter" rightLabel="Sweet" value={selectedFood.attributes.taste} />
                    <AttributeScale leftLabel="Cold" rightLabel="Hot" value={selectedFood.attributes.temperature} />
                    <AttributeScale leftLabel="Common" rightLabel="Rare" value={selectedFood.attributes.rarity} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Fixed Action Buttons for Desktop */}
          <div style={{
            position: 'fixed',
            bottom: '40px',
            right: '3vw',
            width: '650px',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 30
          }}>
            <div className="flex items-center gap-[16px]">
              <NeonButton {...breakCycleButtonProps} className="text-[14px] px-[28px] py-[12px] text-center whitespace-nowrap flex items-center gap-2 min-w-[180px]">
                Break Your Cycle              </NeonButton>
              <NeonButton {...shareFateButtonProps} variant="secondary" className="text-[14px] px-[28px] py-[12px] text-center min-w-[180px]">
                Share Your Fate
              </NeonButton>
            </div>
          </div>
        </div>
      </main>

      {/* Break Your Cycle Modal */}
      <Modal
        isOpen={isBreakCycleModalOpen}
        onClose={closeModal}
        title={CONTENT.modals.breakYourCycle.title}
        content={CONTENT.modals.breakYourCycle.content}
        buttonText={CONTENT.modals.breakYourCycle.buttonText}
        buttonUrl={CONTENT.modals.breakYourCycle.buttonUrl}
      />
    </>
  );
}; 