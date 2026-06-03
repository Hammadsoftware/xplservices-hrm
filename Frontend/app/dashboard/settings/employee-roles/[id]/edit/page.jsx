"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

/* ================= MODULES & PERMISSIONS ================= */

const modules = [
  "Employee",
  "Timesheet",
  "Client",
  "Project",
  "Leave",
  "Attendance",
  "Payroll",
  "Expense",
  "Jobs",
  "Settings",
  "Reports",
];

const permissions = ["view", "add", "edit", "delete"];

/* ================= PAGE ================= */

export default function EditEmployeeRolePage() {
  const { id } = useParams();
  const router = useRouter();

  // 🔹 Mock existing role (replace with API fetch)
  const existingRole = {
    name: "Admin",
    permissions: {
      Employee: { view: true, add: true, edit: true, delete: true },
      Timesheet: { view: true, add: true, edit: true, delete: true },
      Client: { view: true, add: true, edit: true, delete: true },
      Project: { view: true, add: true, edit: true, delete: true },
      Leave: { view: true, add: true, edit: true, delete: true },
      Attendance: { view: true, add: true, edit: true, delete: true },
      Payroll: { view: true, add: true, edit: true, delete: true },
      Expense: { view: true, add: true, edit: true, delete: true },
      Jobs: { view: true, add: true, edit: true, delete: true },
      Settings: { view: true, add: true, edit: true, delete: true },
      Reports: { view: true, add: true, edit: true, delete: true },
    },
  };

  const [roleName, setRoleName] = useState(existingRole.name);
  const [matrix, setMatrix] = useState(existingRole.permissions);

  /* ================= HELPERS ================= */

  const isAllEnabled = (module) =>
    permissions.every((p) => matrix[module]?.[p]);

  const togglePermission = (module, permission) => {
    setMatrix((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module]?.[permission],
      },
    }));
  };

  const toggleAll = (module) => {
    const allEnabled = isAllEnabled(module);

    setMatrix((prev) => ({
      ...prev,
      [module]: permissions.reduce(
        (acc, p) => ({ ...acc, [p]: !allEnabled }),
        {}
      ),
    }));
  };

  /* ================= ACTIONS ================= */

  const handleUpdate = (e) => {
    e.preventDefault();

    const payload = {
      id,
      roleName,
      permissions: matrix,
    };

    console.log("UPDATED ROLE:", payload);
    // 🔥 Replace with API / Server Action
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role? This action cannot be undone."
    );
    if (!confirmed) return;

    console.log("Deleted role:", id);
    router.push("/dashboard/settings/employee-roles");
  };

  /* ================= UI ================= */

  return (
    <div
      className="relative flex-1 w-full overflow-hidden
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Employee Role
          </h1>
          <p className="text-gray-600 mt-1">
            Update role name and permissions
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings/employee-roles"
            className="inline-flex items-center gap-2
            rounded-xl border border-gray-300 bg-white/80
            px-4 py-2 text-sm font-medium text-gray-700
            hover:bg-gray-100 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2
            rounded-xl border border-red-200 bg-red-50
            px-4 py-2 text-sm font-medium text-red-700
            hover:bg-red-100 transition"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleUpdate}
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8 space-y-8"
      >
        {/* ROLE NAME */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role Name
          </label>
          <input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full rounded-xl border border-gray-300
            bg-white/80 px-4 py-3 text-sm outline-none
            focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* PERMISSION MATRIX */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-6 py-4 text-left">Module</th>
                {permissions.map((p) => (
                  <th
                    key={p}
                    className="px-6 py-4 text-center capitalize"
                  >
                    {p}
                  </th>
                ))}
                <th className="px-6 py-4 text-center">
                  All
                </th>
              </tr>
            </thead>

            <tbody>
              {modules.map((module) => (
                <tr
                  key={module}
                  className="border-t border-gray-200 hover:bg-white/60 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {module}
                  </td>

                  {permissions.map((p) => (
                    <td
                      key={p}
                      className="px-6 py-4 text-center"
                    >
                      <input
                        type="checkbox"
                        checked={matrix[module]?.[p] || false}
                        onChange={() =>
                          togglePermission(module, p)
                        }
                        className="h-4 w-4 accent-indigo-600 cursor-pointer"
                      />
                    </td>
                  ))}

                  {/* ICON TOGGLE ALL */}
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleAll(module)}
                      title="Toggle all permissions"
                      className={`inline-flex items-center justify-center
                        h-8 w-8 rounded-lg transition
                        ${
                          isAllEnabled(module)
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {isAllEnabled(module) ? (
                        <FiCheckSquare size={16} />
                      ) : (
                        <FiSquare size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            Update Role
          </button>

          <Link
            href="/dashboard/settings/employee-roles"
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
