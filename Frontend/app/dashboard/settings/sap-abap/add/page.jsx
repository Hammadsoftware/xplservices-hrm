"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export default function AddSapSystemPage() {
  const [form, setForm] = useState({
    serverAddress: "",
    systemNumber: "",
    clientNumber: "",
    routerString: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("NEW SAP SYSTEM:", form);
    // 🔥 Replace with API / Server Action (encrypt password)
  };

  return (
    <div
      className="relative flex-1 w-full overflow-hidden
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add SAP System
          </h1>
          <p className="text-gray-600 mt-1">
            Configure SAP server connection details
          </p>
        </div>

        {/* BACK */}
        <Link
          href="/dashboard/settings/sap-abap"
          className="inline-flex items-center gap-2
          rounded-xl border border-gray-300 bg-white/80
          px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-100 transition"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 space-y-6"
      >
        {/* SERVER ADDRESS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Server Address
          </label>
          <input
            name="serverAddress"
            value={form.serverAddress}
            onChange={handleChange}
            placeholder="e.g. 192.168.10.102"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* SYSTEM NUMBER */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Number
          </label>
          <input
            name="systemNumber"
            value={form.systemNumber}
            onChange={handleChange}
            placeholder="e.g. 00"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* CLIENT NUMBER */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Number
          </label>
          <input
            name="clientNumber"
            value={form.clientNumber}
            onChange={handleChange}
            placeholder="e.g. 300"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* ROUTER STRING */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Router String
          </label>
          <input
            name="routerString"
            value={form.routerString}
            onChange={handleChange}
            placeholder="/H/124.109.48.49"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300 font-mono"
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Name
          </label>
          <input
            type="email"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="hammadworkshops@gmail.com"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••••"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-br
            from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white
            shadow-md hover:from-sky-500 hover:to-indigo-700 transition"
          >
            Save SAP System
          </button>

          <Link
            href="/dashboard/settings/sap-abap"
            className="rounded-xl border border-gray-300
            px-6 py-3 text-sm font-medium text-gray-700
            hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
