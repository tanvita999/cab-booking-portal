"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Navigation,
  IndianRupee,
  User,
  Car,
  CalendarCheck,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  X,
  BookOpen,
} from "lucide-react";
import api from "@/services/api";

type Driver = {
  id: number;
  name: string;
  phone: string;
  isAvailable: boolean;
};

type Cab = {
  id: number;
  vehicleNo: string;
  model: string;
  color: string;
  seats: number;
  isAvailable: boolean;
  driverId: number;
  driver: Driver;
};

type UserData = {
  id: number;
  name: string;
  email: string;
};

type Booking = {
  id: number;
  pickup: string;
  destination: string;
  fare: number;
  status: string;
  user: UserData;
  driver: Driver;
  cab: Cab;
};

type BookingForm = {
  pickup: string;
  destination: string;
  fare: number;
  driverId: number;
  cabId: number;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>();

  // ================= GET BOOKINGS =================

  const getBookings = async () => {
    try {
      const response = await api.get("/bookings");

      console.log("BOOKINGS RESPONSE:", response.data);

      setBookings(response.data);
    } catch (error) {
      console.log("BOOKINGS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET DRIVERS =================

  const getDrivers = async () => {
    try {
      const response = await api.get("/drivers");

      console.log("DRIVERS RESPONSE:", response.data);

      setDrivers(response.data);
    } catch (error) {
      console.log("DRIVERS ERROR:", error);
    }
  };

  // ================= GET CABS =================

  const getCabs = async () => {
    try {
      const response = await api.get("/cabs");

      console.log("CABS RESPONSE:", response.data);

      setCabs(response.data);
    } catch (error) {
      console.log("CABS ERROR:", error);
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {
    getBookings();
    getDrivers();
    getCabs();
  }, []);

  // ================= CREATE BOOKING =================

  const onSubmit = async (data: BookingForm) => {
    try {
      setAdding(true);

      const response = await api.post("/bookings", {
        pickup: data.pickup,
        destination: data.destination,
        fare: Number(data.fare),
        driverId: Number(data.driverId),
        cabId: Number(data.cabId),
      });

      console.log("BOOKING CREATED:", response.data);

      alert("Booking created successfully!");

      reset();

      getBookings();
    } catch (error) {
      console.log("CREATE BOOKING ERROR:", error);

      alert("Failed to create booking.");
    } finally {
      setAdding(false);
    }
  };

  // ================= START EDIT =================

  const startEdit = (booking: Booking) => {
    setEditingBooking(booking);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (status: string) => {
    if (!editingBooking) {
      return;
    }

    try {
      setUpdating(true);

      const response = await api.put(`/bookings/${editingBooking.id}`, {
        status,
      });

      console.log("BOOKING UPDATED:", response.data);

      alert("Booking status updated successfully!");

      setEditingBooking(null);

      getBookings();
    } catch (error) {
      console.log("UPDATE BOOKING ERROR:", error);

      alert("Failed to update booking.");
    } finally {
      setUpdating(false);
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEdit = () => {
    setEditingBooking(null);
  };

  // ================= DELETE BOOKING =================

  const deleteBooking = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/bookings/${id}`);

      console.log("BOOKING DELETED:", response.data);

      alert("Booking deleted successfully!");

      getBookings();
    } catch (error) {
      console.log("DELETE BOOKING ERROR:", error);

      alert("Failed to delete booking.");
    }
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-8 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <BookOpen size={36} />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Cab Booking Portal
              </h1>

              <p className="mt-1 text-purple-100 text-lg">
                Manage your bookings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* ================= CREATE BOOKING ================= */}

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 rounded-xl">
                <CalendarCheck size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Create New Booking
                </h2>

                <p className="text-gray-500 mt-1">
                  Create a cab booking by selecting a driver and cab.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Pickup */}

            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                <MapPin size={18} className="text-purple-600" />
                Pickup Location
              </label>

              <input
                type="text"
                placeholder="Enter pickup location"
                {...register("pickup", {
                  required: "Pickup location is required",
                })}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />

              {errors.pickup && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.pickup.message}
                </p>
              )}
            </div>

            {/* Destination */}

            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                <Navigation size={18} className="text-pink-500" />
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
                {...register("destination", {
                  required: "Destination is required",
                })}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />

              {errors.destination && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.destination.message}
                </p>
              )}
            </div>

            {/* Fare */}

            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                <IndianRupee size={18} className="text-green-600" />
                Fare
              </label>

              <input
                type="number"
                placeholder="Enter fare"
                {...register("fare", {
                  required: "Fare is required",
                  min: {
                    value: 0,
                    message: "Fare cannot be negative",
                  },
                })}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />

              {errors.fare && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.fare.message}
                </p>
              )}
            </div>

            {/* Driver */}

            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                <User size={18} className="text-purple-600" />
                Select Driver
              </label>

              <select
                {...register("driverId", {
                  required: "Please select a driver",
                })}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="">Select Driver</option>

                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>

              {errors.driverId && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.driverId.message}
                </p>
              )}
            </div>

            {/* Cab */}

            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                <Car size={18} className="text-indigo-600" />
                Select Cab
              </label>

              <select
                {...register("cabId", {
                  required: "Please select a cab",
                })}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="">Select Cab</option>

                {cabs.map((cab) => (
                  <option key={cab.id} value={cab.id}>
                    {cab.vehicleNo} - {cab.model}
                  </option>
                ))}
              </select>

              {errors.cabId && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.cabId.message}
                </p>
              )}
            </div>

            {/* Create Button */}

            <div className="flex items-end">
              <button
                type="submit"
                disabled={adding}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? "Creating Booking..." : "✨ Create Booking"}
              </button>
            </div>
          </form>
        </div>

        {/* ================= UPDATE BOOKING STATUS ================= */}

        {editingBooking && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-3 rounded-xl">
                  <Pencil size={24} />
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Update Booking
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Change the booking status.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={cancelEdit}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5 mb-6">
              <p className="font-bold text-gray-900">
                Booking #{editingBooking.id}
              </p>

              <p className="text-gray-600 mt-1">
                {editingBooking.pickup} → {editingBooking.destination}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => updateStatus("Confirmed")}
                disabled={updating}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={19} />
                Confirm
              </button>

              <button
                onClick={() => updateStatus("Completed")}
                disabled={updating}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={19} />
                Complete
              </button>

              <button
                onClick={() => updateStatus("Cancelled")}
                disabled={updating}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <XCircle size={19} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ================= BOOKING LIST ================= */}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Bookings 📋
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage all cab bookings.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-100">
            <CalendarCheck size={18} className="text-purple-600" />

            <span className="font-semibold text-gray-700">
              {bookings.length} Bookings
            </span>
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-gray-600 font-medium">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <CalendarCheck size={48} className="mx-auto text-purple-400 mb-4" />

            <p className="text-gray-600 font-medium">No bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/95 rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Booking #{booking.id}
                    </p>

                    <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                      {booking.pickup}
                    </h3>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </div>
                </div>

                {/* Route */}

                <div className="mt-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-purple-600 mt-1" />

                    <div>
                      <p className="text-xs text-gray-400 uppercase">Pickup</p>

                      <p className="font-semibold text-gray-900">
                        {booking.pickup}
                      </p>
                    </div>
                  </div>

                  <div className="border-l-2 border-purple-200 ml-2.5 h-5 my-1" />

                  <div className="flex items-start gap-3">
                    <Navigation size={20} className="text-pink-500 mt-1" />

                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        Destination
                      </p>

                      <p className="font-semibold text-gray-900">
                        {booking.destination}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase">Fare</p>

                    <p className="font-bold text-gray-900 mt-1">
                      ₹{booking.fare}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase">Customer</p>

                    <p className="font-bold text-gray-900 mt-1">
                      {booking.user?.name || "User"}
                    </p>
                  </div>
                </div>

                {/* Driver & Cab */}

                <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <User size={17} className="text-purple-500" />

                      <span className="text-xs text-gray-400 uppercase">
                        Driver
                      </span>
                    </div>

                    <p className="font-bold text-gray-900 mt-1">
                      {booking.driver?.name || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Car size={17} className="text-indigo-500" />

                      <span className="text-xs text-gray-400 uppercase">
                        Cab
                      </span>
                    </div>

                    <p className="font-bold text-gray-900 mt-1">
                      {booking.cab?.vehicleNo || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Actions */}

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => startEdit(booking)}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Pencil size={17} />
                    Update Status
                  </button>

                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
