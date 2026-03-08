import { Link } from 'react-router-dom';
import HeroCarousel from '../components/home/HeroCarousel';
import DealsSection from '../components/home/DealsSection';
import ProductSection from '../components/product/ProductSection';
import FadeInSection from '../components/ui/FadeInSection';

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>

        <FadeInSection>
          <DealsSection />
        </FadeInSection>

        <FadeInSection delay={50}>
          <ProductSection title="Best Sellers in Electronics" category="Electronics" limit={6} />
        </FadeInSection>

        <FadeInSection delay={100}>
          <ProductSection title="Top Picks in Home & Kitchen" category="Home & Kitchen" limit={6} />
        </FadeInSection>

        {/* Promo banner */}
        <FadeInSection delay={50}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-navy) 0%, #1a3a5c 100%)',
            borderRadius: 'var(--radius-base)',
            padding: '40px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <div style={{ color: 'var(--color-orange)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                ✦ Introducing Nova Prime
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>
                Free 2-Day Shipping on Everything
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '420px' }}>
                Millions of items, delivered to your door in two days or less. Plus exclusive member-only deals every week.
              </p>
            </div>
            <Link
              to="/signup"
              style={{
                background: 'var(--color-orange)',
                color: '#fff',
                fontWeight: 700,
                padding: '14px 32px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Try Nova Prime Free
            </Link>
          </div>
        </FadeInSection>

        <FadeInSection delay={50}>
          <ProductSection title="Books You'll Love" category="Books" limit={4} />
        </FadeInSection>

        <FadeInSection delay={50}>
          <ProductSection title="New in Sports & Outdoors" category="Sports & Outdoors" limit={4} />
        </FadeInSection>

        <FadeInSection delay={50}>
          <ProductSection title="Top Beauty Picks" category="Beauty" limit={4} />
        </FadeInSection>

        {/* Category quick links */}
        <FadeInSection>
          <section style={{ marginBottom: '40px' }}>
            <h2 className="section-heading">Shop by Category</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '12px',
            }}>
              {[
                { name: 'Electronics', emoji: '💻', color: '#e8f4f8' },
                { name: 'Home & Kitchen', emoji: '🏠', color: '#f0faf0' },
                { name: 'Books', emoji: '📚', color: '#fef9e7' },
                { name: 'Beauty', emoji: '✨', color: '#fdf0f8' },
                { name: 'Sports & Outdoors', emoji: '🏋️', color: '#f0f8f0' },
                { name: 'Clothing', emoji: '👕', color: '#f8f0f8' },
              ].map(cat => (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  style={{
                    background: cat.color,
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius-base)',
                    padding: '20px 12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.transform = '';
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>
        </FadeInSection>

      </div>
    </div>
  );
}
