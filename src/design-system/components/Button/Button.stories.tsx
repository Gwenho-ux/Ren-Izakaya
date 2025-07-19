import React from 'react';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

// This file serves as both documentation and testing for the Button component
// It can be used with Storybook or as a standalone documentation page

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component that can render as a button or link with multiple variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neon', 'neon-secondary', 'nav', 'sound'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width of its container',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
  },
};

export default meta;

// Default story
export const Default = {
  args: {
    children: 'Button',
    variant: 'neon',
    size: 'md',
  } as ButtonProps,
};

// All variants
export const Variants = () => (
  <div className="space-y-4 p-6 bg-dark-bg">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Button Variants</h3>
      <div className="flex flex-wrap gap-4">
        <Button variant="neon">Neon</Button>
        <Button variant="neon-secondary">Neon Secondary</Button>
        <Button variant="nav">Navigation</Button>
        <Button variant="sound">Sound</Button>
      </div>
    </div>
  </div>
);

// All sizes
export const Sizes = () => (
  <div className="space-y-4 p-6 bg-dark-bg">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Button Sizes</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  </div>
);

// With icons
export const WithIcons = () => (
  <div className="space-y-4 p-6 bg-dark-bg">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Buttons with Icons</h3>
      <div className="flex flex-wrap gap-4">
        <Button 
          leftIcon={<span>←</span>}
          variant="neon"
        >
          Back
        </Button>
        <Button 
          rightIcon={<span>→</span>}
          variant="neon-secondary"
        >
          Next
        </Button>
        <Button 
          leftIcon={<span>+</span>}
          rightIcon={<span>→</span>}
          variant="nav"
        >
          Add Item
        </Button>
      </div>
    </div>
  </div>
);

// States
export const States = () => (
  <div className="space-y-4 p-6 bg-dark-bg">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Button States</h3>
      <div className="flex flex-wrap gap-4">
        <Button>Normal</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button loading disabled>Loading + Disabled</Button>
      </div>
    </div>
  </div>
);

// As links
export const AsLinks = () => (
  <div className="space-y-4 p-6 bg-dark-bg">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Buttons as Links</h3>
      <div className="flex flex-wrap gap-4">
        <Button as="link" href="/about" variant="neon">
          Internal Link
        </Button>
        <Button 
          as="link" 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="neon-secondary"
        >
          External Link
        </Button>
      </div>
    </div>
  </div>
);

// Full width
export const FullWidth = () => (
  <div className="space-y-4 p-6 bg-dark-bg max-w-md">
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Full Width Buttons</h3>
      <div className="space-y-2">
        <Button fullWidth variant="neon">
          Full Width Neon
        </Button>
        <Button fullWidth variant="neon-secondary">
          Full Width Neon Secondary
        </Button>
      </div>
    </div>
  </div>
);

// Usage examples
export const UsageExamples = () => (
  <div className="space-y-6 p-6 bg-dark-bg">
    <div className="space-y-4">
      <h3 className="text-white text-xl font-semibold">Common Usage Patterns</h3>
      
      {/* Form buttons */}
      <div className="space-y-2">
        <h4 className="text-white text-lg">Form Actions</h4>
        <div className="flex gap-2">
          <Button type="submit" variant="neon">
            Save Changes
          </Button>
          <Button type="button" variant="nav">
            Cancel
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-2">
        <h4 className="text-white text-lg">Navigation</h4>
        <div className="flex gap-2">
          <Button as="link" href="/dashboard" variant="neon">
            Go to Dashboard
          </Button>
          <Button as="link" href="/settings" variant="nav">
            Settings
          </Button>
        </div>
      </div>

      {/* Call to action */}
      <div className="space-y-2">
        <h4 className="text-white text-lg">Call to Action</h4>
        <Button 
          variant="neon" 
          size="lg"
          rightIcon={<span>✨</span>}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  </div>
); 