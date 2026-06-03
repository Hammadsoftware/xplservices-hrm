"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed");
        return;
      }

      loginStore(data.user, data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-transparent">
      <div className="h-[3px] w-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700" />

      <div className="min-h-[calc(100vh-3px)] grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Form */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 bg-white">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Overlay Loader */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}

            {/* Logo */}
            <div className="mb-8 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-2xl bg-white shadow ring-1 ring-black/5">
                  <Image
                    src="/brands.jpeg"
                    alt="Logo"
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>

                <div className="leading-tight">
                  <p className="text-xs font-medium text-gray-500">
                    Welcome to
                  </p>
                  <h1 className="text-lg font-semibold text-gray-900">
                    XPL Services
                  </h1>
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Login to continue to your dashboard
            </p>

            {/* Username */}
            <div className="mt-8">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                disabled={loading}
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div className="mt-5 relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-[44px] text-gray-500 hover:text-gray-900"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 py-3 text-sm font-semibold text-white shadow hover:opacity-90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
          <div className="relative h-[420px] w-[520px] max-w-full">
            <Image
              src="/login.png"
              alt="Login Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
