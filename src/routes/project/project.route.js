import { Router } from "express";

import {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getOneProject,
} from "../../controllers/projectController.js";
// TODO:import verifytoken from "../../middlewares/verifytoken";

const router = Router();

router.get("/", getProject);

router.post("/create", createProject);

router
  .route("/:id")
  .get(getOneProject)
  .put(updateProject)
  .delete(deleteProject);

export default router;
