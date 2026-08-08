import { Precedent } from '../data/mockTickets';

interface PrecedentMiniCardProps {
  precedent: Precedent;
}

export default function PrecedentMiniCard({ precedent }: PrecedentMiniCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-caption ${i < rating ? 'text-text-primary' : 'text-border'}`}
      >
        ★
      </span>
    ));
  };

  const similarityPercent = Math.round(precedent.similarity * 100);

  return (
    <div className="border border-border rounded-button p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-caption text-text-secondary leading-tight flex-1">
          {precedent.description}
        </p>
        <span className="text-caption text-accent font-mono shrink-0">
          {similarityPercent}%
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {renderStars(precedent.csat)}
        </div>
        <span className="text-caption text-text-muted capitalize">
          {precedent.action}
        </span>
      </div>
    </div>
  );
}
