import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/helpers';
import '../styles/cart.css';

const FALLBACK = 'https://via.placeholder.com/120x120?text=ShopNova';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your ShopNova cart is empty.</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            You have no items in your shopping cart.
          </p>
          <Link
            to="/products"
            style={{
              background: 'var(--color-gold)',
              color: 'var(--color-text-primary)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #c7a107',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <div
                className="cart-item__img-wrap"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img
                  className="cart-item__img"
                  src={product.image_url ?? FALLBACK}
                  alt={product.name}
                  onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                />
              </div>

              <div className="cart-item__info">
                <p
                  className="cart-item__name"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.name}
                </p>
                {product.is_prime && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-teal)', fontWeight: 600 }}>
                    ✦ Nova Prime — FREE delivery
                  </p>
                )}
                <p className="cart-item__stock">In Stock</p>

                <div className="cart-item__qty-row">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    {quantity === 1 ? '🗑' : '−'}
                  </button>
                  <span className="cart-item__qty">{quantity}</span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                  <span style={{ color: '#ccc', margin: '0 4px' }}>|</span>
                  <button
                    className="cart-item__delete"
                    onClick={() => removeItem(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="cart-item__price-col">
                <p className="cart-item__price">{formatPrice(product.price * quantity)}</p>
                {quantity > 1 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {formatPrice(product.price)} each
                  </p>
                )}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'right', paddingTop: '8px', fontSize: '1rem' }}>
            Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}):&nbsp;
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>

        <div className="cart-summary">
          <p className="cart-summary__subtotal">
            Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}):&nbsp;
            <strong>{formatPrice(subtotal)}</strong>
          </p>
          {subtotal > 25 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginBottom: '12px' }}>
              ✓ This order qualifies for free shipping
            </p>
          )}
          <button
            className="cart-summary__proceed"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <Link
            to="/products"
            style={{ display: 'block', textAlign: 'center', fontSize: '0.875rem', color: '#007185', marginTop: '12px' }}
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
