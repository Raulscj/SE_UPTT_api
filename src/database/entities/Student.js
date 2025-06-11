import { EntitySchema } from "typeorm";

export const StudentSchema = new EntitySchema({
  name: "Student", // Nombre para identificar la entidad
  tableName: "Students", // Nombre de la tabla en SQLite
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre_completo: {
      type: "varchar",
      length: 150,
    },
    grado: {
      type: "varchar",
      length: 2,
    },
    seccion: {
      type: "varchar",
      length: 1,
    },
    numero_de_lista: {
      type: "int",
    },
  },
});
