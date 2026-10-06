import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, AlertCircle, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Si el usuario cierra la ventana, vuelve a la portada de la sección donde estaba
function seccionDe(pathname: string) {
  if (pathname.startsWith("/modulos")) return "/modulos";
  if (pathname.startsWith("/aprendizaje")) return "/aprendizaje";
  return "/";
}

// Ventana emergente que pide iniciar sesión para ver contenido privado.
// Al ingresar, se muestra directamente la página que el usuario quería ver.
export default function LoginModal() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cerrar = () => navigate(seccionDe(location.pathname), { replace: true });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Completá todos los campos."); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) setError(result.error || "Error al iniciar sesión.");
  }

  return (
    <div className="min-h-[70vh] bg-background">
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={cerrar}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          className="relative w-full max-w-md bg-card rounded-2xl border border-border p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <span className="text-4xl">🔒</span>
            <h2 id="login-modal-title" className="text-2xl font-bold text-foreground mt-2">Iniciá sesión para continuar</h2>
            <p className="text-muted-foreground text-sm mt-1">Este contenido es solo para usuarios registrados.</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 text-destructive text-sm mb-5">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tenés cuenta?{" "}
            <Link
              to="/registro"
              state={{ from: location.pathname }}
              className="text-accent font-semibold hover:underline"
            >
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
