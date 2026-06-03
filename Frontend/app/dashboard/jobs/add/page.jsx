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

/* ================= INPUT CLASS ================= */
const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black " +
  "placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

export default function AddJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
    deadline: "",
    status: "Active",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NEW JOB 👉", form);
    alert("Job added successfully (demo)");
    router.push("/dashboard/jobs/list");
  };

  return (
    <div className="relative min-h-screen rounded-3xl w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black overflow-hidden">
      {/* ===== BACKGROUND BLUR BLOBS ===== */}
      <div className="absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= HEADER ================= */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl
              bg-gray-200 px-4 py-2 text-sm font-medium text-black
              hover:bg-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Job
          </h1>
        </div>
      </div>

      {/* ================= FORM CARD ================= */}
      <div
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-white/90
          backdrop-blur-xl
          border border-white/60
          shadow-xl
          p-6
        "
      >
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative space-y-8">
          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Remote / New York"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder="e.g. Engineering"
                className={fieldClass}
              />
            </div>

            {/* ✅ SHADCN DEADLINE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Deadline
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`${fieldClass} flex items-center justify-between`}
                  >
                    <span
                      className={
                        form.deadline ? "text-black" : "text-gray-400"
                      }
                    >
                      {form.deadline || "Select date"}
                    </span>
                    <FiCalendar className="text-gray-400" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      form.deadline
                        ? new Date(form.deadline)
                        : undefined
                    }
                    onSelect={(date) =>
                      update(
                        "deadline",
                        date
                          ? date.toISOString().split("T")[0]
                          : ""
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* keeps form validation compatibility */}
              <input
                type="hidden"
                value={form.deadline}
                readOnly
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className={fieldClass}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Write job responsibilities and requirements..."
              className={fieldClass}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl bg-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl
                bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700
                px-6 py-3 text-sm font-semibold text-white shadow-md
                hover:opacity-90"
            >
              <FiSave />
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
