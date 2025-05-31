import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Asegura que cada solicitud lleve el token de autenticación
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

// Obtener tareas
export const getTasks = () =>
  axios.get(`${API_URL}/tasks`, authHeader());

// Crear tarea
export const createTask = (taskData) =>
  axios.post(`${API_URL}/tasks`, taskData, authHeader());

// Actualizar tarea
export const updateTask = (id, updatedData) =>
  axios.put(`${API_URL}/tasks/${id}`, updatedData, authHeader());

// Eliminar tarea
export const deleteTask = (id) =>
  axios.delete(`${API_URL}/tasks/${id}`, authHeader());

// Subtareas (USANDO IDs en lugar de índices)
export const addSubtask = (taskId, subtask) =>
  axios.post(`${API_URL}/tasks/${taskId}/subtasks`, subtask, authHeader());

export const updateSubtask = (taskId, subtaskId, subtask) =>
  axios.put(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, subtask, authHeader());

export const deleteSubtask = (taskId, subtaskId) =>
  axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, authHeader());

export const toggleSubtaskStatus = (taskId, subtaskId) =>
  axios.patch(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}/toggle`, {}, authHeader());

// Login
export const login = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);

// Register
export const register = (credentials) =>
  axios.post(`${API_URL}/auth/register`, credentials);
