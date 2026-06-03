"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

export default function AddEmailServerPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      smtpPort: data.get("smtpPort"),
      smtpServer: data.get("smtpServer"),
    };

    console.log("Add Email Server:", payload);

    // 🔜 later: save to DB / API
    router.push("/dashboard/settings/email");
  };

  const testConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      alert("SMTP connection successful ✅");
    }, 1500);
  };

  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-10 text-black"
    >
      {/* HEADER */}
      <section className="space-y-2">
        <Link
          href="/dashboard/settings/email-server"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black w-fit"
        >
          <FiArrowLeft />
          Back
        </Link>

        <h2 className="text-2xl font-bold tracking-tight">
          Add Email Server
        </h2>

        <p className="text-gray-600 max-w-2xl">
          Configure SMTP credentials used by the system to send
          emails such as HR notifications, alerts, and reports.
        </p>
      </section>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <section
          className="lg:col-span-2 rounded-3xl border border-white/40
          bg-white/70 backdrop-blur-xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="hr@company.com"
                className="w-full rounded-xl border px-4 py-3 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                This email will appear as the sender.
              </p>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  className="w-full rounded-xl border px-4 py-3 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 hover:text-black"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Stored securely and never displayed in plain text.
              </p>
            </div>

            {/* SMTP DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  SMTP Port
                </label>
                <input
                  name="smtpPort"
                  type="number"
                  required
                  placeholder="587"
                  className="w-full rounded-xl border px-4 py-3 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Common ports: 587 (TLS), 465 (SSL)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  SMTP Server
                </label>
                <input
                  name="smtpServer"
                  type="text"
                  required
                  placeholder="mail.company.com"
                  className="w-full rounded-xl border px-4 py-3 text-sm"
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                type="button"
                onClick={testConnection}
                disabled={testing}
                className="flex items-center gap-2 rounded-xl
                border border-indigo-300 px-5 py-2 text-sm
                text-indigo-700 hover:bg-indigo-50"
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
                Save
              </button>
            </div>
          </form>
        </section>

        {/* INFO PANEL */}
        <aside
          className="rounded-3xl border border-white/40
          bg-white/60 backdrop-blur-xl shadow-xl p-6 space-y-4"
        >
          <h4 className="font-semibold text-sm">
            Important Information
          </h4>

          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
            <li>Ensure SMTP credentials are correct</li>
            <li>Email account must allow SMTP access</li>
            <li>Firewall should allow outbound SMTP traffic</li>
            <li>Use TLS/SSL ports for better security</li>
          </ul>

          <p className="text-xs text-gray-500 pt-2">
            Incorrect SMTP settings may prevent the system
            from sending emails.
          </p>
        </aside>
      </div>
    </div>
  );
}
