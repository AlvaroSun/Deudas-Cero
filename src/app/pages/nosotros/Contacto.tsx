import { useState } from "react";
import { Link } from "react-router";
import { Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="text-success mx-auto mb-5" size={64} />
          <h2 className="text-3xl font-bold text-foreground mb-3">¡Mensaje enviado!</h2>
          <p className="text-muted-foreground mb-8">Gracias por escribirnos. Te responderemos en menos de 48 horas hábiles.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contacto</h1>
          <p className="text-primary-foreground/75 text-lg">Tenés preguntas, sugerencias o querés colaborar. Escribinos.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Información de contacto</h2>
              {[
                { icon: Mail, label: "Email", value: "contacto@deudascero.com" },
                { icon: MapPin, label: "Ubicación", value: "Buenos Aires, Argentina" },
                { icon: Clock, label: "Tiempo de respuesta", value: "Menos de 48 horas hábiles" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                    <p className="text-foreground font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-foreground mb-3">FAQ rápido</h3>
              {[
                { q: "¿La plataforma es gratis?", a: "Síp y siempre lo será." },
                { q: "¿Guardan mis datos financieros?", a: "No. Todo se guarda localmente en tu dispositivo." },
                { q: "¿Tienen app móvil?", a: "La web es responsive." },
              ].map((faq) => (
                <div key={faq.q} className="mb-3 last:mb-0">
                  <p className="text-sm font-semibold text-foreground">{faq.q}</p>
                  <p className="text-xs text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Envianos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Nombre</label>
                    <input
                      type="text" required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Asunto</label>
                  <select
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                  >
                    <option value="">Seleccioná un asunto</option>
                    <option>Consulta sobre contenido</option>
                    <option>Reporte de error</option>
                    <option>Sugerencia de mejora</option>
                    <option>Colaboración / Alianza</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Mensaje</label>
                  <textarea
                    required rows={5}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    placeholder="Escribí tu mensaje aquí..."
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-accent text-white font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all disabled:opacity-60"
                >
                  {loading ? "Enviando..." : <><Send size={18} /> Enviar mensaje</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
