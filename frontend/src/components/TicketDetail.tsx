import { useState, useEffect } from "react";
import { getTicket } from "../services/api";
import PrecedentCard from "./PrecedentCard";
import DecisionBadge from "./DecisionBadge";
import { Ticket } from "../types/ticket";

interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
}

export default function TicketDetail({ ticketId, onBack }: TicketDetailProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    getTicket(ticketId).then(setTicket);
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="container">
        <div className="text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="stack stack-xl">
        <button className="button-ghost" onClick={onBack} style={{ alignSelf: 'flex-start' }}>
          ← Back
        </button>
        
        <div className="stack stack-md">
          <div className="row space-between" style={{ alignItems: 'flex-start' }}>
            <h1 className="text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
              {ticket.subject}
            </h1>
            {ticket.decision && <DecisionBadge decision={ticket.decision} />}
          </div>
          
          <div className="row row-sm">
            <span className="text-mono text-secondary">#{ticket.id}</span>
            <span className="text-secondary">·</span>
            <span className="text-sm text-secondary" style={{ textTransform: 'capitalize' }}>
              {ticket.status}
            </span>
          </div>
        </div>
        
        <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
          <p className="text-base" style={{ lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
            {ticket.description}
          </p>
        </div>
        
        {ticket.precedents && ticket.precedents.length > 0 && (
          <div className="stack stack-lg">
            <h2 className="text-lg font-semibold" style={{ letterSpacing: '-0.015em' }}>
              Similar Past Tickets
            </h2>
            <div className="stack stack-md">
              {ticket.precedents.map((p) => (
                <PrecedentCard key={p.id} precedent={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}