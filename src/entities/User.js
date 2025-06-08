import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
  name: "User", // Nombre para identificar la entidad
  tableName: "users", // Nombre de la tabla en SQLite
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
  },
});
