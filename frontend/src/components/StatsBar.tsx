import { Ticket } from "../types/ticket";

interface StatsBarProps {
  tickets: Ticket[];
}

export default function StatsBar({ tickets }: StatsBarProps) {
  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.status === "pending").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  return (
    <div 
      className="card" 
      style={{ 
        padding: 'var(--spacing-lg) var(--spacing-xl)',
      }}
    >
      <div className="row row-lg">
        <div className="stack stack-xs">
          <span className="text-lg font-semibold" style={{ letterSpacing: '-0.015em' }}>
            {stats.total}
          </span>
          <span className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Total
          </span>
        </div>
        
        <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} />
        
        <div className="stack stack-xs">
          <div className="row row-sm" style={{ alignItems: 'baseline' }}>
            <span className="text-lg font-semibold" style={{ letterSpacing: '-0.015em' }}>
              {stats.pending}
            </span>
            <span className="status-icon attention" style={{ marginTop: '6px' }} />
          </div>
          <span className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Pending
          </span>
        </div>
        
        <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} />
        
        <div className="stack stack-xs">
          <div className="row row-sm" style={{ alignItems: 'baseline' }}>
            <span className="text-lg font-semibold" style={{ letterSpacing: '-0.015em' }}>
              {stats.resolved}
            </span>
            <span className="status-icon success" style={{ marginTop: '6px' }} />
          </div>
          <span className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Resolved
          </span>
        </div>
      </div>
    </div>
  );
}