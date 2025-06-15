import { Router } from "express";

import {
  createEvaluationResult,
  getEvaluationResult,
  updateEvaluationResult,
  deleteEvaluationResult,
  getOneEvaluationResult,
} from "../../controllers/evaluationResultController.js";
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", getEvaluationResult);

router.post("/create", createEvaluationResult);

router
  .route("/:id")
  .get(getOneEvaluationResult)
  .put(updateEvaluationResult)
  .delete(deleteEvaluationResult);

export default router;
