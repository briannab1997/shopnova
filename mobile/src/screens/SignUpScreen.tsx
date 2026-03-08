import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen({ navigation }: any) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!fullName || !email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    setError('');
    const { error: err } = await signUp(email.trim(), password, fullName.trim());
    setLoading(false);
    if (err) { setError(err); return; }
    setSuccess(true);
  }

  if (success) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.successIcon}>📧</Text>
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successMsg}>
          We sent a confirmation link to <Text style={{ fontWeight: '700' }}>{email}</Text>.
          Click it to activate your account, then sign in.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.btnText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>ShopNova</Text>
        <Text style={styles.title}>Create account</Text>

        {!!error && <Text style={styles.error}>{error}</Text>}

        {[
          { label: 'Full name', value: fullName, set: setFullName, placeholder: 'Jane Smith' },
          { label: 'Email', value: email, set: setEmail, placeholder: 'you@example.com', keyboard: 'email-address' as const, autoCapitalize: 'none' as const },
          { label: 'Password', value: password, set: setPassword, placeholder: '••••••••', secure: true },
          { label: 'Confirm password', value: confirm, set: setConfirm, placeholder: '••••••••', secure: true },
        ].map(({ label, value, set, placeholder, keyboard, autoCapitalize, secure }) => (
          <View key={label}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={set}
              placeholder={placeholder}
              placeholderTextColor="#aaa"
              keyboardType={keyboard}
              autoCapitalize={autoCapitalize ?? 'words'}
              secureTextEntry={secure}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleSignUp} disabled={loading}>
          {loading ? <ActivityIndicator color="#0f1111" /> : <Text style={styles.btnText}>Create your account</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 16 }}>
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: '800', color: '#ff9900', textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#0f1111', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#0f1111', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 16, color: '#0f1111' },
  error: { backgroundColor: '#fff5f5', color: '#cc0c39', padding: 10, borderRadius: 6, marginBottom: 16, fontSize: 13 },
  btn: { backgroundColor: '#ff9900', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  btnText: { fontWeight: '700', fontSize: 16, color: '#0f1111' },
  link: { textAlign: 'center', color: '#007185', fontSize: 14 },
  successIcon: { fontSize: 48, marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: '700', color: '#0f1111', marginBottom: 12 },
  successMsg: { fontSize: 14, color: '#565959', textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 16 },
});
