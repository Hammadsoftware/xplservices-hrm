"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function AddEmployeePositionPage() {
  return (
    <div
      className="relative flex-1 w-full overflow-hidden
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Employee Position
          </h1>
          <p className="text-gray-600 mt-1">
            Add a new employee position
          </p>
        </div>

        {/* BACK */}
        <Link
          href="/dashboard/settings/employee-positions"
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
      <div
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8"
      >
        <form className="space-y-6">
          {/* POSITION NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position Name
            </label>
            <input
              type="text"
              placeholder="e.g. Manager, Intern"
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
              Save Position
            </button>

            <Link
              href="/dashboard/settings/employee-positions"
              className="rounded-xl border border-gray-300
              px-6 py-3 text-sm font-medium text-gray-700
              hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
