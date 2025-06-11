import "reflect-metadata";

import middleWares from "./middlewares/index.js";
import routers from "./routes/index.js";
import Server from "./server.js";

import { AppDataSource } from "./db.js";
import { PORT } from "../constants.js";
import { seedAdmin } from "./database/seeders/admin.js";

// Configuración del puerto
const port = Number(PORT) || 3000;

// Creación del servicio
const server = new Server({
  port,
  middleWares: middleWares,
  routes: [routers],
});
server.listen();

// Conexión a la base de datos
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    await seedAdmin();
    console.log("Running successfully");
  })
  .catch((err) => {
    console.log("Error during Data Source initialization:", err);
  });
