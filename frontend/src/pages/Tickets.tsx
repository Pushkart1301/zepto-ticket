import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { TicketStatus, TicketPriority, TicketCategory } from '../data/mockData';

export default function Tickets() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tickets, selectedTicketIds, toggleTicketSelection, selectAllTickets, clearSelection, updateTicket } = useStore();

  const [filters, setFilters] = useState({
    status: (searchParams.get('status') as TicketStatus) || '',
    priority: (searchParams.get('priority') as TicketPriority) || '',
    category: '' as TicketCategory | '',
    search: '',
  });

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.status && ticket.status !== filters.status) return false;
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.category && ticket.category !== filters.category) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        ticket.id.toLowerCase().includes(search) ||
        ticket.subject.toLowerCase().includes(search) ||
        ticket.customerName.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const allSelected = selectedTicketIds.length === filteredTickets.length && filteredTickets.length > 0;

  const handleBulkAction = (action: string) => {
    if (action === 'assign') {
      selectedTicketIds.forEach(id => updateTicket(id, { assignedTo: 'AGT-001', assignedToName: 'Arjun Mehta' }));
    } else if (action === 'close') {
      selectedTicketIds.forEach(id => updateTicket(id, { status: 'closed' }));
    }
    clearSelection();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">All Tickets</h1>
          <p className="text-body text-text-secondary mt-1">{filteredTickets.length} tickets found</p>
        </div>
        <button className="btn-primary">+ New Ticket</button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as TicketStatus })}
            className="input"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value as TicketPriority })}
            className="input"
          >
            <option value="">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value as TicketCategory })}
            className="input"
          >
            <option value="">All Categories</option>
            <option value="Payment">Payment</option>
            <option value="Delivery">Delivery</option>
            <option value="Refund">Refund</option>
            <option value="Order">Order</option>
            <option value="Account">Account</option>
            <option value="Product">Product</option>
            <option value="Technical">Technical</option>
            <option value="Cancellation">Cancellation</option>
          </select>
          <button
            onClick={() => setFilters({ status: '', priority: '', category: '', search: '' })}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTicketIds.length > 0 && (
        <div className="card p-4 flex items-center justify-between bg-primary/5">
          <span className="text-body text-text-primary font-medium">
            {selectedTicketIds.length} ticket(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleBulkAction('assign')} className="btn-secondary">
              Assign
            </button>
            <button onClick={() => handleBulkAction('close')} className="btn-secondary">
              Close
            </button>
            <button onClick={clearSelection} className="btn-ghost">
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Tickets Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => allSelected ? clearSelection() : selectAllTickets(filteredTickets.map(t => t.id))}
                    className="w-4 h-4"
                  />
                </th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Ticket ID</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Subject</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Category</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Priority</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Agent</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-border hover:bg-background cursor-pointer"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTicketIds.includes(ticket.id)}
                      onChange={() => toggleTicketSelection(ticket.id)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="py-3 px-4 text-table font-medium text-primary">{ticket.id}</td>
                  <td className="py-3 px-4 text-table text-text-primary max-w-xs truncate">{ticket.subject}</td>
                  <td className="py-3 px-4 text-table text-text-primary">{ticket.customerName}</td>
                  <td className="py-3 px-4 text-table text-text-secondary">{ticket.category}</td>
                  <td className="py-3 px-4">
                    <span className={`badge badge-${
                      ticket.priority === 'critical' ? 'danger' :
                      ticket.priority === 'high' ? 'warning' :
                      ticket.priority === 'medium' ? 'info' : 'success'
                    } capitalize`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge ${
                      ticket.status === 'resolved' || ticket.status === 'closed' ? 'badge-success' :
                      ticket.status === 'pending' ? 'badge-warning' : 'badge-info'
                    } capitalize`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-table text-text-secondary">{ticket.assignedToName || 'Unassigned'}</td>
                  <td className="py-3 px-4 text-table text-text-secondary">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
