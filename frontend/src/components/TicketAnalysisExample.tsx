/**
 * Ticket Analysis Example
 * Demonstrates how to use the new components in a real workflow
 */

import { useState } from 'react';
import ConfidenceMeter from './ConfidenceMeter';
import StatusChip from './StatusChip';
import ReasonTag from './ReasonTag';
import Button from './Button';
import StatTile from './StatTile';
import PrecedentMiniCard from './PrecedentMiniCard';

export default function TicketAnalysisExample() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(['policy-violation']);

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  return (
    <div className="container">
      <div className="stack stack-xl">
        
        {/* Header */}
        <div className="row space-between" style={{ alignItems: 'flex-start' }}>
          <div className="stack stack-sm">
            <h1 className="text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
              Ticket Analysis
            </h1>
            <span className="text-mono text-secondary">#TKT-14892</span>
          </div>
          <StatusChip label="Under review" status="attention" icon="↻" />
        </div>

        {/* Stats Overview */}
        <div className="card" style={{ padding: 'var(--spacing-lg) var(--spacing-xl)' }}>
          <div className="row row-xl" style={{ flexWrap: 'wrap' }}>
            <StatTile 
              label="Processing Time" 
              value="3.2h"
            />
            <StatTile 
              label="Similar Cases" 
              value={12}
            />
            <StatTile 
              label="Auto-resolve Rate" 
              value="87%"
              trend={{ direction: 'up', value: '5%' }}
            />
            <StatTile 
              label="Avg Rating" 
              value="4.3"
            />
          </div>
        </div>

        {/* Main Analysis Panel */}
        <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
          <div className="stack stack-lg">
            
            {/* Subject */}
            <div className="stack stack-sm">
              <h2 className="text-md font-semibold" style={{ letterSpacing: '-0.015em' }}>
                Customer requesting refund for delayed shipment
              </h2>
              <p className="text-secondary" style={{ lineHeight: 1.6 }}>
                Order was placed on Jan 15th with expected delivery Jan 22nd. 
                Customer contacted us on Jan 25th stating package has not arrived. 
                Tracking shows package is still in transit. Customer is requesting 
                full refund or expedited replacement.
              </p>
            </div>

            <hr className="divider" />

            {/* AI Analysis */}
            <div className="stack stack-md">
              <div className="row space-between">
                <h3 className="text-sm font-semibold">AI Analysis</h3>
                <ConfidenceMeter confidence={0.78} width="140px" />
              </div>

              <div className="stack stack-sm">
                <span className="text-xs text-secondary" style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.03em' 
                }}>
                  Detected Issues
                </span>
                <div className="row row-sm" style={{ flexWrap: 'wrap' }}>
                  <ReasonTag 
                    label="Policy violation"
                    selected={selectedReasons.includes('policy-violation')}
                    onClick={() => toggleReason('policy-violation')}
                  />
                  <ReasonTag 
                    label="Shipping delay"
                    selected={selectedReasons.includes('shipping-delay')}
                    onClick={() => toggleReason('shipping-delay')}
                  />
                  <ReasonTag 
                    label="Requires approval"
                    selected={selectedReasons.includes('approval')}
                    onClick={() => toggleReason('approval')}
                  />
                  <ReasonTag 
                    label="High value order"
                    selected={selectedReasons.includes('high-value')}
                    onClick={() => toggleReason('high-value')}
                  />
                </div>
              </div>

              <div className="card" style={{ 
                padding: 'var(--spacing-lg)',
                backgroundColor: 'var(--color-accent-subtle)',
                borderColor: 'var(--color-accent)'
              }}>
                <div className="stack stack-sm">
                  <span className="text-sm font-medium">Recommended Action</span>
                  <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
                    Offer partial refund (20%) for inconvenience while package is in transit. 
                    Based on similar cases, this maintains customer satisfaction while adhering 
                    to policy guidelines.
                  </p>
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Actions */}
            <div className="row row-md">
              <Button variant="primary" size="md">
                Approve Recommendation
              </Button>
              <Button variant="secondary" size="md">
                Modify & Approve
              </Button>
              <Button variant="ghost" size="md">
                Escalate to Manager
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Past Cases */}
        <div className="stack stack-lg">
          <div className="row space-between">
            <h2 className="text-lg font-semibold" style={{ letterSpacing: '-0.015em' }}>
              Similar Past Cases
            </h2>
            <span className="text-xs text-secondary">
              Based on subject, category, and customer history
            </span>
          </div>

          <div className="stack stack-md">
            <PrecedentMiniCard
              id="TKT-13742"
              subject="Package delayed, customer requesting refund"
              resolution="Offered 25% discount on next order. Customer accepted and package arrived 2 days later."
              similarity={0.89}
              rating={4.5}
            />

            <PrecedentMiniCard
              id="TKT-12991"
              subject="Delayed shipment exceeding estimated delivery window"
              resolution="Full refund processed after confirming shipment was lost. Customer reordered."
              similarity={0.82}
              rating={4}
            />

            <PrecedentMiniCard
              id="TKT-12103"
              subject="Customer wants refund for order still in transit"
              resolution="Explained tracking details and offered expedited shipping for inconvenience. Issue resolved."
              similarity={0.76}
              rating={3.5}
            />

            <PrecedentMiniCard
              id="TKT-11456"
              subject="Requesting compensation for shipping delay"
              resolution="Applied 15% refund for delayed delivery. Customer satisfied with resolution."
              similarity={0.71}
              rating={4}
            />
          </div>
        </div>

        {/* Customer Context */}
        <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
          <div className="stack stack-lg">
            <h3 className="text-md font-semibold">Customer Context</h3>
            
            <div className="row row-xl" style={{ flexWrap: 'wrap' }}>
              <StatTile label="Account Age" value="2.3yr" />
              <StatTile label="Total Orders" value={47} />
              <StatTile label="Avg Order Value" value="$124" />
              <StatTile label="Support Tickets" value={3} />
            </div>

            <div className="stack stack-sm">
              <span className="text-xs text-secondary" style={{ 
                textTransform: 'uppercase', 
                letterSpacing: '0.03em' 
              }}>
                Customer Segments
              </span>
              <div className="row row-sm" style={{ flexWrap: 'wrap' }}>
                <ReasonTag label="Loyal customer" />
                <ReasonTag label="High value" />
                <ReasonTag label="Low complaint rate" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
