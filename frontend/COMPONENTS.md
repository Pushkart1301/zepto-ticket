# Zepto Ops Components

Six understated components built with the sober design system. Every state change is subtle, not loud.

---

## 1. ConfidenceMeter

**Purpose:** Display confidence levels with a thin progress bar.

**Design Philosophy:**
- Thin bar (3px) that fills with the accent color
- Low confidence shown by shorter fill + muted label (not red alarm)
- No flashy colors or animations
- Understated percentage display in mono font

### Props

```tsx
interface ConfidenceMeterProps {
  confidence: number;      // Value between 0 and 1
  showLabel?: boolean;     // Show text label above bar (default: true)
  width?: string;          // Custom width (default: '120px')
}
```

### Usage

```tsx
import ConfidenceMeter from './components/ConfidenceMeter';

// High confidence
<ConfidenceMeter confidence={0.92} />

// Low confidence (shorter bar, muted label)
<ConfidenceMeter confidence={0.28} />

// Without label
<ConfidenceMeter confidence={0.75} showLabel={false} width="200px" />
```

### Behavior
- **≥80%**: "High confidence" label
- **50-79%**: "Moderate confidence" label
- **<50%**: "Low confidence" label
- Bar fills proportionally with accent color
- Background is subtle neutral color

---

## 2. StatusChip

**Purpose:** Display status with a small text label and dot/icon prefix.

**Design Philosophy:**
- Small, not a filled colored pill
- Tiny 6px dot or custom icon
- Secondary text color (not bold or bright)
- Status conveyed subtly through dot color

### Props

```tsx
interface StatusChipProps {
  label: string;                                              // Status text
  status?: 'success' | 'attention' | 'blocked' | 'neutral';  // Color theme
  icon?: string;                                              // Custom icon (instead of dot)
}
```

### Usage

```tsx
import StatusChip from './components/StatusChip';

// With status dot
<StatusChip label="Resolved" status="success" />
<StatusChip label="Pending" status="attention" />
<StatusChip label="Blocked" status="blocked" />

// With custom icon
<StatusChip label="Approved" status="success" icon="✓" />
<StatusChip label="Escalated" status="attention" icon="↑" />
```

### Status Colors
- `success`: Muted sage (#4A7862)
- `attention`: Muted ochre (#A6763B)
- `blocked`: Muted brick (#A14D42)
- `neutral`: Secondary text color

---

## 3. ReasonTag

**Purpose:** Plain-language text chip for categorization or filtering.

**Design Philosophy:**
- Hairline border (1px), no background fill
- Plain text, not a pill shape
- Optional selected state with subtle accent border
- Interactive hover when clickable

### Props

```tsx
interface ReasonTagProps {
  label: string;           // Tag text
  onClick?: () => void;    // Optional click handler
  selected?: boolean;      // Selected state (default: false)
}
```

### Usage

```tsx
import ReasonTag from './components/ReasonTag';

// Static tags
<ReasonTag label="Policy violation" />
<ReasonTag label="Technical issue" />

// Interactive with selection
<ReasonTag 
  label="Fraud detection" 
  onClick={() => handleSelect('fraud')}
  selected={selectedReason === 'fraud'}
/>
```

### States
- **Default**: Transparent background, hairline border
- **Hover** (when clickable): Subtle background, darker border
- **Selected**: Accent border, subtle accent background

---

## 4. Button

**Purpose:** Primary, secondary, and ghost button variants.

**Design Philosophy:**
- Flat design, no shadows or gradients
- Primary: solid dark fill (not accent color for restraint)
- Secondary: outline style
- Ghost: text-only with subtle hover
- Size variants for hierarchy

### Props

```tsx
interface ButtonProps {
  children: ReactNode;                              // Button content
  variant?: 'primary' | 'secondary' | 'ghost';     // Style variant
  onClick?: () => void;                             // Click handler
  disabled?: boolean;                               // Disabled state
  fullWidth?: boolean;                              // Full width flag
  size?: 'sm' | 'md' | 'lg';                       // Button size
  type?: 'button' | 'submit' | 'reset';            // Button type
}
```

### Usage

```tsx
import Button from './components/Button';

// Variants
<Button variant="primary" onClick={handleSubmit}>
  Submit Ticket
</Button>

<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

<Button variant="ghost" onClick={handleBack}>
  ← Back
</Button>

// Sizes
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>

// Full width
<Button variant="primary" fullWidth>
  Continue
</Button>

// Disabled
<Button variant="primary" disabled>
  Processing...
</Button>
```

### Variants
- **Primary**: Dark background (`--color-text-primary`), white text
- **Secondary**: Transparent background, hairline border
- **Ghost**: Transparent background, secondary text color

### Hover States
- **Primary**: Slightly lighter background
- **Secondary**: Subtle background fill
- **Ghost**: Subtle background, primary text color

---

## 5. StatTile

**Purpose:** Display a metric with label and optional trend.

**Design Philosophy:**
- Number in medium weight, prominent but not oversized
- Label in small caps above number
- No icons or decorative elements
- Optional subtle trend indicator (arrow + percentage)

### Props

```tsx
interface StatTileProps {
  label: string;                       // Stat label/title
  value: string | number;              // Numeric value
  trend?: {                            // Optional trend data
    direction: 'up' | 'down';
    value: string;
  };
  onClick?: () => void;                // Optional click handler
}
```

### Usage

```tsx
import StatTile from './components/StatTile';

// Simple stat
<StatTile label="Total Tickets" value={1247} />
<StatTile label="Avg Response Time" value="2.3h" />

// With trend
<StatTile 
  label="Active Today" 
  value={89}
  trend={{ direction: 'up', value: '12%' }}
/>

<StatTile 
  label="Pending Review" 
  value={23}
  trend={{ direction: 'down', value: '8%' }}
/>

// Interactive
<StatTile 
  label="Resolution Rate" 
  value="94%"
  onClick={() => navigateToDetails()}
/>
```

### Typography
- **Label**: Uppercase, 11px, wide letter-spacing
- **Value**: 20px, medium weight, tight tracking
- **Trend**: 11px, tertiary color, simple arrow

---

## 6. PrecedentMiniCard

**Purpose:** Display similar past tickets in a compact card format.

**Design Philosophy:**
- Plain bordered card, not filled
- Text-forward, emphasis on content
- Simple star rating (not skeuomorphic)
- Optional similarity percentage in accent color

### Props

```tsx
interface PrecedentMiniCardProps {
  id: string;              // Ticket ID
  subject: string;         // Ticket subject/title
  resolution: string;      // Resolution or outcome
  rating?: number;         // Star rating (0-5)
  similarity?: number;     // Match percentage (0-1)
  onClick?: () => void;    // Optional click handler
}
```

### Usage

```tsx
import PrecedentMiniCard from './components/PrecedentMiniCard';

// Full example
<PrecedentMiniCard
  id="TKT-12845"
  subject="Customer requested refund for cancelled order"
  resolution="Approved full refund after verifying cancellation was within policy window"
  similarity={0.87}
  rating={4.5}
  onClick={() => viewTicket('TKT-12845')}
/>

// Minimal (no rating or similarity)
<PrecedentMiniCard
  id="TKT-10456"
  subject="Shipping address update after order placed"
  resolution="Updated address in system before fulfillment"
/>
```

### Features
- **ID**: Mono font, small, secondary color
- **Similarity**: Accent color, top-right position, percentage
- **Subject**: Medium weight, primary color
- **Resolution**: Small text, secondary color, relaxed line-height
- **Star Rating**: Simple ★ symbols, not filled graphics
  - Full stars: Primary color
  - Half stars: Tertiary color
  - Empty stars: Border color

### Star Rating
- Non-skeuomorphic design
- Uses simple ★ unicode character
- Color indicates filled/empty state
- Supports half-star increments

---

## Component Combinations

### Example: Ticket Analysis Panel

```tsx
<div className="card" style={{ padding: 'var(--spacing-xl)' }}>
  <div className="stack stack-lg">
    
    {/* Header with status */}
    <div className="row space-between">
      <h3 className="text-md font-semibold">Ticket Analysis</h3>
      <StatusChip label="Processing" status="attention" />
    </div>

    {/* Confidence meter */}
    <div className="stack stack-sm">
      <span className="text-sm text-secondary">AI Confidence</span>
      <ConfidenceMeter confidence={0.78} />
    </div>

    {/* Reason tags */}
    <div className="stack stack-sm">
      <span className="text-sm text-secondary">Detected Issues</span>
      <div className="row row-sm" style={{ flexWrap: 'wrap' }}>
        <ReasonTag label="Policy violation" selected />
        <ReasonTag label="Requires approval" />
      </div>
    </div>

    {/* Actions */}
    <div className="row row-md">
      <Button variant="primary">Approve</Button>
      <Button variant="secondary">Escalate</Button>
      <Button variant="ghost">Dismiss</Button>
    </div>

  </div>
</div>
```

### Example: Dashboard Stats

```tsx
<div className="card" style={{ padding: 'var(--spacing-lg) var(--spacing-xl)' }}>
  <div className="row row-xl" style={{ flexWrap: 'wrap' }}>
    <StatTile 
      label="Total Tickets" 
      value={1247}
      onClick={() => navigateToAllTickets()}
    />
    <StatTile 
      label="Active Today" 
      value={89}
      trend={{ direction: 'up', value: '12%' }}
    />
    <StatTile 
      label="Avg Response" 
      value="2.3h"
    />
    <StatTile 
      label="Resolution Rate" 
      value="94%"
      trend={{ direction: 'up', value: '3%' }}
    />
  </div>
</div>
```

### Example: Similar Tickets Section

```tsx
<div className="stack stack-lg">
  <div className="row space-between">
    <h2 className="text-lg font-semibold">Similar Past Tickets</h2>
    <ConfidenceMeter confidence={0.82} showLabel={false} width="100px" />
  </div>

  <div className="stack stack-md">
    <PrecedentMiniCard
      id="TKT-12845"
      subject="Customer requested refund for cancelled order"
      resolution="Approved full refund after verifying policy window"
      similarity={0.87}
      rating={4.5}
    />
    <PrecedentMiniCard
      id="TKT-11203"
      subject="Account verification failed multiple times"
      resolution="Escalated to security team for manual review"
      similarity={0.72}
      rating={4}
    />
  </div>
</div>
```

---

## Design Principles

All components follow these principles:

### Understated States
- Color changes are subtle, not loud
- Hover effects use opacity and border changes, not dramatic color shifts
- Disabled states use opacity reduction, not different colors

### Flat Design
- No drop shadows (except minimal 1-3px separations on cards)
- No gradients anywhere
- No glowing effects or animations

### Restrained Typography
- Modest font sizes (max 20px for stat values)
- Tight line-heights
- Negative letter-spacing for editorial feel
- Uppercase labels with wide tracking

### Minimal Color Usage
- Accent color used sparingly (confidence bars, links, selected states)
- Status colors are muted (sage/ochre/brick, not bright green/yellow/red)
- Most UI is near-black on warm off-white

### Hairline Borders
- 1px borders only
- Low contrast (8% opacity)
- Slightly darker on hover (12% opacity)

### No Decorative Elements
- No icons unless functionally necessary
- No embellishments or flourishes
- Content-first approach

---

## View the Showcase

To see all components in action:

```tsx
import NewComponentsShowcase from './components/NewComponentsShowcase';

// Render the showcase
<NewComponentsShowcase />
```

Or temporarily swap it in your App.tsx:

```tsx
import NewComponentsShowcase from './components/NewComponentsShowcase';

function App() {
  return <NewComponentsShowcase />;
}
```

This displays all six components with various states and configurations.
