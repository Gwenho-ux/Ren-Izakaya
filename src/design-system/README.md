# Design System

A comprehensive design system for consistent UI development across the team.

## 🎯 Purpose

This design system provides:
- **Consistency**: Unified visual language across all components
- **Efficiency**: Pre-built components and tokens for faster development
- **Maintainability**: Single source of truth for design decisions
- **Type Safety**: Full TypeScript support for better developer experience

## 📁 Structure

```
src/design-system/
├── tokens.ts              # Design tokens (colors, spacing, typography, etc.)
├── components/             # Reusable UI components
│   └── Button/
│       ├── Button.tsx      # Component implementation
│       ├── Button.types.ts # TypeScript interfaces
│       ├── Button.styles.ts # Style definitions
│       ├── Button.stories.tsx # Documentation/examples
│       └── index.ts        # Exports
├── utils/                  # Utility functions
│   ├── cn.ts              # Class name utility
│   ├── colors.ts          # Color utilities
│   └── spacing.ts         # Spacing utilities
└── index.ts               # Main exports
```

## 🎨 Design Tokens

Design tokens are the foundation of our design system. They define:

### Colors
- **Primary**: Neon red (#FF3E3C) - Main brand color
- **Secondary**: Neon purple (#B537F2) - Secondary actions
- **Accent**: Neon blue (#3B8EEA) - Highlights and accents
- **Neutral**: Grayscale palette for text and backgrounds
- **Dark**: Dark theme specific colors
- **Semantic**: Success, warning, error, info colors

### Typography
- **Font Families**: PT Mono (primary), Geist Sans (secondary)
- **Font Sizes**: xs (12px) to 9xl (128px)
- **Font Weights**: thin (100) to black (900)
- **Line Heights**: none (1) to loose (2)

### Spacing
- **8px Grid System**: All spacing follows 8px increments
- **Scale**: 0 to 64 (0px to 256px)

### Other Tokens
- **Border Radius**: sm (2px) to 3xl (24px)
- **Shadows**: Including neon glow effects
- **Breakpoints**: xs (480px) to 2xl (1536px)
- **Z-Index**: Organized scale for layering

## 🧩 Components

### Button

A versatile button component that can render as a button or link.

```tsx
import { Button } from '@/design-system';

// Basic usage
<Button>Click me</Button>

// Different variants
<Button variant="neon">Neon (Primary)</Button>
<Button variant="neon-secondary">Neon Secondary</Button>
<Button variant="nav">Navigation</Button>
<Button variant="sound">Sound Control</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>

// As a link
<Button as="link" href="/about">Go to About</Button>

// Loading state
<Button loading>Loading...</Button>

// Sound controls
<Button enableClickSound={false}>Silent Button</Button>
```

#### Props
- `variant`: 'neon' | 'neon-secondary' | 'nav' | 'sound'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `leftIcon`, `rightIcon`: ReactNode
- `as`: 'button' | 'link'
- `enableClickSound`, `enableHoverSound`: boolean
- All standard button/anchor attributes

## 🛠 Utilities

### Class Name Utility (cn)
Combines class names with Tailwind CSS class merging:

```tsx
import { cn } from '@/design-system';

const className = cn(
  'base-classes',
  condition && 'conditional-classes',
  'more-classes'
);
```

### Color Utilities
Work with design system colors:

```tsx
import { getColorValue, withOpacity } from '@/design-system';

const primaryColor = getColorValue('primary.500'); // '#FF3E3C'
const transparentRed = withOpacity('#FF3E3C', 0.5); // 'rgba(255, 62, 60, 0.5)'
```

### Spacing Utilities
Work with design system spacing:

```tsx
import { getSpacingValue, getResponsiveSpacing } from '@/design-system';

const spacing = getSpacingValue('4'); // '1rem'
const responsive = getResponsiveSpacing('4', '6', '8'); // 'p-4 sm:p-6 md:p-8'
```

## 📖 Usage Guidelines

### 1. Import from Design System
Always import components and utilities from the design system:

```tsx
// ✅ Good
import { Button, designTokens } from '@/design-system';

// ❌ Avoid
import { Button } from '@/components/Button';
```

### 2. Use Design Tokens
Reference design tokens instead of hardcoded values:

```tsx
// ✅ Good
<div className="text-neon-red bg-dark-bg p-4" />

// ❌ Avoid
<div style={{ color: '#FF3E3C', backgroundColor: '#050408', padding: '16px' }} />
```

### 3. Follow Component Patterns
Use components as designed, extend when necessary:

```tsx
// ✅ Good - Using provided variants
<Button variant="neon" size="lg">Get Started</Button>

// ✅ Good - Extending with additional classes
<Button className="mt-4">Custom Spacing</Button>

// ❌ Avoid - Overriding core styles
<Button style={{ backgroundColor: 'blue' }}>Don't do this</Button>
```

### 4. TypeScript First
Leverage TypeScript for better development experience:

```tsx
// ✅ Good - Full type safety
const handleClick: ButtonProps['onClick'] = (event) => {
  // TypeScript knows the event type
};

<Button onClick={handleClick} variant="primary">
  Typed Button
</Button>
```

## 🔧 Development Workflow

### Adding New Components

1. **Create component directory**:
   ```
   src/design-system/components/NewComponent/
   ├── NewComponent.tsx
   ├── NewComponent.types.ts
   ├── NewComponent.styles.ts
   ├── NewComponent.stories.tsx
   └── index.ts
   ```

2. **Define TypeScript interfaces** in `*.types.ts`
3. **Implement styles** using design tokens in `*.styles.ts`
4. **Create component** in `*.tsx`
5. **Add documentation** in `*.stories.tsx`
6. **Export** in `index.ts`
7. **Update main exports** in `src/design-system/index.ts`

### Updating Design Tokens

1. **Modify** `src/design-system/tokens.ts`
2. **Update Tailwind config** if needed
3. **Test** all components still work
4. **Document** changes in component stories

### Testing Components

Use the stories files for visual testing:
```tsx
// View all component variants
import { Variants } from '@/design-system/components/Button/Button.stories';
```

## 🎯 Best Practices

### For Developers

1. **Always use design tokens** instead of hardcoded values
2. **Prefer composition** over customization
3. **Follow naming conventions** (kebab-case for CSS, camelCase for JS)
4. **Document new components** with stories
5. **Use TypeScript** for type safety

### For Designers

1. **Work within the token system** when possible
2. **Propose token additions** for new design needs
3. **Consider component reusability** when designing
4. **Document design decisions** in component stories

## 🚀 Getting Started

1. **Import the design system**:
   ```tsx
   import { Button, designTokens } from '@/design-system';
   ```

2. **Use components**:
   ```tsx
   <Button variant="neon" size="lg">
     Get Started
   </Button>
   ```

3. **Reference tokens**:
   ```tsx
   const primaryColor = designTokens.colors.primary[500];
   ```

4. **Extend when needed**:
   ```tsx
   <Button className="custom-spacing">
     Extended Button
   </Button>
   ```

## 📚 Resources

- **Component Documentation**: See `*.stories.tsx` files
- **Design Tokens**: `src/design-system/tokens.ts`
- **Utilities**: `src/design-system/utils/`
- **Examples**: Component story files

## 🤝 Contributing

1. **Follow the established patterns**
2. **Add TypeScript types** for everything
3. **Document with stories**
4. **Test thoroughly**
5. **Update this README** when adding major features

---

**Questions?** Check the component stories or ask the team! 