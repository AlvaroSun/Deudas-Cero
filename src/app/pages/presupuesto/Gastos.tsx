import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string;
  presupuestado?: number;
}

const categorias = [
  "Vivienda", "Alimentación", "Transporte", "Salud",
  "Educación", "Entretenimiento", "Ropa y Personal", "Deudas / Cuotas", "Servicios", "Otro"
];

export default function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [form, setForm] = useState({
    descripcion: "", monto: "", categoria: "Alimentación",
    fecha: new Date().toISOString().split("T")[0], presupuestado: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGastos(JSON.parse(localStorage.getItem("presupuesto_gastos") || "[]"));
  }, []);

  function save(data: Gasto[]) {
    localStorage.setItem("presupuesto_gastos", JSON.stringify(data));
    setGastos(data);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.descripcion || !form.monto) return;
    const nuevo: Gasto = {
      id: `gasto-${Date.now()}`,
      descripcion: form.descripcion,
      monto: parseFloat(form.monto),
      categoria: form.categoria,
      fecha: form.fecha,
      presupuestado: form.presupuestado ? parseFloat(form.presupuestado) : undefined,
    };
    save([...gastos, nuevo]);
    setForm({ descripcion: "", monto: "", categoria: "Alimentación", fecha: new Date().toISOString().split("T")[0], presupuestado: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete(id: string) {
    save(gastos.filter((g) => g.id !== id));
  }

  const total = gastos.reduce((s, g) => s + g.monto, 0);
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

  const byCategory = categorias.map((cat) => ({
    cat,
    total: gastos.filter((g) => g.categoria === cat).reduce((s, g) => s + g.monto, 0),
  })).filter((c) => c.total > 0);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="bg-card rounded-2xl p-6 border border-border sticky top-40">
          <h2 className="font-bold text-xl text-foreground mb-5">Agregar gasto</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Descripción</label>
              <input
                type="text"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Ej: Supermercado Coto"
                className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Monto ($)</label>
                <input
                  type="number" min="0" step="0.01"
                  value={form.monto}
                  onChange={(e) => setForm({ ...form, monto: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Presupuestado</label>
                <input
                  type="number" min="0" step="0.01"
                  value={form.presupuestado}
                  onChange={(e) => setForm({ ...form, presupuestado: e.target.value })}
                  placeholder="Opcional"
                  className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Categoría</label>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              >
                {categorias.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Fecha</label>
              <input
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-destructive text-white font-bold flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors"
            >
              {saved ? <><CheckCircle size={18} /> Guardado</> : <><Plus size={18} /> Agregar gasto</>}
            </button>
          </form>

          {byCategory.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold text-foreground">Por categoría:</p>
              {byCategory.sort((a,b)=>b.total-a.total).slice(0,4).map(({ cat, total: t }) => (
                <div key={cat} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="font-semibold text-destructive">{fmt(t)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-bold text-sm">
                <span>Total</span>
                <span className="text-destructive">{fmt(total)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-3">
        <h2 className="font-bold text-xl text-foreground mb-5">Mis gastos ({gastos.length})</h2>
        {gastos.length === 0 ? (
          <div className="bg-card rounded-2xl p-10 border border-border text-center text-muted-foreground">
            <span className="text-4xl block mb-3">📉</span>
            <p>Todavía no registraste gastos este mes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...gastos].reverse().map((g) => {
              const overBudget = g.presupuestado && g.monto > g.presupuestado;
              return (
                <div key={g.id} className={`bg-card rounded-xl p-4 border transition-colors flex items-center justify-between gap-4 ${overBudget ? "border-destructive/40" : "border-border hover:border-destructive/20"}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm truncate">{g.descripcion}</p>
                      {overBudget && <AlertCircle size={14} className="text-destructive flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {g.categoria} · {new Date(g.fecha).toLocaleDateString("es-AR")}
                      {g.presupuestado && ` · Presupuestado: ${fmt(g.presupuestado)}`}
                    </p>
                  </div>
                  <span className="font-bold text-destructive text-sm whitespace-nowrap">-{fmt(g.monto)}</span>
                  <button onClick={() => handleDelete(g.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
