import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { supabase } from '../lib/supabaseClient';
import type { Order } from '../types';

export default function OrderConfirmationScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single()
      .then(({ data }) => {
        setOrder(data as Order);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#ff9900" /></View>;
  }

  if (!order) {
    return <View style={styles.center}><Text>Order not found.</Text></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.successBanner}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.successTitle}>Order confirmed!</Text>
        <Text style={styles.orderId}>Order #{order.id.slice(0, 8).toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Delivery estimate</Text>
        <Text style={styles.cardBody}>Arriving in 3–5 business days</Text>
        <Text style={styles.address}>
          {order.shipping_name}{'\n'}
          {order.shipping_address}{'\n'}
          {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order summary</Text>
        {order.order_items?.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            {!!item.product_image && (
              <Image source={{ uri: item.product_image }} style={styles.itemImage} resizeMode="cover" />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product_name}</Text>
              <Text style={styles.itemMeta}>Qty: {item.quantity} · ${item.unit_price.toFixed(2)} ea</Text>
            </View>
            <Text style={styles.itemSubtotal}>${item.subtotal.toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        {[
          { label: 'Subtotal', value: `$${order.subtotal.toFixed(2)}` },
          { label: 'Shipping', value: order.shipping_cost === 0 ? 'FREE' : `$${order.shipping_cost.toFixed(2)}` },
          { label: 'Tax', value: `$${order.tax.toFixed(2)}` },
        ].map(({ label, value }) => (
          <View key={label} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
          </View>
        ))}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Order total</Text>
          <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopBtnText}>Continue shopping</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  successBanner: { backgroundColor: '#232f3e', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 16 },
  checkmark: { fontSize: 40, color: '#ff9900', marginBottom: 8 },
  successTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  orderId: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0f1111', marginBottom: 8 },
  cardBody: { fontSize: 14, color: '#067d62', fontWeight: '600', marginBottom: 4 },
  address: { fontSize: 13, color: '#565959', lineHeight: 20 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  itemImage: { width: 50, height: 50, borderRadius: 6, marginRight: 10, backgroundColor: '#f3f3f3' },
  itemName: { fontSize: 13, fontWeight: '600', color: '#0f1111', marginBottom: 2, flex: 1 },
  itemMeta: { fontSize: 12, color: '#565959' },
  itemSubtotal: { fontSize: 13, fontWeight: '700', color: '#0f1111' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#565959' },
  summaryValue: { fontSize: 14, color: '#0f1111' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#0f1111' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#0f1111' },
  shopBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 4, marginBottom: 32 },
  shopBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
});
