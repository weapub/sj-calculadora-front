import React from 'react';
import CalculadoraPreciosWeb from './components/CalculadoraPreciosWeb.jsx';
import BuscadorProductos from './components/BuscadorProductos.jsx';

export default function App() {
  return (
    <div style={{maxWidth: 900, margin: '30px auto'}}>
      <h1 style={{textAlign:'center'}}>🧮 Sistema de Gestión de Precios</h1>
      <CalculadoraPreciosWeb />
      <hr style={{ margin: '30px 0', opacity: .2 }} />
      <BuscadorProductos />
    </div>
  );
}
