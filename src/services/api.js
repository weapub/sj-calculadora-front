// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  if (!res.ok) throw new Error("Error al obtener proveedores");
  return res.json();
}

export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar proveedor");
  return res.json();
}

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar producto");
  return res.json();
}
