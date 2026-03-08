import { Link } from 'react-router-dom';
import type { ProductCategory } from '../../types/product';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface ProductSectionProps {
  title: string;
  category?: ProductCategory;
  limit?: number;
  dealsOnly?: boolean;
}

export default function ProductSection({ title, category, limit = 6, dealsOnly = false }: ProductSectionProps) {
  const { products, loading } = useProducts({ category, limit, dealsOnly });

  return (
    <section style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="section-heading">{title}</h2>
        <Link
          to={category ? `/products?category=${encodeURIComponent(category)}` : '/products'}
          style={{ fontSize: '0.875rem', color: '#007185', textDecoration: 'none' }}
        >
          See all &rsaquo;
        </Link>
      </div>
      <div className="product-row">
        {loading
          ? Array.from({ length: limit }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
