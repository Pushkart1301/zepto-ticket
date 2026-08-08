interface StatusLabelProps {
  status: 'auto_resolved' | 'human_review';
}

export default function StatusLabel({ status }: StatusLabelProps) {
  const isAutoResolved = status === 'auto_resolved';

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isAutoResolved ? 'bg-success' : 'bg-attention'
        }`}
      />
      <span
        className={`text-caption ${
          isAutoResolved ? 'text-success' : 'text-attention'
        }`}
      >
        {isAutoResolved ? 'Auto-resolved' : 'Human review'}
      </span>
    </div>
  );
}
