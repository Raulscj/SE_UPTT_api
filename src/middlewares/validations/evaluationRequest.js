import { EvaluationRepository } from "../../database/repository/EvaluationRepository.js";
import { ProjectRepository } from "../../database/repository/ProjectRepository.js";
import { ContentRepository } from "../../database/repository/ContentRepository.js";

export async function createRule(req, res, next) {
  const resErr = res.status(422);
  const {
    pregunta,
    opcion_a,
    opcion_b,
    opcion_c,
    respuesta_correcta,
    id_proyecto,
    id_contenido,
    puntos,
  } = req.body ?? {};

  try {
    if (
      !pregunta ||
      !opcion_a ||
      !opcion_b ||
      !opcion_c ||
      !respuesta_correcta ||
      !id_proyecto ||
      !id_contenido ||
      !puntos
    ) {
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

    const contenido = await ContentRepository.findOneBy({
      id: Number(id_contenido),
    });

    if (!contenido) {
      res.status(422).json({
        data: null,
        status: false,
        message: "No existe ningún contenido asociado a ese ID",
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

    const entidad = await EvaluationRepository.findOneBy({ id: Number(id) });

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

    const entidad = await EvaluationRepository.findOneBy({ id: Number(id) });

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
