import pkg from "jsonwebtoken";

import { AdminRepository } from "../database/repository/AdminRepository.js";
import { EXPIRES, SECRET } from "../../constants.js";

const { sign } = pkg;

//const expiresIn = EXPIRES ? String(EXPIRES) : "15m";
const expiresIn = typeof EXPIRES === "number" ? EXPIRES : "15m";

function responseAndLogger(res, message, status = 500) {
  if (status >= 500) {
    console.error(`${message} (${status})`);
  } else {
    console.log(`${message} (${status})`);
  }

  res.status(status).send({ message });
}

export const register = (req, res) => {
  const { nombre_completo, cedula, credential } = req.body;

  AdminRepository.findOneByOrFail({ cedula })
    .then(() => {
      responseAndLogger(res, "Administrador ya existe", 406);
    })
    .catch(() => {
      const admin = AdminRepository.create({
        nombre_completo,
        cedula,
        credential,
        activo: true,
      });

      AdminRepository.createWithPassword(admin)
        .then((admin) => res.send(admin))
        .catch((error) => responseAndLogger(res, error.message, 500));
    });
};

export const login = async (req, res) => {
  const { cedula, credential } = req.body;

  try {
    const admin = await AdminRepository.findOneByOrFail({ cedula });
    const isValid = await AdminRepository.comparePassword(admin, credential);

    if (isValid) {
      sign(
        { id: admin.id, cedula: admin.cedula },
        SECRET,
        { expiresIn },
        (err, token) => {
          if (err || !token) {
            responseAndLogger(res, "No fue posible generar el Token", 400);
          }
          return res.send({ token });
        }
      );
    } else {
      responseAndLogger(res, "Credencial invalida", 400);
    }
  } catch (error) {
    console.log("This is the error:", error);
    responseAndLogger(res, "Administrador invalido", 400);
  }
};
