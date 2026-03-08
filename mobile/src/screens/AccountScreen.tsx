import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import type { Order } from '../types';

const STATUS_COLORS: Record<string, string> = {
  pending: '#888',
  confirmed: '#007185',
  processing: '#ff9900',
  shipped: '#3a7bd5',
  delivered: '#067d62',
  cancelled: '#cc0c39',
};

export default function AccountScreen({ navigation }: any) {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setLoadingOrders(false);
      });
  }, [user]);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.guestTitle}>Sign in to your account</Text>
        <Text style={styles.guestMsg}>Track orders, manage your profile, and more.</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.signInBtnText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('Auth', { screen: 'SignUp' })}>
          <Text style={styles.createBtnText}>Create account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.profileCard}>
        <Text style={styles.avatar}>{user.email?.[0].toUpperCase()}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profileSub}>Nova member</Text>
        </View>
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Orders</Text>

      {loadingOrders ? (
        <ActivityIndicator color="#ff9900" style={{ marginTop: 20 }} />
      ) : orders.length === 0 ? (
        <View style={styles.emptyOrders}>
          <Text style={styles.emptyText}>No orders yet.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.shopLink}>Start shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>#{order.id.slice(0, 8).toUpperCase()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.order_status] ?? '#888' }]}>
                <Text style={styles.statusText}>{order.order_status}</Text>
              </View>
            </View>
            <Text style={styles.orderDate}>
              {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
            <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
            {order.order_items?.slice(0, 2).map((item) => (
              <Text key={item.id} style={styles.orderItem} numberOfLines={1}>
                · {item.product_name} × {item.quantity}
              </Text>
            ))}
            {(order.order_items?.length ?? 0) > 2 && (
              <Text style={styles.moreItems}>+{(order.order_items?.length ?? 0) - 2} more items</Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  guestTitle: { fontSize: 22, fontWeight: '700', color: '#0f1111', marginBottom: 8, textAlign: 'center' },
  guestMsg: { fontSize: 14, color: '#565959', textAlign: 'center', marginBottom: 24 },
  signInBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingHorizontal: 40, paddingVertical: 12, marginBottom: 12, width: '100%', alignItems: 'center' },
  signInBtnText: { fontWeight: '700', color: '#0f1111', fontSize: 16 },
  createBtn: { borderWidth: 1, borderColor: '#ccc', borderRadius: 24, paddingHorizontal: 40, paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: '#fff' },
  createBtnText: { color: '#0f1111', fontSize: 15 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#232f3e', borderRadius: 10, padding: 16, marginBottom: 20 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ff9900', textAlign: 'center', lineHeight: 44, fontSize: 20, fontWeight: '700', color: '#0f1111', marginRight: 12 },
  profileEmail: { color: '#fff', fontSize: 14, fontWeight: '600' },
  profileSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 },
  signOutBtn: { marginLeft: 'auto', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  signOutText: { color: '#fff', fontSize: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0f1111', marginBottom: 12 },
  emptyOrders: { alignItems: 'center', paddingVertical: 24 },
  emptyText: { fontSize: 15, color: '#565959', marginBottom: 8 },
  shopLink: { fontSize: 15, color: '#007185' },
  orderCard: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontSize: 14, fontWeight: '700', color: '#0f1111' },
  statusBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  orderDate: { fontSize: 12, color: '#565959', marginBottom: 4 },
  orderTotal: { fontSize: 14, fontWeight: '700', color: '#0f1111', marginBottom: 6 },
  orderItem: { fontSize: 13, color: '#565959', marginBottom: 2 },
  moreItems: { fontSize: 12, color: '#007185', marginTop: 2 },
});
