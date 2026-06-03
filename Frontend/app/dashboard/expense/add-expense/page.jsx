"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiSave,
  FiDollarSign,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function AddExpensePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "Internet Bill",
    amount: "4500",
    category: "Utilities",
    date: new Date().toISOString().split("T")[0],
    notes: "Monthly office internet charges",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Submitted:", form);
    router.push("/dashboard/expense");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 md:px-10 py-10 text-black">
      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      {/* HEADER */}
      <div className="relative mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-white shadow hover:bg-white transition"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Add Expense
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Record a new expense for tracking and reporting
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Expense Title
            </label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white/70 px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* AMOUNT & DATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount (PKR)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white/70 px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* ✅ SHADCN DATE FIELD */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Expense Date
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between
                    rounded-xl border border-gray-200 bg-white/70
                    px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <span
                      className={
                        form.date ? "text-black" : "text-gray-400"
                      }
                    >
                      {form.date || "Select date"}
                    </span>
                    <FiCalendar className="text-gray-400" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      form.date ? new Date(form.date) : undefined
                    }
                    onSelect={(date) =>
                      setForm((prev) => ({
                        ...prev,
                        date: date
                          ? date.toISOString().split("T")[0]
                          : "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* keeps required validation */}
              <input
                type="hidden"
                name="date"
                value={form.date}
                required
                readOnly
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">Select category</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Office">Office</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl
              bg-gradient-to-br from-sky-500 to-indigo-600 px-6 py-3
              text-sm font-medium text-white shadow hover:from-sky-600 hover:to-indigo-700 transition"
            >
              <FiSave />
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
