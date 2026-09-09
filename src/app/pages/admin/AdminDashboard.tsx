import { useAuth } from "../../context/AuthContext";
import { Users, BookOpen, PiggyBank, TrendingUp, BarChart2, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const actividadMensual = [
  { mes: "Ago", usuarios: 820, sesiones: 2400 },
  { mes: "Sep", usuarios: 950, sesiones: 2900 },
  { mes: "Oct", usuarios: 1100, sesiones: 3200 },
  { mes: "Nov", usuarios: 1350, sesiones: 3900 },
  { mes: "Dic", usuarios: 1600, sesiones: 4700 },
  { mes: "Ene", usuarios: 2100, sesiones: 6100 },
  { mes: "Feb", usuarios: 2800, sesiones: 8200 },
];

const paginasPopulares = [
  { pagina: "Quiz Financiero", visitas: 4821, porcentaje: 92 },
  { pagina: "Módulo: Crédito", visitas: 3940, porcentaje: 75 },
  { pagina: "Glosario", visitas: 3210, porcentaje: 61 },
  { pagina: "Herramienta Presupuesto", visitas: 2780, porcentaje: 53 },
  { pagina: "Artículos", visitas: 2430, porcentaje: 46 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  const usuarios: Array<{ nombre: string; email: string; fechaRegistro: string }> = JSON.parse(
    localStorage.getItem("finanzas_users") || "[]"
  );

  const kpis = [
    { label: "Usuarios registrados", value: usuarios.length + 2481, icon: Users, color: "bg-primary/10 text-primary", trend: "+12%" },
    { label: "Módulos completados", value: "8.420", icon: BookOpen, color: "bg-accent/10 text-accent", trend: "+8%" },
    { label: "Presupuestos creados", value: "3.190", icon: PiggyBank, color: "bg-success/10 text-success", trend: "+15%" },
    { label: "Quiz completados", value: "4.821", icon: BarChart2, color: "bg-destructive/10 text-destructive", trend: "+23%" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel de Administración</h1>
              <p className="text-primary-foreground/70 mt-1">Bienvenido, {user?.nombre}</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold">Administrador</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map(({ label, value, icon: Icon, color, trend }) => (
            <div key={label} className="bg-card rounded-2xl p-6 border border-border">
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={22} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-success mt-1 flex items-center gap-1"><TrendingUp size={12} /> {trend} este mes</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Usuarios nuevos por mes</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={actividadMensual}>
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="usuarios" fill="#9A6A58" radius={[6,6,0,0]} name="Usuarios" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Sesiones mensuales</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={actividadMensual}>
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sesiones" stroke="#E9824A" strokeWidth={3} dot={{ fill: "#E9824A", r: 4 }} name="Sesiones" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Popular pages */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="text-accent" size={20} />
              <h3 className="font-bold text-lg text-foreground">Páginas más visitadas</h3>
            </div>
            <div className="space-y-4">
              {paginasPopulares.map((p) => (
                <div key={p.pagina}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-foreground">{p.pagina}</span>
                    <span className="text-muted-foreground">{p.visitas.toLocaleString()} visitas</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full bg-accent" style={{ width: `${p.porcentaje}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered users */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-5">
              <Users className="text-primary" size={20} />
              <h3 className="font-bold text-lg text-foreground">Usuarios registrados</h3>
            </div>
            {usuarios.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay usuarios registrados aún (aparte del admin).</p>
            ) : (
              <div className="space-y-3">
                {usuarios.slice(0, 6).map((u, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {u.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{u.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(u.fechaRegistro).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
