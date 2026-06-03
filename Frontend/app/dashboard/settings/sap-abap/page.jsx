"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const sapSystems = [
  {
    id: 1,
    server: "192.168.10.102",
    systemNumber: "00",
    clientNumber: "300",
    router: "/H/124.109.48.49",
  },
];

export default function SapAbapPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this SAP system configuration?"
    );
    if (!confirmed) return;

    console.log("Deleted SAP system:", id);
  };

  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <section className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            SAP ABAP Configuration
          </h2>
          <p className="text-gray-600">
            Manage SAP system connection details
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/sap-abap/add">
          <button
            className="flex items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            Add SAP System
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
                  <th className="px-6 py-4 text-left">Server Address</th>
                  <th className="px-6 py-4 text-center">System No</th>
                  <th className="px-6 py-4 text-center">Client No</th>
                  <th className="px-6 py-4 text-left">Router String</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sapSystems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-24 text-center text-gray-600"
                    >
                      <p className="text-lg font-medium">
                        No SAP Systems Found
                      </p>
                      <p className="text-sm mt-1">
                        Click “Add SAP System” to configure one.
                      </p>
                    </td>
                  </tr>
                ) : (
                  sapSystems.map((sys) => (
                    <tr
                      key={sys.id}
                      className="border-t border-gray-200 hover:bg-white/60 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {sys.server}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {sys.systemNumber}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {sys.clientNumber}
                      </td>

                      <td className="px-6 py-4 font-mono text-sm">
                        {sys.router}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <Link
                            href={`/dashboard/settings/sap-abap/${sys.id}/edit`}
                            className="text-amber-600 hover:text-amber-800"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(sys.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
