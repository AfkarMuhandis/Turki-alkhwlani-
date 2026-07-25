import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'editor' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: (User & { password: string })[] = [
  { id: '1', name: 'Admin User', email: 'admin@engineerideas.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Editor User', email: 'editor@engineerideas.com', password: 'editor123', role: 'editor' },
  { id: '3', name: 'Test User', email: 'user@test.com', password: 'user123', role: 'user' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const exists = mockUsers.find(u => u.email === email);
    if (exists) return false;
    const newUser: User = { id: Date.now().toString(), name, email, role: 'user' };
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
