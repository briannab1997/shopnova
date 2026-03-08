import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import StarRating from '../components/StarRating';
import Badge from '../components/Badge';
import { useCart } from '../context/CartContext';

const PLACEHOLDER = 'https://via.placeholder.com/400x400?text=No+Image';

export default function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
      .then(({ data }) => {
        setProduct(data as Product);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  async function handleAddToCart() {
    await addItem(product!, quantity);
    Alert.alert('Added to cart', `${product!.name} × ${quantity} added to your cart.`, [
      { text: 'Continue shopping', style: 'cancel' },
      { text: 'View cart', onPress: () => navigation.navigate('Cart') },
    ]);
  }

  async function handleBuyNow() {
    await addItem(product!, quantity);
    navigation.navigate('Cart');
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Main image */}
      <Image
        source={{ uri: product.images[selectedImage] || PLACEHOLDER }}
        style={styles.mainImage}
        resizeMode="contain"
      />

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <FlatList
          horizontal
          data={product.images}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.thumbRow}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedImage(index)}>
              <Image
                source={{ uri: item }}
                style={[styles.thumb, index === selectedImage && styles.thumbActive]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.body}>
        {product.is_bestseller && <Badge type="bestseller" />}
        {product.is_deal && <Badge type="deal" />}

        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>

        <StarRating rating={product.rating} reviewCount={product.review_count} size={16} />

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {!!discount && (
            <>
              <Text style={styles.original}>${product.original_price!.toFixed(2)}</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Save {discount}%</Text>
              </View>
            </>
          )}
        </View>

        {product.is_prime && (
          <Text style={styles.prime}>✓ FREE delivery with Nova Prime</Text>
        )}

        <Text style={styles.stock}>
          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
        </Text>

        {/* Quantity */}
        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Qty:</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNum}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>

        {/* Description */}
        <Text style={styles.descHeading}>About this item</Text>
        <Text style={styles.desc}>{product.description}</Text>

        {product.tags?.length > 0 && (
          <View style={styles.tagsRow}>
            {product.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainImage: { width: '100%', height: 280, backgroundColor: '#f3f3f3' },
  thumbRow: { paddingHorizontal: 12, paddingVertical: 10 },
  thumb: { width: 56, height: 56, borderRadius: 6, marginRight: 8, borderWidth: 1, borderColor: '#ddd' },
  thumbActive: { borderColor: '#ff9900', borderWidth: 2 },
  body: { padding: 16 },
  brand: { fontSize: 12, color: '#565959', marginBottom: 4 },
  name: { fontSize: 18, fontWeight: '700', color: '#0f1111', marginBottom: 8, lineHeight: 26 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginVertical: 10 },
  price: { fontSize: 24, fontWeight: '800', color: '#0f1111', marginRight: 8 },
  original: { fontSize: 15, color: '#888', textDecorationLine: 'line-through', marginRight: 6 },
  discountBadge: { backgroundColor: '#cc0c39', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  prime: { fontSize: 13, color: '#007185', marginBottom: 6 },
  stock: { fontSize: 14, color: '#067d62', fontWeight: '600', marginBottom: 12 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  qtyLabel: { fontSize: 14, fontWeight: '600', marginRight: 10, color: '#0f1111' },
  qtyBtn: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, color: '#0f1111' },
  qtyNum: { fontSize: 16, fontWeight: '700', marginHorizontal: 14, color: '#0f1111' },
  addBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  addBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
  buyBtn: { backgroundColor: '#f0c040', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  buyBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
  descHeading: { fontSize: 16, fontWeight: '700', color: '#0f1111', marginBottom: 8 },
  desc: { fontSize: 14, color: '#565959', lineHeight: 22, marginBottom: 16 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: '#f3f3f3', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { fontSize: 12, color: '#565959' },
});
