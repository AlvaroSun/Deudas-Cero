import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Completá todos los campos."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = login(email, password);
    setLoading(false);
    if (result.success) navigate(from, { replace: true });
    else setError(result.error || "Error al iniciar sesión.");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            <span className="text-3xl">🪙</span> FinanzasJoven
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Bienvenido de vuelta</h1>
          <p className="text-muted-foreground mt-2">Ingresá a tu cuenta para continuar</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 text-destructive text-sm mb-6">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Contraseña</label>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-secondary border border-border text-xs text-muted-foreground">
            <p className="font-semibold mb-1 text-foreground">Cuenta de prueba:</p>
            <p>Admin: admin@finanzasjoven.com / admin123</p>
            <p className="mt-1">O <Link to="/registro" className="text-accent underline">registrate</Link> para crear tu propia cuenta.</p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tenés cuenta?{" "}
          <Link to="/registro" className="text-accent font-semibold hover:underline">
            Registrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
