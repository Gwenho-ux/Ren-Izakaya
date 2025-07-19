interface HandVideoPageProps {
  onComplete: () => void;
}

export const HandVideoPage = ({ onComplete }: HandVideoPageProps) => {
  return (
    <div className="relative w-full h-full">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-contain transition-opacity duration-1000"
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
        src="/videos/Hand.mp4"
      />
      <div className="absolute inset-x-0 bottom-0">
        <div className="w-full h-[200px] bg-gradient-to-t from-black to-transparent" />
        <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white whitespace-nowrap font-pt-mono text-[20px] font-bold leading-[31px] tracking-[2.2px] text-shadow-xl">
          Ren stirs… listens… something simmers in the silence.
        </p>
      </div>
    </div>
  );
}; 