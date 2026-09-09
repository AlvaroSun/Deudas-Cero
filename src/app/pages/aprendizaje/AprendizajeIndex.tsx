import { Link } from "react-router";
import { FileText, BookOpen, HelpCircle, BookMarked, ArrowRight } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Artículos",
    desc: "Lecturas cortas sobre finanzas personales, deudas, ahorro e inversión. Escritas para que cualquier persona las entienda.",
    to: "/aprendizaje/articulos",
    count: "12 artículos",
    color: "bg-accent",
  },
  {
    icon: BookOpen,
    title: "Cursos",
    desc: "Contenido estructurado para aprender paso a paso. Desde los conceptos más básicos hasta estrategias avanzadas.",
    to: "/aprendizaje/cursos",
    count: "4 cursos",
    color: "bg-primary",
  },
  {
    icon: HelpCircle,
    title: "Autoevaluación",
    desc: "¿Cuánto sabés de finanzas personales? Medí tu nivel con nuestro quiz y descubrí en qué áreas mejorar.",
    to: "/aprendizaje/quiz",
    count: "15 preguntas",
    color: "bg-success",
  },
  {
    icon: BookMarked,
    title: "Glosario Financiero",
    desc: "Todos los términos financieros explicados en lenguaje simple. TNA, TEA, CFT, interés compuesto y mucho más.",
    to: "/aprendizaje/glosario",
    count: "40+ términos",
    color: "bg-destructive",
  },
];

export default function AprendizajeIndex() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Centro de Aprendizaje</h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl">
            Todo lo que necesitás saber sobre finanzas personales, deudas y ahorro. Gratis, en español, sin letra chica.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {sections.map(({ icon: Icon, title, desc, to, count, color }) => (
            <Link key={to} to={to} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex">
              <div className={`${color} w-2 flex-shrink-0`} />
              <div className="p-8 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${color}/10 flex items-center justify-center`}>
                    <Icon className={`${color.replace("bg-", "text-")}`} size={24} />
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">{count}</span>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                  Explorar <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">¿Por dónde empezar?</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Si es tu primera vez, te recomendamos hacer el quiz de autoevaluación primero para saber en qué nivel estás.
          </p>
          <Link to="/aprendizaje/quiz" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-accent font-bold hover:bg-white/90 transition-colors">
            Hacer el quiz ahora <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
