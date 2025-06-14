import bcrypt from "bcrypt";

import { AdminRepository } from "../database/repository/AdminRepository.js";

export const getAdmin = async (req, res) => {
  try {
    const Admin = await AdminRepository.find();
    if (Admin.length === 0) {
      res.status(201).json({
        status: true,
        data: "La tabla esta vacía",
        message: "Success",
      });
    }
    res.status(200).json({
      status: true,
      data: Admin,
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

export const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await AdminRepository.findOneBy({ id: Number(id) });

    if (!admin) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Administrador no encontrado.",
      });
    }

    res.status(201).json({
      status: true,
      data: admin,
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

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body ?? {};

    if (updateData.credential) {
      const salt = await bcrypt.genSalt(10);
      updateData.credential = await bcrypt.hash(updateData.credential, salt);
    }

    await AdminRepository.update({ id: Number(id) }, updateData);

    const entidad = await AdminRepository.findOneBy({ id: Number(id) });

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

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await AdminRepository.delete({ id: Number(id) });

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
