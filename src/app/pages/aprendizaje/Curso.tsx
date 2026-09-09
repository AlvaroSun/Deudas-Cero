import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, CheckCircle, Circle, Clock, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { cursos } from "./CursosList";

const lecciones: Record<string, { titulo: string; duracion: string; contenido: string }[]> = {
  "1": [
    { titulo: "¿Por qué las finanzas personales importan más que nunca?", duracion: "15 min", contenido: "En esta lección exploramos por qué la educación financiera es urgente para los jóvenes latinoamericanos y cuáles son las consecuencias de no tenerla." },
    { titulo: "Tu primer presupuesto en 30 minutos", duracion: "20 min", contenido: "Paso a paso para crear tu primer presupuesto personal usando papel, Excel o nuestra herramienta digital." },
    { titulo: "La regla del 50/30/20 adaptada a Argentina", duracion: "18 min", contenido: "La famosa regla americana adaptada a la realidad del costo de vida argentino, donde el alquiler suele superar el 30% del ingreso." },
    { titulo: "Ahorro automático: el truco que funciona aunque seas desorganizado", duracion: "12 min", contenido: "Cómo configurar transferencias automáticas para que el ahorro suceda sin que tengas que pensarlo." },
    { titulo: "Fondo de emergencia: tu escudo financiero", duracion: "15 min", contenido: "Qué es, para qué sirve y cómo construirlo aunque estés ajustado." },
    { titulo: "Gastos fijos vs variables: conocé a tus enemigos", duracion: "14 min", contenido: "Diferencias entre gastos fijos y variables, y estrategias para reducir cada tipo." },
  ],
  "2": [
    { titulo: "El mapa de tus deudas: primer paso para salir", duracion: "20 min", contenido: "Cómo hacer un inventario completo de tus deudas: quién, cuánto, a qué tasa, qué cuotas." },
    { titulo: "El interés compuesto trabajando en tu contra", duracion: "18 min", contenido: "Cómo calcular cuánto pagarás realmente si continuás con el esquema actual de pagos mínimos." },
    { titulo: "Estrategia bola de nieve vs alud: cuál elegir", duracion: "16 min", contenido: "Las dos estrategias más efectivas para pagar deudas y cómo elegir la que mejor se adapta a tu perfil." },
    { titulo: "Cómo negociar con un banco", duracion: "22 min", contenido: "Guión real para pedir una quita de deuda o una refinanciación más favorable. Qué decir y qué no decir." },
    { titulo: "Evitando que las deudas vuelvan", duracion: "15 min", contenido: "Cambios de hábito y sistemas de control para no volver a caer en el ciclo de deudas." },
  ],
  "3": [
    { titulo: "Qué es la inflación y cómo te afecta concretamente", duracion: "15 min", contenido: "Más allá del número del INDEC: cómo calcular tu inflación personal y cuánto perdés por mes si no actuás." },
    { titulo: "Plazo fijo UVA: pros y contras", duracion: "18 min", contenido: "El instrumento bancario más accesible para cubrirse de la inflación y sus limitaciones." },
    { titulo: "Fondos comunes de inversión: la opción del pequeño inversor", duracion: "20 min", contenido: "Cómo funcionan, cómo suscribirse desde el homebanking y qué rendimiento esperar." },
    { titulo: "Dólar ahorro y MEP: cuándo tiene sentido", duracion: "22 min", contenido: "Las opciones cambiarias disponibles para el público general y en qué contexto conviene cada una." },
  ],
  "4": [
    { titulo: "Semana 1: Instalá el hábito de registrar", duracion: "15 min", contenido: "Cómo registrar cada gasto durante 7 días sin volverse loco." },
    { titulo: "Semana 2: Analizá tus patrones", duracion: "18 min", contenido: "Qué buscar en tus datos: patrones de gasto, sorpresas y oportunidades." },
    { titulo: "Semana 3: Empezá a recortar", duracion: "15 min", contenido: "Identificá los gastos de bajo valor percibido y eliminá los innecesarios." },
    { titulo: "Semana 4: Planificá el próximo mes", duracion: "20 min", contenido: "Cómo usar lo aprendido para crear un presupuesto proactivo para el mes siguiente." },
  ],
};

export default function Curso() {
  const { id } = useParams<{ id: string }>();
  const curso = cursos.find((c) => c.id === id);
  const lessons = id ? (lecciones[id] || []) : [];
  const [completadas, setCompletadas] = useState<Set<number>>(new Set());
  const [abierta, setAbierta] = useState<number | null>(0);

  if (!curso) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Curso no encontrado</h1>
        <Link to="/aprendizaje/cursos" className="text-accent underline">Volver a cursos</Link>
      </div>
    );
  }

  function toggleCompleta(i: number) {
    setCompletadas((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const progreso = lessons.length > 0 ? Math.round((completadas.size / lessons.length) * 100) : 0;

  return (
    <div className="bg-background min-h-screen">
      <div className={`${curso.color} text-white py-10`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aprendizaje/cursos" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={16} /> Volver a cursos
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{curso.titulo}</h1>
          <p className="text-white/80 max-w-2xl mb-5">{curso.descripcion}</p>
          <div className="flex flex-wrap gap-5 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {curso.duracion}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={15} /> {curso.lecciones} lecciones</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-bold text-xl text-foreground mb-5">Contenido del curso</h2>
            {lessons.map((l, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setAbierta(abierta === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompleta(i); }}
                    className="flex-shrink-0"
                  >
                    {completadas.has(i)
                      ? <CheckCircle size={22} className="text-success" />
                      : <Circle size={22} className="text-muted-foreground hover:text-accent transition-colors" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${completadas.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>{l.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{l.duracion}</p>
                  </div>
                  {abierta === i ? <ChevronUp size={18} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />}
                </button>
                {abierta === i && (
                  <div className="px-5 pb-5 border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{l.contenido}</p>
                    <button
                      onClick={() => toggleCompleta(i)}
                      className={`mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        completadas.has(i)
                          ? "bg-muted text-muted-foreground"
                          : "bg-success text-white hover:bg-success/90"
                      }`}
                    >
                      {completadas.has(i) ? "Marcar como no completada" : "Marcar como completada"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <p className="font-bold text-foreground mb-3">Tu progreso</p>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{completadas.size} de {lessons.length} lecciones</span>
                <span className="font-bold text-accent">{progreso}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 mb-5">
                <div
                  className="h-3 rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              {progreso === 100 ? (
                <div className="text-center p-4 bg-success/10 rounded-xl">
                  <p className="text-success font-bold">🎉 ¡Curso completado!</p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const next = lessons.findIndex((_, i) => !completadas.has(i));
                    if (next !== -1) setAbierta(next);
                  }}
                  className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors text-sm"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
