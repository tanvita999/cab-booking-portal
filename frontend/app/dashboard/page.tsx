"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Car,
  Users,
  CalendarCheck,
  MapPin,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import api from "@/services/api";

type Driver = {
  id: number;
  name: string;
  isAvailable: boolean;
};

type Cab = {
  id: number;
  vehicleNo: string;
  isAvailable: boolean;
};

type Booking = {
  id: number;
  status: string;
  pickup: string;
  destination: string;
  fare: number;
};

export default function DashboardPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);

  // ================= GET DASHBOARD DATA =================

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const [driversResponse, cabsResponse, bookingsResponse] =
        await Promise.all([
          api.get("/drivers"),
          api.get("/cabs"),
          api.get("/bookings"),
        ]);

      console.log("DRIVERS:", driversResponse.data);
      console.log("CABS:", cabsResponse.data);
      console.log("BOOKINGS:", bookingsResponse.data);

      setDrivers(driversResponse.data);
      setCabs(cabsResponse.data);
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.log("DASHBOARD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // ================= COUNTS =================

  const totalDrivers = drivers.length;

  const availableDrivers = drivers.filter(
    (driver) => driver.isAvailable,
  ).length;

  const totalCabs = cabs.length;

  const availableCabs = cabs.filter((cab) => cab.isAvailable).length;

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "pending",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "confirmed",
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "completed",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status?.toLowerCase() === "cancelled",
  ).length;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
        {/* ================= HEADER ================= */}

        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-8 py-7 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Car size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Cab Booking Portal
                </h1>

                <p className="text-purple-100 mt-1">
                  Manage your fleet, drivers and bookings
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}

        <main className="max-w-7xl mx-auto px-8 py-10">
          {/* ================= WELCOME ================= */}

          <div className="mb-10">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
              Admin Dashboard
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Welcome back! 👋
            </h2>

            <p className="text-gray-600 mt-2 text-lg">
              Your fleet is ready. Let’s keep every ride moving. 🚕✨
            </p>
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (
            <div className="bg-white rounded-3xl shadow-md border border-purple-100 p-10 flex items-center justify-center gap-3 mb-10">
              <Loader2 size={24} className="animate-spin text-purple-600" />

              <p className="text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* ================= MAIN STATS ================= */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Drivers */}

                <Link
                  href="/drivers"
                  className="block bg-white rounded-3xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 font-medium">Total Drivers</p>

                      <h3 className="text-4xl font-bold text-gray-900 mt-2">
                        {totalDrivers}
                      </h3>
                    </div>

                    <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
                      <Users size={28} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle size={18} />

                      <span>{availableDrivers} Available</span>
                    </div>

                    <ArrowRight size={18} className="text-purple-600" />
                  </div>
                </Link>

                {/* Cabs */}

                <Link
                  href="/cabs"
                  className="block bg-white rounded-3xl p-6 shadow-md border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 font-medium">Total Cabs</p>

                      <h3 className="text-4xl font-bold text-gray-900 mt-2">
                        {totalCabs}
                      </h3>
                    </div>

                    <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">
                      <Car size={28} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle size={18} />

                      <span>{availableCabs} Available</span>
                    </div>

                    <ArrowRight size={18} className="text-indigo-600" />
                  </div>
                </Link>

                {/* Bookings */}

                <Link
                  href="/bookings"
                  className="block bg-white rounded-3xl p-6 shadow-md border border-pink-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 font-medium">
                        Total Bookings
                      </p>

                      <h3 className="text-4xl font-bold text-gray-900 mt-2">
                        {totalBookings}
                      </h3>
                    </div>

                    <div className="bg-pink-100 text-pink-600 p-4 rounded-2xl">
                      <CalendarCheck size={28} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                      <Clock size={18} />

                      <span>{pendingBookings} Pending</span>
                    </div>

                    <ArrowRight size={18} className="text-pink-600" />
                  </div>
                </Link>
              </div>

              {/* ================= BOOKING STATUS ================= */}

              <div className="bg-white rounded-3xl shadow-md border border-purple-100 p-6 md:p-8 mb-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Booking Overview
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Current booking status across the system.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Pending */}

                  <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-700 font-medium">Pending</p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {pendingBookings}
                        </p>
                      </div>

                      <Clock size={28} className="text-yellow-600" />
                    </div>
                  </div>

                  {/* Confirmed */}

                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-700 font-medium">Confirmed</p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {confirmedBookings}
                        </p>
                      </div>

                      <CheckCircle size={28} className="text-blue-600" />
                    </div>
                  </div>

                  {/* Completed */}

                  <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-700 font-medium">Completed</p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {completedBookings}
                        </p>
                      </div>

                      <CheckCircle size={28} className="text-green-600" />
                    </div>
                  </div>

                  {/* Cancelled */}

                  <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-700 font-medium">Cancelled</p>

                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {cancelledBookings}
                        </p>
                      </div>

                      <XCircle size={28} className="text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= QUICK ACCESS ================= */}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Quick Access
                </h3>

                <p className="text-gray-500 mt-1">
                  Quickly manage your portal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Link
                  href="/drivers"
                  className="bg-white rounded-2xl p-5 shadow-md border border-purple-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                      <Users size={24} />
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Manage Drivers
                      </h4>

                      <p className="text-sm text-gray-500">
                        Add, edit or delete drivers
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/cabs"
                  className="bg-white rounded-2xl p-5 shadow-md border border-indigo-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                      <Car size={24} />
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900">Manage Cabs</h4>

                      <p className="text-sm text-gray-500">Manage your fleet</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/bookings"
                  className="bg-white rounded-2xl p-5 shadow-md border border-pink-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-100 text-pink-600 p-3 rounded-xl">
                      <CalendarCheck size={24} />
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Manage Bookings
                      </h4>

                      <p className="text-sm text-gray-500">
                        View and manage bookings
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* ================= BOTTOM CARD ================= */}

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={24} />

                    <span className="font-semibold text-purple-100">
                      CAB MANAGEMENT
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold">
                    Everything you need in one place.
                  </h3>

                  <p className="text-purple-100 mt-3 max-w-2xl text-lg">
                    Manage your drivers, maintain your cab fleet and keep track
                    of bookings from one simple dashboard.
                  </p>
                </div>

                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10" />

                <div className="absolute -right-5 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
              </div>
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
