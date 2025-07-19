// Design Tokens - Single source of truth for all design decisions
// This file should be the only place where design values are defined

export const designTokens = {
  // Color System
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#FFF5F5',
      100: '#FED7D7',
      200: '#FEB2B2',
      300: '#FC8181',
      400: '#F56565',
      500: '#FF3E3C', // Main neon red
      600: '#E53E3E',
      700: '#C53030',
      800: '#9B2C2C',
      900: '#742A2A',
    },
    
    // Secondary Colors
    secondary: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#B537F2', // Neon purple
      600: '#805AD5',
      700: '#6B46C1',
      800: '#553C9A',
      900: '#44337A',
    },
    
    // Accent Colors
    accent: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3B8EEA', // Neon blue
      600: '#3182CE',
      700: '#2B77CB',
      800: '#2C5282',
      900: '#2A4365',
    },
    
    // Neutral Colors
    neutral: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
    },
    
    // Dark Theme Colors
    dark: {
      bg: '#050408',
      'bg-secondary': '#090108',
      'bg-tertiary': '#0F0B0F',
      surface: '#1A1625',
      'surface-hover': '#252032',
      border: '#2D2438',
      text: '#FFFFFF',
      'text-secondary': '#BEABAC',
      'text-muted': '#8B7A8C',
    },
    
    // Semantic Colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  
  // Typography System
  typography: {
    fontFamilies: {
      primary: ['PT Mono', 'monospace'],
      secondary: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'monospace'],
    },
    
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem',    // 96px
      '9xl': '8rem',    // 128px
    },
    
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // Spacing System (8px grid)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    
    // Neon Glows
    neon: {
      red: '0 0 20px rgba(255, 62, 60, 0.5)',
      purple: '0 0 20px rgba(181, 55, 242, 0.5)',
      blue: '0 0 20px rgba(59, 142, 234, 0.5)',
    },
  },
  
  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Animation & Transitions
  animations: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    
    easings: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// Type exports for TypeScript
export type ColorScale = typeof designTokens.colors.primary;
export type FontSize = keyof typeof designTokens.typography.fontSizes;
export type Spacing = keyof typeof designTokens.spacing;
export type BorderRadius = keyof typeof designTokens.borderRadius; 