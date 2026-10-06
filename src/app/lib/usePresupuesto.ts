import { useEffect, useState, useCallback } from "react";
import { api } from "./api";

export interface Ingreso {
  id: string;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string;
}

export interface Gasto extends Ingreso {
  presupuestado?: number;
}

// Carga los ingresos y gastos del usuario logueado desde la base de datos.
export function usePresupuesto() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      const [i, g] = await Promise.all([api<Ingreso[]>("/ingresos"), api<Gasto[]>("/gastos")]);
      setIngresos(i);
      setGastos(g);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const totalIngresos = ingresos.reduce((s, i) => s + i.monto, 0);
  const totalGastos = gastos.reduce((s, g) => s + g.monto, 0);

  return {
    ingresos, gastos, setIngresos, setGastos, loading, error, reload,
    totalIngresos, totalGastos, balance: totalIngresos - totalGastos,
  };
}
