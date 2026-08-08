# Quick Start Guide - Zepto Ops

## ✅ Setup Complete!

Your Zepto Ops dashboard is ready to run.

---

## 🚀 Running the Application

The dev server should already be running on:

**http://localhost:5173** (or 5174 if 5173 was in use)

If not running, start it with:

```bash
cd c:\Users\Kshitij\zepto-ticket\frontend
npm run dev
```

---

## 🎮 Using the Dashboard

### 1. Click "▶ Play Stream"
This will start feeding tickets into the board one at a time (1.5s intervals).

### 2. Watch Tickets Appear
- **Auto-Resolved column** (left): Tickets the AI confidently resolved
- **Needs Human Review column** (right): Tickets flagged for manual review

### 3. Expand a Ticket
Click any ticket card to see:
- 3 similar past cases (precedents) with CSAT stars
- AI-drafted reply
- Reasoning explanation (in citation style)
- Action buttons (for human review tickets)

### 4. Take Action (Human Review Only)
- **Approve**: Move ticket to Auto-Resolved
- **Override & Approve**: Same as Approve (for demonstration)
- **Reject**: Remove ticket from board

### 5. Watch the Alert
After streaming, you'll see an alert banner:
> ⚠ 12 wrong-item tickets, Store #4, last 60 min

This appears because 3+ tickets mention "wrong item" from Store #4.

---

## 📊 Understanding the Header

- **Today**: Total tickets processed
- **Auto**: Percentage auto-resolved
- **Conf**: Average confidence score
- **Q**: Queue size (human review count)
- **●Live**: System status indicator

---

## 📈 Sidebar Features

### Resolution Trend
Bar chart showing hourly resolution performance (mocked data).

### Recent Activity
Last 5 tickets with their IDs and confidence scores.

### Live Stats
- Avg Response: 2.3s (mocked)
- Success Rate: 94.2% (mocked)
- Active Agents: 12 (mocked)

---

## 🎨 Design Notes

### What Makes This Sober?

1. **Dark Theme** — #14151A canvas, no bright colors
2. **Hairline Borders** — 1px, subtle separation
3. **Flat Design** — No shadows, gradients, or glows
4. **Muted Status Colors** — Sage/ochre/brick, not bright green/yellow/red
5. **Small Dots** — Status indicators are dots, not filled pills
6. **Modest Type** — Max 22px for headers
7. **Citation-Style Reasoning** — The one "considered" design element

### Signature Element

The **"Why this action?"** line is styled like a footnote:
- Left border accent
- Italic text
- Muted color
- This is intentionally the most "designed" part

---

## 🔧 Component Overview

### Built Components
✅ ConfidenceMeter — Thin 4px bar  
✅ StatusLabel — Dot + text  
✅ ReasonTag — Hairline chip  
✅ Button — Primary/outline/ghost  
✅ PrecedentMiniCard — Simple star rating  
✅ TicketCard — Expandable with animation  
✅ Dashboard — Full layout with streaming  

### Mock Data
10 varied tickets with different:
- Confidence levels (0.42 to 0.95)
- Refusal reasons
- Actions (refund/redelivery/coupon)
- Store IDs (clustering detection)

---

## 📱 Responsive Design

- **Desktop** (>768px): Two-column board + sidebar
- **Tablet/Mobile** (<768px): Stacked layout, sidebar below

---

## 🎯 Key Interactions

| Action | Result |
|--------|--------|
| Click "Play Stream" | Tickets feed in every 1.5s |
| Click collapsed card | Expands to show details |
| Click expanded card header | Collapses back |
| Click "Approve" | Moves to Auto-Resolved |
| Click "Reject" | Removes from board |
| Click alert × | Dismisses banner |

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Vite** — Build tool & dev server

---

## 📝 Next Steps

### To Customize

1. **Colors**: Edit `tailwind.config.js` theme.colors
2. **Typography**: Adjust theme.fontSize
3. **Mock Data**: Modify `src/data/mockTickets.ts`
4. **Components**: Update files in `src/components/`

### To Connect Real Backend

Replace mock data in `Dashboard.tsx`:
```tsx
// Instead of mockTickets import:
import { fetchTickets } from './api/tickets';

// In useEffect:
const loadTickets = async () => {
  const data = await fetchTickets();
  setTickets(data);
};
```

---

## ❓ Troubleshooting

### Server won't start
```bash
# Kill any process on port 5173
npx kill-port 5173

# Try again
npm run dev
```

### Tailwind styles not applying
```bash
# Rebuild
npm run build

# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit
```

---

## 📚 Documentation

- **Full Design System**: `README_ZEPTO_OPS.md`
- **Component Details**: Check individual component files
- **Tailwind Config**: `tailwind.config.js`

---

**Ready to go!** Open http://localhost:5173 and click "▶ Play Stream" to see it in action.
