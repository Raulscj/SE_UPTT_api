import { AppDataSource } from "../../db.js";
import { ContentSchema } from "../entities/Contents.js";

export const ContentRepository = AppDataSource.getRepository(
  ContentSchema
).extend({});
