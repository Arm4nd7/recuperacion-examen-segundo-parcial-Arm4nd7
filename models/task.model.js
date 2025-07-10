let tasks = [];
let nextId = 1;

export class TaskModel {

  static postOne(data) {
    if (!data.title || !data.description || !data.priority) {
      throw new Error("El título, la descripción y la prioridad son obligatorios.");
    }
    // if (data.priority < 1 || data.priority > 5) {
    //   throw new Error("La prioridad debe estar entre 1 y 5.");
    // }

    const newTask = {
      id: nextId,
      title: data.title,
      description: data.description,
      completed: data.completed,
      priority: data.priority,
    };

    tasks.push(newTask);
    nextId = nextId + 1;
    return newTask;
  }

  static updateOne(idToUpdate, newData) {
    let taskFound = null;
    let taskIndex = -1;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(idToUpdate)) {
        taskFound = tasks[i];
        taskIndex = i;
        break;
      }
    }

    if (!taskFound) {
      return null; 
    }

    if (newData.title !== undefined) {
      taskFound.title = newData.title;
    }
    if (newData.description !== undefined) {
      taskFound.description = newData.description;
    }
    if (newData.completed !== undefined) {
      taskFound.completed = newData.completed;
    }
   
    if (newData.priority !== undefined) {
      if (newData.priority < 1 || newData.priority > 5) {
        throw new Error("La prioridad debe estar entre 1 y 5."); 
      }
      taskFound.priority = newData.priority;
    }


    return taskFound;
  }

  static deleteOne(idToDelete) {
    const originalLength = tasks.length;
    let newTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== parseInt(idToDelete)) {
        newTasks.push(tasks[i]);
      }
    }

    tasks = newTasks;
    return tasks.length < originalLength;
  }

  static getAll() {
    return tasks;
  }

  static getOne(id) {
    return tasks.find(task => task.id === parseInt(id));
  }

  static getSummary() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed);

    let averagePriority = 0; 
    if (pendingTasks.length > 0) {
      const totalPriority = pendingTasks.reduce((sum, task) => sum + task.priority, 0);
      averagePriority = totalPriority / pendingTasks.length; 
    }

    return {
      total: totalTasks,
      completed: completedTasks,
      averagePriority: parseFloat(averagePriority.toFixed(2)), 
    };
  }
}