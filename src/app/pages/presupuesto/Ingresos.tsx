import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { api } from "../../lib/api";
import { usePresupuesto, type Ingreso } from "../../lib/usePresupuesto";

const categorias = ["Sueldo", "Freelance / Changas", "Alquiler cobrado", "Beca", "Venta", "Otro"];

export default function Ingresos() {
  const { ingresos, setIngresos, error: loadError } = usePresupuesto();
  const [form, setForm] = useState({ descripcion: "", monto: "", categoria: "Sueldo", fecha: new Date().toISOString().split("T")[0] });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.descripcion || !form.monto) return;
    try {
      const nuevo = await api<Ingreso>("/ingresos", { method: "POST", body: { ...form, monto: parseFloat(form.monto) } });
      setIngresos([...ingresos, nuevo]);
      setError("");
    } catch (err) {
      setError((err as Error).message);
      return;
    }
    setForm({ descripcion: "", monto: "", categoria: "Sueldo", fecha: new Date().toISOString().split("T")[0] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete(id: string) {
    try {
      await api(`/ingresos/${id}`, { method: "DELETE" });
      setIngresos(ingresos.filter((i) => i.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const total = ingresos.reduce((s, i) => s + i.monto, 0);
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="bg-card rounded-2xl p-6 border border-border sticky top-40">
          <h2 className="font-bold text-xl text-foreground mb-5">Agregar ingreso</h2>
          {(error || loadError) && <p className="mb-4 text-sm text-destructive">{error || loadError}</p>}
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Descripción</label>
              <input
                type="text"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Ej: Sueldo de enero"
                className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Monto ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.monto}
                onChange={(e) => setForm({ ...form, monto: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              />
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
              className="w-full py-3 rounded-xl bg-success text-white font-bold flex items-center justify-center gap-2 hover:bg-success/90 transition-colors"
            >
              {saved ? <><CheckCircle size={18} /> Guardado</> : <><Plus size={18} /> Agregar ingreso</>}
            </button>
          </form>

          {total > 0 && (
            <div className="mt-5 p-4 rounded-xl bg-success/10 border border-success/30">
              <p className="text-sm text-muted-foreground">Total ingresos del mes</p>
              <p className="text-2xl font-bold text-success">{fmt(total)}</p>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-3">
        <h2 className="font-bold text-xl text-foreground mb-5">Mis ingresos ({ingresos.length})</h2>
        {ingresos.length === 0 ? (
          <div className="bg-card rounded-2xl p-10 border border-border text-center text-muted-foreground">
            <span className="text-4xl block mb-3">💰</span>
            <p>Todavía no registraste ingresos este mes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...ingresos].reverse().map((i) => (
              <div key={i.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between gap-4 hover:border-success/40 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{i.descripcion}</p>
                  <p className="text-xs text-muted-foreground">{i.categoria} · {new Date(i.fecha).toLocaleDateString("es-AR")}</p>
                </div>
                <span className="font-bold text-success text-sm whitespace-nowrap">+{fmt(i.monto)}</span>
                <button onClick={() => handleDelete(i.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
