import { AppDataSource } from "../../db.js";
import { EvaluationResultSchema } from "../entities/EvaluationResult.js";

export const EvaluationResultRepository = AppDataSource.getRepository(
  EvaluationResultSchema
).extend({});
