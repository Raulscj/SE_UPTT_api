import { StudentRepository } from "../../database/repository/StudentRepository.js";

export async function createRule(req, res, next) {
  const resErr = res.status(422);
  const { nombre_completo, grado, seccion, numero_de_lista } = req.body ?? {};

  try {
    if (!nombre_completo || !grado || !seccion || !numero_de_lista) {
      resErr.json({
        data: null,
        status: false,
        message: "Por favor verifique los datos enviados, faltan datos.",
      });

      return;
    }

    next();
  } catch {
    resErr.json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
}

export async function updateRule(req, res, next) {
  const resErr = res.status(422);
  const { id } = req.params;

  try {
    if (!id) {
      resErr.json({
        data: null,
        status: false,
        message: "Por favor es necesario enviar el ID.",
      });
      return;
    }
    const entidad = await StudentRepository.findOneBy({
      id: Number(id),
    });

    if (!entidad) {
      resErr.json({
        data: null,
        status: false,
        message: "No existe ningún registro",
      });

      return;
    }

    next();
  } catch {
    resErr.json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
}

export async function deleteRule(req, res, next) {
  const resErr = res.status(422);
  const { id } = req.params;

  try {
    if (!id) {
      resErr.json({
        data: null,
        status: false,
        message: "Por favor es necesario enviar el ID.",
      });
      return;
    }

    const entidad = await StudentRepository.findOneBy({
      id: Number(id),
    });

    if (!entidad) {
      resErr.json({
        data: null,
        status: false,
        message: "No existe ningún registro con ese ID.",
      });
      return;
    }

    next();
  } catch {
    resErr.json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
}
