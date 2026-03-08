export type ProductCategory =
  | 'Electronics'
  | 'Home & Kitchen'
  | 'Books'
  | 'Beauty'
  | 'Sports & Outdoors'
  | 'Clothing';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Home & Kitchen',
  'Books',
  'Beauty',
  'Sports & Outdoors',
  'Clothing',
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: ProductCategory;
  images: string[];
  rating: number;
  review_count: number;
  is_bestseller: boolean;
  is_prime: boolean;
  is_deal: boolean;
  deal_end_at: string | null;
  brand: string;
  tags: string[];
  stock: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface LocalCartItem {
  product_id: string;
  quantity: number;
  product: Product;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  user_id: string;
  order_status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  created_at: string;
  order_items?: OrderItem[];
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  updated_at: string | null;
}
