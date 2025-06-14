import { EvaluationRepository } from "../database/repository/EvaluationRepository.js";

export const createEvaluation = async (req, res) => {
  try {
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

    const newData = EvaluationRepository.create({
      pregunta,
      opcion_a,
      opcion_b,
      opcion_c,
      respuesta_correcta,
      id_proyecto,
      id_contenido,
      puntos,
    });
    await EvaluationRepository.save(newData);

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

export const getEvaluation = async (req, res) => {
  try {
    const evaluation = await EvaluationRepository.find();
    if (evaluation.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: evaluation,
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

export const getOneEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluation = await EvaluationRepository.findOneBy({ id: Number(id) });

    if (!evaluation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Dato no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: evaluation,
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

export const updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    await EvaluationRepository.update({ id: Number(id) }, updateData);

    const entidad = await EvaluationRepository.findOneBy({ id: Number(id) });

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

export const deleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    await EvaluationRepository.delete({ id: Number(id) });

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
