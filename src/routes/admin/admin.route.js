import { Router } from "express";

//Controllers
import { login, register } from "../../controllers/authController.js";
import {
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdmin,
} from "../../controllers/adminController.js";
//Middlewares
import { verifyToken } from "../../middlewares/validations/authJWT.js";
import {
  createRule,
  deleteRule,
  updateRule,
} from "../../middlewares/validations/adminRequest.js";

// Creación de la ruta
const router = Router();

router.get("/", getAdmin);

router.post("/login", login);

router.post("/create", [createRule], register);

router
  .route("/:id")
  .get(getOneAdmin)
  .put([verifyToken, updateRule], updateAdmin)
  .delete([verifyToken, deleteRule], deleteAdmin);

export default router;
