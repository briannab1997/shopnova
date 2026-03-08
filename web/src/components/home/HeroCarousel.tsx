import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/hero.css';

const SLIDES = [
  {
    id: 1,
    tag: 'Limited Time Offer',
    headline: 'Up to 40% Off\nTop Electronics',
    sub: 'Sony, Samsung, Apple, Logitech, and more — all on sale this week only.',
    ctaText: 'Shop Electronics',
    ctaLink: '/products?category=Electronics',
    bgUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&q=80',
    bgColor: '#1a2332',
  },
  {
    id: 2,
    tag: "Today's Best Deals",
    headline: 'Your Home,\nElevated',
    sub: 'Instant Pot, Dyson, Lodge, and more best sellers in Home & Kitchen.',
    ctaText: 'Shop Home & Kitchen',
    ctaLink: '/products?category=Home+%26+Kitchen',
    bgUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
    bgColor: '#1e2d1e',
  },
  {
    id: 3,
    tag: 'Nova Prime Exclusive',
    headline: 'Free Delivery\non Millions of Items',
    sub: 'Sign up for Nova Prime and get free 2-day shipping on everything you love.',
    ctaText: 'Try Nova Prime',
    ctaLink: '/signup',
    bgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80',
    bgColor: '#1a1a2e',
  },
  {
    id: 4,
    tag: 'New Arrivals',
    headline: 'Build Your Best\nFitness Routine',
    sub: 'Bowflex, Hydro Flask, Manduka — everything for your health and training goals.',
    ctaText: 'Shop Sports',
    ctaLink: '/products?category=Sports+%26+Outdoors',
    bgUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1400&q=80',
    bgColor: '#1a2421',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="hero-carousel">
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === current ? 'active' : ''}`}
            style={{ background: slide.bgColor }}
          >
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url('${slide.bgUrl}')` }}
            />
            <div className="hero-slide-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="hero-headline">
                {slide.headline.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </h1>
              <p className="hero-sub">{slide.sub}</p>
              <Link to={slide.ctaLink} className="hero-cta">
                {slide.ctaText} &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous slide">&#8249;</button>
      <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next slide">&#8250;</button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
