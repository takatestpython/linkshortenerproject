# UI Components Guidelines

## Overview

All UI elements in this application use **shadcn/ui** components exclusively. Never create custom UI components from scratch.

## Core Rules

1. **shadcn/ui Only**: Use shadcn/ui components for all UI elements
2. **No Custom Components**: Do not create custom buttons, inputs, cards, etc.
3. **Extend, Don't Replace**: Modify shadcn/ui components through composition and props
4. **Tailwind for Styling**: Apply additional styling with Tailwind utility classes

## Adding shadcn/ui Components

### Installation Command

```bash
npx shadcn@latest add [component-name]
```

### Available Components

Common components to use:
- **button** - All button interactions
- **card** - Content containers
- **input** - Text input fields
- **form** - Form elements with validation
- **dialog** - Modals and dialogs
- **dropdown-menu** - Dropdowns and menus
- **table** - Data tables
- **badge** - Labels and status indicators
- **alert** - Notifications and alerts
- **skeleton** - Loading states
- **toast** - Toast notifications

Full component list: [shadcn/ui docs](https://ui.shadcn.com/docs/components)

## Usage Patterns

### Basic Component Usage

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Styling with Tailwind

Extend shadcn/ui components with Tailwind classes via `className`:

```typescript
<Button className="w-full mt-4">
  Full Width Button
</Button>

<Card className="border-2 border-primary">
  <CardContent className="p-6">
    Custom styled content
  </CardContent>
</Card>
```

### Variants

Use built-in variants instead of custom styling:

```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Composition Over Creation

Build complex components by composing shadcn/ui components:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function LinkForm() {
  return (
    <Card>
      <CardHeader>
        <h2>Create Link</h2>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter URL" />
      </CardContent>
      <CardFooter>
        <Button>Shorten</Button>
      </CardFooter>
    </Card>
  );
}
```

## Icons

Use **Lucide React** for all icons:

```typescript
import { Link, Copy, Trash } from 'lucide-react';

<Button>
  <Link className="mr-2 h-4 w-4" />
  Create Link
</Button>
```

## Forms

Use shadcn/ui form components with React Hook Form:

```bash
npx shadcn@latest add form
```

```typescript
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function MyForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## Dark Mode

shadcn/ui components support dark mode automatically. Use Tailwind's dark mode utilities for custom styling:

```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

## Do's and Don'ts

### ✅ Do

- Use shadcn/ui components for all UI elements
- Add components with `npx shadcn@latest add [component-name]`
- Extend components with Tailwind classes
- Use built-in variants when available
- Compose components to build complex UIs
- Use Lucide React for icons

### ❌ Don't

- Create custom button, input, or card components
- Build UI elements from scratch with raw HTML/Tailwind
- Modify shadcn/ui component files directly in `/components/ui`
- Use other UI libraries or component systems
- Inline custom CSS or styled-components

## Component File Structure

```
/components
  /ui              # shadcn/ui components (auto-generated, don't modify)
    button.tsx
    card.tsx
    input.tsx
  feature-card.tsx # Composed components using shadcn/ui
  link-form.tsx    # Feature-specific components
```

## Resources

- **shadcn/ui Documentation**: https://ui.shadcn.com
- **Lucide Icons**: https://lucide.dev
- **Tailwind CSS**: https://tailwindcss.com
