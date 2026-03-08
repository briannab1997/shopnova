import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function SignUp() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    const { error: err } = await signUp(email, password, fullName);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-header">
          <Link to="/" className="auth-header-logo">Shop<span>Nova</span></Link>
        </div>
        <div className="auth-body">
          <div className="auth-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✉️</div>
            <h1 style={{ marginBottom: '12px' }}>Check your email</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
              We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account, then sign in.
            </p>
            <Link
              to="/signin"
              style={{
                display: 'block',
                background: 'var(--color-gold)',
                border: '1px solid #c7a107',
                borderRadius: '4px',
                padding: '9px',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-header">
        <Link to="/" className="auth-header-logo">
          Shop<span>Nova</span>
        </Link>
      </div>

      <div className="auth-body">
        <div className="auth-card">
          <h1>Create account</h1>

          {error && <p className="auth-error">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Your name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="First and last name"
                required
                autoComplete="name"
              />
            </div>
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
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Re-enter password</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating account…' : 'Create your ShopNova account'}
            </button>
          </form>

          <div className="auth-divider"><span>Already have an account?</span></div>

          <Link
            to="/signin"
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
            Sign in
          </Link>

          <p className="auth-terms">
            By creating an account you agree to ShopNova's{' '}
            <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
