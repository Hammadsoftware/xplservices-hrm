"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

/* ================= PERMISSION BADGES ================= */

const permissionBadge = (type) => {
  const base =
    "rounded-full px-2 py-0.5 text-xs font-medium capitalize";

  switch (type) {
    case "view":
      return `${base} bg-sky-100 text-sky-700`;
    case "add":
      return `${base} bg-green-100 text-green-700`;
    case "edit":
      return `${base} bg-amber-100 text-amber-700`;
    case "delete":
      return `${base} bg-red-100 text-red-700`;
    default:
      return base;
  }
};

/* ================= ROLE DATA ================= */

const roles = [
  {
    id: 1,
    name: "Admin",
    permissions: [
      "Employee: view, add, edit, delete",
      "Timesheet: view, add, edit, delete",
      "Client: view, add, edit, delete",
      "Project: view, add, edit, delete",
      "Leave: view, add, edit, delete",
      "Attendance: view, add, edit, delete",
      "Payroll: view, add, edit, delete",
      "Expense: view, add, edit, delete",
      "Jobs: view, add, edit, delete",
      "Settings: view, add, edit, delete",
      "Reports: view, add, edit, delete",
    ],
  },
  {
    id: 2,
    name: "User",
    permissions: [
      "Timesheet: view, add, edit, delete",
      "Project: view",
      "Leave: view, add, edit, delete",
      "Attendance: view, add, edit",
      "Expense: view, add, edit, delete",
    ],
  },
];

/* ================= PAGE ================= */

export default function EmployeeRolesPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (!confirmed) return;

    // 🔥 Replace with API / Server Action
    console.log("Deleted role:", id);
  };

  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* HEADER */}
      <section className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Employee Roles
          </h2>
          <p className="text-gray-600">
            Manage roles and module permissions
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/employee-roles/add">
          <button
            className="flex items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            Add Role
          </button>
        </Link>
      </section>

      {/* ROLES TABLE */}
      <section className="relative">
        <div
          className="relative overflow-hidden rounded-3xl
          border border-white/40 bg-white/70 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">
                    Role Name
                  </th>
                  <th className="px-6 py-4 text-left">
                    Modules / Permissions
                  </th>
                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition align-top"
                  >
                    {/* ROLE NAME */}
                    <td className="px-6 py-4 font-semibold">
                      {role.name}
                    </td>

                    {/* PERMISSIONS */}
                    <td className="px-6 py-4">
                      <div className="space-y-4">
                        {role.permissions.map((perm, index) => {
                          const [module, actions] = perm.split(":");
                          const actionList = actions
                            .split(",")
                            .map((a) => a.trim());

                          return (
                            <div key={index}>
                              {/* MODULE NAME */}
                              <p className="font-medium text-gray-800">
                                {module}
                              </p>

                              {/* BADGES */}
                              <div className="mt-1 flex flex-wrap gap-2">
                                {actionList.map((action) => (
                                  <span
                                    key={action}
                                    className={permissionBadge(action)}
                                  >
                                    {action}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Link
                          href={`/dashboard/settings/employee-roles/${role.id}/edit`}
                          className="text-amber-600 hover:text-amber-800"
                          title="Edit"
                        >
                          <FiEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(role.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {roles.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-20 text-center text-gray-600"
                    >
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
