const API_URL = import.meta.env.VITE_API_URL;

export async function getProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  return res.json();
}

export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateProveedor(id, data) {
  const res = await fetch(`${API_URL}/proveedores/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteProveedor(id) {
  const res = await fetch(`${API_URL}/proveedores/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function getProductoPorCodigo(codigo) {
  const res = await fetch(`${API_URL}/productos/${codigo}`);
  if (!res.ok) throw new Error('not found');
  return res.json();
}

export async function searchProductos(q) {
  const res = await fetch(`${API_URL}/productos?q=${encodeURIComponent(q)}`);
  return res.json();
}

export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
