// src/services/api.js
const API_URL = (import.meta.env.VITE_API_URL || 'https://sj-calculadora.onrender.com').replace(/\/$/, '');

function ensureJson(res) {
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    throw new Error(`Respuesta no JSON (status ${res.status}). Probable 404 HTML. URL pedida: ${res.url}`);
  }
}

async function handle(res) {
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} - ${txt.slice(0,120)}`);
  }
  ensureJson(res);
  return res.json();
}

export async function fetchProveedores() {
  const res = await fetch(`${API_URL}/proveedores`, { credentials: 'omit' });
  return handle(res);
}

export async function addProveedor(data) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'omit',
  });
  return handle(res);
}

export async function fetchProductos() {
  const res = await fetch(`${API_URL}/productos`, { credentials: 'omit' });
  return handle(res);
}

export async function addProducto(data) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'omit',
  });
  return handle(res);
}

// Debug opcional: ver en consola a dónde apunta
if (typeof window !== 'undefined') {
  console.log('[API_URL]', API_URL);
}
