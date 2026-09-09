import { Link } from "react-router";
import { Target, Heart, Users, ArrowRight } from "lucide-react";

const equipo = [
  { nombre: "Kevin Sunavi", rol: "Product owner", bio: "A definir", inicial: "K" },
  { nombre: "Leonardo Huaman", rol: "SCRUM master", bio: "A definir", inicial: "L" },
  { nombre: "Fernando Faccini", rol: "Equipo de desarrollo", bio: "A definir", inicial: "F" },
  { nombre: "Belen Fernandez", rol: "Equipo de desarrollo", bio: "A definir", inicial: "B" },
];

const valores = [
  { icon: Target, titulo: "Claridad sobre todo", desc: "Creemos que las finanzas no tienen por qué ser aburridas ni difíciles. En Deudas Cero, nuestro compromiso es traducir la teoría económica compleja en acciones prácticas y cotidianas" },
  { icon: Heart, titulo: "Comprensión de la falta de educación sistémica", desc: "Sabemos que el 86% de los jóvenes argentinos no recibió educación financiera en la escuela y que es fácil caer en deudas por falta de guía o presión de consumo." },
  { icon: Users, titulo: "Accesibilidad radical", desc: "La salud financiera debe ser un derecho, no un lujo para unos pocos. Por eso, Deudas Cero es y será siempre una herramienta gratuita, diseñada con un enfoque web-responsive " },
];

export default function Nosotros() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Quiénes somos</h1>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto">
            Somos un equipo de estudiantes desarrolladores que cree que ningún joven debería correr el riesgo de arruinar su futuro por falta de información economica.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="bg-card rounded-2xl p-10 border border-border mb-16 text-center">
          <span className="text-5xl block mb-5">📩</span>
          <h2 className="text-3xl font-bold text-foreground mb-4">Nuestra misión</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            Promover la educación financiera en jóvenes de entre 15 y 30 años mediante el desarrollo de una plataforma web interactiva con cursos y aprendizaje en educación financiera básica-media y la implementación de una herramienta digital de presupuesto interactivo, con el fin de reducir el riesgo de endeudamiento temprano en un período de 12 meses.

          </p>
        </div>


        

        {/* Values */}
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nuestros valores</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {valores.map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} className="bg-card rounded-2xl p-7 border border-border text-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <Icon className="text-accent" size={24} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-3">{titulo}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">El equipo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {equipo.map((m) => (
            <div key={m.nombre} className="bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {m.inicial}
              </div>
              <h4 className="font-bold text-foreground">{m.nombre}</h4>
              <p className="text-accent text-sm font-medium mb-3">{m.rol}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-accent rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-3">¿Querés contactar al equipo?</h3>
          <p className="text-white/80 mb-6">Si tenes preguntas para el equipo, escribinos.</p>
          <Link to="/nosotros/contacto" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-accent font-bold hover:bg-white/90 transition-colors">
            Escribinos <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
