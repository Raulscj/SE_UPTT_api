import { Router } from "express";

import {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  getOneContent,
} from "../../controllers/contentController.js";
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", getContent);

// TODO: Requiere que exista un ID de proyecto valido
router.post("/create", createContent);

router
  .route("/:id")
  .get(getOneContent)
  .put(updateContent)
  .delete(deleteContent);

export default router;
