'use client';
import { useState } from "react";

export default function AddAttendance() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    status: "Present",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // connect API here
  };

  return (
    <div className="relative rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Add Attendance
        </h2>
        <p className="text-sm text-gray-500">
          Enter employee attendance details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Employee Name */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Muhammad Usman"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>

        {/* Check In */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Check In Time
          </label>
          <input
            type="time"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Check Out Time
          </label>
          <input
            type="time"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="
              inline-flex items-center justify-center
              rounded-xl px-6 py-2.5 text-sm font-medium
              bg-gradient-to-r from-indigo-500 to-violet-600
              text-white shadow-md
              hover:shadow-lg hover:scale-[1.02]
              active:scale-95 transition
            "
          >
            Save Attendance
          </button>
        </div>
      </form>
    </div>
  );
}
