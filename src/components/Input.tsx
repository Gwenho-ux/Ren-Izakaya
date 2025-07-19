import { InputHTMLAttributes } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  enableTypingSound?: boolean;
}

export const Input = ({ 
  className = '', 
  enableTypingSound = true, 
  onChange,
  ...props 
}: InputProps) => {
  const { withTypingSound } = useSoundEffects();
  
  const inputProps = enableTypingSound && onChange 
    ? withTypingSound(onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)
    : { onChange };

  return (
    <input
      className={`w-full bg-transparent text-input-text placeholder:text-input-placeholder focus:outline-none ${className}`}
      {...props}
      {...inputProps}
    />
  );
}; 