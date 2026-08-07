const prisma = require("../config/prisma");

// ================= CREATE BOOKING =================

const createBooking = async (req, res) => {
  try {
    const { pickup, destination, fare, driverId, cabId } = req.body;

    const booking = await prisma.booking.create({
      data: {
        pickup,
        destination,
        fare,

        user: {
          connect: {
            id: req.user.id,
          },
        },

        driver: {
          connect: {
            id: Number(driverId),
          },
        },

        cab: {
          connect: {
            id: Number(cabId),
          },
        },
      },

      include: {
        user: true,
        driver: true,
        cab: true,
      },
    });

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ================= GET ALL BOOKINGS =================

const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        driver: true,
        cab: true,
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET BOOKING BY ID =================

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        driver: true,
        cab: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= UPDATE BOOKING =================

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
      include: {
        user: true,
        driver: true,
        cab: true,
      },
    });

    res.status(200).json({
      message: "Booking Updated Successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= DELETE BOOKING =================

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.booking.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
