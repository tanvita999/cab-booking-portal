const prisma = require("../config/prisma");

// ================= CREATE CAB =================

const createCab = async (req, res) => {
  try {
    const { vehicleNo, model, color, seats, driverId } = req.body;

    const cab = await prisma.cab.create({
      data: {
        vehicleNo,
        model,
        color,
        seats,
        driver: {
          connect: {
            id: Number(driverId),
          },
        },
      },
      include: {
        driver: true,
      },
    });

    res.status(201).json({
      message: "Cab Created Successfully",
      cab,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ================= GET ALL CABS =================

const getAllCabs = async (req, res) => {
  try {
    const cabs = await prisma.cab.findMany({
      include: {
        driver: true,
      },
    });

    res.status(200).json(cabs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET CAB BY ID =================

const getCabById = async (req, res) => {
  try {
    const { id } = req.params;

    const cab = await prisma.cab.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        driver: true,
      },
    });

    if (!cab) {
      return res.status(404).json({
        message: "Cab Not Found",
      });
    }

    res.status(200).json(cab);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= UPDATE CAB =================

const updateCab = async (req, res) => {
  try {
    const { id } = req.params;

    const { vehicleNo, model, color, seats, isAvailable } = req.body;

    const cab = await prisma.cab.update({
      where: {
        id: Number(id),
      },
      data: {
        vehicleNo,
        model,
        color,
        seats,
        isAvailable,
      },
      include: {
        driver: true,
      },
    });

    res.status(200).json({
      message: "Cab Updated Successfully",
      cab,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= DELETE CAB =================

const deleteCab = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cab.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Cab Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createCab,
  getAllCabs,
  getCabById,
  updateCab,
  deleteCab,
};
