"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiTrash2, FiCalendar } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

/* ================= INPUT STYLE ================= */
const inputClass =
  "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black " +
  "placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500";

/* ================= PAGE ================= */
export default function AddProjectPage() {
  const [form, setForm] = useState({
    projectName: "",
    clientName: "",
    clientManager: "",
    projectOperation: "",
    sponsor: "",
    timesheetApprover: "",
    description: "",
    budget: "",
    location: "",
    billingMethod: "",
    startDate: "",
    deadline: "",
    requirementFile: null,
    projectManager: "",
    isTimesheetRequired: "",
    priority: "",
    status: "",
  });

  const [teamMembers, setTeamMembers] = useState([{ name: "", rate: "" }]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ================= TEAM MEMBERS ================= */
  const addMember = () =>
    setTeamMembers([...teamMembers, { name: "", rate: "" }]);

  const updateMember = (i, key, value) => {
    const updated = [...teamMembers];
    updated[i][key] = value;
    setTeamMembers(updated);
  };

  const removeMember = (i) => {
    if (teamMembers.length === 1) return;
    setTeamMembers(teamMembers.filter((_, index) => index !== i));
  };

  const handleSave = () => {
    console.log("PROJECT DATA 👉", { ...form, teamMembers });
    alert("Project saved (check console)");
  };

  /* ================= DATE FIELD (SHADCN) ================= */
  const DateField = ({ label, value, onChange, required }) => {
    const selectedDate = value ? new Date(value) : undefined;

    return (
      <Field label={label} required={required}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`${inputClass} flex items-center justify-between`}
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
                onChange(date ? date.toISOString().split("T")[0] : "")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </Field>
    );
  };

  return (
    <div className="relative min-h-screen rounded-3xl bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      {/* ================= HEADER ================= */}
      <div className="relative mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add Project</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create and configure a new project
          </p>
        </div>

        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-5 py-2 text-sm font-medium hover:bg-gray-300"
        >
          <FiArrowLeft /> Back
        </Link>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8 space-y-10">
        {/* ================= BASIC INFO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Field label="Project Name" required>
            <input
              value={form.projectName}
              onChange={(e) => update("projectName", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Client Name" required>
            <input
              value={form.clientName}
              onChange={(e) => update("clientName", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Client Manager" required>
            <input
              value={form.clientManager}
              onChange={(e) => update("clientManager", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Project Operation">
            <input
              value={form.projectOperation}
              onChange={(e) => update("projectOperation", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Project Sponsor">
            <input
              value={form.sponsor}
              onChange={(e) => update("sponsor", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Timesheet Approver" required>
            <input
              value={form.timesheetApprover}
              onChange={(e) => update("timesheetApprover", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Project Budget">
            <input
              type="number"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Project Location">
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Billing Method" required>
            <select
              value={form.billingMethod}
              onChange={(e) => update("billingMethod", e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="Fixed Price">Fixed Price</option>
              <option value="Hourly">Hourly</option>
            </select>
          </Field>

          {/* ✅ REPLACED WITH SHADCN */}
          <DateField
            label="Start Date"
            required
            value={form.startDate}
            onChange={(v) => update("startDate", v)}
          />

          {/* ✅ REPLACED WITH SHADCN */}
          <DateField
            label="Deadline"
            value={form.deadline}
            onChange={(v) => update("deadline", v)}
          />

          <Field label="Requirement File" required>
            <input
              type="file"
              onChange={(e) =>
                update("requirementFile", e.target.files?.[0] || null)
              }
              className="mt-2"
            />
          </Field>

          <Field label="Project Manager" required>
            <input
              value={form.projectManager}
              onChange={(e) => update("projectManager", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Is Timesheet Required?">
            <select
              value={form.isTimesheetRequired}
              onChange={(e) =>
                update("isTimesheetRequired", e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>

          <Field label="Priority">
            <select
              value={form.priority}
              onChange={(e) => update("priority", e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </Field>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <Field label="Project Description">
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={inputClass}
          />
        </Field>

        {/* ================= TEAM MEMBERS ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Team Members *</h3>

          <div className="space-y-4">
            {teamMembers.map((m, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
              >
                <div>
                  <label className="text-sm font-medium">Team Member</label>
                  <input
                    value={m.name}
                    onChange={(e) =>
                      updateMember(i, "name", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Rate ($)</label>
                  <input
                    type="number"
                    value={m.rate}
                    onChange={(e) =>
                      updateMember(i, "rate", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <button
                  onClick={() => removeMember(i)}
                  disabled={teamMembers.length === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-200 text-red-600 disabled:opacity-40"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addMember}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-100 px-5 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200"
          >
            <FiPlus /> Add Team Member
          </button>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-center gap-6 pt-6">
          <button
            onClick={handleSave}
            className="px-14 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow"
          >
            Save Project
          </button>

          <Link
            href="/dashboard/projects"
            className="px-14 py-3 rounded-xl bg-gray-200 text-center font-medium hover:bg-gray-300"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= FIELD WRAPPER ================= */
function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
