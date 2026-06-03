"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const leavePolicies = [
  {
    id: 1,
    name: "Paid Leaves",
    totalDays: 24,
    maxPerMonth: 2,
    isPaid: true,
    approver: "Anjum Ali - ANJ-1993",
  },
  {
    id: 2,
    name: "Casual Leave",
    totalDays: 12,
    maxPerMonth: 1,
    isPaid: true,
    approver: "Anjum Ali - ANJ-1993",
  },
  {
    id: 3,
    name: "Unpaid Leave",
    totalDays: 0,
    maxPerMonth: 2,
    isPaid: false,
    approver: "HR Manager",
  },
];

export default function LeavePolicyPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leave policy?"
    );
    if (!confirmed) return;

    // 🔥 Replace with API / Server Action
    console.log("Deleted leave policy:", id);
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
            Leave Policy
          </h2>
          <p className="text-gray-600">
            Manage employee leave rules and approvals
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/leave-policy/add">
          <button
            className="flex items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            Add Leave Policy
          </button>
        </Link>
      </section>

      {/* TABLE */}
      <section className="relative">
        <div
          className="relative overflow-hidden rounded-3xl
          border border-white/40 bg-white/70 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">Leave Name</th>
                  <th className="px-6 py-4 text-center">Leave Days Allowed</th>
                  <th className="px-6 py-4 text-center">Max / Month</th>
                  <th className="px-6 py-4 text-center">Paid Leave</th>
                  <th className="px-6 py-4 text-left">Leave Approver</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leavePolicies.map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {leave.name}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {leave.totalDays}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {leave.maxPerMonth}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                          ${
                            leave.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {leave.isPaid ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {leave.approver}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Link
                          href={`/dashboard/settings/leave-policy/${leave.id}/edit`}
                          className="text-amber-600 hover:text-amber-800"
                          title="Edit"
                        >
                          <FiEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {leavePolicies.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center text-gray-600"
                    >
                      No leave policies found
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
