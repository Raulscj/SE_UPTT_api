import { EntitySchema } from "typeorm";

import { ProjectSchema } from "./Projects.js";

export const ContentSchema = new EntitySchema({
  name: "Content",
  tableName: "Contenidos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    titulo_contenido: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    teoria: {
      type: "text",
      nullable: false,
    },
    id_proyecto: {
      type: "int",
      nullable: false,
    },
    orden_contenido: {
      type: "int",
      default: 1,
    },
    activo: {
      type: "boolean",
      default: true,
    },

    teoria2: { type: "text", nullable: true },
    teoria3: { type: "text", nullable: true },
    teoria4: { type: "text", nullable: true },
    teoria5: { type: "text", nullable: true },
    teoria6: { type: "text", nullable: true },
    teoria7: { type: "text", nullable: true },
    teoria8: { type: "text", nullable: true },
    teoria9: { type: "text", nullable: true },
    teoria10: { type: "text", nullable: true },
  },
  relations: {
    proyecto: {
      type: "many-to-one",
      target: ProjectSchema,
      joinColumn: { name: "id_proyecto" },
      onDelete: "CASCADE",
    },
  },
});
