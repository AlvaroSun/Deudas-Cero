import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Link } from "react-router";

const COLORS = ["#E9824A", "#9A6A58", "#7FA66B", "#D96B5F", "#C4956A", "#5C8A6B", "#B07050", "#8A9A5A"];

function fmt(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

export default function Resumen() {
  const ingresos: { id: string; monto: number; categoria: string; descripcion: string }[] =
    JSON.parse(localStorage.getItem("presupuesto_ingresos") || "[]");
  const gastos: { id: string; monto: number; categoria: string; descripcion: string }[] =
    JSON.parse(localStorage.getItem("presupuesto_gastos") || "[]");

  const totalIngresos = ingresos.reduce((s, i) => s + i.monto, 0);
  const totalGastos = gastos.reduce((s, g) => s + g.monto, 0);
  const balance = totalIngresos - totalGastos;
  const tasaAhorro = totalIngresos > 0 ? ((balance / totalIngresos) * 100).toFixed(1) : "0";

  // Group gastos by categoria
  const gastosByCategoria = gastos.reduce<Record<string, number>>((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
    return acc;
  }, {});
  const pieData = Object.entries(gastosByCategoria).map(([name, value]) => ({ name, value }));

  // Ingresos by categoria
  const ingresosByCategoria = ingresos.reduce<Record<string, number>>((acc, i) => {
    acc[i.categoria] = (acc[i.categoria] || 0) + i.monto;
    return acc;
  }, {});
  const barData = Object.entries({ ...ingresosByCategoria }).map(([name, value]) => ({ name, Ingresos: value }));

  if (totalIngresos === 0 && totalGastos === 0) {
    return (
      <div className="bg-card rounded-2xl p-12 border border-border text-center">
        <span className="text-5xl block mb-4">📊</span>
        <h2 className="text-2xl font-bold text-foreground mb-3">No hay datos para mostrar</h2>
        <p className="text-muted-foreground mb-6">Primero agregá tus ingresos y gastos para ver el resumen.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/presupuesto/ingresos" className="px-5 py-2.5 rounded-xl bg-success text-white font-semibold text-sm">Agregar ingresos</Link>
          <Link to="/presupuesto/gastos" className="px-5 py-2.5 rounded-xl bg-destructive text-white font-semibold text-sm">Agregar gastos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Ingresos totales", value: fmt(totalIngresos), color: "text-success", bg: "bg-success/10" },
          { label: "Gastos totales", value: fmt(totalGastos), color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Balance neto", value: fmt(balance), color: balance >= 0 ? "text-success" : "text-destructive", bg: balance >= 0 ? "bg-success/10" : "bg-destructive/10" },
          { label: "Tasa de ahorro", value: `${tasaAhorro}%`, color: parseFloat(tasaAhorro) >= 20 ? "text-success" : parseFloat(tasaAhorro) >= 0 ? "text-accent" : "text-destructive", bg: "bg-accent/10" },
        ].map((k) => (
          <div key={k.label} className="bg-card rounded-2xl p-5 border border-border">
            <p className="text-sm text-muted-foreground mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Advice */}
      <div className={`rounded-2xl p-5 border text-sm leading-relaxed ${
        balance >= 0 ? "bg-success/10 border-success/30 text-success" : "bg-destructive/10 border-destructive/30 text-destructive"
      }`}>
        {balance >= 0
          ? `✅ ¡Bien! Tus ingresos superan tus gastos. Estás ahorrando el ${tasaAhorro}% de tus ingresos. ${parseFloat(tasaAhorro) >= 20 ? "Excelente tasa de ahorro, seguí así." : "El objetivo recomendado es el 20%."}`
          : `⚠️ Atención: tus gastos superan tus ingresos por ${fmt(Math.abs(balance))}. Revisá tus gastos variables para encontrar áreas donde recortar.`}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {pieData.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Gastos por categoría</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {barData.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-5">Ingresos por categoría</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Bar dataKey="Ingresos" fill="#7FA66B" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Category breakdown */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-bold text-lg text-foreground mb-5">Desglose de gastos</h3>
        <div className="space-y-3">
          {pieData.sort((a,b) => b.value - a.value).map(({ name, value }, i) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground font-medium">{name}</span>
                <div className="flex gap-3 items-center">
                  <span className="text-muted-foreground text-xs">{totalGastos > 0 ? ((value / totalGastos) * 100).toFixed(1) : 0}%</span>
                  <span className="font-bold text-destructive">{fmt(value)}</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${totalGastos > 0 ? (value/totalGastos)*100 : 0}%`, backgroundColor: COLORS[i % COLORS.length] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
