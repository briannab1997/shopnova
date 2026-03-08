import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInSection({ children, delay = 0, className = '' }: FadeInSectionProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
