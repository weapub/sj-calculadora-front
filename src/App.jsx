import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ProveedorForm from "./components/ProveedorForm.jsx";
import ProductoForm from "./components/ProductoForm.jsx";

export default function App() {
  const [active, setActive] = useState(() => localStorage.getItem("panel-active") || "productos");
  useEffect(() => { localStorage.setItem("panel-active", active); }, [active]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar active={active} onSelect={setActive} />
        <main className="flex-1 p-6">
          {active === "productos" && <ProductoForm />}
          {active === "proveedores" && <ProveedorForm />}
        </main>
      </div>
    </div>
  );
}
