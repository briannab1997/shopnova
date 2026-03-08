import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeType = 'bestseller' | 'prime' | 'deal' | 'new';

const BADGE_CONFIG: Record<BadgeType, { label: string; bg: string; color: string }> = {
  bestseller: { label: '#1 Best Seller', bg: '#f0c040', color: '#0f1111' },
  prime:       { label: 'prime',          bg: '#232f3e', color: '#00a8e0' },
  deal:        { label: "Today's Deal",   bg: '#cc0c39', color: '#fff' },
  new:         { label: 'New',            bg: '#067d62', color: '#fff' },
};

export default function Badge({ type }: { type: BadgeType }) {
  const { label, bg, color } = BADGE_CONFIG[type];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  label: { fontSize: 11, fontWeight: '700' },
});
