import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { supabase } from '../lib/supabaseClient';
import type { Product, ProductCategory } from '../types';
import { PRODUCT_CATEGORIES } from '../types';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen({ route, navigation }: any) {
  const initialCategory: ProductCategory | undefined = route.params?.category;
  const dealsOnly: boolean = route.params?.dealsOnly ?? false;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<ProductCategory | null>(initialCategory ?? null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, dealsOnly]);

  async function fetchProducts() {
    setLoading(true);
    let query = supabase.from('products').select('*').order('is_bestseller', { ascending: false });
    if (category) query = query.eq('category', category);
    if (dealsOnly) query = query.eq('is_deal', true);
    if (search) query = query.ilike('name', `%${search}%`);
    const { data } = await query;
    setProducts((data as Product[]) ?? []);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={fetchProducts}
        returnKeyType="search"
      />

      {/* Category Filter */}
      <FlatList
        horizontal
        data={[null, ...PRODUCT_CATEGORIES]}
        keyExtractor={(item) => item ?? 'all'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, category === item && styles.filterChipActive]}
            onPress={() => setCategory(item as ProductCategory | null)}
          >
            <Text style={[styles.filterChipText, category === item && styles.filterChipTextActive]}>
              {item ?? 'All'}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ff9900" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  searchInput: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f1111',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterRow: { paddingHorizontal: 12, paddingBottom: 8 },
  filterChip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  filterChipActive: { backgroundColor: '#232f3e', borderColor: '#232f3e' },
  filterChipText: { fontSize: 13, color: '#565959' },
  filterChipTextActive: { color: '#ff9900', fontWeight: '700' },
  list: { padding: 12 },
  empty: { textAlign: 'center', color: '#565959', marginTop: 40, fontSize: 15 },
});
