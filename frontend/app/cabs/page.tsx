"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Car,
  User,
  Users,
  Palette,
  Armchair,
  Pencil,
  CheckCircle,
  X,
  Search,
} from "lucide-react";
import api from "@/services/api";
import AuthGuard from "@/components/AuthGuard";

type Driver = {
  id: number;
  name: string;
  phone: string;
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

type CabForm = {
  vehicleNo: string;
  model: string;
  color: string;
  seats: number;
  driverId: number;
};

type EditCabForm = {
  vehicleNo: string;
  model: string;
  color: string;
  seats: number;
  isAvailable: boolean;
};

export default function CabsPage() {
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [editingCab, setEditingCab] = useState<Cab | null>(null);
  const [updating, setUpdating] = useState(false);

  // ================= SEARCH + FILTER =================

  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // ================= ADD CAB FORM =================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CabForm>();

  // ================= EDIT CAB FORM =================

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
  } = useForm<EditCabForm>();

  // ================= GET CABS =================

  const getCabs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/cabs");

      console.log("CABS RESPONSE:", response.data);

      setCabs(response.data);
    } catch (error) {
      console.log("CABS ERROR:", error);
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

  // ================= LOAD DATA =================

  useEffect(() => {
    getCabs();
    getDrivers();
  }, []);

  // ================= ADD CAB =================

  const onSubmit = async (data: CabForm) => {
    try {
      setAdding(true);

      const response = await api.post("/cabs", {
        vehicleNo: data.vehicleNo,
        model: data.model,
        color: data.color,
        seats: Number(data.seats),
        driverId: Number(data.driverId),
      });

      console.log("CAB CREATED:", response.data);

      alert("Cab added successfully!");

      reset();

      getCabs();
      getDrivers();
    } catch (error) {
      console.log("ADD CAB ERROR:", error);

      alert("Failed to add cab.");
    } finally {
      setAdding(false);
    }
  };

  // ================= START EDIT =================

  const startEdit = (cab: Cab) => {
    setEditingCab(cab);

    resetEdit({
      vehicleNo: cab.vehicleNo,
      model: cab.model,
      color: cab.color,
      seats: cab.seats,
      isAvailable: cab.isAvailable,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= UPDATE CAB =================

  const onUpdate = async (data: EditCabForm) => {
    if (!editingCab) {
      return;
    }

    try {
      setUpdating(true);

      const response = await api.put(`/cabs/${editingCab.id}`, {
        vehicleNo: data.vehicleNo,
        model: data.model,
        color: data.color,
        seats: Number(data.seats),

        // Convert select value into boolean
        isAvailable: data.isAvailable,
      });

      console.log("CAB UPDATED:", response.data);

      alert("Cab updated successfully!");

      setEditingCab(null);

      getCabs();
      getDrivers();
    } catch (error) {
      console.log("UPDATE CAB ERROR:", error);

      alert("Failed to update cab.");
    } finally {
      setUpdating(false);
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEdit = () => {
    setEditingCab(null);
  };

  // ================= SEARCH + FILTER =================

  const filteredCabs = cabs.filter((cab) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      cab.vehicleNo.toLowerCase().includes(search) ||
      cab.model.toLowerCase().includes(search) ||
      cab.color.toLowerCase().includes(search) ||
      cab.driver.name.toLowerCase().includes(search);

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && cab.isAvailable) ||
      (availabilityFilter === "unavailable" && !cab.isAvailable);

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
                <Car size={36} />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Cab Booking Portal
                </h1>

                <p className="mt-1 text-purple-100 text-lg">Manage your cabs</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN ================= */}

        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* ================= ADD CAB ================= */}

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 rounded-xl">
                  <Car size={24} />
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Add New Cab
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Add a new cab and assign it to a driver.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Vehicle Number */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Car size={18} className="text-purple-600" />
                  Vehicle Number
                </label>

                <input
                  type="text"
                  placeholder="AP39AB1234"
                  {...register("vehicleNo", {
                    required: "Vehicle number is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.vehicleNo && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.vehicleNo.message}
                  </p>
                )}
              </div>

              {/* Model */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Car size={18} className="text-purple-600" />
                  Model
                </label>

                <input
                  type="text"
                  placeholder="Toyota Innova"
                  {...register("model", {
                    required: "Model is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.model && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.model.message}
                  </p>
                )}
              </div>

              {/* Color */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Palette size={18} className="text-pink-500" />
                  Color
                </label>

                <input
                  type="text"
                  placeholder="White"
                  {...register("color", {
                    required: "Color is required",
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.color && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.color.message}
                  </p>
                )}
              </div>

              {/* Seats */}

              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
                  <Armchair size={18} className="text-indigo-600" />
                  Number of Seats
                </label>

                <input
                  type="number"
                  placeholder="7"
                  {...register("seats", {
                    required: "Number of seats is required",
                    min: {
                      value: 1,
                      message: "Seats must be at least 1",
                    },
                  })}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />

                {errors.seats && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.seats.message}
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

              {/* Add Button */}

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={adding}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "Adding Cab..." : "✨ Add Cab"}
                </button>
              </div>
            </form>
          </div>

          {/* ================= EDIT CAB ================= */}

          {editingCab && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8 mb-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-3 rounded-xl">
                    <Pencil size={24} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                      Edit Cab
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Update cab information and availability.
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
                {/* Vehicle Number */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    {...registerEdit("vehicleNo", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Model */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Model
                  </label>

                  <input
                    type="text"
                    {...registerEdit("model", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Color */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Color
                  </label>

                  <input
                    type="text"
                    {...registerEdit("color", {
                      required: true,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Seats */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Number of Seats
                  </label>

                  <input
                    type="number"
                    {...registerEdit("seats", {
                      required: true,
                      min: 1,
                    })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>

                {/* Availability */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-800">
                    Availability
                  </label>

                  <select
                    {...registerEdit("isAvailable", {
                      setValueAs: (value) => value === "true",
                    })}
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
                    {updating ? "Updating..." : "✓ Update Cab"}
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

          {/* ================= CAB LIST ================= */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Available Cabs 🚕
              </h2>

              <p className="text-gray-500 mt-1">
                View and manage all registered cabs.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-100">
              <Users size={18} className="text-purple-600" />

              <span className="font-semibold text-gray-700">
                {filteredCabs.length} Cabs
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
                  placeholder="Search by vehicle, model, color or driver..."
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
                <option value="all">All Cabs</option>

                <option value="available">Available</option>

                <option value="unavailable">Not Available</option>
              </select>
            </div>
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-600 font-medium">Loading cabs...</p>
            </div>
          ) : filteredCabs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <Car size={48} className="mx-auto text-purple-400 mb-4" />

              <p className="text-gray-600 font-medium">
                No cabs match your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCabs.map((cab) => (
                <div
                  key={cab.id}
                  className="group bg-white/95 rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Card Header */}

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold mb-3">
                        <Car size={16} />
                        CAB #{cab.id}
                      </div>

                      <h3 className="text-2xl font-extrabold text-gray-900">
                        {cab.vehicleNo}
                      </h3>
                    </div>

                    {/* Availability */}

                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        cab.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <CheckCircle size={14} />

                      {cab.isAvailable ? "Available" : "Not Available"}
                    </div>
                  </div>

                  {/* Cab Details */}

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Model</span>

                      <span className="font-semibold text-gray-900">
                        {cab.model}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Color</span>

                      <span className="font-semibold text-gray-900">
                        {cab.color}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Seats</span>

                      <span className="font-semibold text-gray-900">
                        {cab.seats}
                      </span>
                    </div>
                  </div>

                  {/* Driver */}

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                        <User size={18} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Driver
                        </p>

                        <p className="font-bold text-gray-900">
                          {cab.driver.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm">
                      📞 {cab.driver.phone}
                    </p>
                  </div>

                  {/* Edit Button */}

                  <button
                    onClick={() => startEdit(cab)}
                    className="w-full mt-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-amber-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil size={18} />
                    Edit Cab
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
