import { Link } from "react-router";
import { Clock, BookOpen, Users, ArrowRight } from "lucide-react";

export const cursos = [
  {
    id: "1",
    titulo: "Finanzas Personales desde Cero",
    descripcion: "El curso completo para jóvenes que nunca aprendieron sobre dinero. Desde qué es un presupuesto hasta cómo construir patrimonio.",
    duracion: "3 horas",
    lecciones: 12,
    nivel: "Básico",
    estudiantes: "2.4k",
    imagen: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&h=380&fit=crop&auto=format",
    color: "bg-accent",
    temas: ["Presupuesto personal", "Ahorro automático", "Fondo de emergencia", "Principios de inversión"],
  },
  {
    id: "2",
    titulo: "Salí de las Deudas para Siempre",
    descripcion: "Un programa paso a paso para entender, organizar y eliminar tus deudas. Incluye plantillas, estrategias y plan de acción personalizado.",
    duracion: "2.5 horas",
    lecciones: 9,
    nivel: "Básico",
    estudiantes: "1.8k",
    imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&h=380&fit=crop&auto=format",
    color: "bg-destructive",
    temas: ["Tipos de deuda", "Interés compuesto", "Estrategia bola de nieve", "Negociación con bancos"],
  },
  {
    id: "3",
    titulo: "Cómo Sobrevivir la Inflación",
    descripcion: "Estrategias concretas para proteger tu dinero de la inflación en Argentina. Instrumentos accesibles y cómo elegirlos.",
    duracion: "2 horas",
    lecciones: 8,
    nivel: "Intermedio",
    estudiantes: "3.1k",
    imagen: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=380&fit=crop&auto=format",
    color: "bg-primary",
    temas: ["Plazo fijo UVA", "Fondos comunes", "Dólar ahorro", "Activos reales"],
  },
  {
    id: "4",
    titulo: "Tu Primer Mes con Presupuesto",
    descripcion: "Un reto de 30 días para instalar el hábito del presupuesto. Con tareas diarias, registro de gastos y reflexiones guiadas.",
    duracion: "1.5 horas",
    lecciones: 6,
    nivel: "Básico",
    estudiantes: "1.2k",
    imagen: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=700&h=380&fit=crop&auto=format",
    color: "bg-success",
    temas: ["Registro de gastos", "Categorías personales", "Análisis mensual", "Ajuste y mejora"],
  },
];

export default function CursosList() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aprendizaje" className="text-white/70 hover:text-white text-sm mb-4 inline-block">← Centro de Aprendizaje</Link>
          <h1 className="text-4xl font-bold mb-3">Cursos</h1>
          <p className="text-white/75 text-lg">Aprendizaje estructurado para transformar tu relación con el dinero</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 gap-8">
          {cursos.map((c) => (
            <Link key={c.id} to={`/aprendizaje/cursos/${c.id}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-52 bg-muted overflow-hidden relative">
                <img src={c.imagen} alt={c.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute top-4 left-4 ${c.color} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>{c.nivel}</div>
              </div>
              <div className="p-7">
                <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors">{c.titulo}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.descripcion}</p>
                <div className="flex items-center gap-5 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {c.duracion}</span>
                  <span className="flex items-center gap-1.5"><BookOpen size={13} /> {c.lecciones} lecciones</span>
                  <span className="flex items-center gap-1.5"><Users size={13} /> {c.estudiantes} estudiantes</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {c.temas.map((t) => (
                    <span key={t} className="text-xs bg-secondary px-3 py-1 rounded-full text-foreground/70">{t}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                  Empezar curso <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
