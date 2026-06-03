"use client";

import { useState } from "react";
import {
  FiBriefcase,
  FiUsers,
  FiFolder,
  FiUserCheck,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiX,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const modules = [
  { id: "job-applications", title: "Job Applications", icon: FiBriefcase },
  { id: "clients", title: "Clients", icon: FiUsers },
  { id: "projects", title: "Projects", icon: FiFolder },
  { id: "employees", title: "Employees", icon: FiUserCheck },
  { id: "leave", title: "Leave", icon: FiCalendar },
  { id: "attendance", title: "Attendance", icon: FiClock },
  { id: "expense", title: "Expense", icon: FiDollarSign },
];

export default function CustomFieldsPage() {
  const [activeModule, setActiveModule] = useState(null);
  const [fieldsByModule, setFieldsByModule] = useState({});
  const [fieldType, setFieldType] = useState("text");

  const fields = fieldsByModule[activeModule?.id] || [];

  const addField = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const newField = {
      id: Date.now(),
      name: data.get("fieldName"),
      type: data.get("fieldType"),
      required: data.get("required") === "on",
      options:
        data.get("fieldType") === "dropdown"
          ? data.get("options")
          : "",
    };

    setFieldsByModule((prev) => ({
      ...prev,
      [activeModule.id]: [...(prev[activeModule.id] || []), newField],
    }));

    e.target.reset();
    setFieldType("text");
  };

  const deleteField = (fieldId) => {
    setFieldsByModule((prev) => ({
      ...prev,
      [activeModule.id]: prev[activeModule.id].filter(
        (f) => f.id !== fieldId
      ),
    }));
  };

  return (
    <div className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-10 text-black">

      {/* HEADER */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Custom Fields</h2>
        <p className="text-gray-600">
          Manage custom fields for different modules.
        </p>
      </section>

      {/* MODULE CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              className="group text-left rounded-3xl border border-white/40
              bg-white/70 backdrop-blur-xl shadow-xl p-6 hover:-translate-y-1 transition"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br
                from-sky-400 to-indigo-600 flex items-center justify-center text-white mb-4">
                <Icon />
              </div>
              <h3 className="font-semibold">{mod.title}</h3>
              <div className="flex items-center gap-2 text-sm text-indigo-600">
                Manage Fields <FiArrowRight />
              </div>
            </button>
          );
        })}
      </section>

      {/* POPUP */}
      {activeModule && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {activeModule.title} – Custom Fields
              </h3>
              <button onClick={() => setActiveModule(null)}>
                <FiX />
              </button>
            </div>

            {/* ADD FIELD FORM */}
            <form onSubmit={addField} className="grid grid-cols-5 gap-4">
              <input
                name="fieldName"
                placeholder="Field Name"
                required
                className="col-span-1 border rounded-xl px-3 py-2 text-sm"
              />

              <select
                name="fieldType"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="col-span-1 border rounded-xl px-3 py-2 text-sm"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
              </select>

              <label className="col-span-1 flex items-center gap-2 text-sm">
                <input type="checkbox" name="required" />
                Required
              </label>

              <input
                name="options"
                placeholder="Options (comma separated)"
                disabled={fieldType !== "dropdown"}
                className="col-span-1 border rounded-xl px-3 py-2 text-sm disabled:bg-gray-100"
              />

              <button
                type="submit"
                className="col-span-1 rounded-xl bg-gradient-to-br
                from-sky-400 to-indigo-600 text-white text-sm px-4 py-2 flex items-center gap-2"
              >
                <FiPlus /> Add
              </button>
            </form>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Field Name</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Required</th>
                    <th className="px-4 py-2">Options</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        No fields added
                      </td>
                    </tr>
                  ) : (
                    fields.map((f) => (
                      <tr key={f.id} className="border-t">
                        <td className="px-4 py-2">{f.name}</td>
                        <td className="px-4 py-2 text-center">{f.type}</td>
                        <td className="px-4 py-2 text-center">
                          {f.required ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {f.options || "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => deleteField(f.id)}
                            className="text-red-600"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
