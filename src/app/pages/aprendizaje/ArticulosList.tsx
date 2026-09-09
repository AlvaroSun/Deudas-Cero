import { Link } from "react-router";
import { Clock, ArrowRight } from "lucide-react";

export const articulos = [
  { id: "1", titulo: "El interés compuesto: el arma de doble filo que puede destruirte o hacerte rico", categoria: "Crédito", tiempo: "6 min", extracto: "Cuando se trabaja en tu contra, puede convertir una deuda pequeña en un problema enorme. Cuando trabaja para vos, puede multiplicar tus ahorros sin que hagas nada.", imagen: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=300&fit=crop&auto=format" },
  { id: "2", titulo: "Por qué el 68% de los jóvenes argentinos no tiene ahorros y qué podés hacer al respecto", categoria: "Ahorro", tiempo: "5 min", extracto: "Los datos son alarmantes pero no sorprenden. La inflación, los salarios bajos y la falta de educación financiera crean una tormenta perfecta para el déficit de ahorro juvenil.", imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop&auto=format" },
  { id: "3", titulo: "Cuotas sin interés: el gran engaño que te cuesta más de lo que creés", categoria: "Crédito", tiempo: "4 min", extracto: "\"12 cuotas sin interés\" suena increíble. Pero alguien paga ese interés, y ese alguien podría ser vos sin saberlo. Te explicamos el mecanismo detrás de la zanahoria.", imagen: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format" },
  { id: "4", titulo: "Cómo salir de una deuda de tarjeta de crédito (sin esquemas milagrosos)", categoria: "Deudas", tiempo: "8 min", extracto: "Dos estrategias probadas: la bola de nieve y el alud. Una te da motivación psicológica, la otra te ahorra más dinero. Cuál elegir depende de tu perfil.", imagen: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop&auto=format" },
  { id: "5", titulo: "Fondo de emergencia: por qué es más urgente que cualquier inversión", categoria: "Ahorro", tiempo: "5 min", extracto: "Antes de invertir en criptomonedas, plazo fijo o acciones, necesitás este colchón financiero. No es sexy, pero es lo que evita que una emergencia destruya años de trabajo.", imagen: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=600&h=300&fit=crop&auto=format" },
  { id: "6", titulo: "El sueldo mínimo y el presupuesto: cómo vivir dignamente con poco", categoria: "Presupuesto", tiempo: "7 min", extracto: "No es un artículo de optimismo vacío. Es un análisis real de cómo priorizar gastos cuando los ingresos son ajustados y la inflación no para.", imagen: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=300&fit=crop&auto=format" },
  { id: "7", titulo: "Préstamos personales vs tarjeta de crédito: cuándo conviene cada uno", categoria: "Crédito", tiempo: "5 min", extracto: "Ambos son formas de crédito pero con lógicas muy distintas. Elegir el equivocado puede costarte entre un 30% y un 200% más de lo que necesitás pagar.", imagen: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&auto=format" },
  { id: "8", titulo: "Gastos hormiga: los pequeños ladrones que vacían tu billetera", categoria: "Presupuesto", tiempo: "4 min", extracto: "El café, el kiosko, el delivery. Por separado, nada. Juntos, pueden ser el 15-20% de tus ingresos. Un experimento de 30 días para descubrirlos.", imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format" },
];

const categorias = ["Todos", "Crédito", "Ahorro", "Deudas", "Presupuesto"];

import { useState } from "react";

export default function ArticulosList() {
  const [filtro, setFiltro] = useState("Todos");
  const filtered = filtro === "Todos" ? articulos : articulos.filter((a) => a.categoria === filtro);

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-accent text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aprendizaje" className="text-white/70 hover:text-white text-sm mb-4 inline-block">← Centro de Aprendizaje</Link>
          <h1 className="text-4xl font-bold mb-3">Artículos</h1>
          <p className="text-white/75 text-lg">Lecturas cortas sobre finanzas personales para jóvenes de LATAM</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filtro === c ? "bg-accent text-white" : "bg-secondary text-foreground hover:bg-accent/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((a) => (
            <Link key={a.id} to={`/aprendizaje/articulos/${a.id}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-44 bg-muted overflow-hidden">
                <img src={a.imagen} alt={a.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent">{a.categoria}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {a.tiempo}</span>
                </div>
                <h3 className="font-bold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">{a.titulo}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{a.extracto}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                  Leer más <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
