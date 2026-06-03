"use client";

import MyAttendance from "../../components/MyAttendance";

export default function AttendancePage() {
  const attendanceList = [
    {
      id: 1,
      name: "Muhammad Usman",
      date: "Sep 16, 2025",
      status: "Present",
      checkIn: "10:10 AM",
      checkOut: "06:00 PM",
      hours: "7h 50m",
      custom: "On Time",
    },
    {
      id: 2,
      name: "Ali Khan",
      date: "Sep 17, 2025",
      status: "Late",
      checkIn: "10:40 AM",
      checkOut: "06:10 PM",
      hours: "7h 30m",
      custom: "Late Arrival",
    },
    {
      id: 3,
      name: "Sara Ahmed",
      date: "Sep 18, 2025",
      status: "Absent",
      checkIn: "—",
      checkOut: "—",
      hours: "0h",
      custom: "Absent",
    },
  ];

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 space-y-12 text-black">
      
      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= MY ATTENDANCE ================= */}
      <section className="relative">
        <MyAttendance />
      </section>

      {/* ================= ALL ATTENDANCE ================= */}
      <section className="relative">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Attendance Records
        </h2>

        <div className="relative rounded-3xl overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          
          {/* subtle glass highlight */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10" />

          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Employee</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Check In</th>
                  <th className="px-6 py-4 text-left font-semibold">Check Out</th>
                  <th className="px-6 py-4 text-left font-semibold">Hours</th>
                  <th className="px-6 py-4 text-left font-semibold">Custom</th>
                </tr>
              </thead>

              <tbody>
                {attendanceList.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          item.status === "Present"
                            ? "rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                            : item.status === "Late"
                            ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                            : "rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">{item.checkIn}</td>
                    <td className="px-6 py-4">{item.checkOut}</td>
                    <td className="px-6 py-4">{item.hours}</td>
                    <td className="px-6 py-4">{item.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
