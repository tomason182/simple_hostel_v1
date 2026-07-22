import { createContext, useEffect, useState } from "react";
import authService from "../services/AuthService";

import type { ReactNode } from "react";

import type { User } from "../models/User";

interface AuthContextType {
  user: User | null;

  loading: boolean;

  login: (user: User) => void;

  logout: () => void;

  isAuthenticated: boolean;

}

export const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderprops {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderprops) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  let isAuthenticated = user !== null;

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await authService.me();

        setLoading(false);

        setUser(user);
      } catch {
        setUser(null);
      }
    }

    loadUser();

  }, []);

  function login(user: User): void {
    setUser(user);
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout();

    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

