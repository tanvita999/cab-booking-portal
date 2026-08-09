"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Phone,
  FileText,
  Briefcase,
  Car,
  Pencil,
  Trash2,
  CheckCircle,
  X,
  Users,
  Search,
} from "lucide-react";
import api from "@/services/api";
import AuthGuard from "@/components/AuthGuard";

type Driver = {
  id: number;
  name: string;
  phone: string;
  licenseNo: string;
  experience: number;
  cabType: string;
  isAvailable: boolean;
};

type DriverForm = {
  name: string;
  phone: string;
  licenseNo: string;
  experience: number;
  cabType: string;
};

type EditDriverForm = {
  name: string;
  phone: string;
  licenseNo: string;
  experience: number;
  cabType: string;
  isAvailable: boolean;
};

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [updating, setUpdating] = useState(false);

  // ================= SEARCH + FILTER =================

  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // ================= ADD DRIVER FORM =================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverForm>();

  // ================= EDIT DRIVER FORM =================

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
  } = useForm<EditDriverForm>();

  // ================= GET DRIVERS =================

  const getDrivers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/drivers");

      console.log("DRIVERS RESPONSE:", response.data);

      setDrivers(response.data);
    } catch (error) {
      console.log("DRIVERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD DRIVERS =================

  useEffect(() => {
    getDrivers();
  }, []);

  // ================= ADD DRIVER =================

  const onSubmit = async (data: DriverForm) => {
    try {
      setAdding(true);

      const response = await api.post("/drivers", {
        name: data.name,
        phone: data.phone,
        licenseNo: data.licenseNo,
        experience: Number(data.experience),
        cabType: data.cabType,
      });

      console.log("DRIVER CREATED:", response.data);

      alert("Driver added successfully!");

      reset();

      getDrivers();
    } catch (error) {
      console.log("ADD DRIVER ERROR:", error);

      alert("Failed to add driver.");
    } finally {
      setAdding(false);
    }
  };

  // ================= START EDIT =================

  const startEdit = (driver: Driver) => {
    setEditingDriver(driver);

    resetEdit({
      name: driver.name,
      phone: driver.phone,
      licenseNo: driver.licenseNo,
      experience: driver.experience,
      cabType: driver.cabType,
      isAvailable: driver.isAvailable,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= UPDATE DRIVER =================

  const onUpdate = async (data: EditDriverForm) => {
    if (!editingDriver) {
      return;
    }

    try {
      setUpdating(true);

      const response = await api.put(`/drivers/${editingDriver.id}`, {
        name: data.name,
        phone: data.phone,
        licenseNo: data.licenseNo,
        experience: Number(data.experience),
        cabType: data.cabType,
        isAvailable: data.isAvailable,
      });

      console.log("DRIVER UPDATED:", response.data);

      alert("Driver updated successfully!");

      setEditingDriver(null);

      getDrivers();
    } catch (error) {
      console.log("UPDATE DRIVER ERROR:", error);

      alert("Failed to update driver.");
    } finally {
      setUpdating(false);
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEdit = () => {
    setEditingDriver(null);
  };

  // ================= DELETE DRIVER =================

  const deleteDriver = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this driver?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/drivers/${id}`);

      console.log("DRIVER DELETED:", response.data);

      alert("Driver deleted successfully!");

      getDrivers();
    } catch (error) {
      console.log("DELETE DRIVER ERROR:", error);

      alert(
        "Failed to delete driver. The driver may already be assigned to a cab.",
      );
    }
  };

  // ================= SEARCH + FILTER =================

  const filteredDrivers = drivers.filter((driver) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      driver.name.toLowerCase().includes(search) ||
      driver.phone.toLowerCase().includes(search) ||
      driver.licenseNo.toLowerCase().includes(search) ||
      driver.cabType.toLowerCase().includes(search);

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && driver.isAvailable) ||
      (availabilityFilter === "unavailable" && !driver.isAvailable);

    return matchesSearch && matchesAvailability;
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* ================= HEADER ================= */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-8 py-8 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                <Users size={36} />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Cab Booking Portal
                </h1>

                <p className="mt-1 text-purple-100 text-lg">
                  Manage your drivers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN ================= */}

        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* ================= ADD DRIVER ================= */}

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 rounded-xl">
                  <User size={24} />
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Add New Driver
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Register a driver for your cab fleet.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Name */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <User size={18} className="text-purple-600" />
                  Driver Name
                </label>

                <input
                  type="text"
                  placeholder="Enter driver name"
                  {...register("name", {
                    required: "Driver name is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Phone size={18} className="text-purple-600" />
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.phone && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* License */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <FileText size={18} className="text-pink-500" />
                  License Number
                </label>

                <input
                  type="text"
                  placeholder="Enter license number"
                  {...register("licenseNo", {
                    required: "License number is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.licenseNo && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.licenseNo.message}
                  </p>
                )}
              </div>

              {/* Experience */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Briefcase size={18} className="text-indigo-600" />
                  Experience
                </label>

                <input
                  type="number"
                  placeholder="Years of experience"
                  {...register("experience", {
                    required: "Experience is required",
                    min: {
                      value: 0,
                      message: "Experience cannot be negative",
                    },
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.experience && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Cab Type */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Car size={18} className="text-purple-600" />
                  Cab Type
                </label>

                <select
                  {...register("cabType", {
                    required: "Cab type is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="">Select Cab Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                </select>

                {errors.cabType && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.cabType.message}
                  </p>
                )}
              </div>

              {/* Add Button */}

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={adding}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "Adding Driver..." : "✨ Add Driver"}
                </button>
              </div>
            </form>
          </div>

          {/* ================= EDIT DRIVER ================= */}

          {editingDriver && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-3 rounded-xl">
                    <Pencil size={24} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                      Edit Driver
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Update driver information and availability.
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

              <form
                onSubmit={handleEditSubmit(onUpdate)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Driver Name
                  </label>

                  <input
                    type="text"
                    {...registerEdit("name", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    {...registerEdit("phone", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* License */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    License Number
                  </label>

                  <input
                    type="text"
                    {...registerEdit("licenseNo", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Experience */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Experience
                  </label>

                  <input
                    type="number"
                    {...registerEdit("experience", {
                      required: true,
                      min: 0,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Cab Type */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Cab Type
                  </label>

                  <select
                    {...registerEdit("cabType", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>

                {/* Availability */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Availability
                  </label>

                  <select
                    {...registerEdit("isAvailable")}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>

                {/* Buttons */}

                <div className="flex gap-3 items-end">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "✓ Update Driver"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-600 text-white py-3.5 rounded-xl font-bold hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= DRIVER LIST ================= */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Registered Drivers 🚗
              </h2>

              <p className="text-gray-500 mt-1">
                View and manage all registered drivers.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-100">
              <Users size={18} className="text-purple-600" />

              <span className="font-semibold text-gray-700">
                {filteredDrivers.length} Drivers
              </span>
            </div>
          </div>

          {/* ================= SEARCH + FILTER ================= */}

          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}

              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by name, phone, license or cab type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-12 pr-4 py-3 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>

              {/* Availability Filter */}

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="md:w-56 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              >
                <option value="all">All Drivers</option>
                <option value="available">Available</option>
                <option value="unavailable">Not Available</option>
              </select>
            </div>
          </div>

          {/* ================= DRIVER CARDS ================= */}

          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-600 font-medium">Loading drivers...</p>
            </div>
          ) : filteredDrivers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <User size={48} className="mx-auto text-purple-400 mb-4" />

              <p className="text-gray-600 font-medium">
                No drivers match your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="group bg-white/95 rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Card Header */}

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-xl">
                        <User size={24} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Driver #{driver.id}
                        </p>

                        <h3 className="text-xl font-extrabold text-gray-900">
                          {driver.name}
                        </h3>
                      </div>
                    </div>

                    {/* Availability */}

                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        driver.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <CheckCircle size={14} />

                      {driver.isAvailable ? "Available" : "Not Available"}
                    </div>
                  </div>

                  {/* Driver Details */}

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={17} className="text-purple-500" />

                      <span className="text-gray-700">{driver.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FileText size={17} className="text-pink-500" />

                      <span className="text-gray-700">{driver.licenseNo}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Briefcase size={17} className="text-indigo-500" />

                      <span className="text-gray-700">
                        {driver.experience} years experience
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Car size={17} className="text-purple-500" />

                      <span className="text-gray-700">{driver.cabType}</span>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      onClick={() => startEdit(driver)}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-amber-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Pencil size={17} />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDriver(driver.id)}
                      className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2"
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
    </AuthGuard>
  );
}
