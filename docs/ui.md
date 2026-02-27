# UI Instructions — shadcn/ui

## Core Rule

**All UI elements must use shadcn/ui components.** Never create custom component implementations from scratch.

## Usage

- Add new components via the CLI: `npx shadcn@latest add <component>`
- Components are installed into `components/ui/` — **do not manually edit files in that directory.**
- Import from `@/components/ui/<component>`.

## Standards

- Use the **new-york** style (configured in `components.json`).
- Combine shadcn/ui components with **Tailwind CSS v4** utility classes for layout and spacing.
- Use **Lucide React** for all icons.
- Never install or use alternative component libraries (e.g. MUI, Chakra, Radix primitives directly).

## Examples

```tsx
// Correct
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Incorrect — do not build custom button/input elements
<button className="...">Click</button>
```
