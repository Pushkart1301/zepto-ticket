# Zepto Ops Quick Reference

Fast lookup for using the design system and components.

---

## Import Components

```tsx
// Individual imports
import { Button, ConfidenceMeter, StatusChip } from './components';

// Or specific imports
import Button from './components/Button';
import ConfidenceMeter from './components/ConfidenceMeter';
```

---

## Common Patterns

### Show confidence with thin bar
```tsx
<ConfidenceMeter confidence={0.78} />
```

### Display status with dot
```tsx
<StatusChip label="Resolved" status="success" />
<StatusChip label="Escalated" status="attention" icon="↑" />
```

### Tag for filtering/categorization
```tsx
<ReasonTag label="Policy violation" selected onClick={handleClick} />
```

### Buttons (no shadows, flat)
```tsx
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">← Back</Button>
```

### Display metrics
```tsx
<StatTile label="Total" value={1247} />
<StatTile label="Active" value={89} trend={{ direction: 'up', value: '12%' }} />
```

### Mini precedent cards
```tsx
<PrecedentMiniCard
  id="TKT-12345"
  subject="Similar ticket"
  resolution="How it was resolved"
  similarity={0.87}
  rating={4.5}
/>
```

---

## Layout Utilities

```tsx
<div className="container">              {/* Max-width container */}
<div className="card">                   {/* Card surface */}

<div className="stack stack-sm">        {/* Vertical, 8px gap */}
<div className="stack stack-md">        {/* Vertical, 12px gap */}
<div className="stack stack-lg">        {/* Vertical, 16px gap */}
<div className="stack stack-xl">        {/* Vertical, 24px gap */}

<div className="row row-sm">            {/* Horizontal, 8px gap */}
<div className="row row-md">            {/* Horizontal, 12px gap */}
<div className="row row-lg">            {/* Horizontal, 16px gap */}
<div className="row space-between">     {/* Space between items */}
```

---

## Typography Classes

```tsx
<span className="text-xs">              {/* 11px */}
<span className="text-sm">              {/* 13px */}
<span className="text-base">            {/* 15px */}
<span className="text-md">              {/* 17px */}
<span className="text-lg">              {/* 20px */}
<span className="text-xl">              {/* 24px (max) */}

<span className="text-mono">            {/* IBM Plex Mono */}
<span className="text-secondary">       {/* 55% opacity */}
<span className="text-tertiary">        {/* 38% opacity */}

<span className="font-medium">          {/* 500 weight */}
<span className="font-semibold">        {/* 600 weight */}
```

---

## CSS Variables

### Colors
```css
var(--color-background)        /* #F7F6F3 warm off-white */
var(--color-surface)           /* #FDFCFA card surface */
var(--color-text-primary)      /* 90% opacity near-black */
var(--color-text-secondary)    /* 55% opacity */
var(--color-text-tertiary)     /* 38% opacity */
var(--color-accent)            /* #5B6EF5 muted slate blue */
var(--color-success)           /* #4A7862 muted sage */
var(--color-attention)         /* #A6763B muted ochre */
var(--color-blocked)           /* #A14D42 muted brick */
var(--color-border)            /* Low contrast hairline */
```

### Spacing
```css
var(--spacing-xs)   /* 4px */
var(--spacing-sm)   /* 8px */
var(--spacing-md)   /* 12px */
var(--spacing-lg)   /* 16px */
var(--spacing-xl)   /* 24px */
var(--spacing-2xl)  /* 32px */
var(--spacing-3xl)  /* 48px */
```

### Other
```css
var(--border-radius-sm)  /* 4px */
var(--border-radius-md)  /* 6px */
var(--transition-fast)   /* 120ms */
var(--transition-base)   /* 180ms */
```

---

## Common Inline Styles

### Subtle background card
```tsx
style={{
  padding: 'var(--spacing-xl)',
  backgroundColor: 'var(--color-accent-subtle)',
  borderColor: 'var(--color-accent)'
}}
```

### Uppercase label
```tsx
style={{
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  fontSize: 'var(--font-size-xs)'
}}
```

### Tight heading
```tsx
style={{
  fontWeight: 600,
  letterSpacing: '-0.02em'
}}
```

---

## Status Colors

| Status | Color | Variable |
|--------|-------|----------|
| Success/Resolved | Muted sage | `--color-success` |
| Attention/Pending | Muted ochre | `--color-attention` |
| Blocked/Error | Muted brick | `--color-blocked` |
| Neutral/Default | Gray | `--color-neutral` |

---

## Component Props Quick Reference

### ConfidenceMeter
- `confidence: number` (0-1) ⚡ required
- `showLabel?: boolean` (default: true)
- `width?: string` (default: '120px')

### StatusChip
- `label: string` ⚡ required
- `status?: 'success' | 'attention' | 'blocked' | 'neutral'`
- `icon?: string` (custom icon instead of dot)

### ReasonTag
- `label: string` ⚡ required
- `onClick?: () => void`
- `selected?: boolean`

### Button
- `children: ReactNode` ⚡ required
- `variant?: 'primary' | 'secondary' | 'ghost'`
- `onClick?: () => void`
- `disabled?: boolean`
- `fullWidth?: boolean`
- `size?: 'sm' | 'md' | 'lg'`

### StatTile
- `label: string` ⚡ required
- `value: string | number` ⚡ required
- `trend?: { direction: 'up' | 'down', value: string }`
- `onClick?: () => void`

### PrecedentMiniCard
- `id: string` ⚡ required
- `subject: string` ⚡ required
- `resolution: string` ⚡ required
- `rating?: number` (0-5)
- `similarity?: number` (0-1)
- `onClick?: () => void`

---

## Design Principles Checklist

When building new components:

- ✓ **Flat design** — no shadows (except 1-3px card separations)
- ✓ **No gradients** — flat colors only
- ✓ **Hairline borders** — 1px, low contrast
- ✓ **4-6px corners** — never pill-shaped
- ✓ **Accent color sparingly** — not everywhere
- ✓ **Status via subtle colors** — not bright fills
- ✓ **Modest typography** — max 24px for titles
- ✓ **Tight line-heights** — especially headings
- ✓ **Negative letter-spacing** — editorial feel
- ✓ **Mono font for IDs only** — sparingly used

---

## View Examples

### Design System Showcase
```tsx
import { DesignSystemShowcase } from './components';
<DesignSystemShowcase />
```

### New Components Showcase
```tsx
import { NewComponentsShowcase } from './components';
<NewComponentsShowcase />
```

### Real Integration Example
```tsx
import TicketAnalysisExample from './components/TicketAnalysisExample';
<TicketAnalysisExample />
```

---

## Documentation Links

- **Full Design System**: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- **Component Docs**: [`COMPONENTS.md`](./COMPONENTS.md)
- **Project Setup**: [`README.md`](./README.md)

---

**Zepto Ops** — Keep it understated.
