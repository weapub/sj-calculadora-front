# 🧮 Calculadora de Precios — Fullstack (Render + Vercel)

Aplicación completa para gestión de precios, proveedores y productos con backend Node.js + PostgreSQL (Render) y frontend React + Vite (Vercel).

---

## 🚀 Estructura del Proyecto

```
calculadora-precios/
├── backend/        # API REST en Node.js + Express + PostgreSQL
└── frontend/       # Interfaz web en React + Vite
```

---

## ⚙️ Backend — Render

### 1️⃣ Configuración

1. Crear un servicio **Web Service** en [Render](https://render.com).
2. Conectar el repositorio con la carpeta `backend/`.
3. En **Environment Variables**, agregar:

| Key | Value |
|-----|--------|
| DATABASE_URL | postgresql://calculadora_9x08_user:engCjbiXCPZBQ9GTLlfiLkjbUJd3HB2K@dpg-d3tvikmr433s73e0cigg-a.oregon-postgres.render.com/calculadora_9x08 |
| PGSSL | require |
| PORT | 4000 |

4. Build Command: `npm install`  
   Start Command: `npm start`

Render te dará una URL como:
```
https://sj-calculadora.onrender.com
```

### 2️⃣ Endpoints principales

| Método | Ruta | Descripción |
|---------|------|-------------|
| GET | `/proveedores` | Lista todos los proveedores |
| POST | `/proveedores` | Agrega nuevo proveedor |
| GET | `/productos` | Lista productos |
| GET | `/productos/:codigo` | Busca producto por código |
| POST | `/productos` | Crea nuevo producto |

---

## 💻 Frontend — Vercel

### 1️⃣ Deploy

1. Subir la carpeta `frontend/` a GitHub como un repo separado (ej: `sj-calculadora-frontend`).
2. Entrar a [Vercel](https://vercel.com/new) y **importar el repo**.
3. Configurar:

| Campo | Valor |
|--------|--------|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Framework | `Vite` |

4. Agregar variable de entorno:

| Key | Value |
|------|--------|
| VITE_API_URL | https://sj-calculadora.onrender.com |

5. Deploy ✅

Vercel generará una URL como:
```
https://sj-calculadora.vercel.app
```

---

## 🔁 Flujo completo

1. Frontend se comunica con el backend en Render:
   ```
   GET https://sj-calculadora.onrender.com/proveedores
   ```
2. Backend responde con JSON de PostgreSQL.
3. Los cambios en GitHub redeployan automáticamente ambos servicios.

---

## 💾 Variables locales (desarrollo)

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/calculadora
PORT=4000
PGSSL=disable
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## 🧠 Tecnologías usadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL (Render)
- **Hosting:** Render (backend) + Vercel (frontend)

---

## 👨‍💻 Autor
Proyecto desarrollado por **Wea Publicidad** (Formosa, Argentina).  
Diseño optimizado para uso empresarial y comercial en gestión de precios y productos.
