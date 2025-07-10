import express from "express";
import Taskroute from './routes/task.route.js'; 

const app = express();

app.use(express.json());
app.use(Taskroute); 
const port = 3000;


app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

export default app;