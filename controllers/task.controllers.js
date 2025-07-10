import { TaskModel } from '../models/task.model.js';

export const postOneTask = (req, res) => {
  const data = req.body;
  if (!data.title || !data.description || !data.priority) {
    return res.status(400).json({ message: 'Título, descripción y prioridad son obligatorios.' });
  }
  try {
    const newTask = TaskModel.postOne(data);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteOneTask = (req, res) => {
  const { id } = req.params;
  const wasDeleted = TaskModel.deleteOne(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: 'Tarea no encontrada para eliminar.' });
  }
  return res.status(200).json({ message: 'Tarea eliminada exitosamente.' });
};


export const getAllTask = (req, res) => {
  const allTasks = TaskModel.getAll();
  const idlevel = req.params.level

  /*CREACION DE FUNCIONALIDAD*/
  if(1 < idlevel || idlevel > 5){
    return res.status(200).json({ message: 'fuera de rango' });
  }
  return res.status(200).json(allTasks);
};

export const getOneTask = (req, res) => {
  const { id } = req.params;
  const task = TaskModel.getOne(id);
  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada.' });
  }
  return res.status(200).json(task);
};

export const updateOneTask = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedTask = TaskModel.updateOne(id, newData);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada para actualizar.' });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getSummary = (req, res) => {
  const summary = TaskModel.getSummary();
  return res.status(200).json(summary);
};