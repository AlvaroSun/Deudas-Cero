import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Calendar, Edit, BookOpen, PiggyBank, GraduationCap } from "lucide-react";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) return null;

  const ingresos = JSON.parse(localStorage.getItem("presupuesto_ingresos") || "[]");
  const gastos = JSON.parse(localStorage.getItem("presupuesto_gastos") || "[]");
  const totalIngresos = ingresos.reduce((s: number, i: { monto: number }) => s + i.monto, 0);
  const totalGastos = gastos.reduce((s: number, g: { monto: number }) => s + g.monto, 0);
  const balance = totalIngresos - totalGastos;

  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

  const fechaRegistro = new Date(user.fechaRegistro).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-white">
              {user.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.nombre}</h1>
              <p className="text-primary-foreground/70 mt-1">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold capitalize">{user.rol}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: profile info */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-lg text-foreground mb-5">Información personal</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="text-muted-foreground" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Nombre</p>
                    <p className="text-sm font-medium text-foreground">{user.nombre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-muted-foreground" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-muted-foreground" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Miembro desde</p>
                    <p className="text-sm font-medium text-foreground">{fechaRegistro}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/perfil/editar"
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
              >
                <Edit size={16} /> Editar perfil
              </Link>
            </div>
          </div>

          {/* Right: activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial summary */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-lg text-foreground mb-5">Resumen financiero</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Ingresos", value: fmt(totalIngresos), color: "text-success" },
                  { label: "Gastos", value: fmt(totalGastos), color: "text-destructive" },
                  { label: "Balance", value: fmt(balance), color: balance >= 0 ? "text-success" : "text-destructive" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-secondary rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <Link to="/presupuesto" className="mt-4 text-sm text-accent font-semibold hover:underline flex items-center gap-1">
                <PiggyBank size={15} /> Ir a mi presupuesto
              </Link>
            </div>

            {/* Quick access */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-bold text-lg text-foreground mb-5">Accesos rápidos</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: BookOpen, label: "Módulos", to: "/modulos", bg: "bg-primary/10 text-primary" },
                  { icon: PiggyBank, label: "Presupuesto", to: "/presupuesto", bg: "bg-success/10 text-success" },
                  { icon: GraduationCap, label: "Aprendizaje", to: "/aprendizaje", bg: "bg-accent/10 text-accent" },
                ].map(({ icon: Icon, label, to, bg }) => (
                  <Link key={to} to={to} className="flex flex-col items-center gap-3 p-5 rounded-xl bg-secondary hover:bg-accent/10 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
