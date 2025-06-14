import { AppDataSource } from "../../db.js";
import { EvaluationSchema } from "../entities/Evaluation.js";

export const EvaluationRepository = AppDataSource.getRepository(
  EvaluationSchema
).extend({});
