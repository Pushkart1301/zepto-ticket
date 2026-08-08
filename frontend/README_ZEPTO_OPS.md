# Zepto Ops - Support Ticket Resolution Dashboard

A sober, enterprise-grade internal operations tool for AI-powered ticket resolution. Built for 10-minute delivery company support staff.

## Design Philosophy

**Serious Enterprise Tool** — Not a marketing page or AI product demo. Think Linear, Mercury, Ramp, Stripe Dashboard.

### What We Avoid
- ❌ Neon colors
- ❌ Glow/gradient effects  
- ❌ Glassmorphism
- ❌ Pill-shaped badges with bright fills
- ❌ Oversized rounded corners
- ❌ Animated pulsing dots
- ❌ Bouncy spring transitions

### What We Use
- ✓ Hairline borders (1px)
- ✓ Flat design, no shadows (except faint 1px on dropdowns)
- ✓ Muted status colors with small dots
- ✓ 6px radius on cards, 4px on buttons
- ✓ Tight line-height (1.3-1.4)
- ✓ Information density over whitespace

---

## Color Palette

```css
Canvas:          #14151A  (main background)
Surface:         #1B1C22  (cards)
Surface hover:   #212229
Border:          #2A2C33  (hairline)
Text primary:    #ECECEE
Text secondary:  #93959E
Text muted:      #5C5E68
Accent:          #5B6EF5  (primary actions, confidence fill, links)
Success:         #7FA687  (auto-resolved)
Attention:       #C99A5B  (human-review)
Blocked:         #C97B70  (danger)
```

**No other colors. No gradients.**

---

## Typography

- **Font**: Inter (400/500/600 weights only)
- **Mono**: JetBrains Mono (ticket IDs, order IDs, timestamps)

### Scale
```
H1:      22px / 600 weight
H2:      16px / 600 weight  
Body:    14px / 400 weight
Caption: 12px / 500 weight
```

**No display/oversized type** — this is a data tool, not a landing page.

---

## Components

### ConfidenceMeter
Thin 4px bar with accent color fill, percentage in mono text beside it.

```tsx
<ConfidenceMeter confidence={0.78} />
```

### StatusLabel
Small dot (not a badge) + text, colored per status.

```tsx
<StatusLabel status="auto_resolved" />
<StatusLabel status="human_review" />
```

### ReasonTag
Hairline-bordered text chip, no fill.

```tsx
<ReasonTag reason="low_similarity" />
<ReasonTag reason="precedents_disagree" />
<ReasonTag reason="guardrail: refund>order_value" />
```

### Button
Primary (solid accent), outline, ghost — flat, no shadow.

```tsx
<Button variant="primary">Approve</Button>
<Button variant="outline">Override & Approve</Button>
<Button variant="ghost">Reject</Button>
```

### TicketCard
Collapsed and expanded states:
- **Collapsed**: Shows ticket ID, order ID, description, confidence meter
- **Expanded**: Reveals precedent mini-cards, drafted reply, reasoning (citation-style), action buttons

Click to expand/collapse with 200ms ease animation.

### PrecedentMiniCard
Bordered card showing:
- Description
- CSAT stars (simple ★ symbols, not skeuomorphic)
- Similarity percentage
- Action taken

---

## Layout

```
+------------------------------------------------------------------+
| Zepto Ops      Today 1,284  Auto 78%  Conf 0.81  Q 23   ●Live  |
+------------------------------------------------------------------+
| ⚠ 12 wrong-item tickets, Store #4, last 60 min      sparkline ×|
+------------------------------------------------------------------+
| Auto-Resolved (142)        | Needs Human Review (23)  | Sidebar |
| [ticket card]              | [ticket card + reason]   | Trend   |
| [ticket card]              | [ticket card + reason]   | chart   |
| [expanded card w/ detail]  | [expanded card w/ detail]| -----   |
| ...                        | ...                      | Recent  |
|                            |                          | Activity|
+------------------------------------------------------------------+
```

---

## Behavior

### Play Stream
- Click "▶ Play Stream" button
- Feeds 10 mock tickets one at a time
- ~1.5s delay between tickets
- Each fades + slides in gently (no bounce)

### Ticket Interaction
- Click collapsed card → expands in place
- Shows 3 precedent mini-cards
- AI-drafted reply in plain bordered block  
- "Why this action?" line (citation-style, italic)
- Approve/Override/Reject buttons (human-review only)

### Actions
- **Approve** → card moves from Human Review to Auto-Resolved
- **Reject** → card removes from board
- Sidebar Resolution Trend chart updates

### Alert Banner
- Appears when 3+ tickets share description keyword AND same store
- Shows thin single-color sparkline
- Dismissible with × button

### Hover
- Subtle 4% surface lightening only
- No color/glow shift

### Responsive
- Below 768px: columns stack vertically
- Sidebar moves below board

---

## Signature Element

**The "Why this action?" reasoning line** — this is the one place the design feels considered and unusual. 

It's styled like a citation or footnote:
- Left border (2px)
- Italic text
- Muted color
- Indented from main content

Everything else stays plain and disciplined.

---

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Server runs on `http://localhost:5173`

---

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx              # Main layout & logic
│   ├── TicketCard.tsx             # Expandable ticket card
│   ├── PrecedentMiniCard.tsx      # Similar case card
│   ├── ConfidenceMeter.tsx        # Thin progress bar
│   ├── StatusLabel.tsx            # Dot + text label
│   ├── ReasonTag.tsx              # Hairline chip
│   └── Button.tsx                 # Flat button variants
├── data/
│   └── mockTickets.ts             # 10 varied test tickets
├── App.tsx                        # Root component
├── main.tsx                       # Entry point
└── index.css                      # Tailwind imports
```

---

## Mock Data

10 tickets with varied scenarios:
- Wrong item delivered
- Rude delivery partner
- Missing item
- Cancelled order still delivered
- Expired product
- Double charge
- Delayed delivery (melted ice cream)
- Order not received
- Damaged packaging
- Wrong variant (organic vs regular)

**Reasons for human review:**
- `low_similarity` — precedents don't match well
- `precedents_disagree` — conflicting resolution paths
- `guardrail: refund>order_value` — exceeds auto-refund threshold
- `guardrail: order_cancelled` — timing requires verification

---

## Key Features

### Real-time Stats
- Today's ticket count
- Auto-resolution percentage
- Average confidence score
- Queue size (human review)
- Live indicator

### Two-Column Board
- **Auto-Resolved**: Tickets handled by AI
- **Needs Human Review**: Tickets flagged for manual review

### Sidebar
- **Resolution Trend**: Bar chart showing hourly performance
- **Recent Activity**: Last 5 tickets with confidence
- **Live Stats**: Response time, success rate, active agents

### Alert System
- Detects clustered issues (e.g., Store #4 wrong items)
- Shows sparkline visualization
- Dismissible banner

---

## Tailwind Configuration

Custom theme extensions in `tailwind.config.js`:

```js
colors: {
  canvas: '#14151A',
  surface: '#1B1C22',
  'surface-hover': '#212229',
  border: '#2A2C33',
  'text-primary': '#ECECEE',
  'text-secondary': '#93959E',
  'text-muted': '#5C5E68',
  accent: '#5B6EF5',
  success: '#7FA687',
  attention: '#C99A5B',
  blocked: '#C97B70',
}

fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Consolas', 'monospace'],
}

fontSize: {
  'h1': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
  'h2': ['16px', { lineHeight: '1.3', fontWeight: '600' }],
  'body': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
  'caption': ['12px', { lineHeight: '1.3', fontWeight: '500' }],
}

borderRadius: {
  'card': '6px',
  'button': '4px',
}
```

---

## Development Guidelines

### When Adding Components

1. **Keep it flat** — no shadows, gradients, or glows
2. **Use hairline borders** — 1px only
3. **Status via dots** — not filled backgrounds
4. **Modest typography** — max 22px for titles
5. **Information density** — prioritize scanability

### Color Usage

- Use `text-text-primary` for main content
- Use `text-text-secondary` for supporting info
- Use `text-text-muted` for de-emphasized text
- Status colors only for status indicators
- Accent color only for interactive elements

### Spacing

Prefer Tailwind's spacing scale:
- `gap-1.5` (6px) — tight spacing
- `gap-2` (8px) — compact spacing
- `gap-3` (12px) — comfortable spacing
- `gap-4` (16px) — generous spacing

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

**Zepto Ops** — A serious tool for serious work. No fluff, just function.
