import { DataSource } from "typeorm";
import { DATABASE } from "../constants.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `./${DATABASE}.sqlite`,
  synchronize: true,
  logging: true,
  entities: ["src/database/entities/*.js"],
});
