import { Link } from "react-router";
import { ArrowRight, TrendingDown, ShieldCheck, BookOpen, PiggyBank, GraduationCap, Star, ChevronRight } from "lucide-react";

const stats = [
  { value: "86%", label: "de jóvenes entre 16-30 años no tienen eucacion finenaciera" },
  { value: "$380k", label: "deuda promedio de un joven argentino al cumplir 25 años" },
  { value: "1 de 3", label: "jóvenes nunca aprendió educación financiera en la escuela" },
];

const modules = [
  {
    icon: "💳",
    title: "Crédito & Deuda",
    desc: "Entiende cómo funciona el crédito, las tarjetas y cuándo el endeudamiento se vuelve un problema.",
    to: "/modulos/credito",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: "👨‍🎓",
    title: "Cultura del Ahorro",
    desc: "Estrategias reales para ahorrar incluso cuando creés que no te alcanza el dinero.",
    to: "/modulos/ahorro",
    color: "bg-success/10 text-success",
  },
  {
    icon: "📊",
    title: "Presupuesto Personal",
    desc: "Aprende a planificar tus finanzas mensuales para que el dinero trabaje para vos.",
    to: "/modulos/presupuesto-personal",
    color: "bg-primary/10 text-primary",
  },
];

const testimonials = [
  {
    name: "Valentina R.",
    age: 23,
    text: "Tenía 3 tarjetas de crédito sin saber cómo pagarlas. Con Deudascero aprendí a priorizar mis deudas y en 8 meses quedé libre.",
    stars: 5,
  },
  {
    name: "Mateo L.",
    age: 19,
    text: "Empecé a usar la herramienta de presupuesto en el primer mes y ya noté que estaba gastando el 40% de mi sueldo en cosas innecesarias.",
    stars: 5,
  },
  {
    name: "Sofía M.",
    age: 26,
    text: "El módulo de crédito me salvó de tomar un préstamo predatorio. Ahora sé leer la letra chica y tomar decisiones financieras reales.",
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #E9824A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F8EBDD 0%, transparent 40%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
                Educación financiera para jóvenes 🇦🇷
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                ¿Estás en deuda con tu futuro?
              </h1>
              <p className="text-lg text-primary-foreground/75 leading-relaxed mb-8 max-w-lg">
                Deudascero te da las herramientas y el conocimiento que la escuela nunca te enseñó. Aprendé a manejar tu dinero, evitar deudas tóxicas y construir un futuro financiero sólido.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/registro"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Comenzar gratis <ArrowRight size={18} />
                </Link>
                <Link
                  to="/aprendizaje"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Ver recursos
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-5">
                  <span className="text-3xl font-bold text-accent whitespace-nowrap">{s.value}</span>
                  <p className="text-primary-foreground/80 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-secondary border-y border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-foreground/70">
            {["✅ 100% gratuito", "📱 Funciona en el celular", "🔒 Tus datos son privados", "📚 Contenido en español", "🎯 Diseñado para jóvenes de LATAM"].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              El endeudamiento joven es una crisis silenciosa
            </h2>
            <p className="text-muted-foreground text-lg">
              Nadie nos enseña finanzas en la escuela, pero las deudas sí llegan solas. La diferencia entre quedar atrapado y salir adelante está en la educación.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingDown,
                title: "Deudas en espiral",
                desc: "Las tarjetas de crédito con intereses compuestos pueden convertir $5.000 en $50.000 si solo pagás el mínimo. El 48% de los jóvenes cae en esta trampa.",
                color: "text-destructive",
                bg: "bg-destructive/10",
              },
              {
                icon: ShieldCheck,
                title: "Falta de educación",
                desc: "El 67% de los jóvenes latinoamericanos no puede explicar qué es una tasa de interés. No es tu culpa: simplemente nadie te lo enseñó.",
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: BookOpen,
                title: "La solución existe",
                desc: "Con las herramientas correctas, cualquier persona puede aprender a manejar su dinero, salir de deudas y construir patrimonio desde cero.",
                color: "text-success",
                bg: "bg-success/10",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon className={color} size={24} />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Módulos de aprendizaje</h2>
            <p className="text-muted-foreground text-lg">Tres pilares para tu independencia financiera</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {modules.map(({ icon, title, desc, to, color }) => (
              <Link key={to} to={to} className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-2xl mb-5`}>
                  {icon}
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                  Explorar módulo <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/modulos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
              Ver todos los módulos <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: PiggyBank,
                title: "Herramienta de Presupuesto",
                desc: "Registrá tus ingresos y gastos mes a mes. Visualizá en dónde va tu dinero con gráficos claros.",
                to: "/presupuesto",
                cta: "Crear mi presupuesto",
                bg: "bg-primary",
              },
              {
                icon: GraduationCap,
                title: "Centro de Aprendizaje",
                desc: "Artículos, cursos y quizzes para que domines cada aspecto de tus finanzas personales.",
                to: "/aprendizaje",
                cta: "Empezar a aprender",
                bg: "bg-accent",
              },
              {
                icon: BookOpen,
                title: "Glosario Financiero",
                desc: "¿Qué es el interés compuesto? ¿Qué significa TNA? Todos los términos explicados en simple.",
                to: "/aprendizaje/glosario",
                cta: "Ir al glosario",
                bg: "bg-success",
              },
            ].map(({ icon: Icon, title, desc, to, cta, bg }) => (
              <div key={to} className={`${bg} rounded-2xl p-8 text-white flex flex-col`}>
                <Icon size={32} className="mb-4 opacity-90" />
                <h3 className="font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6">{desc}</p>
                <Link to={to} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 font-semibold text-sm transition-colors">
                  {cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Tu futuro financiero empieza hoy</h2>
          <p className="text-primary-foreground/75 text-lg mb-8">
            Unite para tener una herramienta uqe te dara la oportunidad de poder tomar el control de tu dinero. Gratis, en español y sin letra chica.
          </p>
          <Link
            to="/registro"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            Crear mi cuenta gratis <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
