import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CategoryBar from './CategoryBar';
import '../../styles/navbar.css';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-name">Shop<span>Nova</span></span>
          <span className="navbar-logo-sub">shop smarter</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products, brands, and more..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" className="navbar-search-btn" aria-label="Submit search">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/account" className="nav-btn">
                <span className="nav-btn-sub">Hello, {user.user_metadata?.full_name?.split(' ')[0] ?? 'there'}</span>
                <span className="nav-btn-main">Account</span>
              </Link>
              <button className="nav-btn" onClick={signOut}>
                <span className="nav-btn-sub">Sign out</span>
                <span className="nav-btn-main">Goodbye</span>
              </button>
            </>
          ) : (
            <Link to="/signin" className="nav-btn nav-sign">
              <span className="nav-btn-sub">Hello, sign in</span>
              <span className="nav-btn-main">Account & Lists</span>
            </Link>
          )}

          <Link to="/cart" className="nav-cart">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {itemCount > 0 && <span className="nav-cart-count">{itemCount}</span>}
            <span className="nav-cart-label">Cart</span>
          </Link>
        </div>
      </div>

      <CategoryBar />
    </header>
  );
}
