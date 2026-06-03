"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiPlus, FiCalendar, FiEye } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("uae");
  const [payrollMonth, setPayrollMonth] = useState("");
  const [payrollCycle, setPayrollCycle] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const rows = useMemo(
    () => [
      {
        id: 1,
        employeeCount: 2,
        monthLabel: "Oct, 2025",
        dateTo: "2025-10-01",
      },
    ],
    []
  );

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden rounded-3xl
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-4 md:px-6 py-6 space-y-6 text-black"
    >
      {/* ================= BRAND BAR ================= */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-[1px] shadow-xl">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Image
                  src="/brands.jpeg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-xs font-medium text-white/70">Dashboard</p>
                <h1 className="text-xl font-semibold text-white">Payroll</h1>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition">
              <FiPlus className="text-lg" />
              Generate Payroll
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="relative w-full rounded-full bg-slate-950/90 px-3 py-2 ring-1 ring-white/10">
        <div className="flex items-center justify-center gap-3">
          {["uae", "contractors"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {tab === "uae" ? "Payroll for UAE" : "Payroll for Contractors"}
            </button>
          ))}
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-lg ring-1 ring-white/60">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* ================= PAYROLL MONTH (SHADCN) ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payroll Month</label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-xl
                  border border-gray-200 px-4 py-3 text-sm bg-white outline-none
                  focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                  <span
                    className={
                      payrollMonth ? "text-black" : "text-gray-400"
                    }
                  >
                    {payrollMonth || "Select month"}
                  </span>
                  <FiCalendar className="text-gray-600" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    payrollMonth
                      ? new Date(`${payrollMonth}-01`)
                      : undefined
                  }
                  onSelect={(date) =>
                    setPayrollMonth(
                      date
                        ? `${date.getFullYear()}-${String(
                            date.getMonth() + 1
                          ).padStart(2, "0")}`
                        : ""
                    )
                  }
                  captionLayout="dropdown"
                  fromYear={2020}
                  toYear={2035}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* ================= PAYROLL CYCLE ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payroll Cycle</label>
            <select
              value={payrollCycle}
              onChange={(e) => setPayrollCycle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="">Select cycle</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* ================= PAYMENT DATE (SHADCN) ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Date</label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-xl
                  border border-gray-200 px-4 py-3 text-sm bg-white outline-none
                  focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                  <span
                    className={
                      paymentDate ? "text-black" : "text-gray-400"
                    }
                  >
                    {paymentDate || "Select date"}
                  </span>
                  <FiCalendar className="text-gray-600" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    paymentDate ? new Date(paymentDate) : undefined
                  }
                  onSelect={(date) =>
                    setPaymentDate(
                      date
                        ? date.toISOString().split("T")[0]
                        : ""
                    )
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-lg ring-1 ring-white/60">
        <div className="overflow-hidden rounded-2xl border border-white/40">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-5 py-4 text-left font-semibold">
                  Employee Count
                </th>
                <th className="px-5 py-4 text-left font-semibold">
                  Month
                </th>
                <th className="px-5 py-4 text-left font-semibold">
                  Date To
                </th>
                <th className="px-5 py-4 text-center font-semibold">
                  Detailed View
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-white/40 hover:bg-white/60 transition"
                >
                  <td className="px-5 py-6">{r.employeeCount}</td>
                  <td className="px-5 py-6">{r.monthLabel}</td>
                  <td className="px-5 py-6">{r.dateTo}</td>
                  <td className="px-5 py-6 text-center">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full
                      bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow hover:opacity-90">
                      <FiEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
