# ✅ TODO-App con Subtareas

Una aplicación de gestión de tareas construida con MERN Stack (MongoDB, Express, React, Node.js) que permite:

- Registrar e iniciar sesión de usuario
- Crear, editar y eliminar tareas
- Agregar subtareas por cada tarea
- Marcar tareas y subtareas como completadas o pendientes
- Estado de la tarea padre depende de las subtareas

---

## 🛠️ Tecnologías usadas

- Frontend: React, SCSS
- Backend: Node.js, Express
- Base de datos: MongoDB (Atlas)
- Autenticación: JWT
- Despliegue sugerido: Vercel (frontend), Render o Railway (backend)

---

## 🚀 Instalación local

### 1. Clona el proyecto

- bash
- git clone https://github.com/tuusuario/tu-repo.git
- cd tu-repo

---

### 2. Instala las dependencias

Backend
- cd backend
- npm install

Frontend
- cd ../frontend
- npm install

---

### 3. Configuración de entorno

Backend .env
- Crea un archivo .env en la carpeta backend
- Configura con lo siguiente:
    PORT=5000
    MONGO_URI=tu_mongo_uri
    JWT_SECRET=micontraseñasecreta

---

### 4. Ejecutar la app localmente

Inicia el backend
- cd backend
- npm run dev

Inicia el frontend
- cd frontend
- npm run dev

Ve a http://localhost:5173 en tu navegador

