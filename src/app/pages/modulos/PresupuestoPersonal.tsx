import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

const categories = [
  { name: "Vivienda", emoji: "🏠", pct: 30, examples: "Alquiler, expensas, servicios" },
  { name: "Alimentación", emoji: "🥗", pct: 15, examples: "Supermercado, verdulería, delivery" },
  { name: "Transporte", emoji: "🚌", pct: 10, examples: "SUBE, nafta, estacionamiento" },
  { name: "Salud", emoji: "💊", pct: 5, examples: "Obra social, farmacia, médico" },
  { name: "Educación", emoji: "📚", pct: 5, examples: "Universidad, cursos, libros" },
  { name: "Entretenimiento", emoji: "🎮", pct: 10, examples: "Salidas, streaming, hobbies" },
  { name: "Ropa y personal", emoji: "👕", pct: 5, examples: "Indumentaria, peluquería, cosmética" },
  { name: "Ahorro", emoji: "🐷", pct: 20, examples: "Fondo de emergencia, objetivos" },
];

export default function PresupuestoPersonal() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/modulos" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver a módulos
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📊</span>
            <div>
              <span className="text-white/70 text-sm font-medium">Módulo 3</span>
              <h1 className="text-3xl md:text-4xl font-bold">Presupuesto Personal</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Un presupuesto no es una cárcel financiera. Es un mapa que te muestra adónde va tu dinero y te permite decidir adónde querés que vaya.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-2xl p-8 border border-border mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">¿Qué es un presupuesto personal?</h2>
          <p className="text-foreground/75 leading-relaxed mb-4">
            Un presupuesto es simplemente un plan para tu dinero. Te dice cuánto entra, cuánto sale y hacia dónde va cada peso. Sin un presupuesto, el dinero "desaparece" sin que sepas cómo.
          </p>
          <p className="text-foreground/75 leading-relaxed">
            La mayoría de la gente cree que presupuestar es para personas con mucho dinero o para quienes son muy organizados. En realidad, es exactamente al revés: quienes menos dinero tienen, más necesitan un presupuesto.
          </p>
        </div>

        {/* Budget categories */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Distribución recomendada del ingreso</h2>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2 font-medium text-foreground text-sm">
                    <span>{cat.emoji}</span> {cat.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{cat.examples}</span>
                    <span className="font-bold text-foreground text-sm w-10 text-right">{cat.pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-accent"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            * Estos porcentajes son una guía. Ajustalos a tu situación real. Lo importante es que el 100% de tus ingresos esté asignado a alguna categoría.
          </p>
        </div>

        {/* Steps to create a budget */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cómo hacer tu primer presupuesto</h2>
          <div className="space-y-6">
            {[
              { n: "01", title: "Calculá tus ingresos netos", desc: "Sumá todo el dinero que entra al mes: sueldo, freelance, changas, etc. Usá el neto (lo que efectivamente cobras, no el bruto)." },
              { n: "02", title: "Listá tus gastos fijos", desc: "Son los que pagás igual todos los meses: alquiler, servicios, cuotas, suscripciones. Anotá el monto exacto de cada uno." },
              { n: "03", title: "Estimá tus gastos variables", desc: "Comida, transporte, salidas. Mirá tus últimos 3 extractos bancarios para tener un promedio realista." },
              { n: "04", title: "Asigná el ahorro primero", desc: "Antes de calcular lo que te queda libre, separá el porcentaje de ahorro. Si lo dejás para el final, raramente sobra." },
              { n: "05", title: "Ajustá y monitoreá", desc: "El primer mes es solo una estimación. Ajustá las categorías según lo que observés. Un presupuesto es un documento vivo." },
            ].map((step) => (
              <div key={step.n} className="flex gap-5">
                <span className="text-3xl font-bold text-accent/30 leading-none flex-shrink-0 w-10">{step.n}</span>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/presupuesto" className="flex-1 py-3.5 rounded-xl bg-accent text-white font-bold text-center hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            Ir a la herramienta de presupuesto <ArrowRight size={18} />
          </Link>
          <Link to="/modulos" className="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-center hover:bg-primary hover:text-white transition-colors">
            Ver todos los módulos
          </Link>
        </div>
      </div>
    </div>
  );
}
