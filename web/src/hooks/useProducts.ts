import { useState, useEffect } from 'react';
import type { Product, ProductCategory } from '../types/product';
import { getProducts, getProductById } from '../lib/mockData';

interface UseProductsOptions {
  category?: ProductCategory | 'All';
  limit?: number;
  dealsOnly?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setProducts(getProducts({
        category: options.category,
        dealsOnly: options.dealsOnly,
        search: options.search,
        sortBy: options.sortBy,
        limit: options.limit,
      }));
      setLoading(false);
    }, 120);
    return () => clearTimeout(t);
  }, [options.category, options.limit, options.dealsOnly, options.search, options.sortBy]);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const t = setTimeout(() => {
      setProduct(getProductById(id) ?? null);
      setLoading(false);
    }, 80);
    return () => clearTimeout(t);
  }, [id]);

  return { product, loading, error };
}
