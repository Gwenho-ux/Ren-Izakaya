import { FC } from 'react';

interface VideoBackgroundProps {
  videoPath: string;
}

export const VideoBackground: FC<VideoBackgroundProps> = ({ videoPath }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        style={{
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <source src={videoPath} type="video/mp4" />
      </video>
      {/* Optional overlay to adjust video brightness/contrast */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}; 