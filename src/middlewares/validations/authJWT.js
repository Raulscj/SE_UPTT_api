import jwt from "jsonwebtoken";

//import RoleUserRepository from "@/database/repositories/RoleUserRepository";
import { SECRET } from "../../../constants.js";
import { AdminRepository } from "../../database/repository/AdminRepository.js";

export async function verifyToken(req, resp, next) {
  try {
    const bearer = req.headers.authorization;
    const token = bearer?.split(" ")[1];

    if (!token) {
      resp.status(403).json({
        status: false,
        message: "Falta el token de autenticación",
      });

      return;
    }

    const decodeToken = jwt.verify(token, SECRET);

    const admin = await AdminRepository.findOneBy({ id: decodeToken?.id });
    req.admin = admin;

    next();
  } catch (error) {
    console.log("verifyToken error:", String(error));
    resp.status(401).json({
      status: false,
      message: "No se pudo verificar el token de autenticación",
    });
  }
}

//TODO: Falta agregar el role
export async function isAutorized({ rolToCheck, admin }) {
  if (admin) {
    const roleUser = await RoleUserRepository.findOne({
      where: {
        admin_id: admin.id,
      },
      relations: ["role"],
    });
    return roleUser?.role.name === rolToCheck;
  }
  return false;
}

export async function isSuperAdmin(req, resp, next) {
  const autorizado = await isAutorized({
    rolToCheck: "SUPERADMIN",
    admin: req.admin,
  });
  if (!autorizado) {
    resp.status(403).json({
      status: false,
      message: "Forbidden!",
    });
    return;
  }

  next();
}
