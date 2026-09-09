import { Link } from "react-router";
import { ChevronRight, Clock, BookOpen } from "lucide-react";

const modules = [
  {
    icon: "💳",
    title: "Crédito y Endeudamiento",
    desc: "Aprendé cómo funciona el sistema de crédito, qué son los intereses, cómo evitar deudas tóxicas y cómo salir de ellas si ya estás atrapado.",
    to: "/modulos/credito",
    topics: ["Qué es el crédito", "Tipos de interés", "Tarjetas de crédito", "Cómo salir de deudas"],
    duration: "45 min",
    level: "Básico",
    color: "bg-accent",
    badge: "Más popular",
  },
  {
    icon: "👨‍🎓",
    title: "Cultura del Ahorro",
    desc: "Descubrí por qué ahorrar no es solo guardar dinero, sino construir una mentalidad. Métodos probados para empezar a ahorrar desde hoy.",
    to: "/modulos/ahorro",
    topics: ["Por qué ahorrar", "Regla del 50/30/20", "Fondo de emergencia", "Ahorro automático"],
    duration: "35 min",
    level: "Básico",
    color: "bg-success",
    badge: null,
  },
  {
    icon: "📊",
    title: "Presupuesto Personal",
    desc: "Domina el arte de presupuestar tus ingresos y gastos para que nunca más te preguntes adónde fue tu sueldo.",
    to: "/modulos/presupuesto-personal",
    topics: ["Qué es un presupuesto", "Ingresos vs gastos", "Gastos fijos y variables", "Planificación mensual"],
    duration: "40 min",
    level: "Básico",
    color: "bg-primary",
    badge: null,
  },
];

export default function ModulosIndex() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Módulos de Aprendizaje</h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl">
            Tres módulos diseñados especialmente para jóvenes. Sin tecnicismos, con ejemplos reales y herramientas prácticas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((m) => (
            <div key={m.to} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {m.badge && (
                <div className="bg-accent text-white text-xs font-bold px-3 py-1 text-center">{m.badge}</div>
              )}
              <div className={`${m.color} p-8 text-white`}>
                <span className="text-5xl">{m.icon}</span>
                <h2 className="text-xl font-bold mt-4">{m.title}</h2>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{m.desc}</p>
                <div className="flex gap-4 mb-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={13} /> {m.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={13} /> {m.level}</span>
                </div>
                <div className="space-y-2 mb-8 flex-1">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Temas incluidos:</p>
                  {m.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <Link
                  to={m.to}
                  className="flex items-center justify-between px-5 py-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-colors font-semibold text-sm text-primary group"
                >
                  Ir al módulo
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-secondary rounded-2xl p-8 md:p-12 border border-border text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">¿Querés poner en práctica lo aprendido?</h3>
          <p className="text-muted-foreground mb-6">Usá nuestra herramienta de presupuesto para aplicar todo lo que estudiaste en los módulos.</p>
          <Link to="/presupuesto" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
            Crear mi presupuesto <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
