import { Link } from "react-router";
import { ArrowLeft, AlertCircle, CheckCircle, TrendingDown, CreditCard } from "lucide-react";

const sections = [
  {
    id: "credito",
    title: "¿Qué es el crédito?",
    content: `El crédito es dinero que alguien (un banco, una financiera o una persona) te presta con la condición de que lo devuelvas en un plazo determinado, más un costo adicional llamado interés. En términos simples: te dan plata hoy y vos pagás más plata después.

El crédito en sí mismo no es malo. Bien usado, permite comprar cosas que necesitás ahora y pagar con el tiempo. El problema aparece cuando el costo del crédito es muy alto o cuando lo usás para cosas que no podés pagar.`,
  },
  {
    id: "tipos-interes",
    title: "Tipos de interés: TNA, TEA y CFT",
    content: `Antes de pedir cualquier préstamo, tenés que entender estos tres conceptos:

**TNA (Tasa Nominal Anual):** Es el interés anual sin contar la capitalización. Es el número que aparece grande en la publicidad. Pero no te dice todo.

**TEA (Tasa Efectiva Anual):** Incluye la capitalización (el interés sobre el interés). Es el costo real del dinero prestado. Siempre es mayor que la TNA.

**CFT (Costo Financiero Total):** Incluye la TEA más todos los gastos extra: seguros, comisiones, gastos de otorgamiento. Este es el número que realmente importa para comparar préstamos.

Regla de oro: Siempre mirá el CFT, no la TNA. Si una financiera solo te muestra la TNA, preguntá por el CFT.`,
  },
  {
    id: "tarjetas",
    title: "La trampa de las tarjetas de crédito",
    content: `Las tarjetas de crédito son una de las herramientas financieras más mal usadas por los jóvenes. Acá está lo que nadie te cuenta:

**Pago mínimo:** Si solo pagás el mínimo de tu tarjeta, en la práctica estás pagando solo los intereses. El capital (lo que deben) casi no baja. Una deuda de $50.000 pagando solo el mínimo puede tardarte 7 años en pagar y terminar costando $280.000.

**Interés sobre interés:** Cada mes que no pagás el total, los intereses se suman al capital y el mes siguiente pagás intereses sobre los intereses. Esto se llama interés compuesto y trabaja en tu contra.

**La ilusión del "sin interés":** Las cuotas "sin interés" suelen tener el interés incluido en el precio del producto. El comercio cobra más porque sabe que el banco le pagará menos.`,
  },
];

const warnings = [
  "Pagar solo el mínimo de la tarjeta todos los meses",
  "Usar tarjeta de crédito para gastos cotidianos sin tener el dinero en el banco",
  "Solicitar préstamos para pagar otros préstamos",
  "No leer el contrato antes de firmar",
  "Ignorar el CFT y solo mirar la cuota mensual",
  "Tener más tarjetas de crédito de las que podés manejar",
];

const goodPractices = [
  "Pagá siempre el total de la tarjeta antes del vencimiento",
  "Revisá tu resumen de tarjeta cada mes",
  "Usá el crédito solo para cosas que ya tenés el dinero para pagar",
  "Antes de un préstamo, calculá cuánto pagarás en total",
  "Mantené tu deuda total por debajo del 30% de tus ingresos",
  "Si tenés varias deudas, pagá primero la de mayor interés",
];

export default function Credito() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-accent text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/modulos" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver a módulos
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💳</span>
            <div>
              <span className="text-white/70 text-sm font-medium">Módulo 1</span>
              <h1 className="text-3xl md:text-4xl font-bold">Crédito y Endeudamiento</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Entendé el sistema de crédito para usarlo a tu favor, no en tu contra.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Content sections */}
        <div className="space-y-10 mb-12">
          {sections.map((s) => (
            <div key={s.id} className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">{s.title}</h2>
              <div className="prose prose-sm max-w-none">
                {s.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-foreground/75 leading-relaxed mb-4 last:mb-0"
                    dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>")
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Example: interest trap */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <TrendingDown className="text-destructive flex-shrink-0 mt-1" size={28} />
            <div>
              <h3 className="font-bold text-xl text-foreground mb-3">Ejemplo real: La espiral del mínimo</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Deuda inicial", value: "$50.000", sub: "En tarjeta con 180% TNA" },
                  { label: "Solo pagando mínimo", value: "$280.000+", sub: "Lo que terminás pagando" },
                  { label: "Tiempo para salir", value: "7 años", sub: "De pago del mínimo" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-destructive">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warnings & Good practices */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-2xl p-8 border border-destructive/30">
            <div className="flex items-center gap-3 mb-5">
              <AlertCircle className="text-destructive" size={22} />
              <h3 className="font-bold text-lg text-foreground">Errores a evitar</h3>
            </div>
            <ul className="space-y-3">
              {warnings.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-success/30">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="text-success" size={22} />
              <h3 className="font-bold text-lg text-foreground">Buenas prácticas</h3>
            </div>
            <ul className="space-y-3">
              {goodPractices.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0 mt-2" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/aprendizaje/quiz" className="flex-1 py-3.5 rounded-xl bg-accent text-white font-bold text-center hover:bg-accent/90 transition-colors">
            Hacer la autoevaluación
          </Link>
          <Link to="/modulos" className="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-center hover:bg-primary hover:text-white transition-colors">
            Siguiente módulo
          </Link>
        </div>
      </div>
    </div>
  );
}
