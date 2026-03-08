import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProductCategory } from '../types/product';
import { PRODUCT_CATEGORIES } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/products.css';

type SortOption = 'price_asc' | 'price_desc' | 'rating' | 'newest';

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const dealsParam = searchParams.get('deals') === 'true';

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>(
    categoryParam ?? 'All'
  );
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    setActiveCategory(categoryParam ?? 'All');
  }, [categoryParam]);

  const { products, loading } = useProducts({
    category: activeCategory === 'All' ? undefined : activeCategory,
    dealsOnly: dealsParam,
    sortBy,
  });

  return (
    <div className="products-page">
      <div className="category-filter-tabs">
        <button
          className={`category-filter-tab ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-toolbar">
        <p className="products-count">
          {loading ? 'Loading...' : (
            <>
              <strong>{products.length}</strong> result{products.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {dealsParam && ' — Today\'s Deals'}
            </>
          )}
        </p>

        <div className="products-sort">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
          >
            <option value="newest">New Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </div>
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
