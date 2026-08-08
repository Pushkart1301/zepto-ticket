# Zepto Ticket Management & Support Intelligence System

A production-grade enterprise web application for Zepto's customer support and operations team.

## 🎯 Overview

This is a complete, functional enterprise SaaS application for managing customer support tickets, built with modern web technologies. It features realistic Indian customer data, full routing, interactive components, and a professional light-themed UI.

## ✨ Key Features

### Implemented & Functional

**🤖 AI Automation Board** (`/automation`) - **NEW!**
- Two-lane board: Auto-Resolved vs Needs Human Review
- Confidence scores with visual progress bars
- Top 3 similar past cases for each ticket
- AI reasoning explanation
- Drafted replies ready to send
- Interactive filters (All, High confidence ≥80%, Low <80%)
- Approve/Edit/Reassign actions
- Click to expand/collapse ticket details

1. **Dashboard** (`/dashboard`)
- 6 clickable KPI cards with routing
- Interactive ticket volume chart
- Donut chart for tickets by status
- Priority distribution with filtering
- SLA health tracking
- Recent & priority tickets table

✅ **Tickets** (`/tickets`)
- Full ticket list with search and filters
- Sortable, paginated table
- Bulk selection and actions
- Status, priority, category filters
- Click any ticket to view details

✅ **Ticket Detail** (`/tickets/:id`)
- Full conversation thread
- Customer information sidebar
- Editable fields (category, priority, status)
- Reply composer
- Status workflow with confirmations
- SLA countdown display

✅ **Application Shell**
- Collapsible sidebar navigation
- Global command-style search
- Active route highlighting
- User profile with status indicator
- Toast notifications
- Confirmation modals

✅ **State Management**
- Zustand for global state
- Ticket CRUD operations
- Selection management
- Toast & modal system

### Coming Soon (Placeholders)

🚧 My Tickets  
🚧 Team Queue  
🚧 Customers & Customer Detail  
🚧 Analytics  
🚧 SLA & Performance  
🚧 Knowledge Base  
🚧 Settings  

## 🎨 Design System

### Color Palette (Light Mode)
```
Background:     #F7F7F8
Surface:        #FFFFFF
Border:         #E2E3E7
Text Primary:   #1C1D21
Text Secondary: #6B6D76
Primary:        #6C3FC5 (muted violet)
Success:        #2E7D5B
Warning:        #B8792E
Danger:         #C13F3F
Info:           #2E6BB8
```

### Typography
- **Font**: Inter (400/500/600 weights)
- **H1**: 28px/600
- **H2**: 20px/600
- **Body**: 14px/400
- **Table**: 13px/400
- **Caption**: 12px/500

### Components
- **Cards**: 1px border, 6px radius, minimal shadow
- **Buttons**: Primary (solid), Secondary (outline), Ghost
- **Badges**: Color-coded with icons/labels
- **Inputs**: Clean, focused states with primary ring

## 🏗️ Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Collapsible navigation
│   │   └── TopHeader.tsx        # Search & notifications
│   ├── Modal.tsx                # Confirmation dialogs
│   └── Toast.tsx                # Notifications
├── pages/
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Tickets.tsx              # Ticket list
│   ├── TicketDetail.tsx         # Ticket detail view
│   └── SimplePage.tsx           # Placeholder component
├── data/
│   └── mockData.ts              # Realistic Indian data
├── store/
│   └── useStore.ts              # Zustand state management
├── App.tsx                      # Main app with routing
└── main.tsx                     # Entry point
```

## 📊 Mock Data

### Realistic Indian Context
- **Customers**: Rahul Sharma, Priya Nair, Amit Patel, Sneha Reddy, etc.
- **Locations**: Mumbai, Bengaluru, Delhi, Pune, Chennai, Kolkata
- **Agents**: Arjun Mehta, Neha Kapoor, Siddharth Joshi, Divya Rao
- **Order IDs**: ZEP-ORD-92831, ZEP-ORD-92832, etc.
- **Ticket IDs**: #ZPT-10482, #ZPT-10483, etc.

### Data Types
- 8+ Tickets with varied statuses, priorities, SLA states
- 8 Customers with realistic Indian names and locations
- 5 Support Agents with roles and availability
- Categories: Payment, Delivery, Refund, Order, Account, Product, Technical, Cancellation

## 🚀 Running the Application

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

## 🎮 Interactive Features

### Dashboard
- **Click KPI cards** → Navigate to filtered views
- **Click chart segments** → Filter tickets by status/priority
- **Click table rows** → Open ticket details

### Tickets
- **Search** → Filter by ID, subject, customer
- **Filters** → Status, priority, category dropdowns
- **Bulk actions** → Select multiple, assign, close
- **Table sorting** → Click column headers

### Ticket Detail
- **Edit inline** → Change category, priority, status
- **Status workflow** → Confirmation dialogs
- **Reply** → Send customer responses
- **Navigate** → Click customer to view profile

### Global
- **Search bar** → Find tickets/customers by ID, name, phone, order
- **Sidebar** → Collapse/expand, active state
- **Toasts** → Success/error notifications
- **Modals** → Confirm destructive actions

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router 6** - Routing
- **Zustand** - State management
- **Tailwind CSS 3** - Styling
- **Vite** - Build tool

## 📝 Design Principles

### What We Did
✓ Light theme, enterprise-sober palette  
✓ Flat design, minimal shadows  
✓ 1px hairline borders  
✓ 6px card radius, 4px button radius  
✓ Inter typography throughout  
✓ Color paired with icons/labels  
✓ Clickable, interactive elements  
✓ Realistic routing and data  

### What We Avoided
❌ Dark neon colors  
❌ Excessive gradients  
❌ Oversized rounded cards  
❌ Decorative illustrations  
❌ Gamified elements  
❌ Glow effects  
❌ Consumer-shopping visual language  
❌ College dashboard aesthetics  
❌ Generic admin templates  

## 🗺️ Routing

All routes are functional and navigable:

```
/                          → Redirects to /dashboard
/dashboard                 → Main dashboard
/tickets                   → Ticket list
/tickets/:id               → Ticket detail
/my-tickets                → Coming soon
/team                      → Coming soon
/customers                 → Coming soon
/customers/:id             → Coming soon
/analytics                 → Coming soon
/sla                       → Coming soon
/knowledge-base            → Coming soon
/settings                  → Coming soon
```

## 🎯 State Management

### Zustand Store
```typescript
- tickets: Ticket[]                    // All tickets
- selectedTicketIds: string[]          // Bulk selection
- currentUser: Agent                   // Logged-in user
- toasts: Toast[]                      // Notifications
- modal: Modal | null                  // Confirmation dialog
- updateTicket()                       // Update ticket
- deleteTicket()                       // Remove ticket
- showToast()                          // Show notification
- showModal()                          // Show confirmation
```

## 📱 Responsive

Desktop-first (1440×900) with responsive breakpoints:
- 1280px
- 1024px
- Tablet/Mobile

Sidebar collapses on smaller screens.

## 🔐 User Context

Current logged-in user: **Arjun Mehta** (Senior Support Agent)
- View "My Tickets" assigned to this user
- Status: Available
- 8 tickets assigned

## 🚀 Next Steps

To extend this application:

1. **Connect Real Backend**
   - Replace mock data with API calls
   - Add authentication
   - Implement WebSocket for real-time updates

2. **Complete Remaining Pages**
   - My Tickets with personal KPIs
   - Team Queue with agent workload
   - Customer profiles with history
   - Analytics with interactive charts
   - SLA tracking and compliance
   - Knowledge Base articles
   - Settings with tabs

3. **Advanced Features**
   - Real-time collaboration
   - File attachments
   - Email integration
   - Automated workflows
   - Advanced reporting
   - Mobile app

## 📚 References

Design inspired by:
- Zendesk (ticket management)
- Linear (clean UI, interactions)
- Jira Service Management (workflows)
- Freshdesk (support features)

But with an **original visual identity** - not a copy of any of them.

## ⚡ Performance

- Fast initial load with Vite
- Optimized bundle size
- Lazy loading for routes
- Efficient re-renders with Zustand

---

**Zepto Ticket Management** - A serious, professional enterprise support application.
