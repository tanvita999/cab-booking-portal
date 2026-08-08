"use client";

import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { Car, LockKeyhole, Mail, ArrowRight } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post("/auth/login", data);

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-100 flex items-center justify-center px-6 py-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
              <Car size={34} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Cab Booking Portal
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back! Login to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {errors.email && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              {errors.password && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Login
              <ArrowRight size={19} />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              Secure access to your cab management system 🚕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
