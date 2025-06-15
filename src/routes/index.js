import { Router } from "express";

import admin from "./admin/admin.route.js";
import content from "./content/content.route.js";
import evaluation from "./evaluation/evaluation.route.js";
import evaluationResult from "./evaluationResult/evaluationResult.route.js";
import project from "./project/project.route.js";
import student from "./students/students.route.js";

const router = Router();

// Ruta principal
router.get("/", (req, res) => {
  res.send("¡Servidor y base de datos conectados correctamente!");
});

//Ruta de administradores
router.use("/admin", admin);

//Ruta de contenido
router.use("/contenido", content);

//Ruta de evaluacion
router.use("/evaluacion", evaluation);

//Ruta de resultado de evaluacion
router.use("/resultados", evaluationResult);

//Ruta de proyectos
router.use("/proyectos", project);

//Ruta de estudiantes
router.use("/estudiantes", student);

export default router;
