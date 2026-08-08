# Zepto Ops Design System

A sober, editorial, restrained design system for professional support operations — inspired by Linear, Mercury, and Ramp.

## Philosophy

- **Editorial restraint**: No glowing accents, gradients, or neon colors
- **Professional hierarchy**: Clear information structure without visual noise
- **Functional aesthetics**: Design serves content, not the other way around
- **Quiet confidence**: Understated but purposeful

---

## Color Palette

### Background & Surface
```css
--color-background: #F7F6F3    /* Warm off-white base */
--color-surface: #FDFCFA       /* Card surface, slightly offset */
--color-surface-hover: #F2F1ED /* Subtle hover state */
```

### Text
```css
--color-text-primary: rgba(20, 21, 26, 0.90)   /* Near-black at 90% opacity */
--color-text-secondary: rgba(20, 21, 26, 0.55) /* 55% opacity */
--color-text-tertiary: rgba(20, 21, 26, 0.38)  /* Disabled/placeholder */
```

### Accent (Used Sparingly)
```css
--color-accent: #5B6EF5              /* Muted slate blue */
--color-accent-subtle: rgba(91, 110, 245, 0.08)
--color-accent-hover: #4A5FE0
```

### Status Colors (Small icon + subdued color, not bright fills)
```css
--color-success: #4A7862       /* Muted sage */
--color-attention: #A6763B     /* Muted ochre */
--color-blocked: #A14D42       /* Muted brick */
--color-neutral: rgba(20, 21, 26, 0.55)
```

Each status color has a subtle background variant at 10% opacity.

---

## Typography

### Font Families
- **Sans**: Inter (primary workhorse grotesk)
- **Mono**: IBM Plex Mono (IDs and timestamps only)

### Font Scale (Modest, not oversized)
```css
--font-size-xs: 0.6875rem    /* 11px - captions, labels */
--font-size-sm: 0.8125rem    /* 13px - secondary text */
--font-size-base: 0.9375rem  /* 15px - body text */
--font-size-md: 1.0625rem    /* 17px - emphasis */
--font-size-lg: 1.25rem      /* 20px - section titles */
--font-size-xl: 1.5rem       /* 24px - page titles (max) */
```

### Line Heights (Tight)
```css
--line-height-tight: 1.3     /* Headings */
--line-height-base: 1.45     /* Body */
--line-height-relaxed: 1.6   /* Reading content */
```

### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

### Letter Spacing
```css
--letter-spacing-tight: -0.011em   /* Default for body and headings */
--letter-spacing-normal: 0         /* Mono font */
--letter-spacing-wide: 0.01em      /* Labels */
```

---

## Spacing Scale

```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 0.75rem    /* 12px */
--spacing-lg: 1rem       /* 16px */
--spacing-xl: 1.5rem     /* 24px */
--spacing-2xl: 2rem      /* 32px */
--spacing-3xl: 3rem      /* 48px */
```

---

## Borders & Corners

### Borders
- **Width**: 1px hairline only
- **Color**: Low-contrast (8% opacity)
- **Hover**: Slightly darker (12% opacity)

### Border Radius
```css
--border-radius-sm: 4px    /* Buttons, inputs, badges */
--border-radius-md: 6px    /* Cards */
```

**No pill-shaped elements** (border-radius: 50% only for status dots)

---

## Shadows

Minimal use — faint separation only, no elevation drama:

```css
--shadow-subtle: 0 1px 2px rgba(20, 21, 26, 0.04)
--shadow-card: 0 1px 3px rgba(20, 21, 26, 0.06)
```

**No drop shadows beyond these subtle separations.**

---

## Component Patterns

### Cards
```tsx
<div className="card">
  {/* Content */}
</div>
```
- Subtle background offset from page
- 1px hairline border
- 6px corner radius
- Faint shadow for separation
- Hover state darkens border

### Badges
```tsx
<span className="badge badge-success">
  <span className="status-icon success" />
  approved
</span>
```
- Small icon + subdued background
- Uppercase text with wide letter spacing
- Status conveyed via color, not bright fills
- Never neon or glowing

### Status Indicators
```tsx
<span className="status-icon success" />
```
- 6px diameter dot
- Paired with text label
- Subdued status colors (sage/ochre/brick)

### Typography Utilities
```tsx
<span className="text-mono">      {/* IBM Plex Mono, IDs only */}
<span className="text-secondary">  {/* 55% opacity */}
<span className="text-xs">         {/* 11px, tight line-height */}
```

### Layout Utilities
```tsx
<div className="stack stack-lg">   {/* Vertical stack with 16px gap */}
<div className="row row-md">        {/* Horizontal row with 12px gap */}
<div className="container">         {/* Max-width container with padding */}
```

---

## Component Usage

### Dashboard
- Container layout with max-width
- Large vertical spacing between sections
- "Zepto Ops" wordmark (not "Zepto Support Dashboard")

### TicketCard
- Card component with padding
- Mono font for ticket ID
- Status icon with label
- Subdued secondary text for description
- Clickable with subtle hover state

### TicketDetail
- Ghost button for back navigation
- Large title with breathing room
- Metadata row (ID · Status)
- Content in padded card
- Precedents in separate section

### StatsBar
- Horizontal card layout
- Large semibold numbers
- Small uppercase labels with wide tracking
- Status icons for pending/resolved
- Dividers between stats

### DecisionBadge
- Small icon (✓ × ↑) + text
- Status-appropriate color
- Uppercase with tracking
- Subtle background fill

### PrecedentCard
- Nested card style (background instead of surface)
- Mono ID and accent-colored match percentage
- "RESOLUTION" label in small caps
- Subdued secondary text

---

## Typography Rules

1. **No oversized display type** — max title size is 24px
2. **Tight line-heights** — especially for headings
3. **Negative letter-spacing** on most text for editorial feel
4. **Mono font only for IDs and timestamps** — use sparingly
5. **Small caps for labels** — uppercase + wide tracking

---

## Color Usage Rules

1. **Accent color used sparingly** — not everywhere
2. **Status via icon + subdued color** — not bright fills
3. **No gradients anywhere**
4. **No neon or glowing effects**
5. **Low-contrast borders** — hairline only

---

## Anti-Patterns (Do Not Use)

❌ Bright status backgrounds (use subtle 10% fills)  
❌ Gradients on any element  
❌ Drop shadows deeper than 3px  
❌ Border radius > 6px (except status dots)  
❌ Neon accent colors  
❌ Oversized display typography (>24px)  
❌ Mono font for body text  
❌ Multiple accent colors  
❌ Glowing hover effects  
❌ AI product template aesthetics

---

## Design Token Structure

All design tokens are centralized in:
- **TypeScript**: `/src/design/tokens.ts` (for component usage)
- **CSS Variables**: `/src/index.css` (for inline styles)

This ensures consistency across the entire application.

---

## Getting Started

1. Import global styles in `main.tsx`:
   ```tsx
   import './index.css';
   ```

2. Use utility classes for common patterns:
   ```tsx
   <div className="card">
   <div className="stack stack-lg">
   <span className="text-mono text-secondary">
   ```

3. Use CSS variables for inline styles when needed:
   ```tsx
   style={{ color: 'var(--color-text-secondary)' }}
   ```

4. Reference design tokens for programmatic styles:
   ```tsx
   import { colors, typography } from './design/tokens';
   ```

---

## Fonts

Add to `<head>` in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

**Zepto Ops** — Sober. Editorial. Restrained.
