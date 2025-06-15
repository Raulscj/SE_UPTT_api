import { Router } from "express";

//Controllers
import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getOneStudent,
} from "../../controllers/studentController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/studentRequest.js";

// Creación de la ruta
const router = Router();

router.get("/", getStudent);

router.post("/create", [verifyToken, createRule], createStudent);

router
  .route("/:id")
  .get(getOneStudent)
  .put([verifyToken, updateRule], updateStudent)
  .delete([verifyToken, deleteRule], deleteStudent);

export default router;
