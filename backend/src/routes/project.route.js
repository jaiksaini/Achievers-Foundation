import express from "express";
import { getProjects, uploadProject, deleteProject } from "../controllers/project.controller.js";
import { uploadProjectImage } from "../config/multerConfig.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/add", uploadProjectImage.single("image"), uploadProject);
router.delete("/:id", deleteProject);

export default router;
