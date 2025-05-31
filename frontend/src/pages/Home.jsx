import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  toggleSubtaskStatus
} from '../services/api';

const Home = () => {
  const { user } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('todas');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [subtaskInput, setSubtaskInput] = useState({});
  const [editingSubtask, setEditingSubtask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const { data } = await createTask({ title: newTask });
      setTasks((prev) => [...prev, data]);
      setNewTask('');
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditText(task.title);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: updated } = await updateTask(editingTask._id, { title: editText });
      setTasks(prev =>
        prev.map(task => (task._id === updated._id ? updated : task))
      );
      setEditingTask(null);
      setEditText('');
    } catch (error) {
      console.error('Error al editar tarea:', error);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pendiente' ? 'completada' : 'pendiente';
    try {
      const { data: updated } = await updateTask(task._id, { status: newStatus });
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const handleAddSubtask = async (taskId, title) => {
    if (!title.trim()) return;
    try {
      const { data: updated } = await addSubtask(taskId, { title });
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
      setSubtaskInput((prev) => ({ ...prev, [taskId]: '' }));
    } catch (error) {
      console.error("Error al agregar subtarea:", error);
    }
  };

  const handleEditSubtask = async (taskId, subtaskId, newTitle) => {
    try {
      const { data: updated } = await updateSubtask(taskId, subtaskId, { title: newTitle });
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
      setEditingSubtask(prev => ({ ...prev, [`${taskId}-${subtaskId}`]: undefined }));
    } catch (error) {
      console.error("Error al editar subtarea:", error);
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      const { data: updated } = await deleteSubtask(taskId, subtaskId);
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
    } catch (error) {
      console.error("Error al eliminar subtarea:", error);
    }
  };

  const handleToggleSubtaskStatus = async (taskId, subtaskId) => {
    try {
      const { data: updated } = await toggleSubtaskStatus(taskId, subtaskId);
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
    } catch (error) {
      console.error("Error al cambiar estado de subtarea:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'todas') return true;
    return task.status === filter;
  });

  return (
    <div className="container">
      <h1>Bienvenid@ {user?.username || 'invitado'}</h1>

      <form onSubmit={handleCreateTask} className="form-task">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="button" type="submit">Agregar tarea</button>
      </form>

      {editingTask && (
        <form onSubmit={handleEditSubmit} className="form-edit-task">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="button" type="submit">Guardar</button>
          <button type="button" onClick={cancelEdit}>Cancelar</button>
        </form>
      )}

      <hr />

      <div className='filters'>
        <label>Filtrar tareas: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendiente">Pendientes</option>
          <option value="completada">Completadas</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No hay tareas en esta categoría.</p>
      ) : (
        <ul className='list-tasks'>
          {filteredTasks.map((task) => (
            <li key={task._id} className='task-item'>
              <div className="task-father">
                <strong className={task.status === "completada" ? "task-completed" : ""}>
                    {task.title}
                  </strong> – {task.status}
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === "pendiente" ? "✅" : "↩️"}
                  </button>
                  <button onClick={() => startEditing(task)}>✏️</button>
                  <button onClick={() => handleDelete(task._id)}>🗑️</button>
              </div>
              <div className="subtask-section">
                <input
                  type="text"
                  placeholder="Nueva subtarea"
                  value={subtaskInput[task._id] || ''}
                  onChange={(e) =>
                    setSubtaskInput(prev => ({ ...prev, [task._id]: e.target.value }))
                  }
                />
                <button
                  className="button"
                  onClick={() => handleAddSubtask(task._id, subtaskInput[task._id] || '')}
                >
                  Agregar subtarea
                </button>

                <ul className='list-subtasks'>
                  {task.subtasks?.map((sub) => (
                    <li key={sub._id}>
                      {editingSubtask[`${task._id}-${sub._id}`] !== undefined ? (
                        <>
                          <input
                            type="text"
                            value={editingSubtask[`${task._id}-${sub._id}`]}
                            onChange={(e) =>
                              setEditingSubtask(prev => ({
                                ...prev,
                                [`${task._id}-${sub._id}`]: e.target.value
                              }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleEditSubtask(task._id, sub._id, editingSubtask[`${task._id}-${sub._id}`])
                            }
                          >
                            Guardar
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingSubtask(prev => ({
                                ...prev,
                                [`${task._id}-${sub._id}`]: undefined
                              }))
                            }
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <span className={sub.status === "completada" ? "task-completed" : ""}>
                            {sub.title}
                          </span> – {sub.status}
                          <button
                            type="button"
                            onClick={() => handleToggleSubtaskStatus(task._id, sub._id)}
                          >
                            {sub.status === "pendiente" ? "✅" : "↩️"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingSubtask(prev => ({ ...prev, [`${task._id}-${sub._id}`]: sub.title }))
                            }
                          >
                            ✏️
                          </button>
                          <button type="button" onClick={() => handleDeleteSubtask(task._id, sub._id)}>
                            🗑️
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
