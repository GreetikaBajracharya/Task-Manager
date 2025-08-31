import express from "express";
import {inputTask, getTasksByGroup, getATask, updateTask, deleteTask} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", inputTask);

router.get("/group/:group_id", getTasksByGroup);

router.get("/:id", getATask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;