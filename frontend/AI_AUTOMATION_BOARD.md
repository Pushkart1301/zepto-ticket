# AI Automation Board - Feature Documentation

## 🤖 Overview

The **AI Automation Board** is a two-lane view that displays tickets being processed by the AI automation system. It shows which tickets have been auto-resolved and which need human review, along with AI confidence scores, similar past cases, and drafted replies.

## 🎯 Access

**URL:** http://localhost:5174/automation

**Navigation:** Click **"AI Automation"** (🤖) in the sidebar (second item)

---

## 📋 Features

### Two-Lane Layout

#### **Left Lane: Auto-Resolved** (Green)
- Tickets that AI resolved automatically with high confidence
- Already sent to customers
- 3 tickets currently shown

#### **Right Lane: Needs Human Review** (Yellow)
- Tickets flagged for manual review
- Lower confidence scores
- Require agent approval before sending
- 3 tickets currently shown

---

## 🎴 Ticket Card Information

Each ticket card displays:

### Collapsed View
- **Ticket ID** (e.g., #ZPT-10482)
- **Category** (Payment, Delivery, Order, etc.)
- **Subject** - Full ticket title
- **Customer Name** - Who submitted the ticket
- **Confidence Score** - AI confidence percentage (58% - 95%)
- **Chosen Action** - What the AI decided to do
- **Expand/Collapse Toggle** - Click anywhere to expand

### Expanded View (Click to open)

#### 1. **Top-3 Similar Past Cases**
Each similar case shows:
- Ticket ID (e.g., #ZPT-9234)
- Subject/description
- Action taken (Refund, Redelivery, etc.)
- **Similarity percentage** (how similar to current ticket)

Example:
```
#ZPT-9234 → Refund                    94%
Double charged for order
```

#### 2. **Drafted Reply**
- AI-generated customer response
- Professional tone
- Includes specific details (amounts, timelines)
- Ready to send or edit

#### 3. **Action Buttons**

**For Auto-Resolved Tickets:**
- ✓ Status indicator: "Auto-resolved and sent to customer"
- "View Full Details →" button to see complete ticket

**For Needs Human Review:**
- **Approve** - Send drafted reply as-is
- **Edit & Send** - Modify before sending
- **Reassign** - Assign to another agent
- **View Full Details →** - Open full ticket view

---

## 📊 Stats Bar (Top)

Four key metrics:

1. **Total Processed** - All tickets shown (6)
2. **Auto-Resolved** - Successfully automated (3)
3. **Needs Review** - Flagged for human (3)
4. **Automation Rate** - Percentage automated (50%)

---

## 🎨 Design

### Minimal & Classic Aesthetic

- **Clean white cards** with subtle borders
- **No gradients or shadows** - flat design
- **Simple typography** - Inter font, readable sizes
- **Muted colors** - Green for success, yellow for attention
- **Expandable sections** - Click to reveal details
- **Consistent spacing** - 8px/16px/24px grid
- **Professional layout** - Two equal columns

### Color Coding

- **Green badge** - Auto-Resolved lane
- **Yellow badge** - Needs Human Review lane
- **Primary purple** - Ticket IDs, similarity scores
- **Gray text** - Secondary information

---

## 💡 Sample Tickets

### Auto-Resolved Lane

1. **#ZPT-10482** - Payment deducted twice (92% confidence)
   - Action: Refund ₹847
   - Similar cases: 94%, 89%, 87%
   
2. **#ZPT-10485** - Missing item in order (88% confidence)
   - Action: Refund ₹350
   - Similar cases: 91%, 86%, 84%
   
3. **#ZPT-10489** - Coupon not working (95% confidence)
   - Action: Apply coupon + guidance
   - Similar cases: 93%, 90%, 88%

### Needs Human Review Lane

1. **#ZPT-10483** - Wrong delivery address (68% confidence)
   - Action: Needs verification
   - Similar cases: 71%, 68%, 65%
   - Reason: Lower confidence, conflicting precedents
   
2. **#ZPT-10484** - Refund not received (58% confidence)
   - Action: Verify cancellation timing
   - Similar cases: 79%, 73%, 67%
   - Reason: Timing-sensitive decision
   
3. **#ZPT-10487** - Expired product (72% confidence)
   - Action: Refund + Store alert
   - Similar cases: 96%, 93%, 89%
   - Reason: Quality issue requires store follow-up

---

## 🔄 Interactions

### Click Ticket Card
- **Expands** to show similar cases, drafted reply, and actions
- **Click again** to collapse

### Approve Button
- Sends drafted reply to customer
- Moves ticket to resolved status
- Shows success toast notification

### Edit & Send
- Opens reply composer (future feature)
- Allows modification before sending

### View Full Details
- Navigates to complete ticket detail page
- Shows full conversation history
- Allows comprehensive actions

---

## 🎯 Use Cases

### For Support Managers
- **Monitor automation quality** - Check confidence scores
- **Review edge cases** - Tickets flagged for human review
- **Validate AI decisions** - Review similar cases used
- **Track automation rate** - See percentage automated

### For Support Agents
- **Quick approvals** - One-click approve for good drafts
- **Edit when needed** - Modify AI-generated responses
- **Learn from precedents** - See how similar tickets were handled
- **Focus on complex cases** - Auto-resolved tickets need no action

---

## 📐 Layout Specifications

### Grid Structure
```
[Stats Bar: 4 cards in row]

[Auto-Resolved Column]    [Needs Human Column]
[Ticket Card]             [Ticket Card]
[Ticket Card]             [Ticket Card]
[Ticket Card]             [Ticket Card]
```

### Card Structure
```
┌─────────────────────────────────┐
│ #ID • Category    Confidence 92%│
│ Subject Line                    │
│ Customer Name                   │
│ ──────────────────────────────  │
│ Action: Refund ₹847    ▶ Expand│
└─────────────────────────────────┘

[When Expanded]
┌─────────────────────────────────┐
│ ... header content ...          │
├─────────────────────────────────┤
│ SIMILAR PAST CASES              │
│ ┌─────────────────────────────┐ │
│ │ #ID → Action          94%   │ │
│ │ Subject                     │ │
│ └─────────────────────────────┘ │
│ [2 more similar cases]          │
├─────────────────────────────────┤
│ DRAFTED REPLY                   │
│ ┌─────────────────────────────┐ │
│ │ Reply text...               │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Approve] [Edit] [Reassign] [→]│
└─────────────────────────────────┘
```

---

## 🚀 Future Enhancements

Potential additions:
- **Real-time updates** - WebSocket for live ticket flow
- **Filtering** - By category, confidence range
- **Sorting** - By confidence, time, category
- **Batch actions** - Approve multiple at once
- **Confidence threshold** - Adjust auto-resolve cutoff
- **Edit modal** - In-place reply editing
- **Analytics** - Automation metrics over time
- **A/B testing** - Compare AI strategies

---

## 🎨 Design Philosophy

**Minimal:**
- No unnecessary decorations
- White space for breathing room
- Clean typography hierarchy
- Flat colors, no gradients

**Classic:**
- Traditional two-column layout
- Card-based UI pattern
- Standard button styles
- Professional color palette

**Functional:**
- Every element serves a purpose
- Clear visual hierarchy
- Intuitive interactions
- Information density balanced

---

## 📱 Responsive Behavior

- **Desktop (>1024px)** - Two columns side by side
- **Tablet (768-1024px)** - Two columns, narrower
- **Mobile (<768px)** - Single column, stacked

---

**AI Automation Board** - Streamlining ticket resolution with confidence.
