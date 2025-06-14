import { StudentRepository } from "../database/repository/StudentRepository.js";

export const createStudent = async (req, res) => {
  try {
    const { nombre_completo, grado, seccion, numero_de_lista } = req.body ?? {};

    const newData = StudentRepository.create({
      nombre_completo,
      grado,
      seccion,
      numero_de_lista,
    });

    await StudentRepository.save(newData);

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

export const getStudent = async (req, res) => {
  try {
    const student = await StudentRepository.find();
    if (student.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: student,
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

export const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentRepository.findOneBy({
      id: Number(id),
    });

    if (!student) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Dato no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: student,
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

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    await StudentRepository.update({ id: Number(id) }, updateData);

    const entidad = await StudentRepository.findOneBy({
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

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await StudentRepository.delete({ id: Number(id) });

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
