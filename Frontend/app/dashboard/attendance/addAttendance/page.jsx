"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSave, FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function AddAttendancePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
    checkIn: "",
    checkOut: "",
    note: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Attendance Data:", form);
    router.push("/dashboard/attendance");
  }

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      {/* ===== HEADER ===== */}
      <div className="relative mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Add Attendance
        </h1>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur border border-white shadow px-4 py-2 text-sm font-medium hover:bg-white transition"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      {/* ===== FORM CARD ===== */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8 space-y-8"
      >
        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Employee Name"
            name="employee"
            value={form.employee}
            onChange={handleChange}
            required
          />

          {/* ✅ SHADCN DATE FIELD */}
          <DateField
            label="Date"
            value={form.date}
            required
            onChange={(v) =>
              setForm((p) => ({ ...p, date: v }))
            }
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
            </select>
          </div>

          <Input
            label="Check In"
            type="time"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
          />

          <Input
            label="Check Out"
            type="time"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
          />

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Notes</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-md hover:from-sky-500 hover:to-indigo-700 transition"
          >
            <FiSave />
            Save Attendance
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===== SHADCN DATE FIELD ===== */
function DateField({ label, value, onChange, required }) {
  const selectedDate = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span className={value ? "text-black" : "text-gray-400"}>
              {value || "Select date"}
            </span>
            <FiCalendar className="text-gray-400" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) =>
              onChange(
                date ? date.toISOString().split("T")[0] : ""
              )
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* keeps required validation */}
      {required && (
        <input type="hidden" value={value} required readOnly />
      )}
    </div>
  );
}

/* ===== REUSABLE INPUT ===== */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
  );
}
