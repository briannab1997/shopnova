export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: ProductCategory;
  image_url: string | null;
  images: string[];
  rating: number;
  review_count: number;
  stock: number;
  is_bestseller: boolean;
  is_prime: boolean;
  is_deal: boolean;
  deal_end_at: string | null;
  brand: string | null;
  tags: string[];
  created_at: string;
}

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
