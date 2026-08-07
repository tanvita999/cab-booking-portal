const prisma = require("../config/prisma");

// ================= CREATE DRIVER =================

const createDriver = async (req, res) => {
  try {
    const { name, phone, licenseNo, experience, cabType } = req.body;

    const driver = await prisma.driver.create({
      data: {
        name,
        phone,
        licenseNo,
        experience,
        cabType,
      },
    });

    res.status(201).json({
      message: "Driver Created Successfully",
      driver,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET ALL DRIVERS =================

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();

    res.status(200).json(drivers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET DRIVER BY ID =================

const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await prisma.driver.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver Not Found",
      });
    }

    res.status(200).json(driver);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= UPDATE DRIVER =================

const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, licenseNo, experience, cabType, isAvailable } =
      req.body;

    const driver = await prisma.driver.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        phone,
        licenseNo,
        experience,
        cabType,
        isAvailable,
      },
    });

    res.status(200).json({
      message: "Driver Updated Successfully",
      driver,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= DELETE DRIVER =================

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.driver.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Driver Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
