import { Router } from "express";

/** 
import {
  //view,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller";
 */
// TODO:import verifytoken from "../../middlewares/verifytoken";

// Creación de la ruta
const router = Router();

router.get("/", (req, res) => {
  res.send("¡Bienvenido al area de docencia!");
});
/*
router.get("/", verifytoken, getUsers);

router.post("/", verifytoken, createUser);

router.put("/", verifytoken, updateUser);

router.delete("/", verifytoken, deleteUser);
*/
export default router;
