import Task from "../models/Task.js";

// Obtener tareas del usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// Crear nueva tarea
export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    if (req.body.status) {
      task.status = req.body.status;
    }

    if (req.body.title) {
      task.title = req.body.title;
    }

    if (task.subtasks?.length) {
      if (task.subtasks.some(st => st.status === "pendiente")) {
        task.status = "pendiente";
      }
    }

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    await task.deleteOne();
    res.json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};

// Agregar subtarea
export const addSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    const subtask = { title: req.body.title, status: "pendiente" };
    task.subtasks.push(subtask);
    task.status = "pendiente"; // Al agregar una subtarea nueva, la tarea no puede estar completada
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error al agregar subtarea:", error);
    res.status(500).json({ message: "Error al agregar subtarea" });
  }
};

// Actualizar subtarea
export const updateSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtarea no encontrada" });

    subtask.title = req.body.title || subtask.title;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error al editar subtarea:", error);
    res.status(500).json({ message: "Error al editar subtarea" });
  }
};

// Eliminar subtarea
export const deleteSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    task.subtasks = task.subtasks.filter(st => st._id.toString() !== req.params.subtaskId);
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error al eliminar subtarea:", error);
    res.status(500).json({ message: "Error al eliminar subtarea" });
  }
};

// Cambiar estado de subtarea
export const toggleSubtaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtarea no encontrada" });

    // Cambiar estado
    subtask.status = subtask.status === "pendiente" ? "completada" : "pendiente";

    // Si alguna subtarea queda pendiente, la tarea principal también lo está
    task.status = task.subtasks.some(st => st.status === "pendiente")
      ? "pendiente"
      : "completada";

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error al cambiar estado de subtarea:", error);
    res.status(500).json({ message: "Error al cambiar estado de subtarea" });
  }
};

