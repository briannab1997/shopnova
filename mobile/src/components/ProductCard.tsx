import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { Product } from '../types';
import StarRating from './StarRating';
import Badge from './Badge';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const PLACEHOLDER = 'https://via.placeholder.com/300x300?text=No+Image';

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: product.images[0] || PLACEHOLDER }}
        style={styles.image}
        resizeMode="cover"
        onError={() => {}}
      />

      <View style={styles.body}>
        {product.is_bestseller && <Badge type="bestseller" />}
        {product.is_deal && <Badge type="deal" />}

        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.brand}>{product.brand}</Text>

        <StarRating rating={product.rating} reviewCount={product.review_count} />

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {!!discount && (
            <Text style={styles.original}>${product.original_price!.toFixed(2)}</Text>
          )}
          {!!discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>

        {product.is_prime && (
          <Text style={styles.prime}>✓ FREE delivery</Text>
        )}

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addItem(product)}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f3f3',
  },
  body: { padding: 12 },
  name: { fontSize: 14, fontWeight: '600', color: '#0f1111', marginVertical: 4 },
  brand: { fontSize: 12, color: '#565959', marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, flexWrap: 'wrap' },
  price: { fontSize: 18, fontWeight: '700', color: '#0f1111', marginRight: 6 },
  original: { fontSize: 13, color: '#888', textDecorationLine: 'line-through', marginRight: 4 },
  discountBadge: {
    backgroundColor: '#cc0c39',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  discountText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  prime: { fontSize: 12, color: '#007185', marginTop: 4 },
  addBtn: {
    backgroundColor: '#ff9900',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addBtnText: { fontWeight: '700', fontSize: 14, color: '#0f1111' },
});
