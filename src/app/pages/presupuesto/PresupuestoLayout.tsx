import { Outlet, NavLink } from "react-router";
import { PlusCircle, MinusCircle, BarChart2, LayoutDashboard } from "lucide-react";

const tabs = [
  { to: "/presupuesto", label: "Inicio", icon: LayoutDashboard, end: true },
  { to: "/presupuesto/ingresos", label: "Ingresos", icon: PlusCircle },
  { to: "/presupuesto/gastos", label: "Gastos", icon: MinusCircle },
  { to: "/presupuesto/resumen", label: "Resumen", icon: BarChart2 },
];

export default function PresupuestoLayout() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Herramienta de Presupuesto</h1>
          <p className="text-primary-foreground/75 mt-1">Controlá tus ingresos, gastos y visualizá tu situación financiera</p>
        </div>
      </div>
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <Icon size={17} /> {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </div>
    </div>
  );
}
