import { EvaluationResultRepository } from "../database/repository/EvaluationResultRepository.js";

export const createEvaluationResult = async (req, res) => {
  try {
    const {
      id_estudiante,
      id_evaluacion,
      respuesta_seleccionada,
      es_correcta,
    } = req.body ?? {};

    const newData = EvaluationResultRepository.create({
      id_estudiante,
      id_evaluacion,
      respuesta_seleccionada,
      es_correcta,
    });
    await EvaluationResultRepository.save(newData);

    res.status(200).json({
      status: true,
      data: newData,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Ocurrió un error inesperado.",
    });
  }
};

export const getEvaluationResult = async (req, res) => {
  try {
    const evaluationResult = await EvaluationResultRepository.find();
    if (evaluationResult.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: evaluationResult,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
};

export const getOneEvaluationResult = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluationResult = await EvaluationResultRepository.findOneBy({
      id: Number(id),
    });

    if (!evaluationResult) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Dato no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: evaluationResult,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
};

export const updateEvaluationResult = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    await EvaluationResultRepository.update({ id: Number(id) }, updateData);

    const entidad = await EvaluationResultRepository.findOneBy({
      id: Number(id),
    });

    res.status(200).json({
      status: true,
      data: entidad,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
};

export const deleteEvaluationResult = async (req, res) => {
  try {
    const { id } = req.params;

    await EvaluationResultRepository.delete({ id: Number(id) });

    res.status(204).json({
      status: true,
      data: null,
      message: "Success",
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      error.message &&
      error.message.includes("FOREIGN KEY constraint failed")
    ) {
      return res.status(409).json({
        data: null,
        status: false,
        message:
          "No se puede eliminar el registro porque está relacionado con otros registros.",
      });
    }
    console.log(error);
    res.status(500).json({
      status: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
    });
  }
};
