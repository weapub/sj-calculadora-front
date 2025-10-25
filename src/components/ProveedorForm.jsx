import React, { useEffect, useState } from "react";
import { addProveedor, getProveedores } from "../services/api";

export default function ProveedorForm() {
  const [form, setForm] = useState({ nombre: "", iva: 21, percepcion: 0, descuento: 0 });
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const load = async () => {
    try {
      const data = await getProveedores();
      setLista(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "nombre" ? value : Number(value) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); setOk("");
    try {
      await addProveedor(form);
      setOk("Proveedor guardado ✅");
      setForm({ nombre: "", iva: 21, percepcion: 0, descuento: 0 });
      await load();
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Proveedores</h2>

      <form onSubmit={onSubmit} className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-slate-300 text-sm">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
            placeholder="Proveedor A"
            required
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm">IVA (%)</label>
          <input
            type="number"
            step="0.1"
            name="iva"
            value={form.iva}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm">Percepción (%)</label>
          <input
            type="number"
            step="0.1"
            name="percepcion"
            value={form.percepcion}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm">Descuento proveedor (%)</label>
          <input
            type="number"
            step="0.1"
            name="descuento"
            value={form.descuento}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          />
        </div>

        <div className="col-span-2 flex gap-2 justify-end">
          <button
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar proveedor"}
          </button>
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      {ok && <p className="mt-3 text-sm text-emerald-400">{ok}</p>}

      <h3 className="mt-6 mb-2 text-slate-200 font-medium">Listado</h3>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-300">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">IVA</th>
              <th className="text-left p-2">Percep.</th>
              <th className="text-left p-2">Desc.</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id} className="odd:bg-slate-900/40 even:bg-slate-900/20 text-slate-200">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.iva}</td>
                <td className="p-2">{p.percepcion}</td>
                <td className="p-2">{p.descuento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
