"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSave,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

export default function AddSapBydPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [wsdlName, setWsdlName] = useState("No file chosen");
  const [testing, setTesting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log({
      username: data.get("username"),
      password: data.get("password"),
      wsdl: data.get("wsdl"),
    });
  };

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      alert("Connection successful ✅");
    }, 1500);
  };

  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-10 text-black"
    >
      {/* HEADER */}
      <section className="flex flex-col gap-3">
        <Link
          href="/dashboard/settings/sap-byd"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black w-fit"
        >
          <FiArrowLeft />
          Back to SAP BYD Connections
        </Link>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Add SAP BYD Connection
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Configure credentials and WSDL details to connect with
            SAP Business ByDesign services.
          </p>
        </div>
      </section>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT: FORM CARD */}
        <div
          className="lg:col-span-2 rounded-3xl border border-white/40
          bg-white/70 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 space-y-6"
        >
          {/* SECTION TITLE */}
          <div>
            <h3 className="text-lg font-semibold">
              Connection Details
            </h3>
            <p className="text-sm text-gray-600">
              These credentials are used to authenticate with SAP BYD.
            </p>
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="email"
              name="username"
              defaultValue="hammadworkshops@gmail.com"
              required
              className="w-full rounded-xl border border-gray-300
              px-4 py-3 text-sm outline-none
              focus:ring-2 focus:ring-sky-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typically your SAP BYD integration user email.
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••••"
                className="w-full rounded-xl border border-gray-300
                px-4 py-3 pr-12 text-sm outline-none
                focus:ring-2 focus:ring-indigo-400"
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

          {/* WSDL FILE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              WSDL File
            </label>

            <input
              type="file"
              name="wsdl"
              accept=".wsdl,.xml"
              onChange={(e) =>
                setWsdlName(
                  e.target.files?.[0]?.name || "No file chosen"
                )
              }
              className="w-full rounded-xl border border-gray-300
              bg-white px-4 py-2 text-sm file:mr-4 file:rounded-lg
              file:border-0 file:bg-sky-100 file:px-4 file:py-2
              file:text-sky-700 hover:file:bg-sky-200"
            />

            <p className="text-xs text-gray-500 mt-2">
              Selected file:{" "}
              <span className="font-medium">{wsdlName}</span>
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="flex items-center gap-2 rounded-xl
              border border-indigo-300 px-5 py-2 text-sm
              text-indigo-700 hover:bg-indigo-50 transition"
            >
              <FiCheckCircle />
              {testing ? "Testing..." : "Test Connection"}
            </button>

            <div className="flex-1" />

            <Link
              href="/dashboard/settings/sap-byd"
              className="rounded-xl px-5 py-2 text-sm
              border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl
              bg-gradient-to-br from-sky-400 to-indigo-600
              px-6 py-3 text-sm font-medium text-white shadow-md
              hover:from-sky-500 hover:to-indigo-700 transition"
            >
              <FiSave />
              Save Connection
            </button>
          </div>
        </div>

        {/* RIGHT: INFO PANEL */}
        <aside
          className="rounded-3xl border border-white/40
          bg-white/60 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 space-y-4"
        >
          <h4 className="font-semibold text-sm">
            What is this used for?
          </h4>

          <p className="text-sm text-gray-600">
            SAP BYD connections allow your system to communicate
            with Business ByDesign SOAP services using WSDL definitions.
          </p>

          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
            <li>Business Partner sync</li>
            <li>Sales order integration</li>
            <li>Master data exchange</li>
            <li>Secure SOAP authentication</li>
          </ul>

          <p className="text-xs text-gray-500 pt-2">
            Make sure the integration user has the required service
            permissions enabled in SAP BYD.
          </p>
        </aside>
      </form>
    </div>
  );
}
