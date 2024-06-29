import { Router } from "express";
const router = Router();
import task from "../controllers/taskController";

router.get("/getTask", task.getTasks);

router.post("/addTask", task.addTask);

router.put("/updateTask/:id", task.updateTask);

router.delete("/deleteTask/:id", task.deleteTask);

export default router