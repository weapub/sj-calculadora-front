import React, { useEffect, useMemo, useState } from "react";
import { addProducto, getProductos, getProveedores } from "../services/api";

export default function ProductoForm() {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    proveedor_id: "",
    costo_neto: 0,
    tipo: "pesable",
    margen: 20,
  });
  const [lista, setLista] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [q, setQ] = useState("");

  const precio_final = useMemo(() => {
    const c = Number(form.costo_neto) || 0;
    const m = Number(form.margen) || 0;
    return (c * (1 + m/100)).toFixed(2);
  }, [form.costo_neto, form.margen]);

  const load = async () => {
    try {
      const [provs, prods] = await Promise.all([getProveedores(), getProductos()]);
      setProveedores(provs);
      setLista(prods);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name==="nombre" || name==="codigo" || name==="tipo" ? value : Number(value) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); setOk("");
    try {
      await addProducto({ ...form, precio_final: Number(precio_final) });
      setOk("Producto guardado ✅");
      setForm({ codigo:"", nombre:"", proveedor_id:"", costo_neto:0, tipo:"pesable", margen:20 });
      const prods = await getProductos(q);
      setLista(prods);
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const buscar = async () => {
    try {
      const prods = await getProductos(q);
      setLista(prods);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-5xl">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Productos</h2>

      <form onSubmit={onSubmit} className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className="text-slate-300 text-sm">Código</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
            placeholder="1001"
            required
          />
        </div>

        <div className="col-span-3">
          <label className="text-slate-300 text-sm">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
            placeholder="Queso Cremoso x Kg"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="text-slate-300 text-sm">Proveedor</label>
          <select
            name="proveedor_id"
            value={form.proveedor_id}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
            required
          >
            <option value="">Seleccionar proveedor...</option>
            {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>

        <div>
          <label className="text-slate-300 text-sm">Costo Neto</label>
          <input
            type="number"
            step="0.01"
            name="costo_neto"
            value={form.costo_neto}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm">Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          >
            <option value="pesable">Pesable</option>
            <option value="comestible">Comestible</option>
            <option value="limpieza">Limpieza</option>
          </select>
        </div>

        <div>
          <label className="text-slate-300 text-sm">Margen (%)</label>
          <input
            type="number"
            step="0.1"
            name="margen"
            value={form.margen}
            onChange={onChange}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm">Precio Final</label>
          <input
            value={precio_final}
            readOnly
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
          />
        </div>

        <div className="col-span-4 flex gap-2 justify-end">
          <button
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar producto"}
          </button>
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      {ok && <p className="mt-3 text-sm text-emerald-400">{ok}</p>}

      <div className="mt-6 flex items-center gap-2">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Buscar por nombre o código..."
          className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100"
        />
        <button onClick={buscar} className="px-3 py-2 bg-slate-700 rounded-xl text-slate-100">Buscar</button>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-300">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Proveedor</th>
              <th className="text-left p-2">Margen</th>
              <th className="text-left p-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id} className="odd:bg-slate-900/40 even:bg-slate-900/20 text-slate-200">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.codigo}</td>
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.proveedor_nombre || p.proveedor_id}</td>
                <td className="p-2">{p.margen}%</td>
                <td className="p-2">${Number(p.precio_final).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
