import { ContentRepository } from "../database/repository/ContentRepository.js";

export const createContent = async (req, res) => {
  try {
    const {
      titulo_contenido,
      teoria,
      id_proyecto,
      orden_contenido,
      teoria2,
      teoria3,
      teoria4,
      teoria5,
      teoria6,
      teoria7,
      teoria8,
      teoria9,
      teoria10,
    } = req.body ?? {};

    const newData = ContentRepository.create({
      titulo_contenido,
      teoria,
      id_proyecto,
      orden_contenido,
      teoria2,
      teoria3,
      teoria4,
      teoria5,
      teoria6,
      teoria7,
      teoria8,
      teoria9,
      teoria10,
    });
    await ContentRepository.save(newData);

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

export const getContent = async (req, res) => {
  try {
    const Content = await ContentRepository.find();
    if (Content.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: Content,
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

export const getOneContent = async (req, res) => {
  try {
    const { id } = req.params;

    const Content = await ContentRepository.findOneBy({ id: Number(id) });

    if (!Content) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Dato no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: Content,
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

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    await ContentRepository.update({ id: Number(id) }, updateData);

    const entidad = await ContentRepository.findOneBy({ id: Number(id) });

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

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    await ContentRepository.delete({ id: Number(id) });

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
