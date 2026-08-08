import { useState } from 'react';
import { Ticket } from '../data/mockTickets';
import ConfidenceMeter from './ConfidenceMeter';
import ReasonTag from './ReasonTag';
import PrecedentMiniCard from './PrecedentMiniCard';
import Button from './Button';

interface TicketCardProps {
  ticket: Ticket;
  onApprove?: (ticketId: string) => void;
  onReject?: (ticketId: string) => void;
}

export default function TicketCard({ ticket, onApprove, onReject }: TicketCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApprove = () => {
    onApprove?.(ticket.ticket_id);
  };

  const handleReject = () => {
    onReject?.(ticket.ticket_id);
  };

  return (
    <div
      className="bg-surface border border-border rounded-card p-4 hover:bg-surface-hover transition-colors duration-150 cursor-pointer animate-fade-in animate-slide-in"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Collapsed View */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-caption text-text-muted">
                {ticket.ticket_id}
              </span>
              <span className="font-mono text-caption text-text-muted">·</span>
              <span className="font-mono text-caption text-text-muted">
                {ticket.order_id}
              </span>
            </div>
            <p className="text-body text-text-primary leading-tight">
              {ticket.description}
            </p>
          </div>
          <ConfidenceMeter confidence={ticket.confidence} />
        </div>

        {ticket.status === 'human_review' && ticket.refusal_reason && (
          <ReasonTag reason={ticket.refusal_reason} />
        )}
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div 
          className="mt-4 pt-4 border-t border-border space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Precedents */}
          {ticket.precedents.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-caption text-text-secondary uppercase tracking-wide">
                Similar Cases
              </h3>
              <div className="space-y-2">
                {ticket.precedents.map((precedent, idx) => (
                  <PrecedentMiniCard key={idx} precedent={precedent} />
                ))}
              </div>
            </div>
          )}

          {/* Drafted Reply */}
          <div className="space-y-2">
            <h3 className="text-caption text-text-secondary uppercase tracking-wide">
              Drafted Reply
            </h3>
            <div className="border border-border rounded-button p-3">
              <p className="text-caption text-text-primary leading-relaxed">
                {ticket.drafted_reply}
              </p>
            </div>
          </div>

          {/* Reasoning - Signature element with citation style */}
          <div className="border-l-2 border-border pl-3 py-1">
            <p className="text-caption text-text-muted leading-relaxed italic">
              Why this action: {ticket.reasoning}
            </p>
          </div>

          {/* Actions for human review */}
          {ticket.status === 'human_review' && (
            <div className="flex items-center gap-2 pt-2">
              <Button variant="primary" onClick={handleApprove}>
                Approve
              </Button>
              <Button variant="outline" onClick={handleApprove}>
                Override & Approve
              </Button>
              <Button variant="ghost" onClick={handleReject}>
                Reject
              </Button>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-caption text-text-muted font-mono">
            {new Date(ticket.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      )}
    </div>
  );
}
