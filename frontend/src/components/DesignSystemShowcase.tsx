/**
 * Design System Showcase Component
 * Visual reference for all Zepto Ops design system elements
 * Remove this file in production, or keep for style guide documentation
 */

export default function DesignSystemShowcase() {
  return (
    <div className="container">
      <div className="stack stack-3xl">
        
        {/* Header */}
        <div className="stack stack-md">
          <h1 className="text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
            Zepto Ops Design System
          </h1>
          <p className="text-secondary">
            Sober, editorial, restrained aesthetic for professional operations
          </p>
        </div>

        <hr className="divider" />

        {/* Colors */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Colors</h2>
          
          <div className="stack stack-md">
            <h3 className="text-sm font-medium text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Status Colors
            </h3>
            <div className="row row-lg">
              <div className="stack stack-sm">
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: 'var(--color-success)',
                  borderRadius: 'var(--border-radius-sm)'
                }} />
                <span className="text-xs text-secondary">Success</span>
              </div>
              <div className="stack stack-sm">
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: 'var(--color-attention)',
                  borderRadius: 'var(--border-radius-sm)'
                }} />
                <span className="text-xs text-secondary">Attention</span>
              </div>
              <div className="stack stack-sm">
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: 'var(--color-blocked)',
                  borderRadius: 'var(--border-radius-sm)'
                }} />
                <span className="text-xs text-secondary">Blocked</span>
              </div>
              <div className="stack stack-sm">
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  backgroundColor: 'var(--color-accent)',
                  borderRadius: 'var(--border-radius-sm)'
                }} />
                <span className="text-xs text-secondary">Accent</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Typography */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Typography</h2>
          
          <div className="stack stack-md">
            <div className="stack stack-xs">
              <span className="text-xl font-semibold">Page Title</span>
              <span className="text-xs text-tertiary">1.5rem / 24px · Semibold · -0.02em tracking</span>
            </div>
            
            <div className="stack stack-xs">
              <span className="text-lg font-semibold">Section Title</span>
              <span className="text-xs text-tertiary">1.25rem / 20px · Semibold · -0.015em tracking</span>
            </div>
            
            <div className="stack stack-xs">
              <span className="text-md font-medium">Emphasis Text</span>
              <span className="text-xs text-tertiary">1.0625rem / 17px · Medium</span>
            </div>
            
            <div className="stack stack-xs">
              <span className="text-base">Body Text</span>
              <span className="text-xs text-tertiary">0.9375rem / 15px · Regular</span>
            </div>
            
            <div className="stack stack-xs">
              <span className="text-sm text-secondary">Secondary Text</span>
              <span className="text-xs text-tertiary">0.8125rem / 13px · Regular · 55% opacity</span>
            </div>
            
            <div className="stack stack-xs">
              <span className="text-mono">#TKT-12345</span>
              <span className="text-xs text-tertiary">IBM Plex Mono · IDs only</span>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Badges */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Badges</h2>
          
          <div className="row row-md">
            <span className="badge badge-success">
              <span style={{ fontSize: '0.625rem' }}>✓</span>
              approved
            </span>
            <span className="badge badge-blocked">
              <span style={{ fontSize: '0.625rem' }}>×</span>
              rejected
            </span>
            <span className="badge badge-attention">
              <span style={{ fontSize: '0.625rem' }}>↑</span>
              escalate
            </span>
            <span className="badge badge-neutral">
              pending
            </span>
          </div>
        </section>

        <hr className="divider" />

        {/* Status Icons */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Status Indicators</h2>
          
          <div className="stack stack-md">
            <div className="row row-sm">
              <span className="status-icon success" />
              <span className="text-sm">Resolved</span>
            </div>
            <div className="row row-sm">
              <span className="status-icon attention" />
              <span className="text-sm">Pending</span>
            </div>
            <div className="row row-sm">
              <span className="status-icon blocked" />
              <span className="text-sm">Blocked</span>
            </div>
            <div className="row row-sm">
              <span className="status-icon neutral" />
              <span className="text-sm">Open</span>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Buttons */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Buttons</h2>
          
          <div className="row row-md">
            <button className="button-primary">Primary Action</button>
            <button className="button-secondary">Secondary Action</button>
            <button className="button-ghost">Ghost Button</button>
          </div>
        </section>

        <hr className="divider" />

        {/* Cards */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Cards</h2>
          
          <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
            <div className="stack stack-md">
              <div className="row space-between">
                <span className="text-mono text-secondary">#TKT-12345</span>
                <span className="badge badge-success">
                  <span style={{ fontSize: '0.625rem' }}>✓</span>
                  approved
                </span>
              </div>
              <h3 className="text-md font-semibold" style={{ letterSpacing: '-0.015em' }}>
                Example Ticket Card
              </h3>
              <p className="text-secondary" style={{ lineHeight: 1.5 }}>
                This is an example of a card component with proper spacing, typography, and status indicators. 
                Cards use subtle backgrounds and hairline borders.
              </p>
              <div className="row row-sm" style={{ marginTop: 'var(--spacing-sm)' }}>
                <span className="status-icon success" />
                <span className="text-xs text-secondary">Resolved</span>
              </div>
            </div>
          </div>

          <div 
            className="card" 
            style={{ 
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-background)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="stack stack-sm">
              <div className="row space-between">
                <span className="text-mono text-secondary">#TKT-11234</span>
                <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                  87% match
                </span>
              </div>
              <h4 className="text-base font-medium" style={{ letterSpacing: '-0.01em' }}>
                Precedent Card (Nested Style)
              </h4>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.5 }}>
                Nested cards use the background color instead of surface for visual hierarchy.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Inputs */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Form Inputs</h2>
          
          <div className="stack stack-md">
            <input type="text" placeholder="Text input" style={{ maxWidth: '320px' }} />
            <textarea placeholder="Textarea" rows={3} style={{ maxWidth: '320px' }} />
            <select style={{ maxWidth: '320px' }}>
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </section>

        <hr className="divider" />

        {/* Spacing Scale */}
        <section className="stack stack-lg">
          <h2 className="text-lg font-semibold">Spacing Scale</h2>
          
          <div className="stack stack-md">
            {[
              { name: 'xs', value: '4px' },
              { name: 'sm', value: '8px' },
              { name: 'md', value: '12px' },
              { name: 'lg', value: '16px' },
              { name: 'xl', value: '24px' },
              { name: '2xl', value: '32px' },
              { name: '3xl', value: '48px' },
            ].map(({ name, value }) => (
              <div key={name} className="row row-md" style={{ alignItems: 'center' }}>
                <div 
                  style={{ 
                    width: value,
                    height: '24px',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: 'var(--border-radius-sm)'
                  }}
                />
                <span className="text-mono text-sm">--spacing-{name}</span>
                <span className="text-secondary text-sm">{value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
