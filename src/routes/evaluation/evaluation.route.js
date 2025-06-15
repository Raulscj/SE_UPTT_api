import { Router } from "express";

import {
  createEvaluation,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getOneEvaluation,
} from "../../controllers/evaluationController.js";
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", getEvaluation);

router.post("/create", createEvaluation);

router
  .route("/:id")
  .get(getOneEvaluation)
  .put(updateEvaluation)
  .delete(deleteEvaluation);

export default router;
