"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Car, BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Drivers",
      path: "/drivers",
      icon: Users,
    },
    {
      name: "Cabs",
      path: "/cabs",
      icon: Car,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: BookOpen,
    },
  ];

  return (
    <nav className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-md">
              <Car size={25} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Cab Booking
              </h1>

              <p className="text-xs text-gray-400">Management Portal</p>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;

              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <Icon size={18} />

                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transition-all"
          >
            <LogOut size={18} />

            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
