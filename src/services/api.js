// 📡 Archivo de conexión a la API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// 🔹 Función genérica para manejar errores
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}

// ==========================
// 🧾 PROVEEDORES
// ==========================

// 📋 Obtener todos los proveedores
export async function getProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  return handleResponse(res);
}

// ➕ Crear nuevo proveedor
export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ==========================
// 🧮 PRODUCTOS
// ==========================

// 📋 Obtener todos los productos
export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  return handleResponse(res);
}

// ➕ Crear nuevo producto
export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ==========================
// 🧠 UTILIDAD
// ==========================
export function getApiUrl() {
  return API_URL;
}
