const API_URL = import.meta.env.VITE_API_URL;

// 🧾 Obtener proveedores
export async function fetchProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  if (!res.ok) throw new Error("Error al cargar proveedores");
  return res.json();
}

// ➕ Agregar proveedor
export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar proveedor");
  return res.json();
}

// 🧾 Obtener productos
export async function fetchProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

// ➕ Agregar producto
export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar producto");
  return res.json();
}
