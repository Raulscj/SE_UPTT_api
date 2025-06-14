import { getRepository } from "typeorm";
import { AdminRepository } from "../repository/AdminRepository.js";

export const seedAdmin = async () => {
  // Verifica si ya existen datos para evitar duplicaciones
  const existingAdmins = await AdminRepository.count();
  if (existingAdmins > 3) {
    console.log("Los Administradores ya han sido insertados previamente.");
    return;
  }

  // Datos iniciales de usuarios
  const admins = [
    {
      nombre_completo: "Alice",
      cedula: "123.456.789",
      credential: "123qwe",
    },
    {
      nombre_completo: "Bob",
      cedula: "456.789.123",
      credential: "456asd",
    },
    {
      nombre_completo: "Charlie",
      cedula: "789.456.123",
      credential: "789zxc",
    },
  ];

  for (const admin of admins) {
    await AdminRepository.createWithPassword(admin);
  }
  console.log("Administradores insertados correctamente.");
};
