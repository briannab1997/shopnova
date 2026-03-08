import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(endDate: string): TimeLeft | null {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { hours, minutes, seconds };
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(endDate));
    const id = setInterval(() => {
      const t = getTimeLeft(endDate);
      setTimeLeft(t);
      if (!t) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!timeLeft) return null;

  const { hours, minutes, seconds } = timeLeft;
  const pad = (n: number) => String(n).padStart(2, '0');

  // Urgency color: red if under 2 hours, orange otherwise
  const urgent = hours < 2;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
      <span style={{ fontSize: '0.75rem', color: '#565959' }}>Ends in:</span>
      {[pad(hours), pad(minutes), pad(seconds)].map((val, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
          <span
            style={{
              background: urgent ? '#cc0c39' : '#ff9900',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              padding: '2px 5px',
              borderRadius: '3px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {val}
          </span>
          {i < 2 && <span style={{ fontWeight: 700, color: urgent ? '#cc0c39' : '#ff9900' }}>:</span>}
        </span>
      ))}
    </div>
  );
}
