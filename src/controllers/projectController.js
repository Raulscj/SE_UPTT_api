import { ProjectRepository } from "../database/repository/ProjectRepository.js";

export const createProject = async (req, res) => {
  try {
    const { nombre_proyecto, descripcion } = req.body ?? {};

    const newData = ProjectRepository.create({
      nombre_proyecto,
      descripcion,
    });

    await ProjectRepository.save(newData);

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

export const getProject = async (req, res) => {
  try {
    const project = await ProjectRepository.find();
    if (project.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: project,
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

export const getOneProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectRepository.findOneBy({
      id: Number(id),
    });

    if (!project) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Dato no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: project,
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

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    await ProjectRepository.update({ id: Number(id) }, updateData);

    const entidad = await ProjectRepository.findOneBy({
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

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await ProjectRepository.delete({ id: Number(id) });

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
