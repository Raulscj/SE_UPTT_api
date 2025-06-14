import { EntitySchema } from "typeorm";

import { ContentSchema } from "./Contents.js";
import { ProjectSchema } from "./Projects.js";

export const EvaluationSchema = new EntitySchema({
  name: "Evaluation",
  tableName: "Evaluaciones",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    pregunta: {
      type: "text",
      nullable: false,
    },
    opcion_a: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    opcion_b: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    opcion_c: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    respuesta_correcta: {
      type: "varchar",
      length: 1,
      nullable: false,
    },
    id_proyecto: {
      type: "int",
      nullable: false,
    },
    id_contenido: {
      type: "int",
      nullable: true,
    },
    puntos: {
      type: "int",
      default: 1,
    },
    activo: {
      type: "boolean",
      default: true,
    },
  },
  relations: {
    proyecto: {
      type: "many-to-one",
      target: ProjectSchema,
      joinColumn: { name: "id_proyecto" },
      onDelete: "CASCADE",
    },
    contenido: {
      type: "many-to-one",
      target: ContentSchema,
      joinColumn: { name: "id_contenido" },
      onDelete: "SET NULL",
    },
  },
});
