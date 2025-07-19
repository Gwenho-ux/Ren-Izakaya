import { ButtonVariantStyles } from './Button.types';

export const buttonStyles: ButtonVariantStyles = {
  base: `
    inline-flex items-center justify-center
    font-mono font-bold transition-all duration-300
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    relative cursor-pointer
    border-2 rounded-[5px]
  `,
  
  variants: {
    neon: `
      neon-button
    `,
    
    'neon-secondary': `
      neon-button-secondary
    `,
    
    nav: `
      nav-button
    `,
    
    sound: `
      bg-black/52 border-gray-600
      text-neon-red font-mono font-bold
      hover:bg-black/70 hover:text-red-400
      transition-all duration-300
      text-base tracking-wider
    `,
  },
  
  sizes: {
    sm: 'px-4 py-2 text-sm min-w-[200px]',
    md: 'px-12 py-4 text-xl min-w-[320px]',
    lg: 'px-16 py-6 text-2xl min-w-[400px]',
  },
  
  states: {
    loading: 'cursor-wait',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  },
};

// Utility function to combine styles
export const getButtonClasses = (
  variant: keyof typeof buttonStyles.variants = 'neon',
  size: keyof typeof buttonStyles.sizes = 'md',
  fullWidth?: boolean,
  loading?: boolean,
  disabled?: boolean,
  className?: string
): string => {
  const classes = [
    buttonStyles.base,
    buttonStyles.variants[variant],
    buttonStyles.sizes[size],
    fullWidth && 'w-full',
    loading && buttonStyles.states.loading,
    disabled && buttonStyles.states.disabled,
    className,
  ].filter(Boolean);
  
  return classes.join(' ');
}; 