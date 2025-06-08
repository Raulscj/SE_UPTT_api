import { Router } from "express";

// TODO: import auth from "./auth/login/auth";
import profesor from "./profesor/profesor.route.js";

const router = Router();

// Ruta principal
router.get("/", (req, res) => {
  res.send(
    "¡Servidor y base de datos conectados correctamente usando ES Modules!"
  );
});

//Ruta de docentes
router.use("/teaches", profesor);

//router.use("/auth", auth);

export default router;
