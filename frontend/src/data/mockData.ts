// Realistic Indian customer support mock data

export type TicketStatus = 'new' | 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
export type TicketCategory = 'Payment' | 'Delivery' | 'Refund' | 'Order' | 'Account' | 'Product' | 'Technical' | 'Cancellation';
export type SLAStatus = 'met' | 'at_risk' | 'breached';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  joinedDate: string;
  avatar?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'available' | 'busy' | 'away';
  assignedTickets: number;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  amount: number;
  status: 'delivered' | 'pending' | 'cancelled';
  items: string[];
}

export interface TicketMessage {
  id: string;
  type: 'customer' | 'agent' | 'internal' | 'system';
  author: string;
  authorId: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  subject: string;
  customerId: string;
  customerName: string;
  orderId?: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  slaStatus: SLAStatus;
  tags: string[];
  messages: TicketMessage[];
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  views: number;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// Mock Customers
export const mockCustomers: Customer[] = [
  { id: 'CUST-001', name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '+91 98765 43210', location: 'Mumbai, Maharashtra', totalOrders: 47, joinedDate: '2023-01-15' },
  { id: 'CUST-002', name: 'Priya Nair', email: 'priya.nair@gmail.com', phone: '+91 97654 32109', location: 'Bengaluru, Karnataka', totalOrders: 32, joinedDate: '2023-03-22' },
  { id: 'CUST-003', name: 'Amit Patel', email: 'amit.patel@gmail.com', phone: '+91 96543 21098', location: 'Ahmedabad, Gujarat', totalOrders: 58, joinedDate: '2022-11-08' },
  { id: 'CUST-004', name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', phone: '+91 95432 10987', location: 'Hyderabad, Telangana', totalOrders: 23, joinedDate: '2023-05-14' },
  { id: 'CUST-005', name: 'Vikram Singh', email: 'vikram.singh@gmail.com', phone: '+91 94321 09876', location: 'Delhi, Delhi', totalOrders: 41, joinedDate: '2023-02-19' },
  { id: 'CUST-006', name: 'Anjali Deshmukh', email: 'anjali.d@gmail.com', phone: '+91 93210 98765', location: 'Pune, Maharashtra', totalOrders: 29, joinedDate: '2023-04-07' },
  { id: 'CUST-007', name: 'Rajesh Kumar', email: 'rajesh.kumar@gmail.com', phone: '+91 92109 87654', location: 'Kolkata, West Bengal', totalOrders: 15, joinedDate: '2023-07-23' },
  { id: 'CUST-008', name: 'Kavita Iyer', email: 'kavita.iyer@gmail.com', phone: '+91 91098 76543', location: 'Chennai, Tamil Nadu', totalOrders: 36, joinedDate: '2023-01-30' },
];

// Mock Agents
export const mockAgents: Agent[] = [
  { id: 'AGT-001', name: 'Arjun Mehta', email: 'arjun.mehta@zepto.com', role: 'Senior Support Agent', status: 'available', assignedTickets: 8 },
  { id: 'AGT-002', name: 'Neha Kapoor', email: 'neha.kapoor@zepto.com', role: 'Support Agent', status: 'busy', assignedTickets: 12 },
  { id: 'AGT-003', name: 'Siddharth Joshi', email: 'siddharth.j@zepto.com', role: 'Support Agent', status: 'available', assignedTickets: 6 },
  { id: 'AGT-004', name: 'Divya Rao', email: 'divya.rao@zepto.com', role: 'Team Lead', status: 'available', assignedTickets: 4 },
  { id: 'AGT-005', name: 'Karan Verma', email: 'karan.verma@zepto.com', role: 'Support Agent', status: 'away', assignedTickets: 7 },
];

// Current user (for "My Tickets" view)
export const currentUser = mockAgents[0];

// Mock Orders
export const mockOrders: Order[] = [
  { id: 'ZEP-ORD-92831', customerId: 'CUST-001', date: '2024-01-15T14:30:00Z', amount: 847, status: 'delivered', items: ['Milk 1L', 'Bread', 'Eggs 12pc'] },
  { id: 'ZEP-ORD-92832', customerId: 'CUST-002', date: '2024-01-15T09:15:00Z', amount: 1240, status: 'delivered', items: ['Rice 5kg', 'Dal 1kg', 'Oil 1L'] },
  { id: 'ZEP-ORD-92833', customerId: 'CUST-003', date: '2024-01-14T18:45:00Z', amount: 456, status: 'cancelled', items: ['Detergent', 'Soap'] },
  { id: 'ZEP-ORD-92834', customerId: 'CUST-004', date: '2024-01-15T16:20:00Z', amount: 2150, status: 'delivered', items: ['Fruits', 'Vegetables', 'Snacks'] },
  { id: 'ZEP-ORD-92835', customerId: 'CUST-005', date: '2024-01-15T12:00:00Z', amount: 675, status: 'pending', items: ['Biscuits', 'Tea', 'Sugar'] },
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '#ZPT-10482',
    subject: 'Payment deducted twice for the same order',
    customerId: 'CUST-001',
    customerName: 'Rahul Sharma',
    orderId: 'ZEP-ORD-92831',
    category: 'Payment',
    priority: 'high',
    status: 'open',
    assignedTo: 'AGT-001',
    assignedToName: 'Arjun Mehta',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:15:00Z',
    slaDeadline: '2024-01-15T18:30:00Z',
    slaStatus: 'at_risk',
    tags: ['urgent', 'refund-needed'],
    messages: [
      {
        id: 'MSG-001',
        type: 'customer',
        author: 'Rahul Sharma',
        authorId: 'CUST-001',
        content: 'I was charged ₹847 twice for order ZEP-ORD-92831. Please refund the duplicate charge immediately.',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: 'MSG-002',
        type: 'agent',
        author: 'Arjun Mehta',
        authorId: 'AGT-001',
        content: 'Hi Rahul, I apologize for this inconvenience. I\'m checking your transaction records right now and will process the refund within the next hour.',
        timestamp: '2024-01-15T11:45:00Z'
      }
    ]
  },
  {
    id: '#ZPT-10483',
    subject: 'Order delivered to wrong address',
    customerId: 'CUST-002',
    customerName: 'Priya Nair',
    orderId: 'ZEP-ORD-92832',
    category: 'Delivery',
    priority: 'critical',
    status: 'in_progress',
    assignedTo: 'AGT-002',
    assignedToName: 'Neha Kapoor',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T15:30:00Z',
    slaDeadline: '2024-01-15T13:15:00Z',
    slaStatus: 'breached',
    tags: ['delivery-issue', 'urgent'],
    messages: [
      {
        id: 'MSG-003',
        type: 'customer',
        author: 'Priya Nair',
        authorId: 'CUST-002',
        content: 'My order was delivered to a different building! The delivery person left it at the wrong address.',
        timestamp: '2024-01-15T09:15:00Z'
      }
    ]
  },
  {
    id: '#ZPT-10484',
    subject: 'Refund not received after order cancellation',
    customerId: 'CUST-003',
    customerName: 'Amit Patel',
    orderId: 'ZEP-ORD-92833',
    category: 'Refund',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'AGT-003',
    assignedToName: 'Siddharth Joshi',
    createdAt: '2024-01-14T19:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    slaDeadline: '2024-01-16T19:00:00Z',
    slaStatus: 'met',
    tags: ['refund'],
    messages: []
  },
  {
    id: '#ZPT-10485',
    subject: 'Missing item in delivered order',
    customerId: 'CUST-004',
    customerName: 'Sneha Reddy',
    orderId: 'ZEP-ORD-92834',
    category: 'Order',
    priority: 'high',
    status: 'new',
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    slaDeadline: '2024-01-16T00:45:00Z',
    slaStatus: 'met',
    tags: [],
    messages: [
      {
        id: 'MSG-004',
        type: 'customer',
        author: 'Sneha Reddy',
        authorId: 'CUST-004',
        content: 'I ordered 5 items but received only 4. The fruits package is missing from my delivery.',
        timestamp: '2024-01-15T16:45:00Z'
      }
    ]
  },
  {
    id: '#ZPT-10486',
    subject: 'Unable to login to account',
    customerId: 'CUST-005',
    customerName: 'Vikram Singh',
    category: 'Technical',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'AGT-004',
    assignedToName: 'Divya Rao',
    createdAt: '2024-01-14T08:00:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
    slaDeadline: '2024-01-15T08:00:00Z',
    slaStatus: 'met',
    tags: ['account-access'],
    messages: [
      {
        id: 'MSG-005',
        type: 'customer',
        author: 'Vikram Singh',
        authorId: 'CUST-005',
        content: 'I am unable to login to my Zepto account. It says "incorrect password" but I\'m sure it\'s correct.',
        timestamp: '2024-01-14T08:00:00Z'
      },
      {
        id: 'MSG-006',
        type: 'agent',
        author: 'Divya Rao',
        authorId: 'AGT-004',
        content: 'I\'ve sent a password reset link to your registered email. Please check and reset your password.',
        timestamp: '2024-01-14T08:30:00Z'
      },
      {
        id: 'MSG-007',
        type: 'customer',
        author: 'Vikram Singh',
        authorId: 'CUST-005',
        content: 'Got it! I was able to reset and login now. Thank you!',
        timestamp: '2024-01-14T09:15:00Z'
      }
    ]
  },
  {
    id: '#ZPT-10487',
    subject: 'Product quality issue - expired milk delivered',
    customerId: 'CUST-006',
    customerName: 'Anjali Deshmukh',
    category: 'Product',
    priority: 'critical',
    status: 'open',
    assignedTo: 'AGT-001',
    assignedToName: 'Arjun Mehta',
    createdAt: '2024-01-15T07:30:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    slaDeadline: '2024-01-15T11:30:00Z',
    slaStatus: 'breached',
    tags: ['quality-issue', 'health-concern'],
    messages: []
  },
  {
    id: '#ZPT-10488',
    subject: 'Request to cancel ongoing order',
    customerId: 'CUST-007',
    customerName: 'Rajesh Kumar',
    orderId: 'ZEP-ORD-92835',
    category: 'Cancellation',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'AGT-005',
    assignedToName: 'Karan Verma',
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
    slaDeadline: '2024-01-16T12:30:00Z',
    slaStatus: 'met',
    tags: ['cancellation'],
    messages: []
  },
  {
    id: '#ZPT-10489',
    subject: 'Coupon code not working at checkout',
    customerId: 'CUST-008',
    customerName: 'Kavita Iyer',
    category: 'Technical',
    priority: 'low',
    status: 'closed',
    assignedTo: 'AGT-003',
    assignedToName: 'Siddharth Joshi',
    createdAt: '2024-01-13T15:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
    slaDeadline: '2024-01-14T15:00:00Z',
    slaStatus: 'met',
    tags: ['coupon', 'resolved'],
    messages: []
  }
];

// Knowledge Base Articles
export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'KB-001',
    title: 'How to Process Refunds for Payment Issues',
    category: 'Payment',
    content: '# Refund Processing Guide\n\n## Step 1: Verify Transaction\nCheck the transaction history in the payment gateway...',
    views: 1234,
    helpful: 89,
    createdAt: '2023-06-15',
    updatedAt: '2024-01-10'
  },
  {
    id: 'KB-002',
    title: 'Handling Delivery Address Errors',
    category: 'Delivery',
    content: '# Address Error Resolution\n\n## Common Scenarios\n1. Wrong building number\n2. Incorrect pincode...',
    views: 892,
    helpful: 67,
    createdAt: '2023-07-20',
    updatedAt: '2023-12-15'
  },
  {
    id: 'KB-003',
    title: 'SLA Guidelines for Critical Tickets',
    category: 'SLA',
    content: '# SLA Response Times\n\n## Critical: 4 hours\n## High: 8 hours\n## Medium: 24 hours\n## Low: 48 hours',
    views: 2341,
    helpful: 178,
    createdAt: '2023-05-10',
    updatedAt: '2024-01-05'
  }
];

// Helper functions
export const getTicketsByStatus = (status: TicketStatus) => 
  mockTickets.filter(t => t.status === status);

export const getTicketsByPriority = (priority: TicketPriority) => 
  mockTickets.filter(t => t.priority === priority);

export const getTicketsBySLA = (slaStatus: SLAStatus) => 
  mockTickets.filter(t => t.slaStatus === slaStatus);

export const getTicketById = (id: string) => 
  mockTickets.find(t => t.id === id);

export const getCustomerById = (id: string) => 
  mockCustomers.find(c => c.id === id);

export const getAgentById = (id: string) => 
  mockAgents.find(a => a.id === id);

export const getMyTickets = () => 
  mockTickets.filter(t => t.assignedTo === currentUser.id);
