import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            {/* Auth pages (no layout wrapper, standalone) */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Main app with navbar + footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<SearchResults />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}
