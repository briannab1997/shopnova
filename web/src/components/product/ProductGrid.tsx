import type { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function ProductGrid({ products, loading = false, skeletonCount = 8 }: ProductGridProps) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-secondary)' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No products found</p>
        <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
