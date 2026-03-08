import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import AccountScreen from '../screens/AccountScreen';
import AuthNavigator from './AuthNavigator';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAV_OPTS = {
  headerStyle: { backgroundColor: '#232f3e' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' as const },
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={NAV_OPTS}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ShopNova' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
      <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Products' }} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={NAV_OPTS}>
      <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Shop' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product' }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={NAV_OPTS}>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmed', headerLeft: () => null }} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator screenOptions={NAV_OPTS}>
      <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
      <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { itemCount } = useCart();
  return (
    <View>
      <Text style={{ fontSize: size, color }}>🛒</Text>
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff9900',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#ddd' },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text> }}
      />
      <Tab.Screen
        name="ShopTab"
        component={ProductsStack}
        options={{ tabBarLabel: 'Shop', tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🔍</Text> }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{ tabBarLabel: 'Cart', tabBarIcon: (props) => <CartTabIcon {...props} /> }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{ tabBarLabel: 'Account', tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#cc0c39',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
});
