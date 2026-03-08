interface BadgeProps {
  type: 'bestseller' | 'prime' | 'deal' | 'new';
}

const BADGE_STYLES: Record<BadgeProps['type'], { bg: string; color: string; label: string }> = {
  bestseller: { bg: '#ff9900', color: '#fff', label: 'Best Seller' },
  prime: { bg: '#00a8a8', color: '#fff', label: '✦ Nova Prime' },
  deal: { bg: '#cc0c39', color: '#fff', label: "Today's Deal" },
  new: { bg: '#067d62', color: '#fff', label: 'New Arrival' },
};

export default function Badge({ type }: BadgeProps) {
  const { bg, color, label } = BADGE_STYLES[type];
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: '0.65rem',
        fontWeight: 700,
        padding: '2px 7px',
        borderRadius: '3px',
        letterSpacing: '0.3px',
        display: 'inline-block',
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}
