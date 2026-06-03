"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= DATA ================= */

const attendanceData = [
  { month: "Jan", hours: 160 },
  { month: "Feb", hours: 152 },
  { month: "Mar", hours: 168 },
  { month: "Apr", hours: 158 },
  { month: "May", hours: 172 },
  { month: "Jun", hours: 165 },
  { month: "Jul", hours: 170 },
  { month: "Aug", hours: 162 },
  { month: "Sep", hours: 155 },
  { month: "Oct", hours: 168 },
  { month: "Nov", hours: 160 },
  { month: "Dec", hours: 150 },
];

const leaveData = [
  { name: "Used", value: 6 },
  { name: "Remaining", value: 14 },
];

const COLORS = ["#38bdf8", "#e5e7eb"];

/* ================= PAGE ================= */

export default function DashboardHome() {
  const [time, setTime] = useState("");
  const location = "Karachi, Pakistan";

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen rounded-3xl w-full overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 md:px-10 py-10 space-y-12 text-black">
      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* HEADER */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, Muhammad 👋
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Your performance snapshot for this month
          </p>

          <span className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-medium">
            📍 {location}
          </span>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg px-8 py-5 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Current Time
          </p>
          <p className="text-3xl font-semibold mt-1">
            {time || "--:--:--"}
          </p>
        </div>
      </div>

      {/* TOP SUMMARY */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard title="Projects Allotted">
          <ProjectRow name="Project Alpha" role="Frontend Developer" allocation="100%" />
          <ProjectRow name="Project Beta" role="Support Engineer" allocation="50%" />
        </GlassCard>

        <GlassCard title="Leave Overview">
          <div className="grid grid-cols-3 gap-4">
            <MiniStat label="Total" value="20" />
            <MiniStat label="Used" value="6" />
            <MiniStat label="Remaining" value="14" highlight />
          </div>
        </GlassCard>

        <GlassCard title="Timesheet">
          <div className="grid grid-cols-3 gap-4">
            <MiniStat label="Hours" value="168" />
            <MiniStat label="Submitted" value="20/22" />
            <MiniStat label="Pending" value="2" highlight />
          </div>
        </GlassCard>
      </div>

      {/* STATS */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Present Days" value="18" />
        <StatCard title="Absent Days" value="2" />
        <StatCard title="Late Days" value="3" />
        <StatCard title="Leaves Taken" value="6" />
      </div>

      {/* CHARTS */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard title="Monthly Attendance Hours" className="lg:col-span-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Leave Balance">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={95}
                >
                  {leaveData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

/**
 * IMPORTANT:
 * - rounded + overflow-hidden MUST be on the same div
 * - bg-clip-padding prevents blur bleed
 */
function GlassCard({ title, children, className = "" }) {
  return (
    <div
      className={`
        relative rounded-3xl overflow-hidden
        bg-white/80 backdrop-blur-xl bg-clip-padding
        border border-white/60
        shadow-xl
        ${className}
      `}
    >
      {/* subtle glass overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10" />

      <div className="relative p-6">
        <h2 className="text-lg font-semibold mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur border border-white shadow-md p-6">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function MiniStat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight
          ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white"
          : "bg-white/70 border border-white text-black"
      }`}
    >
      <p className={`text-xs ${highlight ? "text-white/80" : "text-gray-500"}`}>
        {label}
      </p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function ProjectRow({ name, role, allocation }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/60 p-4 mb-3 bg-white/70 backdrop-blur">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-medium bg-sky-100/80 text-sky-700">
        {allocation}
      </span>
    </div>
  );
}
