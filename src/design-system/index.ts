// Design System Exports
// This is the main entry point for the design system

// Design Tokens
export { designTokens } from './tokens';
export type { ColorScale, FontSize, Spacing, BorderRadius } from './tokens';

// Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Utilities (we'll add these next)
export { cn } from './utils/cn';
export { getColorValue } from './utils/colors';
export { getSpacingValue } from './utils/spacing';

// Re-export commonly used types
export type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
} from 'react'; 