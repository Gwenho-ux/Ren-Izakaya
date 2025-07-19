import React, { forwardRef } from 'react';
import Link from 'next/link';
import { ButtonProps } from './Button.types';
import { getButtonClasses } from './Button.styles';
import { useSimpleSoundContext } from '@/contexts/SimpleSoundContext';

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({
  children,
  variant = 'neon',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  enableClickSound = true,
  enableHoverSound = true,
  ...props
}, ref) => {
  const { playClickSound, playHoverSound } = useSimpleSoundContext();
  const buttonClasses = getButtonClasses(
    variant,
    size,
    fullWidth,
    loading,
    props.disabled,
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!props.disabled && !loading && enableClickSound) {
      playClickSound();
    }
    if (props.onClick) {
      // Type assertion needed for polymorphic component
      (props.onClick as (event: React.MouseEvent<HTMLElement>) => void)(event);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!props.disabled && !loading && enableHoverSound) {
      playHoverSound();
    }
    if (props.onMouseEnter) {
      // Type assertion needed for polymorphic component
      (props.onMouseEnter as (event: React.MouseEvent<HTMLElement>) => void)(event);
    }
  };

  // Render as link
  if (props.as === 'link') {
    const { href, target, rel, ...linkProps } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...linkProps}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </Link>
    );
  }

  // Render as button
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, ...buttonProps } = props;
  return (
    <button
      className={buttonClasses}
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={loading || props.disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...buttonProps}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </button>
  );
});

Button.displayName = 'Button'; 