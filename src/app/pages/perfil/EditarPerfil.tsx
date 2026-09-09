import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function EditarPerfil() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [guardado, setGuardado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    updateUser({ nombre: nombre.trim() });
    setGuardado(true);
    setTimeout(() => { setGuardado(false); navigate("/perfil"); }, 1200);
  }

  if (!user) return null;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/perfil" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={16} /> Volver a mi perfil
          </Link>
          <h1 className="text-3xl font-bold">Editar perfil</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-white">
              {nombre.charAt(0).toUpperCase() || user.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">{nombre || user.nombre}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">El email no se puede modificar.</p>
            </div>

            <div className="bg-secondary rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nota:</strong> El cambio de contraseña no está disponible en esta versión demo. En una versión de producción requeriría verificación por email.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-accent text-white font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
              >
                {guardado ? <><CheckCircle size={18} /> Guardado</> : "Guardar cambios"}
              </button>
              <Link
                to="/perfil"
                className="flex-1 py-3 rounded-xl border-2 border-border text-foreground font-bold text-center hover:bg-secondary transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
