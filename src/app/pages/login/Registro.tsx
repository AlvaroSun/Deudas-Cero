import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Débil", "Media", "Fuerte"];
  const strengthColor = ["", "bg-destructive", "bg-accent", "bg-success"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!nombre || !email || !password || !confirm) { setError("Completá todos los campos."); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = register(nombre, email, password);
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error || "Error al registrarse.");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            <span className="text-3xl">🪙</span> FinanzasJoven
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Creá tu cuenta</h1>
          <p className="text-muted-foreground mt-2">Empezá tu camino hacia la libertad financiera</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 text-destructive text-sm mb-6">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>
            </div>

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
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor[passwordStrength] : "bg-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Fortaleza: {strengthLabel[passwordStrength]}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repetí tu contraseña"
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
                {confirm && password && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    {confirm === password
                      ? <CheckCircle size={18} className="text-success" />
                      : <AlertCircle size={18} className="text-destructive" />}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creando cuenta..." : "Crear mi cuenta gratis"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Al registrarte aceptás nuestros términos de uso y política de privacidad.
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-accent font-semibold hover:underline">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
