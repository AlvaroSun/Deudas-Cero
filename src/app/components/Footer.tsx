import { Link } from "react-router";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              <span className="text-2xl">🪙</span>
              <span>DeudasCero</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Plataforma educativa para jóvenes que quieren tomar control de sus finanzas personales y construir un futuro libre de deudas.
            </p>
            <div className="flex gap-4 mt-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Icon size={16} />
                </a>
              ))}
              <a href="mailto:contacto@finanzasjoven.com" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Plataforma</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {[
                { to: "/modulos", label: "Módulos" },
                { to: "/presupuesto", label: "Herramienta de Presupuesto" },
                { to: "/aprendizaje", label: "Centro de Aprendizaje" },
                { to: "/aprendizaje/quiz", label: "Autoevaluación" },
                { to: "/aprendizaje/glosario", label: "Glosario Financiero" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/60">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {[
                { to: "/nosotros", label: "Quiénes somos" },
                { to: "/nosotros/contacto", label: "Contacto" },
                { to: "/login", label: "Iniciar sesión" },
                { to: "/registro", label: "Crear cuenta" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© 2025 DeudasCero. </p>
          <p>Hecho con cansancio por jóvenes argentinos</p>
        </div>
      </div>
    </footer>
  );
}
