import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  toggleSubtaskStatus
} from "../controllers/taskController.js";

const router = express.Router();

// Rutas para tareas
router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

// Rutas para subtareas
router.post("/:id/subtasks", auth, addSubtask);
router.put("/:id/subtasks/:subtaskId", auth, updateSubtask);
router.delete("/:id/subtasks/:subtaskId", auth, deleteSubtask);
router.patch("/:id/subtasks/:subtaskId/toggle", auth, toggleSubtaskStatus);


export default router;
