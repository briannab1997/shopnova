import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const SLIDES = [
  { id: '1', title: 'Electronics Deals', subtitle: 'Up to 40% off headphones, tablets & more', bg: '#232f3e' },
  { id: '2', title: 'Kitchen Essentials', subtitle: 'Stock your kitchen with top-rated picks', bg: '#1a4a3e' },
  { id: '3', title: 'Join Nova Prime', subtitle: 'Free shipping on millions of items', bg: '#3a1c72' },
  { id: '4', title: 'Sports & Outdoors', subtitle: 'Gear up for your next adventure', bg: '#1a3a5c' },
];

export default function HomeScreen({ navigation }: any) {
  const [deals, setDeals] = useState<Product[]>([]);
  const [electronics, setElectronics] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<ScrollView>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_deal', true)
      .limit(6)
      .then(({ data }) => setDeals((data as Product[]) ?? []));

    supabase
      .from('products')
      .select('*')
      .eq('category', 'Electronics')
      .limit(6)
      .then(({ data }) => setElectronics((data as Product[]) ?? []));
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentSlide + 1) % SLIDES.length;
      setCurrentSlide(next);
      slideRef.current?.scrollTo({ x: next * width, animated: true });
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Carousel */}
      <ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          setCurrentSlide(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.bg, width }]}>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
            <TouchableOpacity style={styles.slideBtn}>
              <Text style={styles.slideBtnText}>Shop now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentSlide && styles.dotActive]} />
        ))}
      </View>

      {/* Today's Deals */}
      <Section title="Today's Deals" onSeeAll={() => navigation.navigate('Products', { dealsOnly: true })}>
        <FlatList
          data={deals}
          keyExtractor={(p) => p.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
          renderItem={({ item }) => (
            <View style={{ width: 180, marginRight: 12 }}>
              <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
            </View>
          )}
        />
      </Section>

      {/* Electronics */}
      <Section title="Electronics" onSeeAll={() => navigation.navigate('Products', { category: 'Electronics' })}>
        <FlatList
          data={electronics}
          keyExtractor={(p) => p.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
          renderItem={({ item }) => (
            <View style={{ width: 180, marginRight: 12 }}>
              <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
            </View>
          )}
        />
      </Section>

      {/* Category Grid */}
      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <View style={styles.categoryGrid}>
        {['Electronics', 'Home & Kitchen', 'Books', 'Beauty', 'Sports & Outdoors', 'Clothing'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryTile}
            onPress={() => navigation.navigate('Products', { category: cat })}
          >
            <Text style={styles.categoryTileText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function Section({ title, onSeeAll, children }: { title: string; onSeeAll: () => void; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3' },
  slide: {
    height: 200,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  slideTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 6 },
  slideSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 },
  slideBtn: {
    backgroundColor: '#ff9900',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  slideBtnText: { fontWeight: '700', fontSize: 14, color: '#0f1111' },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ccc', marginHorizontal: 3 },
  dotActive: { backgroundColor: '#ff9900', width: 18 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0f1111', paddingHorizontal: 16, marginBottom: 4 },
  seeAll: { fontSize: 13, color: '#007185' },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 32,
  },
  categoryTile: {
    width: '47%',
    backgroundColor: '#fff',
    margin: '1.5%',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTileText: { fontSize: 13, fontWeight: '600', color: '#0f1111', textAlign: 'center' },
});
