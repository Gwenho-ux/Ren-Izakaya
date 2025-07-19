import { designTokens } from '../tokens';

/**
 * Get a color value from the design tokens
 * @param colorPath - Dot notation path to the color (e.g., 'primary.500', 'dark.bg')
 * @returns The color value or undefined if not found
 */
export function getColorValue(colorPath: string): string | undefined {
  const pathParts = colorPath.split('.');
  let current: unknown = designTokens.colors;
  
  for (const part of pathParts) {
    if (current && typeof current === 'object' && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * Generate CSS custom properties for colors
 * Useful for creating CSS variables from design tokens
 */
export function generateColorCSSVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  
  function processColors(obj: Record<string, unknown>, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'string') {
        vars[`--color-${varName}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        processColors(value as Record<string, unknown>, varName);
      }
    }
  }
  
  processColors(designTokens.colors);
  return vars;
}

/**
 * Convert hex color to RGB values
 * @param hex - Hex color string (e.g., '#FF3E3C')
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Generate a color with opacity
 * @param color - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function withOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
} 