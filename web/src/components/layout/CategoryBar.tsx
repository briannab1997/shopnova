import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../../types/product';

export default function CategoryBar() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  return (
    <nav className="category-bar" aria-label="Product categories">
      <div className="category-bar-inner">
        <Link
          to="/products"
          className={`category-link ${activeCategory === '' ? 'active' : ''}`}
        >
          All
        </Link>
        {PRODUCT_CATEGORIES.map(cat => (
          <Link
            key={cat}
            to={`/products?category=${encodeURIComponent(cat)}`}
            className={`category-link ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </Link>
        ))}
        <Link to="/products?deals=true" className="category-link">
          Today's Deals
        </Link>
      </div>
    </nav>
  );
}
