import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import ProductImageGallery from '../components/product/ProductImageGallery';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import CountdownTimer from '../components/ui/CountdownTimer';
import Toast from '../components/ui/Toast';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { formatReviewCount, formatPrice, getDiscountPercent } from '../lib/helpers';
import '../styles/products.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useProduct(id ?? '');
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState('');

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px', color: 'var(--color-text-secondary)' }}>
      <p style={{ fontSize: '1.5rem' }}>Product not found.</p>
      <Link to="/products" style={{ color: '#007185' }}>Back to all products</Link>
    </div>
  );

  const discount = product.original_price
    ? getDiscountPercent(product.price, product.original_price)
    : 0;

  const allImages = [product.image_url, ...(product.images ?? [])].filter(Boolean) as string[];

  const handleAddToCart = () => {
    addItem(product, qty);
    setToast(`Added ${qty} item${qty > 1 ? 's' : ''} to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  const descriptionBullets = product.description
    ? product.description.split('. ').filter(Boolean)
    : [];

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
      <div className="product-detail-page">
        <div className="product-detail-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{product.name.slice(0, 50)}</span>
        </div>

        <div className="product-detail-layout">
          <ProductImageGallery images={allImages} name={product.name} />

          <div className="product-info-panel">
            {product.brand && (
              <a href="#" className="product-info-brand">
                Visit the {product.brand} Store
              </a>
            )}

            <h1 className="product-info-title">{product.name}</h1>

            <div className="product-info-rating-row">
              <StarRating rating={product.rating} size={16} />
              <span style={{ fontSize: '0.875rem', color: '#565959' }}>{product.rating.toFixed(1)}</span>
              <a href="#reviews" className="product-info-review-link">
                {formatReviewCount(product.review_count)} ratings
              </a>
            </div>

            <div className="product-info-price-block">
              <div className="product-info-price">
                <span className="symbol">$</span>
                <span>{Math.floor(product.price)}</span>
                <sup style={{ fontSize: '0.6em', verticalAlign: 'super', paddingTop: '4px' }}>
                  {String((product.price % 1).toFixed(2)).slice(1)}
                </sup>
              </div>
              {product.original_price && (
                <p className="product-info-savings">
                  <span className="product-info-original">
                    List Price: <del>{formatPrice(product.original_price)}</del>
                  </span>
                  <span style={{ marginLeft: '8px', color: 'var(--color-text-price)', fontWeight: 600 }}>
                    Save {formatPrice(product.original_price - product.price)} ({discount}%)
                  </span>
                </p>
              )}
            </div>

            {product.is_deal && product.deal_end_at && (
              <div style={{ padding: '12px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ marginBottom: '6px' }}>
                  <Badge type="deal" />
                </div>
                <CountdownTimer endDate={product.deal_end_at} />
              </div>
            )}

            {product.is_prime && (
              <div className="product-info-prime">
                <span>✦ Nova Prime</span>
                <span style={{ fontWeight: 400, color: '#565959' }}>
                  FREE delivery — get it by tomorrow
                </span>
              </div>
            )}

            <p className="product-info-stock">In Stock</p>

            <div className="product-qty-row">
              <select
                className="product-qty-select"
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>Qty: {n}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="product-add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="product-buy-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {product.is_bestseller && <Badge type="bestseller" />}
              {product.is_prime && <Badge type="prime" />}
            </div>

            {descriptionBullets.length > 0 && (
              <div className="product-info-about" id="reviews">
                <h3>About this item</h3>
                <ul>
                  {descriptionBullets.map((bullet, i) => (
                    <li key={i}>{bullet.trim().replace(/\.$/, '')}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.brand && (
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border-light)', paddingTop: '16px' }}>
                <strong>Brand:</strong> {product.brand}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
