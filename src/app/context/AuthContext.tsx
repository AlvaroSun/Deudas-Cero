import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../lib/api";

interface User {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  rol: "usuario" | "admin";
  fechaRegistro: string;
}

type Result = { success: boolean; error?: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<Result>;
  register: (nombre: string, email: string, password: string) => Promise<Result>;
  logout: () => Promise<void>;
  updateUser: (data: Pick<User, "nombre">) => Promise<Result>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la página, pregunta al servidor si hay una sesión activa
  useEffect(() => {
    api<{ user: User | null }>("/auth/me")
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<Result> {
    try {
      const { user } = await api<{ user: User }>("/auth/login", { method: "POST", body: { email, password } });
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }

  async function register(nombre: string, email: string, password: string): Promise<Result> {
    try {
      const { user } = await api<{ user: User }>("/auth/register", { method: "POST", body: { nombre, email, password } });
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }

  async function logout() {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
  }

  async function updateUser(data: Pick<User, "nombre">): Promise<Result> {
    try {
      const { user } = await api<{ user: User }>("/auth/me", { method: "PUT", body: data });
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
