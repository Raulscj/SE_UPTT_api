import { Router } from "express";

import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getOneStudent,
} from "../../controllers/studentController";
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", getStudent);

router.post("/create", createStudent);

router
  .route("/:id")
  .get(getOneStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
