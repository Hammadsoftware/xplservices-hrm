"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
} from "react-icons/fi";

/* ================= GLASS STYLES (FIXED) ================= */

const glassCard =
  "relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl " +
  "border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.10)] p-6";

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg bg-white/70 backdrop-blur " +
  "border border-white/40 text-gray-700 hover:bg-white/90 transition";

/* ================= PAGE ================= */

export default function ReportsPage() {
  /* ================= DEMO DATA ================= */

  const salaryData = [
    { month: "Oct 2025", salaryPaid: 0, totalExpenses: 0 },
  ];

  const acceptedTimesheetDays = [
    { month: "Oct", onsite: 135, holiday: 32, leave: 0, otherHolidays: 0, remote: 55 },
    { month: "Nov", onsite: 30, holiday: 16, leave: 0, otherHolidays: 8, remote: 27 },
    { month: "Dec", onsite: 0, holiday: 0, leave: 0, otherHolidays: 3, remote: 0 },
  ];

  const detailedList = [
    { label: "Illinois", value: 713, color: "bg-purple-600" },
    { label: "Washington", value: 583, color: "bg-yellow-400" },
    { label: "Mississippi", value: 924, color: "bg-red-500" },
    { label: "California", value: 664, color: "bg-blue-500" },
  ];

  const maxValue = Math.max(...detailedList.map((i) => i.value || 0));

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden rounded-3xl
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 md:px-10 py-10 space-y-8 text-black"
    >
      {/* ================= BACKGROUND BLURS ================= */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= HEADER ================= */}
      <div className="relative flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">
          Reports Overview
        </h1>
      </div>

      {/* ================= TOP CHARTS ================= */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Report */}
        <div className={glassCard}>
          <h2 className="mb-4 text-lg font-semibold">
            Salary Report
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salaryPaid"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="totalExpenses"
                  stroke="#fb7185"
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accepted Timesheet Days */}
        <div className={glassCard}>
          <h2 className="mb-4 text-lg font-semibold">
            Accepted Timesheet Days
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={acceptedTimesheetDays} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onsite" fill="#5b21b6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="holiday" fill="#9db4ff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="leave" fill="#facc15" radius={[6, 6, 0, 0]} />
                <Bar dataKey="otherHolidays" fill="#ff2d20" radius={[6, 6, 0, 0]} />
                <Bar dataKey="remote" fill="#00c49a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= DETAILED REPORT ================= */}
      <div className={glassCard}>
        {/* Navigation */}
        <div className="absolute right-6 top-6 flex items-center gap-2">
          <button className={iconBtn}>
            <FiChevronLeft />
          </button>
          <button className={iconBtn}>
            <FiChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SUMMARY */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Detailed Reports
            </h3>

            <div className="space-y-2">
              <div className="text-5xl font-semibold text-purple-700">
                $34,040
              </div>
              <div className="text-xl font-medium text-purple-700">
                North America
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm text-gray-600">
              Total number of sessions within the selected period across all regions.
            </p>
          </div>

          {/* RIGHT BARS */}
          <div className="space-y-5">
            {detailedList.map((item) => {
              const pct = maxValue
                ? Math.round((item.value / maxValue) * 100)
                : 0;

              return (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-28 text-sm text-gray-600">
                    {item.label}
                  </div>

                  <div className="flex-1">
                    <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-14 text-right text-sm font-semibold">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Settings */}
        <button
          title="Settings"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full
          bg-gradient-to-r from-purple-600 to-indigo-700
          text-white shadow-lg grid place-items-center hover:opacity-90"
        >
          <FiSettings className="text-xl" />
        </button>
      </div>
    </div>
  );
}
