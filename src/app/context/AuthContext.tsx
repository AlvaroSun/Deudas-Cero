import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  rol: "usuario" | "admin";
  fechaRegistro: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (nombre: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("finanzas_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function login(email: string, password: string) {
    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem("finanzas_users") || "[]"
    );
    const adminEmails = ["admin@finanzasjoven.com"];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      if (email === "admin@finanzasjoven.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          nombre: "Administrador",
          email,
          rol: "admin",
          fechaRegistro: new Date().toISOString(),
        };
        setUser(adminUser);
        localStorage.setItem("finanzas_user", JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, error: "Email o contraseña incorrectos." };
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem("finanzas_user", JSON.stringify(userData));
    return { success: true };
  }

  function register(nombre: string, email: string, password: string) {
    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem("finanzas_users") || "[]"
    );
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Ya existe una cuenta con ese email." };
    }
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      nombre,
      email,
      password,
      rol: "usuario",
      fechaRegistro: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("finanzas_users", JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("finanzas_user", JSON.stringify(userData));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("finanzas_user");
  }

  function updateUser(data: Partial<User>) {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("finanzas_user", JSON.stringify(updated));
    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem("finanzas_users") || "[]"
    );
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data };
      localStorage.setItem("finanzas_users", JSON.stringify(users));
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
