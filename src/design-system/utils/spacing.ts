import { designTokens } from '../tokens';

/**
 * Get a spacing value from the design tokens
 * @param spacingKey - Key from the spacing scale (e.g., '4', '8', '16')
 * @returns The spacing value or undefined if not found
 */
export function getSpacingValue(spacingKey: string): string | undefined {
  const spacing = designTokens.spacing as Record<string, string>;
  return spacing[spacingKey];
}

/**
 * Convert spacing token to CSS custom property
 * @param spacingKey - Key from the spacing scale
 * @returns CSS custom property string
 */
export function spacingToCSSVar(spacingKey: string): string {
  return `var(--spacing-${spacingKey})`;
}

/**
 * Generate CSS custom properties for spacing
 * Useful for creating CSS variables from design tokens
 */
export function generateSpacingCSSVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(designTokens.spacing)) {
    vars[`--spacing-${key}`] = value;
  }
  
  return vars;
}

/**
 * Get responsive spacing classes for Tailwind
 * @param base - Base spacing key
 * @param sm - Small screen spacing key (optional)
 * @param md - Medium screen spacing key (optional)
 * @param lg - Large screen spacing key (optional)
 * @returns Tailwind responsive spacing classes
 */
export function getResponsiveSpacing(
  base: string,
  sm?: string,
  md?: string,
  lg?: string
): string {
  const classes = [`p-${base}`];
  
  if (sm) classes.push(`sm:p-${sm}`);
  if (md) classes.push(`md:p-${md}`);
  if (lg) classes.push(`lg:p-${lg}`);
  
  return classes.join(' ');
}

/**
 * Convert rem values to pixels (assuming 16px base)
 * @param remValue - Value in rem (e.g., '1.5rem')
 * @returns Value in pixels
 */
export function remToPx(remValue: string): number {
  const numValue = parseFloat(remValue.replace('rem', ''));
  return numValue * 16;
}

/**
 * Convert pixels to rem values (assuming 16px base)
 * @param pxValue - Value in pixels
 * @returns Value in rem
 */
export function pxToRem(pxValue: number): string {
  return `${pxValue / 16}rem`;
} 