interface ConfidenceMeterProps {
  confidence: number; // 0-1
}

export default function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const percentage = Math.round(confidence * 100);

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1 bg-surface-hover rounded-sm overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-mono text-caption text-text-muted">
        {percentage}%
      </span>
    </div>
  );
}
