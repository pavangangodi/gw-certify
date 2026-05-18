"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { login as loginRequest, register as registerRequest } from "@/lib/api";
import type { User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const storedUser = window.localStorage.getItem("gw-certify-user");
    const storedToken = window.localStorage.getItem("gw-certify-token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser) as User);
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const persistSession = React.useCallback((nextUser: User, nextToken: string) => {
    window.localStorage.setItem("gw-certify-user", JSON.stringify(nextUser));
    window.localStorage.setItem("gw-certify-token", nextToken);
    setUser(nextUser);
    setToken(nextToken);
  }, []);

  const login = React.useCallback(
    async (email: string, password: string) => {
      const response = await loginRequest(email, password);
      persistSession(response.user, response.token);
      router.push("/dashboard");
    },
    [persistSession, router]
  );

  const register = React.useCallback(
    async (name: string, email: string, password: string) => {
      const response = await registerRequest(name, email, password);
      persistSession(response.user, response.token);
      router.push("/dashboard");
    },
    [persistSession, router]
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem("gw-certify-user");
    window.localStorage.removeItem("gw-certify-token");
    setUser(null);
    setToken(null);
    router.push("/login");
  }, [router]);

  const value = React.useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

export function useRequireAuth() {
  const router = useRouter();
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.replace("/login");
    }
  }, [auth.loading, auth.user, router]);

  return auth;
}
