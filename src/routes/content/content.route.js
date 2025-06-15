import { Router } from "express";

//Controllers
import {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  getOneContent,
} from "../../controllers/contentController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/contentRequest.js";

// Creación de la ruta
const router = Router();

router.get("/", getContent);

router.post("/create", [verifyToken, createRule], createContent);

router
  .route("/:id")
  .get(getOneContent)
  .put([verifyToken, updateRule], updateContent)
  .delete([verifyToken, deleteRule], deleteContent);

export default router;
