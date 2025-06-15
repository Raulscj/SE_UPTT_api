import { Router } from "express";

//Controllers
import {
  createEvaluationResult,
  getEvaluationResult,
  updateEvaluationResult,
  deleteEvaluationResult,
  getOneEvaluationResult,
} from "../../controllers/evaluationResultController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/evaluationResultRequest.js";

// Creación de la ruta
const router = Router();

router.get("/", getEvaluationResult);

router.post("/create", [verifyToken, createRule], createEvaluationResult);

router
  .route("/:id")
  .get(getOneEvaluationResult)
  .put([verifyToken, updateRule], updateEvaluationResult)
  .delete([verifyToken, deleteRule], deleteEvaluationResult);

export default router;
