import { AppDataSource } from "../../db.js";
import { ProjectSchema } from "../entities/Projects.js";

export const ProjectRepository = AppDataSource.getRepository(
  ProjectSchema
).extend({});
