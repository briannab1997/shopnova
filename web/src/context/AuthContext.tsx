import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as mockDb from '../lib/mockDb';
import type { MockUser } from '../lib/mockDb';

interface AuthContextType {
  user: MockUser | null;
  session: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = mockDb.getSession();
    setUser(stored);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user: u, error } = await mockDb.signIn(email, password);
    if (u) setUser(u);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { user: u, error } = await mockDb.signUp(email, password, fullName);
    if (u) setUser(u);
    return { error };
  };

  const signOut = async () => {
    await mockDb.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session: user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
