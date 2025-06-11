import { AppDataSource } from "../../db.js";
import { StudentSchema } from "../entities/Student.js";

export const StudentRepository = AppDataSource.getRepository(
  StudentSchema
).extend({});
