import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface SimilarCase {
  id: string;
  subject: string;
  action: string;
  similarity: number;
}

interface TicketWithAI {
  id: string;
  subject: string;
  customerName: string;
  category: string;
  confidence: number;
  action: string;
  draftedReply: string;
  similarCases: SimilarCase[];
  status: 'auto_resolved' | 'needs_human';
  reasoning: string;
}

// Enhanced mock data with AI features
const aiTickets: TicketWithAI[] = [
  {
    id: '#ZPT-10482',
    subject: 'Payment deducted twice for the same order',
    customerName: 'Rahul Sharma',
    category: 'Payment',
    confidence: 0.92,
    action: 'Refund ₹847',
    reasoning: 'High-confidence duplicate payment case. All 3 similar precedents resulted in immediate refund with 100% CSAT.',
    draftedReply: 'We sincerely apologize for the duplicate charge. We have processed a full refund of ₹847 which will reflect in your account within 3-5 business days.',
    status: 'auto_resolved',
    similarCases: [
      { id: '#ZPT-9234', subject: 'Double charged for order', action: 'Refund', similarity: 0.94 },
      { id: '#ZPT-8891', subject: 'Payment processed twice', action: 'Refund', similarity: 0.89 },
      { id: '#ZPT-8456', subject: 'Duplicate transaction', action: 'Refund', similarity: 0.87 },
    ]
  },
  {
    id: '#ZPT-10485',
    subject: 'Missing item in delivered order',
    customerName: 'Sneha Reddy',
    category: 'Order',
    confidence: 0.88,
    action: 'Refund ₹350',
    reasoning: 'Standard missing-item case. Customer photo verification confirms missing fruits package. Precedents show consistent refund resolution.',
    draftedReply: 'We apologize for the missing item. A refund of ₹350 for the fruits package has been processed to your account.',
    status: 'auto_resolved',
    similarCases: [
      { id: '#ZPT-9445', subject: 'Item missing from delivery', action: 'Refund', similarity: 0.91 },
      { id: '#ZPT-9102', subject: 'Incomplete order received', action: 'Refund', similarity: 0.86 },
      { id: '#ZPT-8723', subject: 'Paid for item not received', action: 'Refund', similarity: 0.84 },
    ]
  },
  {
    id: '#ZPT-10489',
    subject: 'Coupon code not working at checkout',
    customerName: 'Kavita Iyer',
    category: 'Technical',
    confidence: 0.95,
    action: 'Apply coupon + guidance',
    reasoning: 'Valid coupon code, technical glitch at checkout. Manual application with usage instructions prevents future issues.',
    draftedReply: 'We have manually applied the WELCOME50 coupon to your account. The discount will reflect on your next order. For future reference, ensure the coupon is valid and not expired.',
    status: 'auto_resolved',
    similarCases: [
      { id: '#ZPT-9567', subject: 'Promo code error', action: 'Apply coupon', similarity: 0.93 },
      { id: '#ZPT-9234', subject: 'Discount not applied', action: 'Apply coupon', similarity: 0.90 },
      { id: '#ZPT-8901', subject: 'Coupon validation failed', action: 'Apply coupon', similarity: 0.88 },
    ]
  },
  {
    id: '#ZPT-10483',
    subject: 'Order delivered to wrong address',
    customerName: 'Priya Nair',
    category: 'Delivery',
    confidence: 0.68,
    action: 'Needs verification',
    reasoning: 'Address mismatch requires GPS verification. Precedents show split between redelivery (45%) and refund (55%). Awaiting delivery partner confirmation.',
    draftedReply: 'We are investigating the delivery location. Our delivery partner is checking GPS records and will contact you within the hour to resolve this.',
    status: 'needs_human',
    similarCases: [
      { id: '#ZPT-9334', subject: 'Wrong delivery address', action: 'Redelivery', similarity: 0.71 },
      { id: '#ZPT-9012', subject: 'Package left at wrong building', action: 'Refund', similarity: 0.68 },
      { id: '#ZPT-8567', subject: 'Address error in delivery', action: 'Redelivery', similarity: 0.65 },
    ]
  },
  {
    id: '#ZPT-10484',
    subject: 'Refund not received after order cancellation',
    customerName: 'Amit Patel',
    category: 'Refund',
    confidence: 0.58,
    action: 'Verify cancellation timing',
    reasoning: 'Order cancelled 14 minutes before delivery. System logs need manual review to determine if cancellation was within policy window.',
    draftedReply: 'We see the order was cancelled 14 minutes before delivery. We need to verify the exact timing to determine if the refund is applicable.',
    status: 'needs_human',
    similarCases: [
      { id: '#ZPT-9445', subject: 'Cancelled order still delivered', action: 'Refund', similarity: 0.79 },
      { id: '#ZPT-9123', subject: 'Refund pending for cancellation', action: 'Process refund', similarity: 0.73 },
      { id: '#ZPT-8890', subject: 'Order cancelled but charged', action: 'Verify timing', similarity: 0.67 },
    ]
  },
  {
    id: '#ZPT-10487',
    subject: 'Product quality issue - expired milk delivered',
    customerName: 'Anjali Deshmukh',
    category: 'Product',
    confidence: 0.72,
    action: 'Refund + Store alert',
    reasoning: 'Critical quality failure. Requires immediate refund plus store manager notification. Customer safety concern escalates priority.',
    draftedReply: 'We sincerely apologize for delivering an expired product. We have processed a full refund and alerted the store manager to prevent this from happening again.',
    status: 'needs_human',
    similarCases: [
      { id: '#ZPT-9556', subject: 'Expired product delivered', action: 'Refund + Goodwill', similarity: 0.96 },
      { id: '#ZPT-9234', subject: 'Milk past expiration date', action: 'Refund', similarity: 0.93 },
      { id: '#ZPT-8901', subject: 'Quality issue with dairy', action: 'Refund + Credit', similarity: 0.89 },
    ]
  },
];

export default function AutomationBoard() {
  const navigate = useNavigate();
  const { showToast } = useStore();
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'low'>('all');

  const filteredTickets = aiTickets.filter(ticket => {
    if (filter === 'high') return ticket.confidence >= 0.8;
    if (filter === 'low') return ticket.confidence < 0.8;
    return true;
  });

  const autoResolved = filteredTickets.filter(t => t.status === 'auto_resolved');
  const needsHuman = filteredTickets.filter(t => t.status === 'needs_human');

  const toggleExpand = (ticketId: string) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const handleApprove = (ticketId: string) => {
    showToast(`Ticket ${ticketId} approved and sent to customer`, 'success');
    setExpandedTicket(null);
  };

  const TicketCard = ({ ticket }: { ticket: TicketWithAI }) => {
    const isExpanded = expandedTicket === ticket.id;
    
    return (
      <div className="bg-surface border border-border mb-3 hover:border-primary/30 transition-colors">
        {/* Header */}
        <div 
          className="p-4 cursor-pointer"
          onClick={() => toggleExpand(ticket.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-caption font-medium text-primary">{ticket.id}</span>
                <span className="text-caption text-text-secondary">•</span>
                <span className="text-caption text-text-secondary">{ticket.category}</span>
              </div>
              <h3 className="text-body font-medium text-text-primary mb-1">
                {ticket.subject}
              </h3>
              <p className="text-caption text-text-secondary">{ticket.customerName}</p>
            </div>
            <div className="text-right ml-4">
              <div className="text-caption text-text-secondary mb-1">Confidence</div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      ticket.confidence >= 0.8 ? 'bg-success' :
                      ticket.confidence >= 0.6 ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${ticket.confidence * 100}%` }}
                  />
                </div>
                <span className="text-body font-semibold text-primary">
                  {Math.round(ticket.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-caption text-text-secondary">Action: </span>
                <span className="text-caption font-medium text-text-primary">{ticket.action}</span>
              </div>
              <span className="text-caption text-text-secondary">
                {isExpanded ? '▼ Collapse' : '▶ Expand'}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border">
            {/* Reasoning */}
            <div className="p-4 bg-info-light/30 border-b border-border">
              <div className="flex items-start gap-2">
                <span className="text-info text-lg">💡</span>
                <div className="flex-1">
                  <div className="text-caption font-semibold text-text-secondary uppercase tracking-wide mb-1">
                    AI Reasoning
                  </div>
                  <p className="text-caption text-text-primary leading-relaxed italic">
                    {ticket.reasoning}
                  </p>
                </div>
              </div>
            </div>

            {/* Similar Cases */}
            <div className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-caption font-semibold text-text-secondary uppercase tracking-wide">
                  Top 3 Similar Past Cases
                </span>
                <span className="text-caption text-text-secondary">(Used for decision)</span>
              </div>
              <div className="space-y-2">
                {ticket.similarCases.map((case_, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between py-2.5 px-3 bg-surface border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-caption font-medium text-primary">{case_.id}</span>
                        <span className="text-caption text-text-secondary">→</span>
                        <span className="text-caption font-medium text-success">{case_.action}</span>
                      </div>
                      <div className="text-caption text-text-secondary">{case_.subject}</div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${case_.similarity * 100}%` }}
                        />
                      </div>
                      <span className="text-caption font-semibold text-primary w-10 text-right">
                        {Math.round(case_.similarity * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drafted Reply */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-caption font-semibold text-text-secondary uppercase tracking-wide">
                  AI-Drafted Reply
                </span>
                {ticket.status === 'auto_resolved' && (
                  <span className="text-caption text-success">✓ Sent to customer</span>
                )}
              </div>
              <div className="p-3 bg-surface border border-border text-body text-text-primary leading-relaxed rounded">
                {ticket.draftedReply}
              </div>
            </div>

            {/* Actions */}
            {ticket.status === 'needs_human' && (
              <div className="p-4 border-t border-border bg-warning-light/20 flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(ticket.id);
                  }}
                  className="btn-primary"
                >
                  ✓ Approve & Send
                </button>
                <button className="btn-secondary">✏️ Edit Reply</button>
                <button className="btn-secondary">👤 Reassign</button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tickets/${ticket.id}`);
                  }}
                  className="btn-ghost ml-auto"
                >
                  View Full Details →
                </button>
              </div>
            )}

            {ticket.status === 'auto_resolved' && (
              <div className="p-4 border-t border-border bg-success-light/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-success text-lg">✓</span>
                  <span className="text-caption text-success font-medium">
                    Auto-resolved and sent to customer
                  </span>
                  <span className="text-caption text-text-secondary">
                    • 2 minutes ago
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tickets/${ticket.id}`);
                  }}
                  className="btn-ghost"
                >
                  View Details →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-h1 text-text-primary mb-2">AI Automation Board</h1>
        <p className="text-body text-text-secondary">
          Monitoring automated ticket resolution with AI-powered assistance
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-caption text-text-secondary mb-1">Total Processed</div>
          <div className="text-h1 font-semibold text-text-primary">{aiTickets.length}</div>
          <div className="text-caption text-text-secondary mt-1">Last 1 hour</div>
        </div>
        <div className="card p-4 border-success/30 bg-success-light/20">
          <div className="text-caption text-text-secondary mb-1">Auto-Resolved</div>
          <div className="text-h1 font-semibold text-success">{autoResolved.length}</div>
          <div className="text-caption text-success mt-1">
            {Math.round((autoResolved.length / aiTickets.length) * 100)}% of total
          </div>
        </div>
        <div className="card p-4 border-warning/30 bg-warning-light/20">
          <div className="text-caption text-text-secondary mb-1">Needs Review</div>
          <div className="text-h1 font-semibold text-warning">{needsHuman.length}</div>
          <div className="text-caption text-warning mt-1">Awaiting approval</div>
        </div>
        <div className="card p-4 border-primary/30 bg-primary/5">
          <div className="text-caption text-text-secondary mb-1">Avg Confidence</div>
          <div className="text-h1 font-semibold text-primary">
            {Math.round((aiTickets.reduce((sum, t) => sum + t.confidence, 0) / aiTickets.length) * 100)}%
          </div>
          <div className="text-caption text-primary mt-1">Across all tickets</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-caption text-text-secondary font-medium">Filter by confidence:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded text-caption font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-surface border border-border text-text-secondary hover:border-primary/30'
          }`}
        >
          All Tickets
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-3 py-1.5 rounded text-caption font-medium transition-colors ${
            filter === 'high' 
              ? 'bg-success text-white' 
              : 'bg-surface border border-border text-text-secondary hover:border-success/30'
          }`}
        >
          High (≥80%)
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`px-3 py-1.5 rounded text-caption font-medium transition-colors ${
            filter === 'low' 
              ? 'bg-warning text-white' 
              : 'bg-surface border border-border text-text-secondary hover:border-warning/30'
          }`}
        >
          Low (&lt;80%)
        </button>
      </div>

      {/* Two-Lane Board */}
      <div className="grid grid-cols-2 gap-6">
        {/* Auto-Resolved Lane */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-success/30">
            <div className="flex items-center gap-2">
              <span className="text-success text-xl">✓</span>
              <h2 className="text-h2 text-text-primary">Auto-Resolved</h2>
            </div>
            <span className="px-3 py-1 bg-success-light text-success text-caption font-medium rounded">
              {autoResolved.length} tickets
            </span>
          </div>
          <div>
            {autoResolved.length > 0 ? (
              autoResolved.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="card p-8 text-center">
                <div className="text-4xl mb-2">✓</div>
                <p className="text-body text-text-secondary">No auto-resolved tickets with current filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Needs Human Review Lane */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-warning/30">
            <div className="flex items-center gap-2">
              <span className="text-warning text-xl">⚠️</span>
              <h2 className="text-h2 text-text-primary">Needs Human Review</h2>
            </div>
            <span className="px-3 py-1 bg-warning-light text-warning text-caption font-medium rounded">
              {needsHuman.length} tickets
            </span>
          </div>
          <div>
            {needsHuman.length > 0 ? (
              needsHuman.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="card p-8 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-body text-text-secondary">All tickets auto-resolved with high confidence!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
