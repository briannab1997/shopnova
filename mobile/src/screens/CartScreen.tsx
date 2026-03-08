import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';

const PLACEHOLDER = 'https://via.placeholder.com/80x80?text=?';

export default function CartScreen({ navigation }: any) {
  const { items, removeItem, updateQuantity, itemCount, subtotal, cartLoading } = useCart();

  const shipping = subtotal >= 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyMsg}>Add items to get started.</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Products')}>
          <Text style={styles.shopBtnText}>Shop now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.product_id}
        contentContainerStyle={{ padding: 12 }}
        ListFooterComponent={
          <View style={styles.summary}>
            {shipping === 0 && (
              <Text style={styles.freeShip}>✓ Your order qualifies for FREE shipping</Text>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (8%)</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Order Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: item.product.images[0] || PLACEHOLDER }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemBody}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
              {item.product.is_prime && <Text style={styles.itemPrime}>FREE delivery</Text>}
              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.product_id, item.quantity - 1)}
                >
                  <Text style={styles.qtyBtnText}>{item.quantity === 1 ? '🗑' : '−'}</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.product_id, item.quantity + 1)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item.product_id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0f1111', marginBottom: 8 },
  emptyMsg: { fontSize: 14, color: '#565959', marginBottom: 24 },
  shopBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingHorizontal: 32, paddingVertical: 12 },
  shopBtnText: { fontWeight: '700', color: '#0f1111', fontSize: 15 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: { width: 100, height: 100, backgroundColor: '#f3f3f3' },
  itemBody: { flex: 1, padding: 12 },
  itemName: { fontSize: 13, fontWeight: '600', color: '#0f1111', marginBottom: 4, lineHeight: 18 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#0f1111', marginBottom: 2 },
  itemPrime: { fontSize: 11, color: '#007185', marginBottom: 6 },
  itemActions: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 14 },
  qtyNum: { fontSize: 14, fontWeight: '700', marginHorizontal: 10, color: '#0f1111' },
  deleteBtn: { marginLeft: 'auto' },
  deleteBtnText: { fontSize: 12, color: '#cc0c39' },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
    marginBottom: 32,
  },
  freeShip: { color: '#067d62', fontSize: 13, fontWeight: '600', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#565959' },
  summaryValue: { fontSize: 14, color: '#0f1111', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#0f1111' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#0f1111' },
  checkoutBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  checkoutBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
});
