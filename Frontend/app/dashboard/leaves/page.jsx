"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

/* ================= SHARED FIELD CLASS ================= */
const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-black " +
  "placeholder:text-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";

export default function LeavePage() {
  const leaveTypes = useMemo(
    () => ["Sick Leave", "Casual Leave", "Annual Leave", "Unpaid Leave"],
    []
  );

  const [showAdd, setShowAdd] = useState(false);

  /* DEMO VALUES (API later) */
  const availableLeaves = 0;
  const remainingBalance = 0;

  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    replacementEmail: "",
    reason: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("LEAVE DATA 👉", {
      ...form,
      availableLeaves,
      remainingBalance,
    });

    alert("Leave submitted (demo)");
    setShowAdd(false);
    setForm({
      leaveType: "",
      startDate: "",
      endDate: "",
      replacementEmail: "",
      reason: "",
    });
  };

  /* ================= DATE FIELD (SHADCN) ================= */
  const DateField = ({ label, name, value, required }) => {
    const selectedDate = value ? new Date(value) : undefined;

    return (
      <Field label={label}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`${fieldClass} flex items-center justify-between`}
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
                setForm((p) => ({
                  ...p,
                  [name]: date
                    ? date.toISOString().split("T")[0]
                    : "",
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {required && (
          <input
            type="hidden"
            value={value}
            required
            readOnly
          />
        )}
      </Field>
    );
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden rounded-3xl
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 md:px-10 py-10 space-y-12 text-black"
    >
      {/* ================= HEADER ================= */}
      <section className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Leave Applications
          </h2>
          <p>All leave applications for Hammad Tariq</p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center justify-center gap-2 rounded-xl
          bg-gradient-to-r from-sky-500 to-indigo-600
          px-6 py-2 text-sm font-medium text-white shadow hover:opacity-90
          w-full sm:w-auto"
        >
          <FiPlus className="text-lg" />
          Add Leave
        </button>
      </section>

      {/* ================= ADD LEAVE ================= */}
      {showAdd && (
        <section className="relative">
          <div className="relative rounded-2xl overflow-hidden border border-white/60 bg-white/90 backdrop-blur-xl shadow-xl">
            <div className="relative p-4 sm:p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="Select Leave Type">
                    <select
                      name="leaveType"
                      value={form.leaveType}
                      onChange={onChange}
                      className={fieldClass}
                      required
                    >
                      <option value="">---------</option>
                      {leaveTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  {/* ✅ SHADCN START DATE */}
                  <DateField
                    label="Start Date"
                    name="startDate"
                    value={form.startDate}
                    required
                  />

                  {/* ✅ SHADCN END DATE */}
                  <DateField
                    label="End Date"
                    name="endDate"
                    value={form.endDate}
                    required
                  />

                  <Field label="Resource Replacement Email Id">
                    <input
                      type="email"
                      name="replacementEmail"
                      value={form.replacementEmail}
                      onChange={onChange}
                      placeholder="example@company.com"
                      className={fieldClass}
                    />
                  </Field>

                  <Field label="Available Leaves">
                    <input
                      value={availableLeaves}
                      disabled
                      className={`${fieldClass} bg-gray-100`}
                    />
                  </Field>

                  <Field label="Remaining Leave Balance">
                    <input
                      value={remainingBalance}
                      disabled
                      className={`${fieldClass} bg-gray-100`}
                    />
                  </Field>

                  <div className="md:col-span-3">
                    <Field label="Reason">
                      <textarea
                        name="reason"
                        value={form.reason}
                        onChange={onChange}
                        rows={3}
                        className={fieldClass}
                        placeholder="Enter reason for leave"
                      />
                    </Field>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-800 shadow hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600
                    px-6 py-2 text-sm font-medium text-white shadow hover:opacity-90"
                  >
                    Submit Leave
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ================= TABLE ================= */}
      <section className="relative">
        <div className="relative rounded-2xl overflow-hidden border border-white/60 bg-white/90 backdrop-blur-xl shadow-xl">
          <table className="relative w-full text-sm">
            <tbody>
              <tr>
                <td className="py-20 text-center text-gray-600">
                  No leave applications found.
                </td>
              </tr>
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
      <label className="text-sm font-medium text-gray-800">{label}</label>
      {children}
    </div>
  );
}
