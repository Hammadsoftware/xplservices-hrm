"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiFileText } from "react-icons/fi";

/* ================= SHARED FIELD CLASS ================= */
const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-black " +
  "placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";

export default function ExpensePage() {
  const [expenses] = useState([]); // empty → No Expense Currently
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    expenseName: "",
    date: "",
    amount: "",
    description: "",
    document: null,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFileChange = (e) => {
    setForm((p) => ({ ...p, document: e.target.files?.[0] || null }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("EXPENSE DATA 👉", form);
    alert("Expense submitted (demo)");

    setShowAdd(false);
    setForm({
      expenseName: "",
      date: "",
      amount: "",
      description: "",
      document: null,
    });
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 md:px-10 py-10 space-y-10 text-black">

      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= HEADER ================= */}
      <section className="relative flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>

        <Link
          href="/dashboard/expense/add-expense"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:from-sky-500 hover:to-indigo-700 transition"
        >
          <FiPlus className="text-lg" />
          Add Expense
        </Link>
      </section>

      {/* ================= ADD EXPENSE ================= */}
      {showAdd && (
        <section className="relative">
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Add Expense</h3>
                <button
                  onClick={() => setShowAdd(false)}
                  className="text-sm font-medium text-gray-600 hover:underline"
                >
                  Close
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <Field label="Expense Name">
                    <input
                      name="expenseName"
                      value={form.expenseName}
                      onChange={onChange}
                      placeholder="e.g. Travel Expense"
                      className={fieldClass}
                      required
                    />
                  </Field>

                  <Field label="Date">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={onChange}
                      className={fieldClass}
                      required
                    />
                  </Field>

                  <Field label="Amount">
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={onChange}
                      placeholder="Amount"
                      className={fieldClass}
                      required
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Description">
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={3}
                        placeholder="Description of Expense"
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <Field label="Document">
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-700 hover:bg-white">
                      <span className="flex items-center gap-2">
                        <FiFileText className="text-indigo-600" />
                        {form.document?.name || "No file chosen"}
                      </span>
                      <span className="text-xs font-medium text-indigo-600">
                        Browse
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={onFileChange}
                      />
                    </label>
                  </Field>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-6 py-2 text-sm font-medium text-white shadow hover:from-sky-500 hover:to-indigo-700"
                  >
                    Submit Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ================= EXPENSE TABLE ================= */}
      <section className="relative">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-6 py-4 text-left font-semibold">Expense</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
                <th className="px-6 py-4 text-left font-semibold">Document</th>
              </tr>
            </thead>

            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-600">
                    No Expense Currently
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ================= FIELD WRAPPER ================= */
function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
