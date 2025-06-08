// Importación de reflect-metadata (obligatoria para TypeORM)
require("reflect-metadata");

const express = require("express");
const { createConnection } = require("typeorm");

// Establece la conexión a la base de datos usando la configuración de ormconfig.json
createConnection()
  .then(() => {
    const app = express();

    // Middlewares para procesar JSON
    app.use(express.json());

    // Ruta de ejemplo: home / inicio
    app.get("/", (req, res) => {
      res.send("¡Servidor y base de datos conectados correctamente!");
    });

    // Aquí podrías integrar tus rutas adicionales importándolas de src/routes/

    // Inicia el servidor en el puerto 3000 (o el que desees)
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });
