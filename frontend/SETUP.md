# Setup Instructions - Zepto Ticket Management

## ⚠️ Important: Install Dependencies First

Before running the application, you need to install the required dependencies.

### Step 1: Install Dependencies

```bash
cd c:\Users\Kshitij\zepto-ticket\frontend
npm install
```

This will install:
- `react-router-dom` - For routing
- `zustand` - For state management
- All other dependencies listed in package.json

### Step 2: Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173** (or 5174 if 5173 is in use)

---

## 🎯 What's Been Built

### ✅ Fully Functional Pages

1. **Dashboard** (`/dashboard`)
   - 6 interactive KPI cards that route to filtered views
   - Ticket volume bar chart (7-day view)
   - Tickets by status donut chart
   - Priority distribution with click-to-filter
   - SLA health tracking with visual bars
   - Recent & priority tickets table (sortable, clickable)

2. **Tickets List** (`/tickets`)
   - Search bar (filter by ID, subject, customer)
   - Dropdown filters (status, priority, category)
   - Bulk selection checkboxes
   - Bulk actions (assign, close)
   - Full ticket table with 8 realistic tickets
   - Click any row to view details

3. **Ticket Detail** (`/tickets/:id`)
   - Full conversation thread
   - Customer information sidebar
   - Editable fields (category, priority, status)
   - Reply composer with send functionality
   - Status workflow with confirmation modals
   - SLA countdown display
   - Tags display
   - Order ID link

### ✅ Application Shell

4. **Sidebar Navigation**
   - Collapsible (click arrow to toggle)
   - Active route highlighting with accent bar
   - 9 navigation items
   - User profile at bottom with status indicator
   - Icons for each section

5. **Top Header**
   - Global search bar (searches tickets and customers)
   - Live search results dropdown
   - Notification bell with badge (3)
   - Help icon
   - Theme toggle icon
   - Responsive layout

6. **State Management**
   - Zustand store for global state
   - Ticket CRUD operations
   - Selection management (bulk actions)
   - Toast notifications (5-second auto-dismiss)
   - Confirmation modals

### 🚧 Placeholder Pages (Coming Soon)

These pages exist with routing but show "Coming Soon" content:
- My Tickets
- Team Queue
- Customers & Customer Detail
- Analytics
- SLA & Performance
- Knowledge Base
- Settings

---

## 📊 Mock Data

### 8 Realistic Tickets

All tickets have:
- Indian customer names (Rahul Sharma, Priya Nair, etc.)
- Indian locations (Mumbai, Bengaluru, Delhi, Pune, etc.)
- Real order IDs (ZEP-ORD-92831, etc.)
- Ticket IDs (#ZPT-10482, etc.)
- Varied statuses (new, open, in_progress, pending, resolved, closed)
- Varied priorities (critical, high, medium, low)
- Categories (Payment, Delivery, Refund, Order, Account, Product, Technical, Cancellation)
- SLA status (met, at_risk, breached)
- Conversation threads (some with multiple messages)
- Tags

### 8 Customers
- Realistic Indian names
- Email addresses
- Phone numbers (+91 format)
- Locations across India
- Total order counts
- Join dates

### 5 Support Agents
- Indian names (Arjun Mehta, Neha Kapoor, Siddharth Joshi, Divya Rao, Karan Verma)
- Roles (Senior Agent, Team Lead, etc.)
- Status indicators (available, busy, away)
- Assigned ticket counts

### Current User
- **Arjun Mehta** (Senior Support Agent)
- Status: Available
- 8 tickets assigned

---

## 🎨 Design System

### Color Palette (Enterprise Light Theme)
```
Background:     #F7F7F8  (warm off-white)
Surface:        #FFFFFF  (pure white cards)
Border:         #E2E3E7  (subtle gray)
Text Primary:   #1C1D21  (near-black)
Text Secondary: #6B6D76  (muted gray)
Primary:        #6C3FC5  (muted violet - Zepto brand-adjacent)
Success:        #2E7D5B  (muted green)
Warning:        #B8792E  (muted orange)
Danger:         #C13F3F  (muted red)
Info:           #2E6BB8  (muted blue)
```

### Typography
- **Font Family**: Inter (400, 500, 600 weights)
- **H1**: 28px/600
- **H2**: 20px/600
- **Body**: 14px/400
- **Table**: 13px/400
- **Caption**: 12px/500

### Components
- **Cards**: White background, 1px border, 6px radius
- **Buttons**: 
  - Primary: Solid purple, white text
  - Secondary: White with border, hover state
  - Ghost: Transparent, text only
- **Badges**: Color-coded with light backgrounds
- **Inputs**: Clean with focus ring

---

## 🚀 Interactive Features

### Dashboard Interactions

1. **KPI Cards** - Click to navigate:
   - "Total Tickets" → `/tickets`
   - "Open" → `/tickets?status=open`
   - "Pending" → `/tickets?status=pending`
   - "Resolved Today" → `/tickets?status=resolved`
   - "SLA Breaches" → `/sla`
   - "Avg Resolution" → `/analytics`

2. **Priority Distribution** - Click rows to filter:
   - Critical → `/tickets?priority=critical`
   - High → `/tickets?priority=high`
   - Medium → `/tickets?priority=medium`
   - Low → `/tickets?priority=low`

3. **SLA Health** - Click sections to filter:
   - Met → `/sla?status=met`
   - At Risk → `/sla?status=at_risk`
   - Breached → `/sla?status=breached`

4. **Tickets Table** - Click any row → `/tickets/:id`

### Tickets List Interactions

1. **Search Bar** - Filter as you type (ticket ID, subject, customer name)
2. **Status Filter** - Dropdown with all statuses
3. **Priority Filter** - Dropdown with all priorities
4. **Category Filter** - Dropdown with all categories
5. **Clear Filters** - Reset all filters
6. **Bulk Selection** - Checkboxes for multiple tickets
7. **Bulk Actions** - Assign or close selected tickets
8. **Table Sorting** - Click column headers (planned)
9. **Row Click** - Navigate to ticket detail

### Ticket Detail Interactions

1. **Back Button** - Navigate to previous page
2. **Category Dropdown** - Change ticket category
3. **Priority Dropdown** - Change ticket priority
4. **Status Dropdown** - Change ticket status (shows confirmation)
5. **Reply Composer** - Type and send replies
6. **Customer Click** - Navigate to customer profile
7. **Order ID** - Clickable (routes to order detail when implemented)

### Global Interactions

1. **Search Bar** - Type to search tickets/customers
   - Shows live results dropdown
   - Click result to navigate

2. **Sidebar Toggle** - Collapse/expand
   - Click arrow icon
   - Maintains state

3. **Navigation** - Click any menu item
   - Active state with purple accent
   - Bold text and left border

4. **Notifications** - Click bell icon (planned functionality)

5. **Toasts** - Auto-dismiss after 5 seconds
   - Success (green)
   - Error (red)
   - Info (blue)
   - Manual dismiss with X

6. **Modals** - Confirmation dialogs
   - Status changes
   - Destructive actions
   - Confirm/Cancel buttons

---

## 📁 File Structure

```
frontend/
├── index.html                          # Entry HTML with Inter font
├── package.json                        # Dependencies (includes react-router-dom, zustand)
├── tailwind.config.js                  # Tailwind config with custom colors
├── tsconfig.json                       # TypeScript config
├── vite.config.ts                      # Vite build config
├── README.md                           # Full documentation
├── SETUP.md                            # This file
└── src/
    ├── main.tsx                        # App entry point
    ├── App.tsx                         # Main app with routing
    ├── index.css                       # Tailwind + custom styles
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx             # Left navigation
    │   │   └── TopHeader.tsx           # Top bar with search
    │   ├── Modal.tsx                   # Confirmation modals
    │   └── Toast.tsx                   # Notification toasts
    ├── pages/
    │   ├── Dashboard.tsx               # Main dashboard
    │   ├── Tickets.tsx                 # Ticket list
    │   ├── TicketDetail.tsx            # Ticket detail view
    │   └── SimplePage.tsx              # Placeholder component
    ├── store/
    │   └── useStore.ts                 # Zustand global state
    └── data/
        └── mockData.ts                 # All mock data
```

---

## 🔧 Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router 6** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS 3** - Utility-first styling
- **Vite** - Fast build tool and dev server

---

## 🎯 Current Status

### ✅ Fully Implemented
- Light theme design system
- Realistic Indian mock data
- Application shell (sidebar, header, routing)
- Dashboard with interactive elements
- Tickets list with filters and bulk actions
- Ticket detail with full functionality
- Global search
- Toast notifications
- Confirmation modals
- State management
- Responsive layout

### 🚧 Needs Implementation
- My Tickets page
- Team Queue and Team Detail pages
- Customers list and Customer Detail pages
- Analytics page with charts
- SLA & Performance page
- Knowledge Base with articles
- Settings with tabbed sections
- Real backend integration
- Authentication
- File attachments
- Email integration

---

## 🐛 Troubleshooting

### Dependencies Not Installed
**Error**: `react-router-dom` or `zustand` not found

**Solution**:
```bash
npm install
```

### Port Already in Use
**Error**: Port 5173 is in use

**Solution**: Vite will automatically try port 5174, 5175, etc.

### TypeScript Errors
**Error**: Type errors in console

**Solution**:
```bash
npm run build
```

This will show any TypeScript errors that need fixing.

---

## 🚀 Next Steps

1. **Install dependencies**: `npm install`
2. **Start the server**: `npm run dev`
3. **Open browser**: `http://localhost:5173`
4. **Explore the app**:
   - View Dashboard
   - Filter tickets
   - Click a ticket to see details
   - Try bulk selection
   - Search for tickets/customers
   - Toggle sidebar
   - Change ticket status
   - Send a reply

---

## 📞 Support

For questions or issues:
1. Check README.md for detailed documentation
2. Review the code comments
3. Check the browser console for errors
4. Verify dependencies are installed

---

**Zepto Ticket Management** - A production-grade enterprise support application.
