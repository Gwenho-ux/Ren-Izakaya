import React from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  enableClickSound?: boolean;
  enableHoverSound?: boolean;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  children,
  onClick,
  onMouseEnter,
  enableClickSound = true,
  enableHoverSound = true,
  ...props
}) => {
  const { withSoundEffects } = useSoundEffects();
  
  const soundProps = withSoundEffects(
    enableClickSound ? onClick : undefined,
    enableHoverSound ? onMouseEnter : undefined
  );

  return (
    <button
      {...props}
      {...(enableClickSound || enableHoverSound ? soundProps : { onClick, onMouseEnter })}
    >
      {children}
    </button>
  );
}; 