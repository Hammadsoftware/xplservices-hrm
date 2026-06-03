"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* ================= STYLES ================= */

const inputClass =
  "h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500";

const glassCard =
  "relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.10)]";

/* ================= HELPERS ================= */

const getDatesBetween = (start, end) => {
  const dates = [];
  let current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

/* ================= PAGE ================= */

export default function EmployeeTimesheetPage() {
  const [employeeName] = useState("Hammad Tariq");
  const [project, setProject] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project || !fromDate || !toDate) {
      setRows([]);
      return;
    }

    setLoading(true);

    const dates = getDatesBetween(
      fromDate.toISOString().split("T")[0],
      toDate.toISOString().split("T")[0]
    );

    setRows(
      dates.map((date) => ({
        date,
        task: "",
        location: "Remote",
        hours: "",
        notes: "",
      }))
    );

    setTimeout(() => setLoading(false), 300);
  }, [project, fromDate, toDate]);

  const updateRow = (index, key, value) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 md:px-10 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Employee Timesheet</h1>
        <p className="text-sm text-gray-600">Log allocated working hours</p>
      </div>

      {/* FILTER BAR */}
      <div className={`${glassCard} p-6 mb-8`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <input className={`${inputClass} w-full`} value={employeeName} disabled />

          <select
            className={`${inputClass} w-full`}
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select Project</option>
            <option>Project Alpha</option>
            <option>Project Beta</option>
          </select>

          <Popover>
            <PopoverTrigger asChild>
              <button className={`${inputClass} w-full text-left`}>
                {fromDate ? fromDate.toDateString() : "From date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={(d) => {
                  setFromDate(d);
                  setToDate(null);
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`${inputClass} w-full text-left`}
                disabled={!fromDate}
              >
                {toDate ? toDate.toDateString() : "To date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={toDate}
                disabled={(d) => d < fromDate}
                onSelect={setToDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* TABLE */}
      <div className={`${glassCard} rounded-2xl overflow-hidden`}>
        {loading && (
          <div className="p-10 text-center text-gray-500">
            Generating timesheet…
          </div>
        )}

        {!loading && rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Task Description</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-center">Hours</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{r.date}</td>

                    {/* TASK — EXTRA WIDE */}
                    <td className="px-4 py-3">
                      <input
                        className={`${inputClass} w-full min-w-[650px]`}
                        placeholder="Allocated task"
                        value={r.task}
                        onChange={(e) =>
                          updateRow(i, "task", e.target.value)
                        }
                      />
                    </td>

                    {/* LOCATION */}
                    <td className="px-4 py-3">
                      <select
                        className={`${inputClass} w-full`}
                        value={r.location}
                        onChange={(e) =>
                          updateRow(i, "location", e.target.value)
                        }
                      >
                        <option>Remote</option>
                        <option>Onsite</option>
                      </select>
                    </td>

                    {/* HOURS — SMALL */}
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        className={`${inputClass} w-16 px-1 text-center`}
                        placeholder="8"
                        value={r.hours}
                        onChange={(e) =>
                          updateRow(i, "hours", e.target.value)
                        }
                      />
                    </td>

                    {/* NOTES */}
                    <td className="px-4 py-3">
                      <input
                        className={`${inputClass} w-full`}
                        value={r.notes}
                        onChange={(e) =>
                          updateRow(i, "notes", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {rows.length > 0 && (
        <div className="flex justify-end mt-8">
          <button className="px-10 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow">
            Submit Timesheet
          </button>
        </div>
      )}
    </div>
  );
}
