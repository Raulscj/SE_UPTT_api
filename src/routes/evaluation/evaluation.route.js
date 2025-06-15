import { Router } from "express";

//Controllers
import {
  createEvaluation,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getOneEvaluation,
} from "../../controllers/evaluationController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/evaluationRequest.js";

// Creación de la ruta
const router = Router();

router.get("/", getEvaluation);

router.post("/create", [verifyToken, createRule], createEvaluation);

router
  .route("/:id")
  .get(getOneEvaluation)
  .put([verifyToken, updateRule], updateEvaluation)
  .delete([verifyToken, deleteRule], deleteEvaluation);

export default router;
