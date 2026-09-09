import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

const preguntas = [
  {
    pregunta: "¿Qué es el interés compuesto?",
    opciones: ["El interés que se cobra solo en el primer mes", "El interés que se calcula sobre el capital más los intereses acumulados", "Una forma de pago en cuotas sin interés", "El interés fijo que cobra el banco"],
    correcta: 1,
    explicacion: "El interés compuesto es el que se calcula sobre el capital original más los intereses ya generados. Es el motor detrás de las deudas en espiral.",
  },
  {
    pregunta: "¿Qué significa CFT en finanzas?",
    opciones: ["Comisión Fija Total", "Costo Financiero Total", "Cuota Fija de Transferencia", "Capital Fijo de Tarjeta"],
    correcta: 1,
    explicacion: "El CFT (Costo Financiero Total) incluye la tasa de interés más todos los gastos adicionales del préstamo. Es el número que realmente importa para comparar créditos.",
  },
  {
    pregunta: "Si solo pagás el mínimo de tu tarjeta cada mes, ¿qué pasa con tu deuda?",
    opciones: ["Baja gradualmente hasta cero", "Se mantiene igual", "Crece porque el interés supera el pago mínimo", "Desaparece al año"],
    correcta: 2,
    explicacion: "Con tasas del 180-200% anual, el pago mínimo solo cubre los intereses o ni eso. El capital casi no baja y la deuda puede crecer aunque pagues cada mes.",
  },
  {
    pregunta: "¿Qué es un fondo de emergencia?",
    opciones: ["Un préstamo bancario para urgencias", "Dinero guardado para imprevistos equivalente a 3-6 meses de gastos", "Una inversión en acciones de alta rentabilidad", "Un seguro médico prepago"],
    correcta: 1,
    explicacion: "El fondo de emergencia es una reserva líquida para imprevistos. Evita tener que recurrir al crédito caro ante emergencias.",
  },
  {
    pregunta: "La regla del 50/30/20 dice que debés destinar el 20% de tus ingresos a:",
    opciones: ["Entretenimiento y ocio", "Alimentación y servicios", "Ahorro y pago de deudas", "Ropa y gastos personales"],
    correcta: 2,
    explicacion: "50% para necesidades básicas, 30% para deseos y 20% para ahorro y pago de deudas. Esta regla es una guía general, no una ley universal.",
  },
  {
    pregunta: "¿Cuál de estas opciones tiene generalmente el interés más alto en Argentina?",
    opciones: ["Préstamo personal bancario", "Tarjeta de crédito con saldo impago", "Hipoteca UVA", "Plazo fijo"],
    correcta: 1,
    explicacion: "Las tarjetas de crédito en Argentina pueden cobrar tasas del 200-300% anual sobre el saldo impago, más que prácticamente cualquier otro instrumento crediticio.",
  },
  {
    pregunta: "¿Qué es un gasto hormiga?",
    opciones: ["Un gasto de gran monto que aparece una vez al año", "Pequeños gastos frecuentes que sumados representan una porción significativa del ingreso", "El pago de cuotas de deudas viejas", "Un impuesto sobre ingresos menores"],
    correcta: 1,
    explicacion: "Los gastos hormiga son pequeñas compras cotidianas (café, kiosko, delivery) que por separado parecen insignificantes pero sumadas pueden representar el 15-20% del sueldo.",
  },
  {
    pregunta: "Si una financiera te ofrece un préstamo con '5% mensual', ¿cuánto es aproximadamente en términos anuales?",
    opciones: ["60%", "5%", "79.6% (interés compuesto)", "25%"],
    correcta: 2,
    explicacion: "Una tasa mensual del 5% equivale a una TEA del 79.6% por efecto del interés compuesto ((1.05)^12 - 1). Siempre convertí a tasa anual para comparar.",
  },
  {
    pregunta: "¿Qué estrategia de pago de deudas consiste en empezar por la de mayor tasa de interés?",
    opciones: ["Bola de nieve", "El método cascada", "El alud (Debt Avalanche)", "Consolidación de deudas"],
    correcta: 2,
    explicacion: "El alud o Debt Avalanche prioriza la deuda de mayor interés. Es matemáticamente más eficiente porque reduces el costo total de la deuda.",
  },
  {
    pregunta: "¿Qué significa pagar 'el total' de tu tarjeta de crédito?",
    opciones: ["Pagar el monto mínimo más un poco extra", "Pagar el saldo completo antes de la fecha de vencimiento", "Pagar al menos el 50% del saldo", "Pagar en cuotas el saldo total"],
    correcta: 1,
    explicacion: "Pagar el total significa saldar el saldo completo antes del vencimiento. Solo así evitás pagar intereses. El pago mínimo solo evita penalidades pero genera intereses sobre el saldo restante.",
  },
  {
    pregunta: "¿Qué es la inflación y cómo afecta tus ahorros?",
    opciones: ["Es el aumento de precios que reduce el poder adquisitivo de tu dinero si no lo invertís", "Es el crecimiento del PIB que beneficia a los ahorristas", "Es el interés que cobra el banco por tener tu plata", "Es la diferencia entre el dólar oficial y el blue"],
    correcta: 0,
    explicacion: "La inflación hace que el dinero pierda poder adquisitivo con el tiempo. Si no obtenés un rendimiento mayor a la inflación, tus ahorros pierden valor real.",
  },
  {
    pregunta: "¿Cuál es el primer paso antes de empezar a invertir?",
    opciones: ["Abrir una cuenta en una plataforma de criptomonedas", "Construir un fondo de emergencia", "Comprar dólares estadounidenses", "Invertir en acciones de empresas tecnológicas"],
    correcta: 1,
    explicacion: "Sin fondo de emergencia, cualquier imprevisto te obliga a liquidar inversiones en mal momento o recurrir al crédito caro. El fondo de emergencia es el paso previo obligatorio.",
  },
  {
    pregunta: "Una deuda de $100.000 al 200% TNA, sin pagar nada durante un año, ¿cuánto sería aproximadamente?",
    opciones: ["$200.000", "$300.000", "$700.000", "$100.000"],
    correcta: 2,
    explicacion: "Con una TNA del 200%, la TEA es aproximadamente 625% (capitalización mensual). $100.000 × (1 + 6.25) = alrededor de $700.000 en un año.",
  },
  {
    pregunta: "¿Qué significa 'consolidar deudas'?",
    opciones: ["Ignorar deudas pequeñas y enfocarse en la grande", "Unificar varias deudas en una sola, idealmente a menor tasa", "Declararse en quiebra para eliminar deudas", "Pagar deudas usando ahorros de largo plazo"],
    correcta: 1,
    explicacion: "La consolidación de deudas consiste en obtener un nuevo préstamo para pagar varias deudas existentes, simplificando los pagos y potencialmente reduciendo la tasa promedio.",
  },
  {
    pregunta: "Si tu ingreso mensual es $200.000 y tus gastos son $240.000, ¿cuál es tu situación financiera?",
    opciones: ["Déficit de $40.000 — gastás más de lo que ganás", "Superávit de $40.000", "Estás en equilibrio, está bien así", "Necesitás pedir un préstamo para cubrir la diferencia"],
    correcta: 0,
    explicacion: "Tener gastos mayores a los ingresos es un déficit financiero. Cada mes acumulás deuda o consumís ahorros. Es la principal señal de alarma que requiere revisión inmediata del presupuesto.",
  },
];

function calcularNivel(puntaje: number, total: number): { nivel: string; color: string; desc: string } {
  const pct = (puntaje / total) * 100;
  if (pct >= 80) return { nivel: "Experto financiero", color: "text-success", desc: "Tenés un conocimiento sólido de finanzas personales. ¡Seguí así y ayudá a otros!" };
  if (pct >= 60) return { nivel: "En buen camino", color: "text-accent", desc: "Tenés buenas bases pero hay áreas para mejorar. Revisá los módulos de los temas donde erraste." };
  if (pct >= 40) return { nivel: "Aprendiz", color: "text-primary", desc: "Estás empezando. La buena noticia: viniste al lugar correcto. Explorá nuestros módulos y artículos." };
  return { nivel: "Principiante", color: "text-destructive", desc: "Hay mucho por aprender, pero el primer paso es saber cuánto no sabemos. Empezá por el módulo de Finanzas desde Cero." };
}

export default function Quiz() {
  const [actual, setActual] = useState(0);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(Array(preguntas.length).fill(null));
  const [terminado, setTerminado] = useState(false);
  const [mostrarExp, setMostrarExp] = useState(false);

  const pregunta = preguntas[actual];
  const respondida = respuestas[actual] !== null;

  function responder(i: number) {
    if (respondida) return;
    const newResp = [...respuestas];
    newResp[actual] = i;
    setRespuestas(newResp);
    setSeleccionada(i);
    setMostrarExp(true);
  }

  function siguiente() {
    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
      setSeleccionada(respuestas[actual + 1]);
      setMostrarExp(respuestas[actual + 1] !== null);
    } else {
      setTerminado(true);
    }
  }

  function reiniciar() {
    setActual(0);
    setSeleccionada(null);
    setRespuestas(Array(preguntas.length).fill(null));
    setTerminado(false);
    setMostrarExp(false);
  }

  const puntaje = respuestas.filter((r, i) => r === preguntas[i].correcta).length;
  const nivel = calcularNivel(puntaje, preguntas.length);

  if (terminado) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-6xl block mb-6">🎯</span>
          <h1 className="text-4xl font-bold text-foreground mb-3">Resultado del quiz</h1>
          <p className={`text-2xl font-bold ${nivel.color} mb-2`}>{nivel.nivel}</p>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{nivel.desc}</p>

          <div className="bg-card rounded-2xl p-8 border border-border mb-8">
            <p className="text-6xl font-bold text-foreground mb-2">{puntaje}<span className="text-muted-foreground text-3xl">/{preguntas.length}</span></p>
            <p className="text-muted-foreground">respuestas correctas</p>
            <div className="w-full bg-muted rounded-full h-4 mt-5">
              <div className="h-4 rounded-full bg-accent transition-all" style={{ width: `${(puntaje / preguntas.length) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-4 text-left mb-10">
            {preguntas.map((p, i) => {
              const correcto = respuestas[i] === p.correcta;
              return (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${correcto ? "bg-success/10" : "bg-destructive/10"}`}>
                  {correcto ? <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={18} /> : <XCircle className="text-destructive flex-shrink-0 mt-0.5" size={18} />}
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.pregunta}</p>
                    {!correcto && <p className="text-xs text-muted-foreground mt-1">Respuesta correcta: {p.opciones[p.correcta]}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={reiniciar} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
              <RotateCcw size={18} /> Reintentar
            </button>
            <Link to="/aprendizaje/cursos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
              Ver cursos recomendados <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aprendizaje" className="text-white/70 hover:text-white text-sm mb-4 inline-block">← Centro de Aprendizaje</Link>
          <h1 className="text-3xl font-bold mb-2">Autoevaluación Financiera</h1>
          <p className="text-white/70">Pregunta {actual + 1} de {preguntas.length}</p>
          <div className="w-full bg-white/20 rounded-full h-2.5 mt-4">
            <div className="bg-accent h-2.5 rounded-full transition-all" style={{ width: `${((actual + 1) / preguntas.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-card rounded-2xl p-8 border border-border mb-6">
          <h2 className="text-xl font-bold text-foreground mb-7">{pregunta.pregunta}</h2>
          <div className="space-y-3">
            {pregunta.opciones.map((op, i) => {
              let style = "bg-secondary border-border text-foreground hover:border-accent/60 cursor-pointer";
              if (respondida) {
                if (i === pregunta.correcta) style = "bg-success/10 border-success text-success";
                else if (i === seleccionada && i !== pregunta.correcta) style = "bg-destructive/10 border-destructive text-destructive";
                else style = "bg-secondary border-border text-muted-foreground opacity-60";
              }
              return (
                <button
                  key={i}
                  onClick={() => responder(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${style}`}
                  disabled={respondida}
                >
                  <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {op}
                </button>
              );
            })}
          </div>
        </div>

        {mostrarExp && (
          <div className={`p-5 rounded-xl border mb-6 ${seleccionada === pregunta.correcta ? "bg-success/10 border-success/40" : "bg-destructive/10 border-destructive/40"}`}>
            <div className="flex items-start gap-3">
              {seleccionada === pregunta.correcta
                ? <CheckCircle className="text-success flex-shrink-0" size={20} />
                : <XCircle className="text-destructive flex-shrink-0" size={20} />}
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">
                  {seleccionada === pregunta.correcta ? "¡Correcto!" : "Incorrecto"}
                </p>
                <p className="text-foreground/75 text-sm leading-relaxed">{pregunta.explicacion}</p>
              </div>
            </div>
          </div>
        )}

        {respondida && (
          <button
            onClick={siguiente}
            className="w-full py-3.5 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            {actual < preguntas.length - 1 ? "Siguiente pregunta" : "Ver resultado"}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
