import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as mockDb from '../lib/mockDb';
import { formatPrice } from '../lib/helpers';
import '../styles/checkout.css';

const FALLBACK = 'https://via.placeholder.com/64x64?text=SN';

type Step = 'shipping' | 'payment' | 'review';

interface ShippingForm {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const EMPTY_FORM: ShippingForm = {
  fullName: '', address1: '', address2: '',
  city: '', state: '', zip: '', country: 'US',
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('shipping');
  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const shipping = subtotal > 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleField = (key: keyof ShippingForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const shippingValid = form.fullName && form.address1 && form.city && form.state && form.zip;

  const placeOrder = async () => {
    if (!user) { navigate('/signin'); return; }
    setSubmitting(true);
    setError('');

    const order = await mockDb.createOrder({
      user_id: user.id,
      total_amount: total,
      status: 'confirmed',
      shipping_name: form.fullName,
      shipping_address: form.address1 + (form.address2 ? ` ${form.address2}` : ''),
      shipping_city: form.city,
      shipping_state: form.state,
      shipping_zip: form.zip,
      shipping_country: form.country,
    });

    await mockDb.addOrderItems(user.id, order.id, items.map(({ product, quantity }) => ({
      order_id: order.id,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url ?? '',
      unit_price: product.price,
      quantity,
    })));

    await clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  const stepIndex = { shipping: 0, payment: 1, review: 2 }[step];

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-steps">
        {(['Shipping', 'Payment', 'Review'] as const).map((label, i) => (
          <div
            key={label}
            className={`checkout-step ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'done' : ''}`}
          >
            <span className="step-num">{i < stepIndex ? '✓' : i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div>
          {step === 'shipping' && (
            <div className="checkout-form-card">
              <h2>Shipping Address</h2>
              {error && <p className="auth-error">{error}</p>}

              <div className="form-row">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Full Name</label>
                  <input value={form.fullName} onChange={handleField('fullName')} placeholder="Jane Smith" />
                </div>
              </div>

              <div className="form-group">
                <label>Address Line 1</label>
                <input value={form.address1} onChange={handleField('address1')} placeholder="123 Main St" />
              </div>
              <div className="form-group">
                <label>Address Line 2 (optional)</label>
                <input value={form.address2} onChange={handleField('address2')} placeholder="Apt, Suite, etc." />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input value={form.city} onChange={handleField('city')} placeholder="San Francisco" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select value={form.state} onChange={handleField('state')}>
                    <option value="">Select state</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input value={form.zip} onChange={handleField('zip')} placeholder="94102" maxLength={10} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select value={form.country} onChange={handleField('country')}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              </div>

              <button
                className="checkout-btn-primary"
                disabled={!shippingValid}
                onClick={() => setStep('payment')}
                style={{ opacity: shippingValid ? 1 : 0.5 }}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="checkout-form-card">
              <h2>Payment Method</h2>

              <div className="payment-mock">
                <span className="payment-card-icon">💳</span>
                <div className="payment-mock-text">
                  <strong>Visa ending in 4242</strong>
                  <span>This is a demo checkout — no real payment is processed.</span>
                </div>
              </div>

              <div className="form-group">
                <label>Name on Card</label>
                <input defaultValue={form.fullName} readOnly style={{ background: '#f8f8f8' }} />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input defaultValue="•••• •••• •••• 4242" readOnly style={{ background: '#f8f8f8' }} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiration</label>
                  <input defaultValue="12 / 28" readOnly style={{ background: '#f8f8f8' }} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input defaultValue="•••" readOnly style={{ background: '#f8f8f8' }} />
                </div>
              </div>

              <button className="checkout-btn-primary" onClick={() => setStep('review')}>
                Review Your Order
              </button>
              <button className="checkout-btn-secondary" onClick={() => setStep('shipping')}>
                ← Back to Shipping
              </button>
            </div>
          )}

          {step === 'review' && (
            <div className="checkout-form-card">
              <h2>Review Your Order</h2>
              {error && <p className="auth-error">{error}</p>}

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '8px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shipping to</h3>
                <p style={{ fontSize: '0.875rem' }}>{form.fullName}<br />{form.address1}{form.address2 && `, ${form.address2}`}<br />{form.city}, {form.state} {form.zip}, {form.country}</p>
              </div>

              {items.map(({ product, quantity }) => (
                <div key={product.id} className="order-review-item">
                  <img
                    className="order-review-img"
                    src={product.image_url ?? FALLBACK}
                    alt={product.name}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                  />
                  <div className="order-review-info">
                    <p>{product.name}</p>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Qty: {quantity}</p>
                  </div>
                  <p className="order-review-price">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}

              <button
                className="checkout-btn-primary"
                onClick={placeOrder}
                disabled={submitting}
              >
                {submitting ? 'Placing Order…' : 'Place Your Order'}
              </button>
              <button className="checkout-btn-secondary" onClick={() => setStep('payment')}>
                ← Back to Payment
              </button>
            </div>
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="summary-line">
            <span>Estimated tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="summary-total">
            <span>Order Total</span>
            <span className="summary-total-price">{formatPrice(total)}</span>
          </div>
          {shipping === 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '8px' }}>
              ✓ You qualify for FREE shipping
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
