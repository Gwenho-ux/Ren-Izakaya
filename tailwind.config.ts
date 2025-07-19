import type { Config } from 'tailwindcss'
import { designTokens } from './src/design-system/tokens'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-4xl', 'sm:text-5xl', 'md:text-6xl',
    'text-3xl', 'sm:text-4xl', 'md:text-5xl',
    'text-2xl', 'sm:text-3xl', 'md:text-4xl',
    'text-xl', 'sm:text-2xl'
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'pt-mono': ['PT Mono', 'monospace'],
        'geist-sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        'sans': ['PT Mono', 'monospace'],
        'mono': ['PT Mono', 'monospace'],
      },
      colors: {
        'neon-red': '#FF3E3C',
        'neon-purple': '#B537F2',
        'neon-blue': '#3B8EEA',
        'dark-bg': '#050408',
        'dark-bg-2': '#090108',
        'input-placeholder': '#BEABAC',
        'input-text': '#FFFFFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(to right, #FF3E3C, #B537F2, #3B8EEA)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px 0 rgba(255, 62, 60, 0.5)',
            opacity: '0.8'
          },
          '50%': { 
            boxShadow: '0 0 20px 5px rgba(255, 62, 60, 0.7)', 
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-in-out',
        'slide-up': 'slide-up 500ms ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
} as Config;

export default config 