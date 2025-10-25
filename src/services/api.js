const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}

// PROVEEDORES
export async function getProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  return handleResponse(res);
}
export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// PRODUCTOS
export async function getProductos(query) {
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  const res = await fetch(`${API_URL}/productos${q}`);
  return handleResponse(res);
}
export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
