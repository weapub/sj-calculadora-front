import React from "react";
import { Package, UserCircle2 } from "lucide-react";

export default function Sidebar({ active, onSelect }) {
  const Item = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onSelect(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${active === id ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white p-4 sticky top-0">
      <div className="mb-6">
        <h1 className="text-lg font-bold">🧮 Gestor de Precios</h1>
        <p className="text-xs text-slate-400">Wea Publicidad</p>
      </div>
      <nav className="space-y-2">
        <Item id="productos" icon={Package} label="Productos" />
        <Item id="proveedores" icon={UserCircle2} label="Proveedores" />
      </nav>
      <div className="absolute bottom-4 left-4 right-4 text-[11px] text-slate-500">
        <p>API: <code className="text-slate-300">{import.meta.env.VITE_API_URL}</code></p>
      </div>
    </aside>
  );
}
