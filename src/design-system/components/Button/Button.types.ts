import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

// Base button props
interface BaseButtonProps {
  children: ReactNode;
  variant?: 'neon' | 'neon-secondary' | 'nav' | 'sound';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  enableClickSound?: boolean;
  enableHoverSound?: boolean;
}

// Button as HTML button
interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: 'button';
  href?: never;
  target?: never;
  rel?: never;
}

// Button as link
interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: 'link';
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export interface ButtonVariantStyles {
  base: string;
  variants: {
    neon: string;
    'neon-secondary': string;
    nav: string;
    sound: string;
  };
  sizes: {
    sm: string;
    md: string;
    lg: string;
  };
  states: {
    loading: string;
    disabled: string;
  };
} 