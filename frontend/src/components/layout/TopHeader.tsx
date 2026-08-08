import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTickets, mockCustomers } from '../../data/mockData';

export default function TopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const searchResults = searchQuery.trim()
    ? [
        ...mockTickets
          .filter(
            (t) =>
              t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
          .map((t) => ({ type: 'ticket' as const, data: t })),
        ...mockCustomers
          .filter(
            (c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.phone.includes(searchQuery) ||
              c.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3)
          .map((c) => ({ type: 'customer' as const, data: c })),
      ]
    : [];

  const handleResultClick = (result: typeof searchResults[0]) => {
    if (result.type === 'ticket') {
      navigate(`/tickets/${result.data.id}`);
    } else {
      navigate(`/customers/${result.data.id}`);
    }
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      {/* Page Title (will be overridden by child routes) */}
      <div className="text-h2 text-text-primary">Support Operations</div>

      {/* Global Search */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <input
          type="text"
          placeholder="Search tickets, customers, orders... (⌘K)"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full input pl-10"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
          🔍
        </span>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded shadow-lg max-h-96 overflow-y-auto z-50">
            {searchResults.map((result, idx) => (
              <div
                key={idx}
                onClick={() => handleResultClick(result)}
                className="px-4 py-3 hover:bg-background cursor-pointer border-b border-border last:border-0"
              >
                {result.type === 'ticket' ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-primary font-medium">
                        {result.data.id}
                      </span>
                      <span className="text-caption text-text-secondary">•</span>
                      <span className="text-body text-text-primary">
                        {result.data.subject}
                      </span>
                    </div>
                    <div className="text-caption text-text-secondary mt-1">
                      {result.data.customerName} • {result.data.category}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-body text-text-primary">
                      {result.data.name}
                    </div>
                    <div className="text-caption text-text-secondary mt-1">
                      {result.data.phone} • {result.data.email}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative text-text-secondary hover:text-text-primary text-xl">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-caption rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button className="text-text-secondary hover:text-text-primary text-xl">
          ❓
        </button>
        <button className="text-text-secondary hover:text-text-primary text-xl">
          🌙
        </button>
      </div>
    </header>
  );
}
