"use client";

import { useRouter, useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function ViewAttendancePage() {
  const router = useRouter();
  const { id } = useParams();

  const attendance = {
    id,
    name: "Muhammad Usman",
    date: new Date().toDateString(),
    status: "Present",
    checkIn: "10:15 AM",
    checkOut: "06:02 PM",
    hours: "7h 47m",
    custom: "On Time",
    remarks: "Worked on project deliverables",
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-8 py-10 space-y-8 text-black">
      
      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ===== HEADER ===== */}
      <div className="relative flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Attendance Details
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Attendance ID: {attendance.id}
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur border border-white shadow px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          <FiArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* ===== SUMMARY CARD ===== */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Info label="Employee" value={attendance.name} />
          <Info label="Date" value={attendance.date} />

          <div>
            <p className="text-xs text-gray-500">Status</p>
            <span className="inline-flex mt-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              {attendance.status}
            </span>
          </div>

          <Info label="Hours Worked" value={attendance.hours} />
        </div>
      </div>

      {/* ===== DETAILS TABLE ===== */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="bg-gray-100/70">
                <th className="px-6 py-4 text-left font-semibold">Check In</th>
                <th className="px-6 py-4 text-left font-semibold">Check Out</th>
                <th className="px-6 py-4 text-left font-semibold">Hours</th>
                <th className="px-6 py-4 text-left font-semibold">Custom</th>
                <th className="px-6 py-4 text-left font-semibold">Remarks</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4">{attendance.checkIn}</td>
                <td className="px-6 py-4">{attendance.checkOut}</td>
                <td className="px-6 py-4">{attendance.hours}</td>
                <td className="px-6 py-4">{attendance.custom}</td>
                <td className="px-6 py-4">{attendance.remarks}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== SMALL HELPER ===== */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-black">{value}</p>
    </div>
  );
}
