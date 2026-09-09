import { Link } from "react-router";
import { ArrowLeft, PiggyBank, Target, Zap } from "lucide-react";

const tips = [
  { icon: "🎯", title: "Regla del 50/30/20", desc: "50% para necesidades (alquiler, comida, transporte), 30% para deseos (salidas, ropa, entretenimiento), 20% para ahorro y deudas." },
  { icon: "⚡", title: "Ahorro automático", desc: "Configurá una transferencia automática el día que cobras. Ahorrás antes de gastar. Lo que no ves, no lo extrañás." },
  { icon: "🏦", title: "Fondo de emergencia", desc: "Tu primer objetivo de ahorro: tener 3 a 6 meses de gastos guardados. Esto te protege de imprevistos sin recurrir al crédito." },
  { icon: "📉", title: "Identificá gastos hormiga", desc: "El café diario, las suscripciones olvidadas, las comidas por app. Suman más de lo que pensás. Registralos durante un mes y te vas a sorprender." },
  { icon: "📈", title: "Hacé rendir tu ahorro", desc: "El dinero parado en caja de ahorro pierde valor con la inflación. Explorá plazos fijos, fondos comunes o cuentas remuneradas para que tu plata crezca." },
  { icon: "🧠", title: "La mentalidad importa", desc: "Ahorrar no es privarse: es elegir tu futuro sobre una satisfacción inmediata. Cada peso ahorrado es un peso que trabaja para vos." },
];

export default function Ahorro() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-success text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/modulos" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver a módulos
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🐷</span>
            <div>
              <span className="text-white/70 text-sm font-medium">Módulo 2</span>
              <h1 className="text-3xl md:text-4xl font-bold">Cultura del Ahorro</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Ahorrar no es cuestión de suerte ni de ganar mucho. Es una habilidad que se aprende.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-2xl p-8 border border-border mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">¿Por qué la mayoría de los jóvenes no ahorra?</h2>
          <p className="text-foreground/75 leading-relaxed mb-4">
            La respuesta más común es "no me alcanza el sueldo". Y en parte tiene razón: los salarios reales de los jóvenes en LATAM son bajos. Pero hay otro factor que pocas veces se menciona: nadie nos enseñó a hacerlo.
          </p>
          <p className="text-foreground/75 leading-relaxed mb-4">
            La industria del consumo está diseñada para que gastes todo lo que ganás. Publicidad en cada rincón, cuotas "accesibles", delivery a un click. Ahorrar requiere nadar contra la corriente, y eso necesita una estrategia.
          </p>
          <p className="text-foreground/75 leading-relaxed">
            La buena noticia: no necesitás ganar más para empezar a ahorrar. Podés empezar hoy, con lo que tenés, siguiendo estos principios.
          </p>
        </div>

        {/* Savings tips grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {tips.map((t) => (
            <div key={t.title} className="bg-card rounded-2xl p-6 border border-border hover:border-success/40 transition-colors">
              <span className="text-3xl mb-3 block">{t.icon}</span>
              <h3 className="font-bold text-lg text-foreground mb-2">{t.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Savings challenge */}
        <div className="bg-success/10 border border-success/30 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4">
            <Target className="text-success flex-shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-xl text-foreground mb-3">El desafío del 1%</h3>
              <p className="text-foreground/75 leading-relaxed mb-4">
                Si ganás $200.000 por mes, ahorrar el 1% son solo $2.000. ¿Te parece poco? En un año son $24.000. Y si lo ponés en un plazo fijo al 80% TNA, en un año tendrías cerca de $43.000.
              </p>
              <p className="text-foreground/75 leading-relaxed">
                El objetivo no es el monto. El objetivo es crear el hábito. Una vez que el ahorro es automático, podés ir subiendo el porcentaje gradualmente.
              </p>
            </div>
          </div>
        </div>

        {/* Progress example */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-10">
          <h3 className="font-bold text-xl text-foreground mb-6">Fondo de emergencia: paso a paso</h3>
          <div className="space-y-4">
            {[
              { step: "Mes 1-2", task: "Calculá cuánto necesitás para vivir 1 mes (alquiler + comida + transporte)", pct: 15 },
              { step: "Mes 3-6", task: "Acumulá 1 mes de gastos en una cuenta separada de tus gastos del día a día", pct: 35 },
              { step: "Mes 7-12", task: "Seguí ahorrando hasta tener 3 meses de gastos guardados", pct: 65 },
              { step: "Año 2+", task: "Expandí el fondo a 6 meses y empezá a explorar inversiones", pct: 100 },
            ].map((item) => (
              <div key={item.step}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-foreground">{item.step}</span>
                  <span className="text-muted-foreground">{item.pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                  <div className="bg-success h-2.5 rounded-full transition-all" style={{ width: `${item.pct}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{item.task}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/presupuesto" className="flex-1 py-3.5 rounded-xl bg-success text-white font-bold text-center hover:bg-success/90 transition-colors">
            Crear mi presupuesto
          </Link>
          <Link to="/modulos" className="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-center hover:bg-primary hover:text-white transition-colors">
            Ver todos los módulos
          </Link>
        </div>
      </div>
    </div>
  );
}
