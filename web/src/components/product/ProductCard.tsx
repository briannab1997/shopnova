import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';
import Toast from '../ui/Toast';
import { formatReviewCount, getDiscountPercent } from '../../lib/helpers';
import '../../styles/product-card.css';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMG = 'https://via.placeholder.com/300x300?text=ShopNova';

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [toast, setToast] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image_url ?? FALLBACK_IMG);

  const discount = product.original_price
    ? getDiscountPercent(product.price, product.original_price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setToast(true);
  };

  return (
    <>
      <article className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
        <div className="product-card__image-wrap">
          <img
            className="product-card__img"
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={() => setImgSrc(FALLBACK_IMG)}
          />
          <div className="product-card__badges">
            {product.is_deal && <Badge type="deal" />}
            {product.is_bestseller && <Badge type="bestseller" />}
            {product.is_prime && <Badge type="prime" />}
          </div>
        </div>

        <div className="product-card__info">
          <p className="product-card__name">{product.name}</p>

          <div className="product-card__rating-row">
            <StarRating rating={product.rating} />
            <span className="product-card__review-count">
              ({formatReviewCount(product.review_count)})
            </span>
          </div>

          <div className="product-card__price-row">
            <span className="product-card__price-symbol">$</span>
            <span className="product-card__price-whole">
              {Math.floor(product.price)}
              <sup style={{ fontSize: '0.6em', verticalAlign: 'super' }}>
                {String((product.price % 1).toFixed(2)).slice(1)}
              </sup>
            </span>
            {product.original_price && (
              <>
                <span className="product-card__original-price">
                  ${product.original_price.toFixed(2)}
                </span>
                <span className="product-card__discount">-{discount}%</span>
              </>
            )}
          </div>

          {product.is_prime && (
            <div className="product-card__prime">
              <span>✦ Nova Prime</span>
              <span style={{ fontWeight: 400, color: '#565959' }}>FREE delivery</span>
            </div>
          )}

          <button className="product-card__add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </article>

      {toast && (
        <Toast message={`"${product.name.slice(0, 30)}…" added to cart`} onClose={() => setToast(false)} />
      )}
    </>
  );
}
