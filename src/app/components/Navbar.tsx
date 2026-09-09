import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X, BookOpen, PiggyBank, GraduationCap, Users, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/modulos", label: "Módulos", icon: BookOpen },
  { to: "/presupuesto", label: "Presupuesto", icon: PiggyBank },
  { to: "/aprendizaje", label: "Aprendizaje", icon: GraduationCap },
  { to: "/nosotros", label: "Nosotros", icon: Users },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
    setUserMenuOpen(false);
  }

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
            <span className="text-2xl">🪙</span>
            <span>DeudasCero</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                    {user?.nombre.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user?.nombre.split(" ")[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-xl border border-border overflow-hidden">
                    <Link
                      to="/perfil"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <User size={16} /> Mi Perfil
                    </Link>
                    {user?.rol === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <LayoutDashboard size={16} /> Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-destructive hover:bg-secondary transition-colors w-full text-left"
                    >
                      <LogOut size={16} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Registrarme
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-white/10 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  <User size={18} /> Mi Perfil
                </Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive-foreground bg-destructive/20 hover:bg-destructive/30 w-full transition-colors"
                >
                  <LogOut size={18} /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/registro" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm bg-accent text-white hover:bg-accent/90 transition-colors">
                  Registrarme gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
