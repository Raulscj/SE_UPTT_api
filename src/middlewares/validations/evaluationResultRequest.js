import { EvaluationResultRepository } from "../../database/repository/EvaluationResultRepository.js";
import { EvaluationRepository } from "../../database/repository/EvaluationRepository.js";
import { StudentRepository } from "../../database/repository/StudentRepository.js";

export async function createRule(req, res, next) {
  const resErr = res.status(422);
  const { id_estudiante, id_evaluacion, respuesta_seleccionada, es_correcta } =
    req.body ?? {};

  try {
    if (
      !id_estudiante ||
      !id_evaluacion ||
      !respuesta_seleccionada ||
      !es_correcta
    ) {
      resErr.json({
        data: null,
        status: false,
        message: "Por favor verifique los datos enviados, faltan datos.",
      });

      return;
    }
    const evaluacion = await EvaluationRepository.findOneBy({
      id: Number(id_evaluacion),
    });

    if (!evaluacion) {
      res.status(422).json({
        data: null,
        status: false,
        message: "No existe ninguna evaluación asociado a ese ID",
      });

      return;
    }

    const estudiante = await StudentRepository.findOneBy({
      id: Number(id_estudiante),
    });

    if (!estudiante) {
      res.status(422).json({
        data: null,
        status: false,
        message: "No existe ningún estudiante asociado a ese ID",
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

    const entidad = await EvaluationResultRepository.findOneBy({
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

    const entidad = await EvaluationResultRepository.findOneBy({
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
