import { EntitySchema } from "typeorm";

export const AdminSchema = new EntitySchema({
  name: "Admin",
  tableName: "Administradores",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre_completo: {
      type: "varchar",
      length: 255,
    },
    cedula: {
      type: "varchar",
      unique: true,
      length: 50,
    },
    credential: {
      type: "varchar",
      length: 100,
    },
    activo: {
      type: "boolean",
      default: true,
    },
  },
});
