interface PrecedentCardProps {
  precedent: {
    id: string;
    subject: string;
    resolution: string;
    similarity: number;
  };
}

export default function PrecedentCard({ precedent }: PrecedentCardProps) {
  return (
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
          <span className="text-mono text-secondary">#{precedent.id}</span>
          <span 
            className="text-xs font-medium"
            style={{ 
              color: 'var(--color-accent)',
              letterSpacing: '0.02em'
            }}
          >
            {Math.round(precedent.similarity * 100)}% match
          </span>
        </div>
        
        <h4 className="text-base font-medium" style={{ letterSpacing: '-0.01em' }}>
          {precedent.subject}
        </h4>
        
        <p className="text-sm text-secondary" style={{ lineHeight: 1.5 }}>
          <span style={{ 
            color: 'var(--color-text-primary)', 
            fontWeight: 500,
            fontSize: 'var(--font-size-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.03em'
          }}>
            Resolution
          </span>
          <br />
          {precedent.resolution}
        </p>
      </div>
    </div>
  );
}