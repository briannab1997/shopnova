import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 14 }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return fill >= 0.75 ? 'full' : fill >= 0.25 ? 'half' : 'empty';
  });

  return (
    <View style={styles.row}>
      <View style={styles.stars}>
        {stars.map((type, i) => (
          <Text key={i} style={[styles.star, { fontSize: size }]}>
            {type === 'full' ? '★' : type === 'half' ? '⯨' : '☆'}
          </Text>
        ))}
      </View>
      {reviewCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 2 }]}>
          {' '}({reviewCount.toLocaleString()})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  stars: { flexDirection: 'row' },
  star: { color: '#ffa41c' },
  count: { color: '#007185' },
});
