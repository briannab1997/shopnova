import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/products.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const { products, loading } = useProducts({ search: q });

  return (
    <div className="search-page">
      <h1>
        {loading ? 'Searching…' : (
          <>
            {products.length} result{products.length !== 1 ? 's' : ''} for{' '}
            <span>"{q}"</span>
          </>
        )}
      </h1>
      <ProductGrid products={products} loading={loading} skeletonCount={6} />
    </div>
  );
}
