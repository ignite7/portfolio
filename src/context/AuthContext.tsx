'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: false,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setUser(document.cookie.includes('user=true'));
  }, []);

  const login = (username: string, password: string): boolean => {
    const result: boolean = username === 'demo' && password === 'password';

    if (result) {
      document.cookie = 'user=true; path=/';
    }

    setUser(result);
    return result;
  };

  const logout = (): void => {
    setUser(false);
    document.cookie = 'user=; path=/; max-age=0';
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
