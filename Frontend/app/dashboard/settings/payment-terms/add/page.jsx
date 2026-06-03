"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export default function AddPaymentTermPage() {
  const [form, setForm] = useState({
    name: "",
    days: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("NEW PAYMENT TERM:", form);
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
            Add Payment Term
          </h1>
          <p className="text-gray-600 mt-1">
            Define invoice payment duration
          </p>
        </div>

        {/* BACK */}
        <Link
          href="/dashboard/settings/payment-terms"
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
        {/* PAYMENT TERM NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Term
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Net 30"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* DAYS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days
          </label>
          <input
            type="number"
            name="days"
            value={form.days}
            onChange={handleChange}
            placeholder="e.g. 30"
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
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
            Save Payment Term
          </button>

          <Link
            href="/dashboard/settings/payment-terms"
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
