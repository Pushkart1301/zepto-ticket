/**
 * Status Chip Component
 * Small text label with tiny dot/icon prefix
 * Not a filled colored pill — understated
 */

interface StatusChipProps {
  /** Status text to display */
  label: string;
  /** Status type for color coding */
  status?: 'success' | 'attention' | 'blocked' | 'neutral';
  /** Optional icon/symbol to show instead of dot */
  icon?: string;
}

export default function StatusChip({ 
  label, 
  status = 'neutral',
  icon
}: StatusChipProps) {
  return (
    <div 
      className="row row-sm"
      style={{ 
        alignItems: 'center',
      }}
    >
      {icon ? (
        <span 
          className="text-xs"
          style={{ 
            color: `var(--color-${status})`,
            lineHeight: 1
          }}
        >
          {icon}
        </span>
      ) : (
        <span className={`status-icon ${status}`} />
      )}
      <span 
        className="text-sm"
        style={{ 
          color: 'var(--color-text-secondary)',
          textTransform: 'capitalize',
          letterSpacing: 'var(--letter-spacing-tight)'
        }}
      >
        {label}
      </span>
    </div>
  );
}
