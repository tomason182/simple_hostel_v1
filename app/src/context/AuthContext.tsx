import { createContext, useState } from "react";

import type { ReactNode } from "react";

import type { User } from "../models/User";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;

  logout: () => void

}

export const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderprops {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderprops) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  function login(user: User, token: string) {
    setUser(user);
    setToken(token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children};
    </AuthContext.Provider>
  );
}

