interface DecisionBadgeProps {
  decision: string;
}

export default function DecisionBadge({ decision }: DecisionBadgeProps) {
  const getBadgeType = (decision: string) => {
    if (decision === 'approve') return 'success';
    if (decision === 'reject') return 'blocked';
    if (decision === 'escalate') return 'attention';
    return 'neutral';
  };

  const getIcon = (decision: string) => {
    if (decision === 'approve') return '✓';
    if (decision === 'reject') return '×';
    if (decision === 'escalate') return '↑';
    return '·';
  };

  const type = getBadgeType(decision);

  return (
    <span className={`badge badge-${type}`}>
      <span style={{ fontSize: '0.625rem' }}>{getIcon(decision)}</span>
      {decision}
    </span>
  );
}