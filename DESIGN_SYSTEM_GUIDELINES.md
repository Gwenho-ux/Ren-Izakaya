# Design System Team Guidelines

## 🎯 Overview

This document outlines how our development team should use and maintain the design system to ensure consistency, efficiency, and quality across our codebase.

## 🚀 Quick Start for New Team Members

### 1. Understanding the Design System
- Read `src/design-system/README.md` thoroughly
- Explore component stories in `*.stories.tsx` files
- Familiarize yourself with design tokens in `src/design-system/tokens.ts`

### 2. Development Setup
```bash
# The design system is already integrated
# Import components like this:
import { Button, designTokens } from '@/design-system';
```

### 3. First Component Usage
```tsx
// ✅ Correct way to use design system components
import { Button } from '@/design-system';

export function MyComponent() {
  return (
    <Button variant="neon" size="lg">
      Get Started
    </Button>
  );
}
```

## 📋 Development Rules

### ✅ DO

1. **Always import from the design system**
   ```tsx
   import { Button, designTokens } from '@/design-system';
   ```

2. **Use design tokens for styling**
   ```tsx
   <div className="bg-dark-bg text-neon-red p-4" />
   ```

3. **Follow component API patterns**
   ```tsx
   <Button variant="primary" size="md" loading={isLoading}>
     Submit
   </Button>
   ```

4. **Extend components with className when needed**
   ```tsx
   <Button className="mt-4 w-full" variant="neon">
     Custom Spacing
   </Button>
   ```

5. **Use TypeScript interfaces**
   ```tsx
   interface Props {
     onSubmit: ButtonProps['onClick'];
   }
   ```

### ❌ DON'T

1. **Don't import components directly**
   ```tsx
   // ❌ Wrong
   import { Button } from '@/components/Button';
   ```

2. **Don't use hardcoded values**
   ```tsx
   // ❌ Wrong
   <div style={{ color: '#FF3E3C', padding: '16px' }} />
   ```

3. **Don't override core component styles**
   ```tsx
   // ❌ Wrong
   <Button style={{ backgroundColor: 'blue' }}>
     Don't do this
   </Button>
   ```

4. **Don't create duplicate components**
   ```tsx
   // ❌ Wrong - Use design system Button instead
   function MyCustomButton() { ... }
   ```

## 🔄 Workflow Guidelines

### Adding New Features

1. **Check if component exists** in design system first
2. **Use existing components** when possible
3. **Propose new components** if needed (see process below)
4. **Follow established patterns** for consistency

### Code Review Checklist

- [ ] Uses design system components
- [ ] No hardcoded colors/spacing
- [ ] Proper TypeScript types
- [ ] Follows naming conventions
- [ ] No duplicate functionality

### Component Proposal Process

1. **Check existing components** - Can you extend an existing one?
2. **Create RFC** - Document the need and proposed API
3. **Team discussion** - Get feedback from team
4. **Implementation** - Follow design system patterns
5. **Documentation** - Add stories and update README

## 🎨 Design Token Usage

### Colors
```tsx
// ✅ Use Tailwind classes with design tokens
<div className="bg-dark-bg text-neon-red border-neon-purple" />

// ✅ Or access tokens directly
const primaryColor = designTokens.colors.primary[500];
```

### Spacing
```tsx
// ✅ Use consistent spacing scale
<div className="p-4 m-8 gap-2" />

// ✅ Responsive spacing
<div className="p-4 md:p-6 lg:p-8" />
```

### Typography
```tsx
// ✅ Use design system typography
<h1 className="text-4xl font-bold text-white">
  Heading
</h1>
```

## 🧩 Component Guidelines

### Button Usage
```tsx
// ✅ Primary actions (main CTAs)
<Button variant="neon">Save</Button>

// ✅ Secondary actions  
<Button variant="neon-secondary">Cancel</Button>

// ✅ Navigation buttons
<Button variant="nav">Settings</Button>

// ✅ Sound/audio controls
<Button variant="sound">🔊 Toggle</Button>

// ✅ Call-to-action
<Button variant="neon" size="lg">Get Started</Button>

// ✅ Navigation links
<Button as="link" href="/dashboard" variant="nav">Dashboard</Button>

// ✅ Loading states
<Button loading disabled>Saving...</Button>

// ✅ Silent buttons (no sound effects)
<Button enableClickSound={false}>Silent Action</Button>
```

### Extending Components
```tsx
// ✅ Add custom spacing/layout
<Button className="mt-4 w-full">
  Full Width Button
</Button>

// ✅ Conditional styling
<Button 
  className={cn(
    'base-classes',
    isActive && 'active-classes'
  )}
>
  Conditional Button
</Button>
```

## 🔧 Maintenance Guidelines

### When to Update Design Tokens

1. **New brand colors** - Add to color palette
2. **New spacing needs** - Extend spacing scale
3. **Typography changes** - Update font definitions
4. **New breakpoints** - Add to breakpoints object

### Component Updates

1. **Bug fixes** - Fix in design system, benefits all usage
2. **New variants** - Add to existing component
3. **API changes** - Coordinate with team, update all usage
4. **Deprecations** - Provide migration path

### Documentation Updates

1. **New components** - Add comprehensive stories
2. **API changes** - Update README and types
3. **Examples** - Keep stories current with best practices
4. **Guidelines** - Update this document as needed

## 🚨 Common Mistakes to Avoid

### 1. Creating Duplicate Components
```tsx
// ❌ Don't create custom buttons
function MyButton() {
  return <button className="custom-styles">...</button>;
}

// ✅ Use design system Button
<Button variant="primary">...</Button>
```

### 2. Hardcoding Values
```tsx
// ❌ Don't hardcode
<div style={{ marginTop: '32px', color: '#FF3E3C' }} />

// ✅ Use design tokens
<div className="mt-8 text-neon-red" />
```

### 3. Inconsistent Patterns
```tsx
// ❌ Inconsistent sizing
<Button className="px-3 py-1">Small</Button>
<Button className="px-5 py-2">Medium</Button>

// ✅ Use size prop
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
```

### 4. Missing TypeScript
```tsx
// ❌ No types
function handleClick(event) { ... }

// ✅ Proper types
const handleClick: ButtonProps['onClick'] = (event) => { ... }
```

## 📊 Quality Metrics

### Code Quality Indicators

- **Design System Usage**: >90% of UI components use design system
- **Token Usage**: >95% of colors/spacing use design tokens
- **TypeScript Coverage**: 100% of component props typed
- **Documentation**: All components have stories

### Review Criteria

1. **Consistency** - Follows established patterns
2. **Reusability** - Uses existing components
3. **Accessibility** - Meets WCAG guidelines
4. **Performance** - No unnecessary re-renders
5. **Maintainability** - Clear, documented code

## 🎓 Learning Resources

### For New Developers
1. **Design System README** - Start here
2. **Component Stories** - See all variants and usage
3. **TypeScript Interfaces** - Understand component APIs
4. **Team Code Reviews** - Learn from feedback

### For Experienced Developers
1. **Token Architecture** - Understand the system design
2. **Component Patterns** - Learn advanced composition
3. **Utility Functions** - Master helper functions
4. **Performance Optimization** - Efficient usage patterns

## 🤝 Team Communication

### When to Ask for Help
- Unsure which component to use
- Need a new component variant
- Facing TypeScript issues
- Performance concerns

### How to Propose Changes
1. **Create GitHub issue** with detailed description
2. **Include use cases** and examples
3. **Suggest implementation** approach
4. **Get team feedback** before implementing

### Regular Reviews
- **Weekly design system check-ins**
- **Monthly component usage review**
- **Quarterly token evaluation**
- **Annual architecture review**

## 📈 Success Metrics

### Team Efficiency
- Faster component development
- Reduced design inconsistencies
- Fewer UI bugs
- Improved code reusability

### Code Quality
- Better TypeScript coverage
- More consistent patterns
- Easier maintenance
- Clearer documentation

### User Experience
- Consistent visual language
- Better accessibility
- Improved performance
- Cohesive brand experience

---

## 🆘 Need Help?

- **Documentation**: Check component stories
- **Examples**: Look at existing usage
- **Questions**: Ask in team chat
- **Issues**: Create GitHub issue
- **Urgent**: Reach out to design system maintainer

Remember: The design system is here to help you build better, faster, and more consistently. When in doubt, ask the team! 