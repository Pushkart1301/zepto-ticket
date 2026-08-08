import { useNavigate } from 'react-router-dom';
import { mockTickets, getTicketsByStatus, getTicketsByPriority, getTicketsBySLA } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  const totalTickets = mockTickets.length;
  const openTickets = getTicketsByStatus('open').length + getTicketsByStatus('new').length + getTicketsByStatus('in_progress').length;
  const pendingTickets = getTicketsByStatus('pending').length;
  const resolvedToday = getTicketsByStatus('resolved').length + getTicketsByStatus('closed').length;
  const slaBreaches = getTicketsBySLA('breached').length;
  
  // Calculate avg resolution time (mocked)
  const avgResolutionTime = '4.2h';

  const kpis = [
    { label: 'Total Tickets', value: totalTickets, path: '/tickets', color: 'text-primary' },
    { label: 'Open', value: openTickets, path: '/tickets?status=open', color: 'text-info' },
    { label: 'Pending', value: pendingTickets, path: '/tickets?status=pending', color: 'text-warning' },
    { label: 'Resolved Today', value: resolvedToday, path: '/tickets?status=resolved', color: 'text-success' },
    { label: 'SLA Breaches', value: slaBreaches, path: '/sla', color: 'text-danger' },
    { label: 'Avg Resolution', value: avgResolutionTime, path: '/analytics', color: 'text-text-primary' },
  ];

  const priorityData = [
    { priority: 'Critical', count: getTicketsByPriority('critical').length, color: 'danger' },
    { priority: 'High', count: getTicketsByPriority('high').length, color: 'warning' },
    { priority: 'Medium', count: getTicketsByPriority('medium').length, color: 'info' },
    { priority: 'Low', count: getTicketsByPriority('low').length, color: 'success' },
  ];

  const slaData = [
    { label: 'Met', count: getTicketsBySLA('met').length, percent: 75 },
    { label: 'At Risk', count: getTicketsBySLA('at_risk').length, percent: 15 },
    { label: 'Breached', count: getTicketsBySLA('breached').length, percent: 10 },
  ];

  const recentTickets = mockTickets.slice(0, 6);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">Support Operations</h1>
          <p className="text-body text-text-secondary mt-1">Monitor and manage customer support tickets</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          <button className="btn-secondary">🔄 Refresh</button>
          <button className="btn-secondary">📥 Export</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            onClick={() => navigate(kpi.path)}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="text-caption text-text-secondary mb-2">{kpi.label}</div>
            <div className={`text-h1 font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Ticket Volume Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h2 text-text-primary">Ticket Volume</h2>
            <div className="flex items-center gap-2">
              <button className="text-caption text-text-secondary hover:text-text-primary px-2 py-1">Today</button>
              <button className="text-caption text-primary bg-primary/10 px-2 py-1 rounded">7d</button>
              <button className="text-caption text-text-secondary hover:text-text-primary px-2 py-1">30d</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 52, 48, 67, 71, 68, 78].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col justify-end gap-1">
                <div
                  className="bg-primary/70 hover:bg-primary rounded-t transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <div className="text-caption text-text-secondary text-center">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets by Status */}
        <div className="card p-6">
          <h2 className="text-h2 text-text-primary mb-4">Tickets by Status</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E3E7" strokeWidth="20" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2E7D5B"
                  strokeWidth="20"
                  strokeDasharray="125 251"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#B8792E"
                  strokeWidth="20"
                  strokeDasharray="75 251"
                  strokeDashoffset="-125"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#C13F3F"
                  strokeWidth="20"
                  strokeDasharray="50 251"
                  strokeDashoffset="-200"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-h1 font-bold text-text-primary">{totalTickets}</div>
                <div className="text-caption text-text-secondary">Total</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-caption text-text-secondary">Resolved (50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-caption text-text-secondary">Open (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <span className="text-caption text-text-secondary">Pending (20%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority & SLA Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="card p-6">
          <h2 className="text-h2 text-text-primary mb-4">Priority Distribution</h2>
          <div className="space-y-3">
            {priorityData.map((item) => (
              <div
                key={item.priority}
                onClick={() => navigate(`/tickets?priority=${item.priority.toLowerCase()}`)}
                className="flex items-center justify-between py-2 hover:bg-background px-3 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
                  <span className="text-body text-text-primary">{item.priority}</span>
                </div>
                <span className="text-body font-semibold text-text-primary">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Health */}
        <div className="card p-6">
          <h2 className="text-h2 text-text-primary mb-4">SLA Health</h2>
          <div className="space-y-4">
            {slaData.map((item) => (
              <div key={item.label} onClick={() => navigate(`/sla?status=${item.label.toLowerCase().replace(' ', '_')}`)} className="cursor-pointer hover:bg-background p-2 rounded transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-body text-text-primary">{item.label}</span>
                  <span className="text-body font-semibold text-text-primary">{item.count} ({item.percent}%)</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      item.label === 'Met' ? 'bg-success' :
                      item.label === 'At Risk' ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent & Priority Tickets */}
      <div className="card">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-h2 text-text-primary">Recent & Priority Tickets</h2>
          <button onClick={() => navigate('/tickets')} className="text-body text-primary hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Ticket ID</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Subject</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Category</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Priority</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">SLA</th>
                <th className="text-left py-3 px-4 text-table font-semibold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  className="border-b border-border hover:bg-background cursor-pointer"
                >
                  <td className="py-3 px-4 text-table font-medium text-primary">{ticket.id}</td>
                  <td className="py-3 px-4 text-table text-text-primary">{ticket.subject}</td>
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
                  <td className="py-3 px-4">
                    <span className={`badge badge-${
                      ticket.slaStatus === 'met' ? 'success' :
                      ticket.slaStatus === 'at_risk' ? 'warning' : 'danger'
                    } capitalize`}>
                      {ticket.slaStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tickets/${ticket.id}`);
                      }}
                      className="text-primary hover:underline text-table"
                    >
                      View
                    </button>
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
