import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutScreen({ navigation }: any) {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('shipping');
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState({
    name: '', address: '', city: '', state: '', zip: '',
  });

  const shipping_cost = subtotal >= 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping_cost + tax;

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.authMsg}>Sign in to complete your order.</Text>
        <TouchableOpacity style={styles.authBtn} onPress={() => navigation.navigate('Account')}>
          <Text style={styles.authBtnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function placeOrder() {
    setPlacing(true);
    // 1. Insert order
    const { data: orderData, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id: user!.id,
        order_status: 'confirmed',
        subtotal,
        shipping_cost,
        tax,
        total,
        shipping_name: shipping.name,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_zip: shipping.zip,
      })
      .select()
      .single();

    if (orderErr || !orderData) {
      setPlacing(false);
      Alert.alert('Error', 'Failed to place order. Please try again.');
      return;
    }

    // 2. Insert order items
    await supabase.from('order_items').insert(
      items.map((i) => ({
        order_id: orderData.id,
        product_id: i.product_id,
        product_name: i.product.name,
        product_image: i.product.images[0] ?? '',
        unit_price: i.product.price,
        quantity: i.quantity,
      }))
    );

    // 3. Clear cart
    await clearCart();
    setPlacing(false);

    navigation.replace('OrderConfirmation', { orderId: orderData.id });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        {/* Step tabs */}
        <View style={styles.steps}>
          {(['shipping', 'payment', 'review'] as Step[]).map((s, i) => (
            <View key={s} style={styles.stepWrapper}>
              <View style={[styles.stepDot, step === s && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step === s && styles.stepNumActive]}>{i + 1}</Text>
              </View>
              <Text style={[styles.stepLabel, step === s && styles.stepLabelActive]}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
              {i < 2 && <View style={styles.stepLine} />}
            </View>
          ))}
        </View>

        {/* Step: Shipping */}
        {step === 'shipping' && (
          <View>
            <Text style={styles.sectionTitle}>Shipping address</Text>
            {[
              { key: 'name', label: 'Full name', placeholder: 'Jane Smith' },
              { key: 'address', label: 'Street address', placeholder: '123 Main St' },
              { key: 'city', label: 'City', placeholder: 'Austin' },
              { key: 'state', label: 'State', placeholder: 'TX' },
              { key: 'zip', label: 'ZIP code', placeholder: '78701', keyboard: 'numeric' as const },
            ].map(({ key, label, placeholder, keyboard }) => (
              <View key={key}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={(shipping as any)[key]}
                  onChangeText={(v) => setShipping((prev) => ({ ...prev, [key]: v }))}
                  placeholder={placeholder}
                  placeholderTextColor="#aaa"
                  keyboardType={keyboard}
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                if (!shipping.name || !shipping.address || !shipping.city || !shipping.state || !shipping.zip) {
                  Alert.alert('Missing info', 'Please fill in all shipping fields.');
                  return;
                }
                setStep('payment');
              }}
            >
              <Text style={styles.nextBtnText}>Continue to payment</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step: Payment (mock) */}
        {step === 'payment' && (
          <View>
            <Text style={styles.sectionTitle}>Payment</Text>
            <View style={styles.mockCard}>
              <Text style={styles.mockCardText}>💳 Visa ending in 4242</Text>
              <Text style={styles.mockCardSub}>This is a demo — no real payment processed.</Text>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep('review')}>
              <Text style={styles.nextBtnText}>Review your order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep('shipping')}>
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step: Review */}
        {step === 'review' && (
          <View>
            <Text style={styles.sectionTitle}>Order review</Text>
            <View style={styles.reviewBlock}>
              <Text style={styles.reviewLabel}>Ship to</Text>
              <Text style={styles.reviewValue}>{shipping.name}</Text>
              <Text style={styles.reviewValue}>{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</Text>
            </View>
            <View style={styles.reviewBlock}>
              <Text style={styles.reviewLabel}>Items ({items.length})</Text>
              {items.map((i) => (
                <View key={i.product_id} style={styles.reviewItem}>
                  <Text style={styles.reviewItemName} numberOfLines={1}>{i.product.name}</Text>
                  <Text style={styles.reviewItemPrice}>${(i.product.price * i.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>
            <View style={styles.reviewBlock}>
              {[
                { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                { label: 'Shipping', value: shipping_cost === 0 ? 'FREE' : `$${shipping_cost.toFixed(2)}` },
                { label: 'Tax', value: `$${tax.toFixed(2)}` },
                { label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
              ].map(({ label, value, bold }) => (
                <View key={label} style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, bold && styles.bold]}>{label}</Text>
                  <Text style={[styles.reviewValue, bold && styles.bold]}>{value}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.placeBtn} onPress={placeOrder} disabled={placing}>
              {placing ? <ActivityIndicator color="#0f1111" /> : <Text style={styles.placeBtnText}>Place your order</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep('payment')}>
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  authMsg: { fontSize: 16, color: '#0f1111', marginBottom: 16, textAlign: 'center' },
  authBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingHorizontal: 32, paddingVertical: 12 },
  authBtnText: { fontWeight: '700', color: '#0f1111', fontSize: 15 },
  steps: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  stepWrapper: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  stepDotActive: { backgroundColor: '#ff9900' },
  stepNum: { fontSize: 13, fontWeight: '700', color: '#888' },
  stepNumActive: { color: '#0f1111' },
  stepLabel: { fontSize: 11, color: '#888', marginHorizontal: 4 },
  stepLabelActive: { color: '#ff9900', fontWeight: '700' },
  stepLine: { width: 24, height: 1, backgroundColor: '#ddd' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f1111', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#0f1111', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 14, color: '#0f1111', backgroundColor: '#fff' },
  nextBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  nextBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
  backBtn: { borderWidth: 1, borderColor: '#ccc', borderRadius: 24, paddingVertical: 12, alignItems: 'center', marginTop: 10, backgroundColor: '#fff' },
  backBtnText: { fontSize: 15, color: '#565959' },
  mockCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  mockCardText: { fontSize: 16, fontWeight: '600', color: '#0f1111', marginBottom: 4 },
  mockCardSub: { fontSize: 13, color: '#565959' },
  reviewBlock: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12 },
  reviewLabel: { fontSize: 13, color: '#565959', marginBottom: 4 },
  reviewValue: { fontSize: 14, color: '#0f1111', marginBottom: 2 },
  reviewItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewItemName: { flex: 1, fontSize: 13, color: '#0f1111', marginRight: 8 },
  reviewItemPrice: { fontSize: 13, fontWeight: '600', color: '#0f1111' },
  bold: { fontWeight: '700', fontSize: 15 },
  placeBtn: { backgroundColor: '#ff9900', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  placeBtnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
});
