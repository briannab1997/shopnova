import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <Link to="/" className="auth-header-logo">
          Shop<span>Nova</span>
        </Link>
      </div>

      <div className="auth-body">
        <div className="auth-card">
          <h1>Sign in</h1>

          {error && <p className="auth-error">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '16px', lineHeight: 1.5 }}>
            By signing in you agree to ShopNova's{' '}
            <a href="#" style={{ color: '#007185' }}>Conditions of Use</a> and{' '}
            <a href="#" style={{ color: '#007185' }}>Privacy Notice</a>.
          </p>

          <div className="auth-divider"><span>New to ShopNova?</span></div>

          <Link
            to="/signup"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: 'linear-gradient(#f7f8fa, #e7e9ec)',
              border: '1px solid #adb1b8',
              borderRadius: '4px',
              padding: '9px',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
            }}
          >
            Create your ShopNova account
          </Link>
        </div>
      </div>
    </div>
  );
}
