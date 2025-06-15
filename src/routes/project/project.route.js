import { Router } from "express";

//Controllers
import {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getOneProject,
} from "../../controllers/projectController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/projectRequest.js";

const router = Router();

router.get("/", getProject);

router.post("/create", [verifyToken, createRule], createProject);

router
  .route("/:id")
  .get(getOneProject)
  .put([verifyToken, updateRule], updateProject)
  .delete([verifyToken, deleteRule], deleteProject);

export default router;
