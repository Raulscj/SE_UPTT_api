import { EntitySchema } from "typeorm";

export const ProjectSchema = new EntitySchema({
  name: "Project",
  tableName: "Proyectos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre_proyecto: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
    orden_proyecto: {
      type: "int",
      nullable: false,
    },
    activo: {
      type: "boolean",
      default: true,
    },
  },
});
