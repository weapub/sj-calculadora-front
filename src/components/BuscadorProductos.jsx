import React, { useState } from 'react';
import { getProductoPorCodigo, searchProductos } from '../services/api';

export default function BuscadorProductos() {
  const [codigo, setCodigo] = useState('');
  const [q, setQ] = useState('');
  const [producto, setProducto] = useState(null);
  const [lista, setLista] = useState([]);
  const [error, setError] = useState('');

  const buscarCodigo = async () => {
    try {
      const data = await getProductoPorCodigo(codigo);
      setProducto(data);
      setError('');
    } catch (e) {
      setProducto(null);
      setError('Producto no encontrado');
    }
  };

  const buscarTexto = async () => {
    const r = await searchProductos(q);
    setLista(r);
  };

  return (
    <div className="calculadora">
      <h2>🔍 Buscar Producto</h2>

      <div className="grid">
        <input type="text" placeholder="Código..." value={codigo} onChange={e=>setCodigo(e.target.value)} />
        <button onClick={buscarCodigo} className="btn-prim">Buscar por código</button>
      </div>
      {error && <p className="mensaje">{error}</p>}
      {producto && (
        <div className="detalle-box" style={{marginTop:10}}>
          <strong>{producto.nombre}</strong><br/>
          Código: {producto.codigo}<br/>
          Proveedor: {producto.proveedor_nombre || producto.proveedor_id}<br/>
          Tipo: {producto.tipo || '-'}<br/>
          Margen: {producto.margen}%<br/>
          Precio Final: ${Number(producto.precio_final).toFixed(2)}
        </div>
      )}

      <h4>Buscar por texto</h4>
      <div className="grid">
        <input type="text" placeholder="Nombre o código..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={buscarTexto} className="btn-sec">Buscar</button>
      </div>

      {lista.length > 0 && (
        <div style={{marginTop:12}}>
          {lista.map(p => (
            <div key={p.id} className="detalle-box" style={{marginBottom:8}}>
              <strong>{p.nombre}</strong> — ${Number(p.precio_final).toFixed(2)}<br/>
              <small>Código: {p.codigo} · Proveedor: {p.proveedor_nombre || p.proveedor_id}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
