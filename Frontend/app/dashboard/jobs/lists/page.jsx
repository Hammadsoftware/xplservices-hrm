"use client";

import { useMemo } from "react";
import { FiEye, FiEdit, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

/* ================= BADGE STYLES ================= */

const badgeBase =
  "inline-flex rounded-full px-3 py-1 text-xs font-medium";

const activeBadge = `${badgeBase} bg-green-100 text-green-700`;
const closedBadge = `${badgeBase} bg-gray-200 text-gray-700`;
const draftBadge = `${badgeBase} bg-amber-100 text-amber-700`;

export default function JobListPage() {
  const router = useRouter();

  // keep empty for now
  const jobs = useMemo(() => [], []);

  return (
    <div className="relative min-h-screen rounded-3xl w-full overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">

      {/* ===== BACKGROUND BLUR BLOBS ===== */}
      <div className="absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= HEADER ================= */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl
              bg-gray-200 px-4 py-2 text-sm font-medium
              hover:bg-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Job List
          </h1>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-white/90
          backdrop-blur-xl
          border border-white/60
          shadow-xl
          p-5
        "
      >
        {/* GLASS INNER HIGHLIGHT */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

        <div className="relative overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-5 py-4 text-left font-semibold">Job Title</th>
                <th className="px-5 py-4 text-left font-semibold">Location</th>
                <th className="px-5 py-4 text-left font-semibold">Category</th>
                <th className="px-5 py-4 text-left font-semibold">Created At</th>
                <th className="px-5 py-4 text-left font-semibold">Deadline</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
                <th className="px-5 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-gray-600"
                  >
                    No jobs available
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-5 py-4 font-medium">
                      {job.title}
                    </td>
                    <td className="px-5 py-4">
                      {job.location}
                    </td>
                    <td className="px-5 py-4">
                      {job.category}
                    </td>
                    <td className="px-5 py-4">
                      {job.createdAt}
                    </td>
                    <td className="px-5 py-4">
                      {job.deadline}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={
                          job.status === "Active"
                            ? activeBadge
                            : job.status === "Draft"
                            ? draftBadge
                            : closedBadge
                        }
                      >
                        {job.status}
                      </span>
                    </td>
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
    </div>
  );
}
