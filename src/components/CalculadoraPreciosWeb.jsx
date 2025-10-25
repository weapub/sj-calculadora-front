import React, { useState, useEffect } from 'react';
import './CalculadoraPreciosWeb.css';

export default function CalculadoraPreciosWeb() {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [tipoFactura, setTipoFactura] = useState('A');
  const [proveedorIva, setProveedorIva] = useState(21);
  const [percepcion, setPercepcion] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [costoNeto, setCostoNeto] = useState(0);
  const [tipoProducto, setTipoProducto] = useState('pesable');
  const [mensaje, setMensaje] = useState('');
  const [mostrarDetalle, setMostrarDetalle] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  const proveedoresDemo = [
    { id: 1, nombre: 'Proveedor A', iva: 21, percepcion: 3, descuento: 5 },
    { id: 2, nombre: 'Proveedor B', iva: 10.5, percepcion: 2, descuento: 0 },
    { id: 3, nombre: 'Proveedor C', iva: 0, percepcion: 0, descuento: 0 },
  ];

  // Cargar proveedores
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('proveedores'));
    if (guardados?.length) setProveedores(guardados);
    else setProveedores(proveedoresDemo);
  }, []);

  // Guardar cambios
  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  // Actualizar datos del proveedor seleccionado
  useEffect(() => {
    if (proveedorSeleccionado && tipoFactura === 'A') {
      const prov = proveedores.find((p) => p.id === parseInt(proveedorSeleccionado));
      if (prov) {
        setProveedorIva(prov.iva);
        setPercepcion(prov.percepcion);
        setDescuento(prov.descuento || 0);
      }
    }
  }, [proveedorSeleccionado, proveedores, tipoFactura]);

  // Márgenes
  const margenes = {
    pesable: { caja: 20, pieza: 25, mediaPieza: 30, kg: 40 },
    comestible: { unidad: 35, mayor: 30, caja: 25 },
    limpieza: { unidad: 35, mayor: 30, caja: 25 },
  };

  // Calcular impuestos y descuentos
  const calcularImpuestos = () => {
    let total = parseFloat(costoNeto || 0);
    if (tipoFactura === 'A') {
      total *= 1 + proveedorIva / 100;
      total *= 1 + percepcion / 100;
    }
    if (descuento > 0) total *= 1 - descuento / 100;
    return total;
  };

  const costoFinal = calcularImpuestos();
  const calcularPrecio = (porcentaje) => (costoFinal * (1 + porcentaje / 100)).toFixed(2);

  // Nuevo proveedor
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    iva: 21,
    percepcion: 0,
    descuento: 0,
  });

  const agregarProveedor = () => {
    if (!nuevoProveedor.nombre) return;
    const nuevo = { ...nuevoProveedor, id: Date.now() };
    setProveedores([...proveedores, nuevo]);
    setNuevoProveedor({ nombre: '', iva: 21, percepcion: 0, descuento: 0 });
    mostrarMensaje('Proveedor guardado correctamente ✅');
  };

  const editarProveedor = (id, campo, valor) => {
    setProveedores((prev) => prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)));
  };

  const eliminarProveedor = (id) => {
    setProveedores((prev) => prev.filter((p) => p.id !== id));
    mostrarMensaje('Proveedor eliminado 🗑️');
  };

  const restaurarProveedores = () => {
    setProveedores(proveedoresDemo);
    localStorage.setItem('proveedores', JSON.stringify(proveedoresDemo));
    mostrarMensaje('Lista de proveedores restaurada 🔁');
  };

  useEffect(() => {
    if (tipoFactura === 'B' || tipoFactura === 'X') {
      setProveedorIva(0);
      setPercepcion(0);
    } else if (proveedorSeleccionado) {
      const prov = proveedores.find((p) => p.id === parseInt(proveedorSeleccionado));
      if (prov) {
        setProveedorIva(prov.iva);
        setPercepcion(prov.percepcion);
        setDescuento(prov.descuento || 0);
      }
    }
  }, [tipoFactura]);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const toggleModo = () => setModoOscuro(!modoOscuro);

  return (
    <div className={`calculadora ${modoOscuro ? 'dark' : ''}`}>
      <button className="modo-btn" onClick={toggleModo}>
        {modoOscuro ? '☀️' : '🌙'}
      </button>

      <h2>Calculadora de Precios</h2>

      <label>Proveedor</label>
      <select
        value={proveedorSeleccionado}
        onChange={(e) => setProveedorSeleccionado(e.target.value)}
      >
        <option value="">Seleccionar proveedor...</option>
        {proveedores.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      {proveedorSeleccionado && (
        <div className="detalle-proveedor">
          <button
            className="toggle-detalle"
            onClick={() => setMostrarDetalle(!mostrarDetalle)}
          >
            {mostrarDetalle ? 'Ocultar detalles ▲' : 'Ver detalles ▼'}
          </button>
          {mostrarDetalle && (
            <div className="detalle-box">
              {(() => {
                const prov = proveedores.find((p) => p.id === parseInt(proveedorSeleccionado));
                return (
                  <>
                    <strong>{prov.nombre}</strong>
                    <p>IVA: {prov.iva}%</p>
                    <p>Percepción: {prov.percepcion}%</p>
                    <p>Descuento: {prov.descuento}%</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      <label>Tipo de Factura</label>
      <select value={tipoFactura} onChange={(e) => setTipoFactura(e.target.value)}>
        <option value="A">Factura A (con IVA)</option>
        <option value="B">Factura B (sin impuestos)</option>
        <option value="X">Remito X</option>
      </select>

      <label>IVA Proveedor (%)</label>
      <input
        type="number"
        value={proveedorIva}
        disabled={tipoFactura !== 'A'}
        placeholder="Porcentaje de IVA"
        onChange={(e) => setProveedorIva(parseFloat(e.target.value))}
      />

      <label>Percepción (%)</label>
      <input
        type="number"
        value={percepcion}
        disabled={tipoFactura !== 'A'}
        placeholder="Percepción si aplica"
        onChange={(e) => setPercepcion(parseFloat(e.target.value))}
      />

      <label>Descuento del proveedor (%)</label>
      <input
        type="number"
        value={descuento}
        placeholder="Descuento comercial o financiero"
        onChange={(e) => setDescuento(parseFloat(e.target.value))}
      />

      <div className="campo-costo-neto">
        <label className="label-costo">Costo Neto</label>
        <input
          type="number"
          value={costoNeto}
          onChange={(e) => setCostoNeto(parseFloat(e.target.value))}
          placeholder="Precio base sin impuestos"
        />
      </div>

      <label>Tipo de Producto</label>
      <select value={tipoProducto} onChange={(e) => setTipoProducto(e.target.value)}>
        <option value="pesable">Pesable (Fiambres, Quesos)</option>
        <option value="comestible">Comestible</option>
        <option value="limpieza">Limpieza</option>
      </select>

      <div className="resultado">
        <h3>Costo final con impuestos y descuento: ${costoFinal.toFixed(2)}</h3>
      </div>

      <h4>Precios sugeridos:</h4>
      <div className="grid">
        {Object.entries(margenes[tipoProducto]).map(([tipo, porcentaje]) => (
          <div key={tipo} className="card">
            <p>{tipo.toUpperCase()}</p>
            <strong>${calcularPrecio(porcentaje)}</strong>
          </div>
        ))}
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
