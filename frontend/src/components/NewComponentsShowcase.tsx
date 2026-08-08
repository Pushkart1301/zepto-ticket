/**
 * New Components Showcase
 * Demonstrates all six new understated components
 */

import ConfidenceMeter from './ConfidenceMeter';
import StatusChip from './StatusChip';
import ReasonTag from './ReasonTag';
import Button from './Button';
import StatTile from './StatTile';
import PrecedentMiniCard from './PrecedentMiniCard';

export default function NewComponentsShowcase() {
  return (
    <div className="container">
      <div className="stack stack-3xl">
        
        {/* Header */}
        <div className="stack stack-md">
          <h1 className="text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
            New Components
          </h1>
          <p className="text-secondary">
            Six understated components for Zepto Ops
          </p>
        </div>

        <hr className="divider" />

        {/* 1. Confidence Meter */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">1. Confidence Meter</h2>
          <p className="text-sm text-secondary">
            Thin bar, fills with accent color. Low confidence = shorter fill + muted label (not red alarm).
          </p>
          
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="stack stack-xl">
              <div className="stack stack-md">
                <span className="text-xs text-tertiary">High confidence (92%)</span>
                <ConfidenceMeter confidence={0.92} />
              </div>
              
              <div className="stack stack-md">
                <span className="text-xs text-tertiary">Moderate confidence (63%)</span>
                <ConfidenceMeter confidence={0.63} />
              </div>
              
              <div className="stack stack-md">
                <span className="text-xs text-tertiary">Low confidence (28%)</span>
                <ConfidenceMeter confidence={0.28} />
              </div>

              <div className="stack stack-md">
                <span className="text-xs text-tertiary">Without label, custom width</span>
                <ConfidenceMeter confidence={0.75} showLabel={false} width="200px" />
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 2. Status Chip */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">2. Status Chip</h2>
          <p className="text-sm text-secondary">
            Small text label with tiny dot/icon prefix. Not a filled colored pill.
          </p>
          
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="stack stack-lg">
              <div className="row row-lg" style={{ flexWrap: 'wrap' }}>
                <StatusChip label="Resolved" status="success" />
                <StatusChip label="Pending review" status="attention" />
                <StatusChip label="Blocked" status="blocked" />
                <StatusChip label="Open" status="neutral" />
              </div>

              <div className="stack stack-sm">
                <span className="text-xs text-tertiary">With custom icons</span>
                <div className="row row-lg" style={{ flexWrap: 'wrap' }}>
                  <StatusChip label="Approved" status="success" icon="✓" />
                  <StatusChip label="Escalated" status="attention" icon="↑" />
                  <StatusChip label="Rejected" status="blocked" icon="×" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 3. Reason Tag */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">3. Reason Tag</h2>
          <p className="text-sm text-secondary">
            Plain-language text chip with hairline border, no fill.
          </p>
          
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="stack stack-lg">
              <div className="row row-md" style={{ flexWrap: 'wrap' }}>
                <ReasonTag label="Policy violation" />
                <ReasonTag label="Technical issue" />
                <ReasonTag label="Requires manager approval" />
                <ReasonTag label="Missing documentation" />
              </div>

              <div className="stack stack-sm">
                <span className="text-xs text-tertiary">Interactive with selected state</span>
                <div className="row row-md" style={{ flexWrap: 'wrap' }}>
                  <ReasonTag label="Fraud detection" onClick={() => {}} selected />
                  <ReasonTag label="Payment dispute" onClick={() => {}} />
                  <ReasonTag label="Account security" onClick={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 4. Button */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">4. Button</h2>
          <p className="text-sm text-secondary">
            Primary (solid), Secondary (outline), Ghost (text only). Flat, no shadows.
          </p>
          
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="stack stack-xl">
              <div className="stack stack-sm">
                <span className="text-xs text-tertiary">Variants</span>
                <div className="row row-md" style={{ flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              <div className="stack stack-sm">
                <span className="text-xs text-tertiary">Sizes</span>
                <div className="row row-md" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              <div className="stack stack-sm">
                <span className="text-xs text-tertiary">States</span>
                <div className="row row-md" style={{ flexWrap: 'wrap' }}>
                  <Button variant="primary" disabled>Disabled Primary</Button>
                  <Button variant="secondary" disabled>Disabled Secondary</Button>
                </div>
              </div>

              <div className="stack stack-sm" style={{ maxWidth: '320px' }}>
                <span className="text-xs text-tertiary">Full width</span>
                <Button variant="primary" fullWidth>Full Width Button</Button>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 5. Stat Tile */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">5. Stat Tile</h2>
          <p className="text-sm text-secondary">
            Number in medium weight, label in caption size above it. No icons or decorative elements.
          </p>
          
          <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="row row-xl" style={{ flexWrap: 'wrap' }}>
              <StatTile label="Total Tickets" value={1247} />
              <StatTile label="Avg Response Time" value="2.3h" />
              <StatTile label="Resolution Rate" value="94%" />
              <StatTile 
                label="Active Today" 
                value={89} 
                trend={{ direction: 'up', value: '12%' }} 
              />
              <StatTile 
                label="Pending Review" 
                value={23} 
                trend={{ direction: 'down', value: '8%' }} 
              />
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 6. Precedent Mini-card */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">6. Precedent Mini-card</h2>
          <p className="text-sm text-secondary">
            Plain bordered card, text-forward. Simple star rating (not skeuomorphic).
          </p>
          
          <div className="stack stack-md">
            <PrecedentMiniCard
              id="TKT-12845"
              subject="Customer requested refund for cancelled order"
              resolution="Approved full refund after verifying cancellation was within policy window"
              similarity={0.87}
              rating={4.5}
            />

            <PrecedentMiniCard
              id="TKT-11203"
              subject="Account verification failed multiple times"
              resolution="Escalated to security team for manual review. No fraudulent activity detected."
              similarity={0.72}
              rating={4}
            />

            <PrecedentMiniCard
              id="TKT-10934"
              subject="Payment processing error during checkout"
              resolution="Technical issue resolved by engineering. Customer notified and order completed."
              similarity={0.63}
              rating={3.5}
            />

            <div className="stack stack-sm">
              <span className="text-xs text-tertiary">Without rating or similarity</span>
              <PrecedentMiniCard
                id="TKT-10456"
                subject="Shipping address update after order placed"
                resolution="Updated address in system before fulfillment. No issues reported."
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
