import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    const { error: err } = await signIn(email.trim(), password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>ShopNova</Text>
      <Text style={styles.title}>Sign in</Text>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.btn} onPress={handleSignIn} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f1111" /> : <Text style={styles.btnText}>Sign In</Text>}
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>New to ShopNova?</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.createBtnText}>Create your ShopNova account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ff9900',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f1111',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#0f1111', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    color: '#0f1111',
  },
  error: {
    backgroundColor: '#fff5f5',
    color: '#cc0c39',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 13,
  },
  btn: {
    backgroundColor: '#ff9900',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  btnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 12, fontSize: 13, color: '#565959' },
  createBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createBtnText: { fontSize: 14, color: '#0f1111' },
});
