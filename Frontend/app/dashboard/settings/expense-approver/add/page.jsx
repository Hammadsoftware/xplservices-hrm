"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export default function AddExpenseApproverPage() {
  const [approver, setApprover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("NEW EXPENSE APPROVER:", approver);
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
            Add Expense Approver
          </h1>
          <p className="text-gray-600 mt-1">
            Assign an employee as expense approver
          </p>
        </div>

        {/* BACK */}
        <Link
          href="/dashboard/settings/expense-approver"
          className="inline-flex items-center gap-2
          rounded-xl border border-gray-300 bg-white/80
          px-4 py-2 text-sm font-medium text-gray-700
          hover:bg-gray-100 transition"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 space-y-6"
      >
        {/* APPROVER NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Approver Name
          </label>
          <select
            value={approver}
            onChange={(e) => setApprover(e.target.value)}
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Approver</option>
            <option value="Shayan Ahmed">Shayan Ahmed</option>
            <option value="Anjum Ali">Anjum Ali</option>
            <option value="HR Manager">HR Manager</option>
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
            Save Approver
          </button>

          <Link
            href="/dashboard/settings/expense-approver"
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
