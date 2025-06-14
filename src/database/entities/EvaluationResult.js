import { EntitySchema } from "typeorm";

import { EvaluationSchema } from "./Evaluation.js";
import { StudentSchema } from "./Student.js";

export const EvaluationResultSchema = new EntitySchema({
  name: "EvaluationResult",
  tableName: "Resultados_evaluaciones",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_estudiante: {
      type: "int",
      nullable: false,
    },
    id_evaluacion: {
      type: "int",
      nullable: false,
    },
    respuesta_seleccionada: {
      type: "varchar",
      length: 1,
      nullable: false,
    },
    es_correcta: {
      type: "boolean",
      nullable: false,
    },
    fecha_respuesta: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },

  relations: {
    evaluacion: {
      type: "many-to-one",
      target: EvaluationSchema,
      joinColumn: { name: "id_evaluacion" },
      onDelete: "CASCADE",
    },
    estudiante: {
      type: "many-to-one",
      target: StudentSchema,
      joinColumn: { name: "id_estudiante" },
      onDelete: "CASCADE",
    },
  },
});
