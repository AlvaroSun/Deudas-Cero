import { Link } from "react-router";
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from "lucide-react";

function getPresupuestoData() {
  const ingresos: { id: string; descripcion: string; monto: number; categoria: string; fecha: string }[] =
    JSON.parse(localStorage.getItem("presupuesto_ingresos") || "[]");
  const gastos: { id: string; descripcion: string; monto: number; categoria: string; fecha: string }[] =
    JSON.parse(localStorage.getItem("presupuesto_gastos") || "[]");
  const totalIngresos = ingresos.reduce((s, i) => s + i.monto, 0);
  const totalGastos = gastos.reduce((s, g) => s + g.monto, 0);
  return { ingresos, gastos, totalIngresos, totalGastos, balance: totalIngresos - totalGastos };
}

export default function PresupuestoIndex() {
  const { totalIngresos, totalGastos, balance, ingresos, gastos } = getPresupuestoData();

  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Ingresos del mes", value: fmt(totalIngresos), icon: TrendingUp, color: "text-success", bg: "bg-success/10", count: ingresos.length },
          { label: "Gastos del mes", value: fmt(totalGastos), icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10", count: gastos.length },
          {
            label: "Balance",
            value: fmt(balance),
            icon: Wallet,
            color: balance >= 0 ? "text-success" : "text-destructive",
            bg: balance >= 0 ? "bg-success/10" : "bg-destructive/10",
            count: null,
          },
        ].map((card) => (
          <div key={card.label} className="bg-card rounded-2xl p-6 border border-border">
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
              <card.icon className={card.color} size={20} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            {card.count !== null && <p className="text-xs text-muted-foreground mt-1">{card.count} registro{card.count !== 1 ? "s" : ""}</p>}
          </div>
        ))}
      </div>

      {totalIngresos === 0 && totalGastos === 0 ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center">
          <span className="text-6xl mb-4 block">📋</span>
          <h2 className="text-2xl font-bold text-foreground mb-3">Comenzá tu presupuesto</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Todavía no tenés registros. Empezá agregando tus ingresos y luego tus gastos del mes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/presupuesto/ingresos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-success text-white font-semibold hover:bg-success/90 transition-colors">
              Agregar ingreso <ArrowRight size={18} />
            </Link>
            <Link to="/presupuesto/gastos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive text-white font-semibold hover:bg-destructive/90 transition-colors">
              Agregar gasto <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-4">Últimos ingresos</h3>
            {ingresos.slice(-4).reverse().map((i) => (
              <div key={i.id} className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm text-foreground">{i.descripcion}</p>
                  <p className="text-xs text-muted-foreground">{i.categoria} · {new Date(i.fecha).toLocaleDateString("es-AR")}</p>
                </div>
                <span className="font-bold text-success text-sm">+{fmt(i.monto)}</span>
              </div>
            ))}
            <Link to="/presupuesto/ingresos" className="mt-4 text-sm text-accent font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-bold text-lg text-foreground mb-4">Últimos gastos</h3>
            {gastos.slice(-4).reverse().map((g) => (
              <div key={g.id} className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm text-foreground">{g.descripcion}</p>
                  <p className="text-xs text-muted-foreground">{g.categoria} · {new Date(g.fecha).toLocaleDateString("es-AR")}</p>
                </div>
                <span className="font-bold text-destructive text-sm">-{fmt(g.monto)}</span>
              </div>
            ))}
            <Link to="/presupuesto/gastos" className="mt-4 text-sm text-accent font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="md:col-span-2">
            <Link to="/presupuesto/resumen" className="flex items-center justify-between p-6 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors">
              <div>
                <p className="font-bold text-lg">Ver resumen completo</p>
                <p className="text-primary-foreground/70 text-sm mt-0.5">Gráficos y análisis de tus finanzas del mes</p>
              </div>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
