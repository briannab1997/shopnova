import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';

interface CartContextItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartContextItem[];
  addItem: (product: Product, qty?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  subtotal: number;
  cartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_KEY = 'shopnova_cart';

type StoredItem = { productId: string; quantity: number; product: Product };

function readCart(): CartContextItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]') as StoredItem[];
    return raw.map(r => ({ product: r.product, quantity: r.quantity }));
  } catch {
    return [];
  }
}

function writeCart(items: CartContextItem[]) {
  const stored: StoredItem[] = items.map(i => ({
    productId: i.product.id,
    quantity: i.quantity,
    product: i.product,
  }));
  localStorage.setItem(LOCAL_KEY, JSON.stringify(stored));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartContextItem[]>([]);
  const [cartLoading] = useState(false);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const addItem = useCallback(async (product: Product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      const next = idx >= 0
        ? prev.map((i, n) => n === idx ? { ...i, quantity: i.quantity + qty } : i)
        : [...prev, { product, quantity: qty }];
      writeCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.product.id !== productId);
      writeCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback(async (productId: string, qty: number) => {
    if (qty < 1) { await removeItem(productId); return; }
    setItems(prev => {
      const next = prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i);
      writeCart(next);
      return next;
    });
  }, [removeItem]);

  const clearCart = useCallback(async () => {
    localStorage.removeItem(LOCAL_KEY);
    setItems([]);
  }, []);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal  = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, cartLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
