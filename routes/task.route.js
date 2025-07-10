import { Router } from "express";
import {
  getAllTask,
  getOneTask,    
  postOneTask,   
  updateOneTask,
  deleteOneTask,
  getSummary     
} from "../controllers/task.controllers.js"; 

const route = Router();

route.get('/tasks', getAllTask);

route.get('/tasks', getAllTask);

route.get('/tasks/priority/:level', getAllTask);


route.post('/tasks', postOneTask);

route.put('/tasks/:id', updateOneTask);

route.delete('/tasks/:id', deleteOneTask);

route.get('/tasks/summary', getSummary);

route.get('/tasks/:id', getOneTask);


export default route;