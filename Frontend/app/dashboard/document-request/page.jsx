"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiEye, FiEdit, FiSettings } from "react-icons/fi";

export default function AssetAllocationPage() {
  const [activeTab, setActiveTab] = useState("asset");
  const assets = useMemo(() => [], []);

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      
      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ===== Top Toggle Bar ===== */}
      <div className="relative mb-8 w-full rounded-full bg-slate-950/90 px-3 py-2 shadow-sm ring-1 ring-black/10">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("asset")}
            className={`rounded-full px-8 py-2 text-sm font-semibold transition ${
              activeTab === "asset"
                ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white shadow"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Asset Allocation
          </button>
        </div>
      </div>

      {/* ===== MAIN CARD ===== */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6">
        {/* Card Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            My Assets
          </h2>

          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md hover:from-sky-500 hover:to-indigo-700 transition">
            <FiPlus className="text-lg" />
            Add Asset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full min-w-[900px] text-sm text-gray-900">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-5 py-4 text-left font-semibold">Asset Name</th>
                <th className="px-5 py-4 text-left font-semibold">Asset Type</th>
                <th className="px-5 py-4 text-left font-semibold">
                  Asset Description
                </th>
                <th className="px-5 py-4 text-left font-semibold">Serial</th>
                <th className="px-5 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-600">
                    No Assets Added Yet
                  </td>
                </tr>
              ) : (
                assets.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-5 py-4 font-medium">{a.name}</td>
                    <td className="px-5 py-4">{a.type}</td>
                    <td className="px-5 py-4">{a.description}</td>
                    <td className="px-5 py-4">{a.serial}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          title="View"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FiEye className="text-lg" />
                        </button>
                        <button
                          title="Edit"
                          className="text-sky-600 hover:text-sky-800"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Floating Settings Button ===== */}
      <button
        title="Settings"
        className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white shadow-lg hover:opacity-90"
      >
        <FiSettings className="text-xl" />
      </button>
    </div>
  );
}
