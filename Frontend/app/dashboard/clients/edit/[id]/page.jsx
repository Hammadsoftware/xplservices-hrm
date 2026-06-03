"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const inputClass =
  "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-400";

export default function ClientEditPage() {
  const { id } = useParams();

  const [form, setForm] = useState({
    type: "Corporate",
    company: "Tech Solutions Ltd",
    displayName: "Tech Solutions",
    number: "C-1023",
    phone: "+92 300 1234567",
    email: "info@techsolutions.com",
    country: "Pakistan",
    industry: "IT Services",
    custom: "Priority Client",
  });

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    console.log("UPDATED CLIENT 👉", { id, ...form });
    alert("Client updated (check console)");
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      
      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ===== HEADER ===== */}
      <div className="relative mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Client
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Client ID: {id}
        </p>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                value={value}
                onChange={(e) => update(key, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-12 py-3 text-sm font-medium text-white shadow-md hover:from-sky-500 hover:to-indigo-700 transition"
          >
            Save Changes
          </button>

          <Link
            href={`/dashboard/clients/${id}`}
            className="rounded-xl bg-gray-200 px-12 py-3 text-sm font-medium text-black text-center"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <p className="relative mt-12 text-center text-xs text-gray-400">
        © 2025 XPL Services
      </p>
    </div>
  );
}
