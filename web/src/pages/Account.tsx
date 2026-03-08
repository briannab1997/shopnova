import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as mockDb from '../lib/mockDb';
import type { Order } from '../types/order';
import type { Profile } from '../types/user';
import { formatPrice } from '../lib/helpers';
import '../styles/account.css';

const FALLBACK = 'https://via.placeholder.com/64x64?text=SN';

type NavItem = 'orders' | 'profile' | 'addresses';

const STATUS_CLASS: Record<string, string> = {
  delivered: 'status-delivered',
  shipped: 'status-shipped',
  processing: 'status-processing',
  confirmed: 'status-confirmed',
  pending: 'status-pending',
  cancelled: 'status-cancelled',
};

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<NavItem>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (!user) { navigate('/signin'); return; }
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const [orders, prof] = await Promise.all([
      mockDb.getOrders(user.id),
      mockDb.getProfile(user.id),
    ]);
    setOrders(orders as Order[]);
    if (prof) setProfile(prof as Partial<Profile>);
    setLoading(false);
  };

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await mockDb.saveProfile(user.id, profile);
    setSaveMsg('Profile saved successfully.');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}><div className="spinner" /></div>;

  return (
    <div className="account-page">
      <h1>Your Account</h1>

      <div className="account-grid">
        <nav className="account-nav">
          {([
            { id: 'orders', label: '📦  Your Orders' },
            { id: 'profile', label: '👤  Profile' },
            { id: 'addresses', label: '🏠  Addresses' },
          ] as const).map(item => (
            <button
              key={item.id}
              className={`account-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="account-nav-item" onClick={handleSignOut} style={{ color: 'var(--color-error)' }}>
            🚪  Sign Out
          </button>
        </nav>

        <div className="account-panel">
          {activeNav === 'orders' && (
            <>
              <h2>Your Orders</h2>
              {orders.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)' }}>No orders yet. <a href="/" style={{ color: '#007185' }}>Start shopping</a></p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div>
                        <span>ORDER PLACED</span><br />
                        <strong>{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                      </div>
                      <div>
                        <span>TOTAL</span><br />
                        <strong>{formatPrice(order.total_amount)}</strong>
                      </div>
                      <div>
                        <span>SHIP TO</span><br />
                        <strong>{order.shipping_name}</strong>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <span className={`order-status-badge ${STATUS_CLASS[order.status] ?? 'status-pending'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="order-card-body">
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        ID: {order.id}
                      </p>
                      {(order.order_items ?? []).map(item => (
                        <div key={item.id} className="order-item-preview">
                          {item.product_image && (
                            <img
                              src={item.product_image ?? FALLBACK}
                              alt={item.product_name}
                              onError={e => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                            />
                          )}
                          <div className="order-item-preview-info">
                            <p>{item.product_name}</p>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                              Qty: {item.quantity} &middot; {formatPrice(item.unit_price)} each
                            </p>
                          </div>
                          <strong style={{ fontSize: '0.875rem' }}>{formatPrice(item.unit_price * item.quantity)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeNav === 'profile' && (
            <>
              <h2>Your Profile</h2>
              {saveMsg && <p style={{ color: 'var(--color-success)', marginBottom: '16px', fontWeight: 600 }}>✓ {saveMsg}</p>}
              <form onSubmit={saveProfile}>
                <div className="profile-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profile.full_name ?? ''}
                      onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                      style={{ width: '100%', height: '38px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '4px', outline: 'none' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={user?.email ?? ''}
                      readOnly
                      style={{ width: '100%', height: '38px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '4px', background: '#f8f8f8', outline: 'none' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profile.phone ?? ''}
                      onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      placeholder="(555) 555-5555"
                      style={{ width: '100%', height: '38px', padding: '0 12px', border: '1px solid var(--color-border)', borderRadius: '4px', outline: 'none' }}
                    />
                  </div>
                </div>
                <button type="submit" className="profile-save-btn">Save Changes</button>
              </form>
            </>
          )}

          {activeNav === 'addresses' && (
            <>
              <h2>Your Addresses</h2>
              <div style={{ background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: '8px', padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <p style={{ marginBottom: '8px' }}>No saved addresses yet.</p>
                <p style={{ fontSize: '0.875rem' }}>Addresses are saved automatically when you place an order.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
