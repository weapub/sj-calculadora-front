import React, { useEffect, useMemo, useState } from 'react';
import { getProveedores, addProveedor, addProducto } from '../services/api';

export default function CalculadoraPreciosWeb() {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorId, setProveedorId] = useState('');
  const [tipoFactura, setTipoFactura] = useState('A');
  const [iva, setIva] = useState(21);
  const [percepcion, setPercepcion] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [costo, setCosto] = useState(0);
  const [tipoProducto, setTipoProducto] = useState('pesable');
  const [mensaje, setMensaje] = useState('');

  // Producto a guardar
  const [codigo, setCodigo] = useState('');
  const [nombreProd, setNombreProd] = useState('');
  const [margenElegido, setMargenElegido] = useState(20);

  useEffect(() => {
    getProveedores().then(setProveedores);
  }, []);

  useEffect(() => {
    if (!proveedorId) return;
    const p = proveedores.find(x => String(x.id) === String(proveedorId));
    if (!p) return;
    if (tipoFactura === 'A') {
      setIva(Number(p.iva) || 0);
      setPercepcion(Number(p.percepcion) || 0);
    } else {
      setIva(0); setPercepcion(0);
    }
    setDescuento(Number(p.descuento) || 0);
  }, [proveedorId, proveedores, tipoFactura]);

  const margenes = useMemo(() => ({
    pesable: { caja: 20, pieza: 25, mediaPieza: 30, kg: 40 },
    comestible: { unidad: 35, mayor: 30, caja: 25 },
    limpieza: { unidad: 35, mayor: 30, caja: 25 },
  }), []);

  const costoBase = useMemo(() => {
    let t = Number(costo) || 0;
    if (tipoFactura === 'A') {
      t *= 1 + (Number(iva)||0)/100;
      t *= 1 + (Number(percepcion)||0)/100;
    }
    if (Number(descuento) > 0) t *= 1 - Number(descuento)/100;
    return t;
  }, [costo, tipoFactura, iva, percepcion, descuento]);

  const precioConMargen = (porc) => (costoBase * (1 + porc/100)).toFixed(2);

  const guardarProveedorRapido = async () => {
    const nombre = prompt('Nombre del nuevo proveedor:');
    if (!nombre) return;
    await addProveedor({ nombre, iva: 21, percepcion: 0, descuento: 0 });
    const list = await getProveedores();
    setProveedores(list);
    setMensaje('Proveedor agregado ✅');
    setTimeout(()=>setMensaje(''),2500);
  };

  const guardarProducto = async () => {
    if (!codigo || !nombreProd || !proveedorId) {
      setMensaje('Completá código, nombre y proveedor');
      setTimeout(()=>setMensaje(''),2500);
      return;
    }
    const precio_final = Number(precioConMargen(margenElegido));
    await addProducto({
      codigo, nombre: nombreProd, proveedor_id: Number(proveedorId),
      costo_neto: Number(costo), tipo: tipoProducto, margen: Number(margenElegido),
      precio_final
    });
    setMensaje('Producto guardado 💾');
    setTimeout(()=>setMensaje(''),2500);
  };

  return (
    <div className="calculadora">
      <h2>Calculadora de Precios</h2>

      <label>Proveedor</label>
      <select value={proveedorId} onChange={e=>setProveedorId(e.target.value)}>
        <option value="">Seleccionar proveedor...</option>
        {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
      </select>
      <button onClick={guardarProveedorRapido} className="btn-sec">+ Proveedor</button>

      <label>Tipo de Factura</label>
      <select value={tipoFactura} onChange={e=>setTipoFactura(e.target.value)}>
        <option value="A">Factura A (con IVA)</option>
        <option value="B">Factura B (sin impuestos)</option>
        <option value="X">Remito X</option>
      </select>

      <label>IVA Proveedor (%)</label>
      <input type="number" value={iva} disabled={tipoFactura!=='A'} onChange={e=>setIva(e.target.value)} />
      <label>Percepción (%)</label>
      <input type="number" value={percepcion} disabled={tipoFactura!=='A'} onChange={e=>setPercepcion(e.target.value)} />
      <label>Descuento del proveedor (%)</label>
      <input type="number" value={descuento} onChange={e=>setDescuento(e.target.value)} />

      <div className="campo-costo-neto">
        <label className="label-costo">Costo Neto</label>
        <input type="number" value={costo} onChange={e=>setCosto(e.target.value)} placeholder="Precio base sin impuestos" />
      </div>

      <label>Tipo de Producto</label>
      <select value={tipoProducto} onChange={e=>setTipoProducto(e.target.value)}>
        <option value="pesable">Pesable (Fiambres, Quesos)</option>
        <option value="comestible">Comestible</option>
        <option value="limpieza">Limpieza</option>
      </select>

      <div className="resultado">
        <h3>Costo final con impuestos y descuento: ${costoBase.toFixed(2)}</h3>
      </div>

      <h4>Precios sugeridos:</h4>
      <div className="grid">
        {Object.entries(margenes[tipoProducto]).map(([tipo, p]) => (
          <div key={tipo} className="card">
            <p>{tipo.toUpperCase()}</p>
            <strong>${precioConMargen(p)}</strong>
          </div>
        ))}
      </div>

      <h4>Guardar producto</h4>
      <div className="grid">
        <input type="text" placeholder="Código" value={codigo} onChange={e=>setCodigo(e.target.value)} />
        <input type="text" placeholder="Nombre" value={nombreProd} onChange={e=>setNombreProd(e.target.value)} />
        <input type="number" placeholder="Margen %" value={margenElegido} onChange={e=>setMargenElegido(e.target.value)} />
        <button onClick={guardarProducto} className="btn-prim">💾 Guardar</button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
