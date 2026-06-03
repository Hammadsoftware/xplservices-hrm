"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiPlusCircle, FiEye } from "react-icons/fi";

/* ================= CLASS CONSTANTS ================= */

const addBtnClass =
  "flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:from-sky-500 hover:to-indigo-700 transition w-full sm:w-auto";

const actionBtnBase =
  "flex h-9 w-9 items-center justify-center rounded-full transition";

const viewBtn = `${actionBtnBase} bg-green-200 hover:bg-green-300 text-green-800`;
const editBtn = `${actionBtnBase} bg-yellow-200 hover:bg-yellow-300 text-yellow-800`;
const deleteBtn = `${actionBtnBase} bg-red-200 hover:bg-red-300 text-red-800`;

/* ================= PAGE ================= */

export default function MyAttendance() {
  const router = useRouter();
  const [date, setDate] = useState("");

  // Hydration-safe date
  useEffect(() => {
    setDate(new Date().toDateString());
  }, []);

  const userAttendance = {
    id: "ATT-001",
    name: "Muhammad Usman",
    status: "Present",
    checkIn: "10:15 AM",
    checkOut: "06:02 PM",
    hours: "7h 47m",
    custom: "On Time",
  };

  return (
    <div className="w-full space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black">
          My Attendance
        </h1>

        <button
          onClick={() => router.push("/dashboard/attendance/addAttendance")}
          className={addBtnClass}
        >
          <FiPlusCircle size={18} />
          Add Attendance
        </button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div
        className="
          relative rounded-3xl overflow-hidden
          border border-gray-200
          bg-white shadow
        "
      >
        {/* Table scroll wrapper */}
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm text-black">
            {/* ================= THEAD ================= */}
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-6 py-4 text-left font-semibold first:rounded-tl-3xl">
                  Employee
                </th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Check In</th>
                <th className="px-6 py-4 text-left font-semibold">Check Out</th>
                <th className="px-6 py-4 text-left font-semibold">Hours</th>
                <th className="px-6 py-4 text-left font-semibold">Custom</th>
                <th className="px-6 py-4 text-center font-semibold last:rounded-tr-3xl">
                  Actions
                </th>
              </tr>
            </thead>

            {/* ================= TBODY ================= */}
            <tbody>
              <tr className="border-t border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">
                  {userAttendance.name}
                </td>

                <td className="px-6 py-4">{date || "—"}</td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {userAttendance.status}
                  </span>
                </td>

                <td className="px-6 py-4">{userAttendance.checkIn}</td>
                <td className="px-6 py-4">{userAttendance.checkOut}</td>
                <td className="px-6 py-4">{userAttendance.hours}</td>
                <td className="px-6 py-4">{userAttendance.custom}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      aria-label="View"
                      onClick={() =>
                        router.push(
                          `/dashboard/attendance/${userAttendance.id}`
                        )
                      }
                      className={viewBtn}
                    >
                      <FiEye size={16} />
                    </button>

                    <button aria-label="Edit" className={editBtn}>
                      <FiEdit2 size={16} />
                    </button>

                    <button aria-label="Delete" className={deleteBtn}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile hint */}
        <div className="px-4 py-3 text-xs text-gray-500 sm:hidden">
          Tip: swipe left/right to view the full table.
        </div>
      </div>
    </div>
  );
}
