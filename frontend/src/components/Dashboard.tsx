import { useState, useEffect } from 'react';
import { Ticket, mockTickets } from '../data/mockTickets';
import TicketCard from './TicketCard';
import Button from './Button';
import ConfidenceMeter from './ConfidenceMeter';

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamIndex, setStreamIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  // Split tickets by status
  const autoResolved = tickets.filter(t => t.status === 'auto_resolved');
  const humanReview = tickets.filter(t => t.status === 'human_review');

  // Calculate stats
  const totalToday = tickets.length;
  const autoPercent = totalToday > 0 ? Math.round((autoResolved.length / totalToday) * 100) : 0;
  const avgConfidence = totalToday > 0 
    ? tickets.reduce((sum, t) => sum + t.confidence, 0) / totalToday 
    : 0;
  const queueSize = humanReview.length;

  // Check for clustered tickets (3+ from Store #4 with "wrong item")
  useEffect(() => {
    const store4Tickets = tickets.filter(t => 
      t.store_id === 4 && t.description.toLowerCase().includes('wrong item')
    );
    setShowAlert(store4Tickets.length >= 3);
  }, [tickets]);

  // Play Stream functionality
  const startStream = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamIndex(0);
    setTickets([]);
  };

  useEffect(() => {
    if (!isStreaming || streamIndex >= mockTickets.length) {
      if (streamIndex >= mockTickets.length) {
        setIsStreaming(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setTickets(prev => [...prev, mockTickets[streamIndex]]);
      setStreamIndex(prev => prev + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isStreaming, streamIndex]);

  // Handle ticket actions
  const handleApprove = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.ticket_id === ticketId
          ? { ...t, status: 'auto_resolved' as const }
          : t
      )
    );
  };

  const handleReject = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.ticket_id !== ticketId));
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-h1 text-text-primary">Zepto Ops</h1>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1.5">
                <span className="text-caption text-text-muted">Today</span>
                <span className="text-h2 text-text-primary font-mono">
                  {totalToday.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-caption text-text-muted">Auto</span>
                <span className="text-h2 text-text-primary font-mono">{autoPercent}%</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-caption text-text-muted">Conf</span>
                <span className="text-h2 text-text-primary font-mono">
                  {avgConfidence.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-caption text-text-muted">Q</span>
                <span className="text-h2 text-text-primary font-mono">{queueSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-caption text-success">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-attention/10 border-b border-attention/30">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-body text-attention">⚠</span>
              <span className="text-body text-text-primary">
                12 wrong-item tickets, Store #4, last 60 min
              </span>
              <div className="flex items-center gap-1 h-4">
                {/* Simple sparkline */}
                {[3, 5, 4, 7, 9, 8, 12].map((val, i) => (
                  <div
                    key={i}
                    className="w-1 bg-attention/50"
                    style={{ height: `${(val / 12) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-caption text-text-muted hover:text-text-primary"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Board */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <Button
              variant={isStreaming ? 'outline' : 'primary'}
              onClick={startStream}
              className="w-full sm:w-auto"
            >
              {isStreaming ? 'Streaming...' : '▶ Play Stream'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auto-Resolved Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h2 text-text-primary">
                  Auto-Resolved ({autoResolved.length})
                </h2>
              </div>
              <div className="space-y-3">
                {autoResolved.map(ticket => (
                  <TicketCard key={ticket.ticket_id} ticket={ticket} />
                ))}
              </div>
            </div>

            {/* Needs Human Review Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h2 text-text-primary">
                  Needs Human Review ({humanReview.length})
                </h2>
              </div>
              <div className="space-y-3">
                {humanReview.map(ticket => (
                  <TicketCard
                    key={ticket.ticket_id}
                    ticket={ticket}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 border-l border-border bg-surface p-6 space-y-6">
          {/* Resolution Trend */}
          <div className="space-y-3">
            <h3 className="text-caption text-text-secondary uppercase tracking-wide">
              Resolution Trend
            </h3>
            <div className="h-32 border border-border rounded-button p-3 flex items-end justify-between gap-1">
              {/* Simple bar chart */}
              {[45, 52, 48, 67, 71, 68, 78, 82, 75, 87].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div
                    className="bg-accent/30 hover:bg-accent/50 transition-colors rounded-t-sm"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-caption text-text-muted font-mono">
              <span>9:00</span>
              <span>Now</span>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="space-y-3">
            <h3 className="text-caption text-text-secondary uppercase tracking-wide">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {tickets.slice(-5).reverse().map(ticket => (
                <div
                  key={ticket.ticket_id}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-caption text-text-muted">
                      {ticket.ticket_id}
                    </div>
                    <div className="text-caption text-text-secondary truncate">
                      {ticket.action || 'Pending'}
                    </div>
                  </div>
                  <ConfidenceMeter confidence={ticket.confidence} />
                </div>
              ))}
            </div>
          </div>

          {/* Live Stats */}
          <div className="space-y-3">
            <h3 className="text-caption text-text-secondary uppercase tracking-wide">
              Live Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-caption text-text-muted">Avg Response</span>
                <span className="text-caption text-text-primary font-mono">2.3s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-caption text-text-muted">Success Rate</span>
                <span className="text-caption text-text-primary font-mono">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-caption text-text-muted">Active Agents</span>
                <span className="text-caption text-text-primary font-mono">12</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
