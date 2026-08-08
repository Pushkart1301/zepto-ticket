interface ReasonTagProps {
  reason: string;
}

export default function ReasonTag({ reason }: ReasonTagProps) {
  return (
    <span className="inline-block px-2 py-1 text-caption text-text-muted border border-border rounded-button">
      {reason}
    </span>
  );
}
