import { BackgroundImageProps } from '@/types';

export const BackgroundImage = ({ imagePath }: BackgroundImageProps) => {
  return (
    <div 
      className="absolute inset-0 z-0 w-full h-full"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
      }}
    />
  );
}; 