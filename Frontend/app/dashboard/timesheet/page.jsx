"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function TimesheetPage() {
  const timesheets = useMemo(() => [], []);

  return (
    <div
      className="
        relative min-h-screen w-full overflow-hidden rounded-3xl
        bg-gradient-to-br from-sky-50 via-indigo-50 to-white
        px-6 md:px-10 py-10 space-y-8 text-black
      "
    >
      {/* ================= BACKGROUND BLURS ================= */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      {/* ================= HEADER ================= */}
      <section className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Timesheet Management
          </h2>
          <p>All timesheets for Hammad Tariq</p>
        </div>


        <Link
          href="/dashboard/timesheet/add-timesheet"
          className="
            inline-flex w-full sm:w-auto items-center justify-center gap-2
            rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600
            px-5 py-2.5 text-sm font-medium text-white
            shadow hover:opacity-90 transition
          "
        >
          <FiPlus className="text-lg" />
          Add Timesheet
        </Link>
      </section>

      {/* ================= TABLE CARD ================= */}
      <section className="relative">
        <div
          className="
            relative rounded-3xl overflow-hidden
            border border-white/40
            bg-white/70 backdrop-blur-xl bg-clip-padding
            shadow-[0_20px_40px_rgba(0,0,0,0.10)]
          "
        >
          {/* Glass overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10" />

          {/* Table Wrapper */}
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              {/* ================= TABLE HEAD ================= */}
              <thead>
                <tr className="bg-white/80">
                  <th className="px-6 py-4 text-left font-semibold first:rounded-tl-3xl">
                    Project Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Start Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    End Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-center font-semibold last:rounded-tr-3xl">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}
              <tbody>
                {timesheets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center text-gray-600"
                    >
                      <p className="text-base font-medium">
                        No timesheet entries found
                      </p>
                      <p className="mt-1 text-sm">
                        Click{" "}
                        <span className="font-medium text-indigo-600">
                          Add Timesheet
                        </span>{" "}
                        to get started
                      </p>
                    </td>
                  </tr>
                ) : (
                  timesheets.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-white/60 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {item.project}
                      </td>
                      <td className="px-6 py-4">{item.startDate}</td>
                      <td className="px-6 py-4">{item.endDate}</td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            item.status === "Approved"
                              ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                              : item.status === "Rejected"
                                ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                                : "rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                          }
                        >
                          {item.status || "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {item.reason || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            title="View"
                            className="
                              grid h-9 w-9 place-items-center
                              rounded-full bg-sky-100 text-sky-700
                              hover:bg-sky-200 transition
                            "
                          >
                            <FiEye size={16} />
                          </button>

                          <button
                            title="Edit"
                            className="
                              grid h-9 w-9 place-items-center
                              rounded-full bg-indigo-100 text-indigo-700
                              hover:bg-indigo-200 transition
                            "
                          >
                            <FiEdit size={16} />
                          </button>

                          <button
                            title="Delete"
                            className="
                              grid h-9 w-9 place-items-center
                              rounded-full bg-gray-100 text-gray-700
                              hover:bg-gray-200 transition
                            "
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          <div className="px-4 pb-4 pt-3 text-xs text-gray-500 sm:hidden">
            Tip: swipe left/right to view the full table.
          </div>
        </div>
      </section>
    </div>
  );
}
