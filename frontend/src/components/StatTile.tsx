/**
 * Stat Tile Component
 * Number in medium weight, label in caption size above it
 * No icons or decorative elements
 */

interface StatTileProps {
  /** The label/title for the stat */
  label: string;
  /** The numeric value to display */
  value: string | number;
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  /** Optional click handler */
  onClick?: () => void;
}

export default function StatTile({ label, value, trend, onClick }: StatTileProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xs)',
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      <span
        className="text-xs text-secondary"
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        {label}
      </span>

      <div className="row row-sm" style={{ alignItems: 'baseline' }}>
        <span
          className="text-lg font-medium"
          style={{
            letterSpacing: 'var(--letter-spacing-tight)',
            color: 'var(--color-text-primary)',
          }}
        >
          {value}
        </span>

        {trend && (
          <span
            className="text-xs"
            style={{
              color: 'var(--color-text-tertiary)',
              letterSpacing: 'var(--letter-spacing-normal)',
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
