import React, { useState } from 'react';

interface VideoSequenceProps {
  videos: string[];
  onComplete: () => void;
}

export const VideoSequence: React.FC<VideoSequenceProps> = ({ videos, onComplete }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <video
        key={videos[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain"
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
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
    </div>
  );
}; 