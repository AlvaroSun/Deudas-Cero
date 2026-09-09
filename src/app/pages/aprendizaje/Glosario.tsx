import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";

const terminos = [
  { letra: "A", termino: "Ahorro automático", def: "Práctica de transferir automáticamente una parte del ingreso a una cuenta de ahorro el día que se cobra, antes de gastar.", categoria: "Ahorro" },
  { letra: "A", termino: "Aval", def: "Persona o bien que garantiza una deuda ante el acreedor si el deudor no puede pagar.", categoria: "Crédito" },
  { letra: "B", termino: "Bola de nieve (Debt Snowball)", def: "Estrategia de pago de deudas que consiste en saldar primero la de menor saldo para ganar momentum psicológico.", categoria: "Deudas" },
  { letra: "C", termino: "CFT (Costo Financiero Total)", def: "Indicador que incluye todos los costos de un crédito: tasa de interés, comisiones, seguros y gastos administrativos. Es el número real para comparar créditos.", categoria: "Crédito" },
  { letra: "C", termino: "Capitalización", def: "Proceso por el cual los intereses generados se suman al capital y pasan a generar intereses también. Base del interés compuesto.", categoria: "Finanzas" },
  { letra: "C", termino: "Caja de ahorro", def: "Cuenta bancaria que permite depositar y extraer dinero libremente. Suele ofrecer rendimiento bajo o nulo.", categoria: "Banca" },
  { letra: "C", termino: "Cuenta corriente", def: "Cuenta bancaria que permite operar con cheques y suele tener sobregiro disponible. Generalmente no genera intereses.", categoria: "Banca" },
  { letra: "C", termino: "Consolidación de deudas", def: "Operación financiera que unifica varias deudas en una sola, idealmente con mejor tasa de interés.", categoria: "Deudas" },
  { letra: "D", termino: "Déficit financiero", def: "Situación en la que los gastos superan a los ingresos. Implica acumulación de deuda o consumo de ahorros.", categoria: "Finanzas" },
  { letra: "D", termino: "Deuda buena", def: "Deuda que se toma para financiar activos que generan valor o ingresos (educación, negocio, vivienda propia). Concepto relativo y contextual.", categoria: "Deudas" },
  { letra: "D", termino: "Deuda mala", def: "Deuda que se toma para financiar consumo inmediato (vacaciones, ropa, electrónica) sin generación de valor futuro.", categoria: "Deudas" },
  { letra: "D", termino: "Débito automático", def: "Sistema por el cual se descuenta automáticamente de una cuenta bancaria el pago de servicios o cuotas.", categoria: "Banca" },
  { letra: "E", termino: "Extracto bancario", def: "Documento que detalla todos los movimientos (ingresos y egresos) de una cuenta bancaria durante un período.", categoria: "Banca" },
  { letra: "F", termino: "Flujo de caja (Cash Flow)", def: "Diferencia entre el dinero que entra y el que sale durante un período. Positivo si entra más de lo que sale.", categoria: "Finanzas" },
  { letra: "F", termino: "Fondo común de inversión (FCI)", def: "Instrumento que reúne el capital de muchos inversores para invertirlo en una cartera diversificada. Accesible desde montos bajos.", categoria: "Inversión" },
  { letra: "F", termino: "Fondo de emergencia", def: "Reserva equivalente a 3-6 meses de gastos básicos, guardada en un instrumento líquido y seguro para cubrir imprevistos.", categoria: "Ahorro" },
  { letra: "G", termino: "Gasto fijo", def: "Gasto que se repite cada mes con el mismo monto: alquiler, cuotas de créditos, suscripciones.", categoria: "Presupuesto" },
  { letra: "G", termino: "Gasto hormiga", def: "Pequeñas compras cotidianas y frecuentes que sumadas representan un monto significativo del ingreso.", categoria: "Presupuesto" },
  { letra: "G", termino: "Gasto variable", def: "Gasto que cambia de monto mes a mes: alimentación, transporte, entretenimiento.", categoria: "Presupuesto" },
  { letra: "I", termino: "Inflación", def: "Aumento generalizado y sostenido del nivel de precios, que reduce el poder adquisitivo del dinero.", categoria: "Macroeconomía" },
  { letra: "I", termino: "Interés compuesto", def: "Interés que se calcula sobre el capital más los intereses acumulados anteriormente. Crece exponencialmente con el tiempo.", categoria: "Crédito" },
  { letra: "I", termino: "Interés simple", def: "Interés que se calcula solo sobre el capital original, sin capitalizar. Crece linealmente.", categoria: "Crédito" },
  { letra: "L", termino: "Liquidez", def: "Facilidad con la que un activo puede convertirse en dinero efectivo sin pérdida significativa de valor.", categoria: "Finanzas" },
  { letra: "M", termino: "Mora", def: "Situación de incumplimiento en el pago de una deuda pasada la fecha de vencimiento. Genera intereses adicionales y penalidades.", categoria: "Crédito" },
  { letra: "P", termino: "Patrimonio neto", def: "Diferencia entre el total de activos (lo que se tiene) y el total de pasivos (lo que se debe). Mide la riqueza real.", categoria: "Finanzas" },
  { letra: "P", termino: "Plazo fijo", def: "Instrumento bancario que inmoviliza el dinero durante un plazo determinado a cambio de un rendimiento preestablecido.", categoria: "Inversión" },
  { letra: "P", termino: "Plazo fijo UVA", def: "Plazo fijo que ajusta el capital por inflación (medida por la Unidad de Valor Adquisitivo) más un interés adicional.", categoria: "Inversión" },
  { letra: "P", termino: "Presupuesto personal", def: "Plan financiero que asigna los ingresos esperados a categorías de gastos y ahorro para un período determinado.", categoria: "Presupuesto" },
  { letra: "P", termino: "Pago mínimo", def: "Monto mínimo que acepta el banco como pago mensual de la tarjeta. Pagar solo el mínimo genera intereses sobre el saldo restante.", categoria: "Crédito" },
  { letra: "R", termino: "Refinanciación", def: "Proceso de reemplazar una deuda existente por una nueva con condiciones distintas, generalmente mejores (menor tasa o más plazo).", categoria: "Deudas" },
  { letra: "S", termino: "Score crediticio", def: "Puntuación que evalúa el historial de pagos de una persona. Determina si los bancos otorgan crédito y a qué tasa.", categoria: "Crédito" },
  { letra: "S", termino: "Superávit financiero", def: "Situación en la que los ingresos superan a los gastos. Permite ahorrar e invertir.", categoria: "Finanzas" },
  { letra: "T", termino: "TEA (Tasa Efectiva Anual)", def: "Tasa de interés anual que incluye el efecto de la capitalización. Refleja el costo real del dinero.", categoria: "Crédito" },
  { letra: "T", termino: "TNA (Tasa Nominal Anual)", def: "Tasa de interés anual declarada sin considerar la capitalización. Siempre inferior a la TEA real.", categoria: "Crédito" },
  { letra: "T", termino: "Tasa de ahorro", def: "Porcentaje del ingreso que se ahorra. Se calcula como (Ahorro / Ingreso) × 100. El objetivo recomendado es el 20%.", categoria: "Ahorro" },
];

const categorias = ["Todos", "Crédito", "Ahorro", "Deudas", "Presupuesto", "Inversión", "Banca", "Finanzas"];
const letras = [...new Set(terminos.map((t) => t.letra))].sort();

export default function Glosario() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [filtroLetra, setFiltroLetra] = useState("");

  const filtrados = terminos.filter((t) => {
    const matchBusqueda = t.termino.toLowerCase().includes(busqueda.toLowerCase()) || t.def.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = filtroCategoria === "Todos" || t.categoria === filtroCategoria;
    const matchLetra = !filtroLetra || t.letra === filtroLetra;
    return matchBusqueda && matchCategoria && matchLetra;
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/aprendizaje" className="text-white/70 hover:text-white text-sm mb-4 inline-block">← Centro de Aprendizaje</Link>
          <h1 className="text-4xl font-bold mb-3">Glosario Financiero</h1>
          <p className="text-white/75 text-lg">Todos los términos financieros explicados en lenguaje simple</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar término..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => { setFiltroCategoria(c); setFiltroLetra(""); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filtroCategoria === c && !filtroLetra ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-primary/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Alphabet filter */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {letras.map((l) => (
            <button
              key={l}
              onClick={() => { setFiltroLetra(filtroLetra === l ? "" : l); setFiltroCategoria("Todos"); }}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                filtroLetra === l ? "bg-accent text-white" : "bg-secondary text-foreground hover:bg-accent/10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtrados.length} término{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}</p>

        {/* Terms */}
        <div className="space-y-3">
          {filtrados.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-foreground">{t.termino}</span>
                    <span className="text-xs bg-secondary px-2.5 py-0.5 rounded-full text-muted-foreground">{t.categoria}</span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{t.def}</p>
                </div>
                <span className="text-2xl font-bold text-accent/20 flex-shrink-0">{t.letra}</span>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <span className="text-4xl block mb-3">🔍</span>
              <p>No encontramos términos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
