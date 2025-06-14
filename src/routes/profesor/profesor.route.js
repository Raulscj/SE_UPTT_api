import { Router } from "express";

import { login, register } from "../../controllers/authController.js";
import {
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdmin,
} from "../../controllers/adminController.js";
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", getAdmin);

router.post("/login", login);

router.post("/create", register);

router.route("/:id").get(getOneAdmin).put(updateAdmin).delete(deleteAdmin);

export default router;
