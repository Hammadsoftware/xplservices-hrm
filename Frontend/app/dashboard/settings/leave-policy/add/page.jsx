"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export default function AddLeavePolicyPage() {
  const [form, setForm] = useState({
    name: "",
    totalDays: "",
    maxPerMonth: "",
    isPaid: "",
    approver: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("NEW LEAVE POLICY:", form);
    // 🔥 Replace with API / Server Action
  };

  return (
    <div
      className="relative flex-1 w-full overflow-hidden
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add Leave Policy
          </h1>
          <p className="text-gray-600 mt-1">
            Define leave rules and approval flow
          </p>
        </div>

        {/* BACK */}
        <Link
          href="/dashboard/settings/leave-policy"
          className="inline-flex items-center gap-2
          rounded-xl border border-gray-300 bg-white/80
          px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-100 transition"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      {/* FORM (FULL WIDTH) */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 space-y-6"
      >
        {/* LEAVE NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Paid Leave"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* LEAVE DAYS ALLOWED */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Days Allowed
          </label>
          <input
            type="number"
            name="totalDays"
            value={form.totalDays}
            onChange={handleChange}
            placeholder="e.g. 24"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* MAX PER MONTH */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Leaves Per Month
          </label>
          <input
            type="number"
            name="maxPerMonth"
            value={form.maxPerMonth}
            onChange={handleChange}
            placeholder="e.g. 2"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* IS PAID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is Paid Leave?
          </label>
          <select
            name="isPaid"
            value={form.isPaid}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* LEAVE APPROVER */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Approver
          </label>
          <select
            name="approver"
            value={form.approver}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Approver</option>
            <option value="Anjum Ali - ANJ-1993">
              Anjum Ali - ANJ-1993
            </option>
            <option value="HR Manager">
              HR Manager
            </option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-br
            from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white
            shadow-md hover:from-sky-500 hover:to-indigo-700 transition"
          >
            Save Leave Policy
          </button>

          <Link
            href="/dashboard/settings/leave-policy"
            className="rounded-xl border border-gray-300
            px-6 py-3 text-sm font-medium text-gray-700
            hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
