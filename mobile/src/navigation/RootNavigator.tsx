import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './TabNavigator';

export default function RootNavigator() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232f3e' }}>
        <ActivityIndicator size="large" color="#ff9900" />
      </View>
    );
  }

  // Always show tabs — Account tab handles sign in/out state
  return <TabNavigator />;
}
