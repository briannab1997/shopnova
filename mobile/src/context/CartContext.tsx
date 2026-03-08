import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Product, LocalCartItem } from '../types';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const CART_KEY = 'shopnova_cart';

interface CartContextType {
  items: LocalCartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  subtotal: number;
  cartLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);

  // Load from Supabase (authenticated) or AsyncStorage (guest)
  const loadCart = useCallback(async () => {
    setCartLoading(true);
    if (user) {
      const { data } = await supabase
        .from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', user.id);
      if (data) {
        setItems(
          data.map((row) => ({
            product_id: row.product_id,
            quantity: row.quantity,
            product: row.product as Product,
          }))
        );
      }
    } else {
      const raw = await AsyncStorage.getItem(CART_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    }
    setCartLoading(false);
  }, [user]);

  // Merge local → Supabase on sign-in
  useEffect(() => {
    if (user) {
      AsyncStorage.getItem(CART_KEY).then(async (raw) => {
        const local: LocalCartItem[] = raw ? JSON.parse(raw) : [];
        if (local.length > 0) {
          await supabase.from('cart_items').upsert(
            local.map((i) => ({
              user_id: user.id,
              product_id: i.product_id,
              quantity: i.quantity,
            })),
            { onConflict: 'user_id,product_id' }
          );
          await AsyncStorage.removeItem(CART_KEY);
        }
        loadCart();
      });
    } else {
      loadCart();
    }
  }, [user, loadCart]);

  async function persist(next: LocalCartItem[]) {
    setItems(next);
    if (!user) {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(next));
    }
  }

  async function addItem(product: Product, quantity = 1) {
    const existing = items.find((i) => i.product_id === product.id);
    if (user) {
      await supabase.from('cart_items').upsert(
        { user_id: user.id, product_id: product.id, quantity: (existing?.quantity ?? 0) + quantity },
        { onConflict: 'user_id,product_id' }
      );
      await loadCart();
    } else {
      if (existing) {
        await persist(
          items.map((i) =>
            i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        );
      } else {
        await persist([...items, { product_id: product.id, quantity, product }]);
      }
    }
  }

  async function removeItem(productId: string) {
    if (user) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      await loadCart();
    } else {
      await persist(items.filter((i) => i.product_id !== productId));
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) { await removeItem(productId); return; }
    if (user) {
      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);
      await loadCart();
    } else {
      await persist(items.map((i) => (i.product_id === productId ? { ...i, quantity } : i)));
    }
  }

  async function clearCart() {
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    }
    await AsyncStorage.removeItem(CART_KEY);
    setItems([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

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
