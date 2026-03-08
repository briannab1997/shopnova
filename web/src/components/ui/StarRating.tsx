interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 14 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const half = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (half ? 1 : 0);

  return (
    <span
      style={{ display: 'inline-flex', gap: '1px', alignItems: 'center' }}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`f${i}`} type="full" size={size} />
      ))}
      {half && <Star key="h" type="half" size={size} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`e${i}`} type="empty" size={size} />
      ))}
    </span>
  );
}

function Star({ type, size }: { type: 'full' | 'half' | 'empty'; size: number }) {
  const fill = type === 'empty' ? '#e8e8e8' : '#ffa41c';
  if (type === 'half') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#ffa41c" />
            <stop offset="50%" stopColor="#e8e8e8" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
          fill="url(#half)"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
        fill={fill}
      />
    </svg>
  );
}
