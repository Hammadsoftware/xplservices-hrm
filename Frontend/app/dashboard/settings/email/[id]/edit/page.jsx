"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiSave,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

export default function EditEmailPage() {
  const params = useParams();
  const router = useRouter();

  const emailId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [showPassword, setShowPassword] = useState(false);
  const [testing, setTesting] = useState(false);

  // Dummy data
  const existing = {
    email: "hr@xplservices.com",
    password: "Welcome@54321",
    smtpPort: "587",
    smtpServer: "mail.xplservices.com",
  };

  if (!emailId) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Email:", emailId);
    router.push("/dashboard/settings/email");
  };

  const testConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      alert("Email connection successful ✅");
    }, 1500);
  };

  return (
    <div className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-10 text-black">

      {/* HEADER */}
      <section className="space-y-2">
        <Link
          href="/dashboard/settings/email"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black w-fit"
        >
          <FiArrowLeft /> Back
        </Link>

        <h2 className="text-2xl font-bold tracking-tight">
          Edit Email
        </h2>

        <p className="text-gray-600 max-w-2xl">
          Update email configuration used for sending system emails.
        </p>
      </section>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <section className="lg:col-span-2 rounded-3xl border border-white/40
          bg-white/70 backdrop-blur-xl shadow-xl p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                defaultValue={existing.email}
                className="w-full rounded-xl border px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={existing.password}
                  className="w-full rounded-xl border px-4 py-3 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                name="smtpPort"
                defaultValue={existing.smtpPort}
                placeholder="SMTP Port"
                className="w-full rounded-xl border px-4 py-3 text-sm"
              />
              <input
                name="smtpServer"
                defaultValue={existing.smtpServer}
                placeholder="SMTP Server"
                className="w-full rounded-xl border px-4 py-3 text-sm"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                type="button"
                onClick={testConnection}
                disabled={testing}
                className="flex items-center gap-2 rounded-xl border px-5 py-2 text-sm text-indigo-700"
              >
                <FiCheckCircle />
                {testing ? "Testing..." : "Test Connection"}
              </button>

              <div className="flex-1" />

              <Link
                href="/dashboard/settings/email"
                className="rounded-xl border px-5 py-2 text-sm"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl
                bg-gradient-to-br from-sky-400 to-indigo-600
                px-6 py-3 text-sm text-white"
              >
                <FiSave />
                Update
              </button>
            </div>
          </form>
        </section>

        {/* INFO */}
        <aside className="rounded-3xl border border-white/40
          bg-white/60 backdrop-blur-xl shadow-xl p-6">
          <h4 className="font-semibold text-sm mb-3">
            Email Notes
          </h4>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
            <li>Email is used for system notifications</li>
            <li>Use secure SMTP credentials</li>
            <li>Test connection after changes</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
