import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getTicketById, getCustomerById, TicketStatus } from '../data/mockData';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTicket, showModal, showToast } = useStore();
  
  const ticket = getTicketById(id || '');
  const customer = ticket ? getCustomerById(ticket.customerId) : null;
  
  const [replyText, setReplyText] = useState('');

  if (!ticket || !customer) {
    return <div className="p-6">Ticket not found</div>;
  }

  const handleStatusChange = (newStatus: TicketStatus) => {
    showModal({
      title: 'Change Status',
      message: `Are you sure you want to change this ticket status to "${newStatus.replace('_', ' ')}"?`,
      type: 'confirm',
      onConfirm: () => {
        updateTicket(ticket.id, { status: newStatus });
      },
      onCancel: () => {}
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    showToast('Reply sent successfully', 'success');
    setReplyText('');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="btn-ghost mb-4">← Back</button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-h1 text-text-primary">{ticket.id}</h1>
              <span className={`badge badge-${
                ticket.priority === 'critical' ? 'danger' :
                ticket.priority === 'high' ? 'warning' :
                ticket.priority === 'medium' ? 'info' : 'success'
              } capitalize`}>
                {ticket.priority}
              </span>
              <span className={`badge ${
                ticket.status === 'resolved' || ticket.status === 'closed' ? 'badge-success' :
                ticket.status === 'pending' ? 'badge-warning' : 'badge-info'
              } capitalize`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-h2 text-text-primary">{ticket.subject}</h2>
          </div>
          <div className="text-right">
            <div className="text-caption text-text-secondary mb-1">SLA Deadline</div>
            <div className={`text-body font-semibold ${
              ticket.slaStatus === 'breached' ? 'text-danger' :
              ticket.slaStatus === 'at_risk' ? 'text-warning' : 'text-success'
            }`}>
              {new Date(ticket.slaDeadline).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Conversation Thread */}
          <div className="card">
            <div className="p-4 border-b border-border">
              <h3 className="text-h2 text-text-primary">Conversation</h3>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {ticket.messages.map((message) => (
                <div key={message.id} className={`p-4 rounded ${
                  message.type === 'customer' ? 'bg-background' : 'bg-primary/5'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-caption font-semibold">
                        {message.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-body font-medium text-text-primary">{message.author}</div>
                        <div className="text-caption text-text-secondary">
                          {message.type === 'customer' ? 'Customer' : 'Agent'}
                        </div>
                      </div>
                    </div>
                    <div className="text-caption text-text-secondary">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-body text-text-primary">{message.content}</p>
                </div>
              ))}
              
              {ticket.messages.length === 0 && (
                <div className="text-center py-8 text-text-secondary">
                  No messages yet
                </div>
              )}
            </div>
          </div>

          {/* Reply Composer */}
          <div className="card p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <button className="text-body text-primary font-medium border-b-2 border-primary pb-1">Reply</button>
                <button className="text-body text-text-secondary pb-1">Internal Note</button>
              </div>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="input w-full min-h-32 mb-3"
            />
            <div className="flex items-center justify-between">
              <button className="btn-ghost">📎 Attach</button>
              <div className="flex items-center gap-2">
                <button className="btn-secondary">Save Draft</button>
                <button onClick={handleSendReply} className="btn-primary">Send Reply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer Info */}
          <div className="card p-4">
            <h3 className="text-body font-semibold text-text-primary mb-3">Customer</h3>
            <div className="space-y-2">
              <div
                onClick={() => navigate(`/customers/${customer.id}`)}
                className="flex items-center gap-2 cursor-pointer hover:text-primary"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <div className="text-body font-medium text-text-primary">{customer.name}</div>
                  <div className="text-caption text-text-secondary">{customer.email}</div>
                </div>
              </div>
              <div className="text-caption text-text-secondary">{customer.phone}</div>
              <div className="text-caption text-text-secondary">{customer.location}</div>
              <div className="text-caption text-text-secondary">{customer.totalOrders} orders</div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="card p-4">
            <h3 className="text-body font-semibold text-text-primary mb-3">Details</h3>
            <div className="space-y-3">
              {ticket.orderId && (
                <div>
                  <div className="text-caption text-text-secondary mb-1">Order ID</div>
                  <div className="text-body text-primary font-medium">{ticket.orderId}</div>
                </div>
              )}
              <div>
                <div className="text-caption text-text-secondary mb-1">Category</div>
                <select
                  value={ticket.category}
                  onChange={(e) => updateTicket(ticket.id, { category: e.target.value as any })}
                  className="input w-full"
                >
                  <option value="Payment">Payment</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Refund">Refund</option>
                  <option value="Order">Order</option>
                  <option value="Account">Account</option>
                  <option value="Product">Product</option>
                  <option value="Technical">Technical</option>
                  <option value="Cancellation">Cancellation</option>
                </select>
              </div>
              <div>
                <div className="text-caption text-text-secondary mb-1">Priority</div>
                <select
                  value={ticket.priority}
                  onChange={(e) => updateTicket(ticket.id, { priority: e.target.value as any })}
                  className="input w-full"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <div className="text-caption text-text-secondary mb-1">Status</div>
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                  className="input w-full"
                >
                  <option value="new">New</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <div className="text-caption text-text-secondary mb-1">Assigned To</div>
                <div className="text-body text-text-primary">{ticket.assignedToName || 'Unassigned'}</div>
              </div>
              <div>
                <div className="text-caption text-text-secondary mb-1">Created</div>
                <div className="text-body text-text-primary">{new Date(ticket.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-caption text-text-secondary mb-1">Last Updated</div>
                <div className="text-body text-text-primary">{new Date(ticket.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {ticket.tags.length > 0 && (
            <div className="card p-4">
              <h3 className="text-body font-semibold text-text-primary mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {ticket.tags.map((tag) => (
                  <span key={tag} className="badge badge-info">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
