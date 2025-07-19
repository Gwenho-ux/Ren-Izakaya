'use client';

import { Button } from '@/design-system';

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-dark-bg p-4 md:p-8 lg:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Design System Demo
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Explore our design system components and patterns
          </p>
        </div>

        {/* Button Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg text-dark-text-secondary">Neon</h3>
              <div className="space-y-2">
                <Button variant="neon" size="sm">Small Neon</Button>
                <Button variant="neon" size="md">Medium Neon</Button>
                <Button variant="neon" size="lg">Large Neon</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-dark-text-secondary">Neon Secondary</h3>
              <div className="space-y-2">
                <Button variant="neon-secondary" size="sm">Small Secondary</Button>
                <Button variant="neon-secondary" size="md">Medium Secondary</Button>
                <Button variant="neon-secondary" size="lg">Large Secondary</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-dark-text-secondary">Navigation</h3>
              <div className="space-y-2">
                <Button variant="nav" size="sm">Small Nav</Button>
                <Button variant="nav" size="md">Medium Nav</Button>
                <Button variant="nav" size="lg">Large Nav</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-dark-text-secondary">Sound</h3>
              <div className="space-y-2">
                <Button variant="sound" size="sm">Small Sound</Button>
                <Button variant="sound" size="md">Medium Sound</Button>
                <Button variant="sound" size="lg">Large Sound</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Button States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="neon">Normal</Button>
            <Button variant="neon" loading>Loading</Button>
            <Button variant="neon" disabled>Disabled</Button>
            <Button variant="nav">Navigation</Button>
            <Button variant="sound">Sound</Button>
          </div>
        </section>

        {/* Button with Icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Buttons with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="neon" 
              leftIcon={<span>←</span>}
            >
              Back
            </Button>
            <Button 
              variant="neon-secondary" 
              rightIcon={<span>→</span>}
            >
              Next
            </Button>
            <Button 
              variant="neon" 
              leftIcon={<span>+</span>}
              rightIcon={<span>✨</span>}
            >
              Add Magic
            </Button>
          </div>
        </section>

        {/* Full Width Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Full Width Buttons</h2>
          <div className="max-w-md space-y-2">
            <Button variant="neon" fullWidth>
              Full Width Neon
            </Button>
            <Button variant="neon-secondary" fullWidth>
              Full Width Neon Secondary
            </Button>
          </div>
        </section>

        {/* Button as Links */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Buttons as Links</h2>
          <div className="flex flex-wrap gap-4">
            <Button as="link" href="/" variant="neon">
              Home
            </Button>
            <Button 
              as="link" 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              variant="neon-secondary"
            >
              GitHub
            </Button>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg text-dark-text-secondary">Primary (Neon Red)</h3>
              <div className="w-full h-16 bg-neon-red rounded-lg flex items-center justify-center">
                <span className="text-white font-mono">#FF3E3C</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg text-dark-text-secondary">Secondary (Neon Purple)</h3>
              <div className="w-full h-16 bg-neon-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-mono">#B537F2</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg text-dark-text-secondary">Accent (Neon Blue)</h3>
              <div className="w-full h-16 bg-neon-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-mono">#3B8EEA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Typography</h2>
          <div className="space-y-4">
            <div className="text-6xl font-bold text-white">Heading 1</div>
            <div className="text-4xl font-semibold text-white">Heading 2</div>
            <div className="text-2xl font-medium text-white">Heading 3</div>
            <div className="text-xl text-white">Heading 4</div>
            <div className="text-lg text-dark-text-secondary">Body Large</div>
            <div className="text-base text-dark-text-secondary">Body Regular</div>
            <div className="text-sm text-dark-text-muted">Body Small</div>
          </div>
        </section>

        {/* Spacing Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Spacing Scale</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 text-dark-text-secondary">p-2</div>
              <div className="bg-neon-red/20 p-2 rounded">8px padding</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-dark-text-secondary">p-4</div>
              <div className="bg-neon-purple/20 p-4 rounded">16px padding</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-dark-text-secondary">p-8</div>
              <div className="bg-neon-blue/20 p-8 rounded">32px padding</div>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Usage Example</h2>
          <div className="bg-dark-bg-2 p-6 rounded-xl border border-dark-border">
            <pre className="text-dark-text-secondary text-sm overflow-x-auto">
{`import { Button } from '@/design-system';

export function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="neon" size="lg">
        Get Started
      </Button>
      <Button variant="nav" size="md">
        Learn More
      </Button>
      <Button variant="sound" size="sm">
        🔊 Toggle Sound
      </Button>
    </div>
  );
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 