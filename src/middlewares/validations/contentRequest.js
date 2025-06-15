import { ContentRepository } from "../../database/repository/ContentRepository.js";
import { ProjectRepository } from "../../database/repository/ProjectRepository.js";

export async function createRule(req, res, next) {
  const resErr = res.status(422);
  const { titulo_contenido, teoria, id_proyecto, orden_contenido } =
    req.body ?? {};

  try {
    if (!titulo_contenido || !teoria || !id_proyecto || !orden_contenido) {
      resErr.json({
        data: null,
        status: false,
        message: "Por favor verifique los datos enviados, faltan datos.",
      });
      return;
    }

    const proyecto = await ProjectRepository.findOneBy({
      id: Number(id_proyecto),
    });

    if (!proyecto) {
      res.status(422).json({
        data: null,
        status: false,
        message: "No existe ningún proyecto asociado a ese ID",
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

    const entidad = await ContentRepository.findOneBy({ id: Number(id) });

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

    const entidad = await ContentRepository.findOneBy({ id: Number(id) });

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
