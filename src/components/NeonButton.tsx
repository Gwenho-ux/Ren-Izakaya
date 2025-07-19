import { ButtonProps } from '@/types/button';
import { cn } from '@/utils/cn';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';
import Link from 'next/link';

interface NeonButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'square';
}

export const NeonButton = ({ 
  children, 
  onClick, 
  className,
  type = 'button',
  disabled = false,
  href,
  target,
  rel,
  variant = 'primary',
}: NeonButtonProps) => {
  const { playClickSound, playHoverSound } = useSimpleSoundContext();

  const handleClick = () => {
    if (!disabled) {
      playClickSound();
      if (onClick) {
        onClick();
      }
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      playHoverSound();
    }
  };

  const buttonClasses = cn(
    variant === 'secondary' ? "neon-button-secondary" : 
    variant === 'square' ? "neon-button-square" : "neon-button",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        target={target}
        rel={rel}
        onMouseEnter={handleMouseEnter}
        onClick={() => !disabled && playClickSound()}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={buttonClasses}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}; 