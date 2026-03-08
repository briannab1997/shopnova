import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../product/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

export default function DealsSection() {
  const { products, loading } = useProducts({ dealsOnly: true, limit: 6 });

  return (
    <section style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="section-heading">
          <span style={{ color: 'var(--color-text-price)', marginRight: '8px' }}>&#9889;</span>
          Today's Deals
        </h2>
        <Link
          to="/products?deals=true"
          style={{ fontSize: '0.875rem', color: '#007185', textDecoration: 'none' }}
        >
          See all deals &rsaquo;
        </Link>
      </div>

      <div className="product-row">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
