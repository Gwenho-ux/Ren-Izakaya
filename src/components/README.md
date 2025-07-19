# Components Documentation

## NeonButton

A reusable neon-styled button component that can be used across the website.

### Usage

```tsx
import { NeonButton } from '@/components/NeonButton';

// Basic button
<NeonButton>Click me</NeonButton>

// As a link
<NeonButton href="/about">Go to About</NeonButton>

// With onClick handler
<NeonButton onClick={() => console.log('clicked')}>
  Click me
</NeonButton>

// Disabled state
<NeonButton disabled>Cannot click</NeonButton>

// As a submit button
<NeonButton type="submit">Submit Form</NeonButton>

// With custom className
<NeonButton className="mt-4">Custom Styled</NeonButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Button content |
| onClick | () => void | - | Click handler |
| className | string | - | Additional CSS classes |
| type | 'button' \| 'submit' \| 'reset' | 'button' | Button type |
| disabled | boolean | false | Disabled state |
| href | string | - | URL (renders as link) |
| target | string | - | Link target |
| rel | string | - | Link rel attribute |

### Styling

The button uses the `neon-button` class which includes:
- Pill shape design
- Gradient border (#BD3533 → #550505 → #BD3533)
- Semi-transparent dark background
- Neon text effect (#FF3E3C)
- Hover animation with glow effect

To modify the styling globally, edit the `.neon-button` class in `src/app/globals.css`. 