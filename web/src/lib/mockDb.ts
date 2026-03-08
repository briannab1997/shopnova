/**
 * mockDb — localStorage-backed auth, orders, and profiles.
 * Replaces all Supabase calls for the portfolio demo.
 */

import type { Order, OrderItem } from '../types/order';
import type { Profile } from '../types/user';

// ── Types ─────────────────────────────────────────────────────────────────

export interface MockUser {
  id: string;
  email: string;
  user_metadata: { full_name: string };
}

interface StoredUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
}

// ── Keys ──────────────────────────────────────────────────────────────────

const USERS_KEY    = 'sn_users';
const SESSION_KEY  = 'sn_session';
const ORDERS_KEY   = (uid: string) => `sn_orders_${uid}`;
const PROFILE_KEY  = (uid: string) => `sn_profile_${uid}`;

// ── Helpers ───────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; }
  catch { return fallback; }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uuid(): string {
  return crypto.randomUUID();
}

// ── Auth ──────────────────────────────────────────────────────────────────

export function getSession(): MockUser | null {
  return read<MockUser | null>(SESSION_KEY, null);
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: MockUser | null; error: string | null }> {
  await delay(300);
  const users = read<StoredUser[]>(USERS_KEY, []);
  const stored = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!stored || stored.password !== password) {
    return { user: null, error: 'Incorrect email or password.' };
  }
  const user: MockUser = { id: stored.id, email: stored.email, user_metadata: { full_name: stored.fullName } };
  write(SESSION_KEY, user);
  return { user, error: null };
}

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<{ user: MockUser | null; error: string | null }> {
  await delay(300);
  const users = read<StoredUser[]>(USERS_KEY, []);
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { user: null, error: 'An account with that email already exists.' };
  }
  const stored: StoredUser = { id: uuid(), email, password, fullName };
  write(USERS_KEY, [...users, stored]);
  // Auto sign-in after signup
  const user: MockUser = { id: stored.id, email: stored.email, user_metadata: { full_name: fullName } };
  write(SESSION_KEY, user);
  return { user, error: null };
}

export async function signOut(): Promise<void> {
  await delay(100);
  localStorage.removeItem(SESSION_KEY);
}

// ── Orders ────────────────────────────────────────────────────────────────

interface NewOrderInput {
  user_id: string;
  total_amount: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
}

interface NewOrderItemInput {
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  unit_price: number;
  quantity: number;
}

export async function createOrder(input: NewOrderInput): Promise<Order> {
  await delay(200);
  const order: Order = {
    ...input,
    id: uuid(),
    created_at: new Date().toISOString(),
    order_items: [],
  } as Order;

  const key = ORDERS_KEY(input.user_id);
  const existing = read<Order[]>(key, []);
  write(key, [order, ...existing]);
  return order;
}

export async function addOrderItems(
  userId: string,
  orderId: string,
  items: NewOrderItemInput[]
): Promise<void> {
  await delay(100);
  const key = ORDERS_KEY(userId);
  const orders = read<Order[]>(key, []);
  const updatedOrders = orders.map(o => {
    if (o.id !== orderId) return o;
    const orderItems: OrderItem[] = items.map(i => ({
      id: uuid(),
      order_id: orderId,
      product_id: i.product_id,
      product_name: i.product_name,
      product_image: i.product_image,
      unit_price: i.unit_price,
      quantity: i.quantity,
      subtotal: i.unit_price * i.quantity,
    }));
    return { ...o, order_items: orderItems };
  });
  write(key, updatedOrders);
}

export async function getOrder(
  userId: string,
  orderId: string
): Promise<Order | null> {
  await delay(150);
  const orders = read<Order[]>(ORDERS_KEY(userId), []);
  return orders.find(o => o.id === orderId) ?? null;
}

export async function getOrders(userId: string): Promise<Order[]> {
  await delay(150);
  return read<Order[]>(ORDERS_KEY(userId), []);
}

// ── Profile ───────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Partial<Profile>> {
  await delay(100);
  return read<Partial<Profile>>(PROFILE_KEY(userId), {});
}

export async function saveProfile(
  userId: string,
  data: Partial<Profile>
): Promise<void> {
  await delay(150);
  write(PROFILE_KEY(userId), { ...data, id: userId, updated_at: new Date().toISOString() });
}

// ── Utility ───────────────────────────────────────────────────────────────

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
