import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as mockDb from '../lib/mockDb';
import type { Order } from '../types/order';
import { formatPrice } from '../lib/helpers';
import '../styles/checkout.css';

const FALLBACK = 'https://via.placeholder.com/64x64?text=SN';

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !user) return;
    mockDb.getOrder(user.id, orderId).then(o => {
      setOrder(o);
      setLoading(false);
    });
  }, [orderId, user]);

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}><div className="spinner" /></div>;

  if (!order) return (
    <div style={{ textAlign: 'center', padding: '80px' }}>
      <p>Order not found.</p>
      <Link to="/">Go Home</Link>
    </div>
  );

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__icon">✅</div>
      <h1>Order Placed!</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
        Thank you, we received your order.
      </p>
      <p className="order-confirmation__id">
        Order ID: <strong style={{ fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>{order.id}</strong>
      </p>

      <div className="order-confirmation__card">
        <h3 style={{ fontWeight: 700, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
          What happens next?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {[
            { icon: '📧', label: 'Confirmation email sent to your inbox' },
            { icon: '📦', label: 'Order will be packed within 24 hours' },
            { icon: '🚚', label: 'Expected delivery in 2–5 business days' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.875rem' }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
          <p style={{ fontWeight: 700, marginBottom: '8px' }}>Shipping to:</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {order.shipping_name}<br />
            {order.shipping_address}<br />
            {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
          </p>
        </div>

        {order.order_items && order.order_items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '16px' }}>
            <p style={{ fontWeight: 700, marginBottom: '12px' }}>Items ordered:</p>
            {order.order_items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'center' }}>
                {item.product_image && (
                  <img
                    src={item.product_image ?? FALLBACK}
                    alt={item.product_name}
                    style={{ width: 48, height: 48, objectFit: 'contain', border: '1px solid #eee', borderRadius: '4px', background: '#fafafa', padding: '2px', flexShrink: 0 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                  />
                )}
                <div style={{ flex: 1, fontSize: '0.875rem' }}>
                  <p>{item.product_name}</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Qty: {item.quantity}</p>
                </div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{formatPrice(item.unit_price * item.quantity)}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', paddingTop: '12px', borderTop: '1px solid var(--color-border)', marginTop: '8px' }}>
              <span>Order Total</span>
              <span style={{ color: 'var(--color-text-price)' }}>{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/account"
          style={{ background: 'var(--color-gold)', color: 'var(--color-text-primary)', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #c7a107' }}
        >
          View Order History
        </Link>
        <Link
          to="/"
          style={{ background: 'var(--color-navy)', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
