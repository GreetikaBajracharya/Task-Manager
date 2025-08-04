import express from "express";
import {createGroup, getGroupsByFolder, deleteGroup } from "../controllers/groupController.js";
const router = express.Router();

router.post("/", createGroup);
router.get("/:folder_id", getGroupsByFolder);
router.delete("/:id", deleteGroup);

export default router;
