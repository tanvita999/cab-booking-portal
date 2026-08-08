"use client";

import { Car, Users, CalendarCheck, MapPin, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
            Admin Dashboard
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Welcome back! 👋
          </h2>

          <p className="text-gray-600 mt-2 text-lg">
            Here's an overview of your cab booking system.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Drivers */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Drivers</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  Manage
                </h3>
              </div>

              <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
                <Users size={28} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-purple-600 font-semibold">
              <span>Manage drivers</span>
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Cabs */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Fleet</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">Cabs</h3>
              </div>

              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">
                <Car size={28} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-indigo-600 font-semibold">
              <span>Manage cabs</span>
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-pink-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Reservations</p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  Bookings
                </h3>
              </div>

              <div className="bg-pink-100 text-pink-600 p-4 rounded-2xl">
                <CalendarCheck size={28} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-pink-600 font-semibold">
              <span>Manage bookings</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>

        {/* Bottom Welcome Card */}
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
              Manage your drivers, maintain your cab fleet and keep track of
              bookings from one simple dashboard.
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -right-5 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
        </div>
      </main>
    </div>
  );
}
