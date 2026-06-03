"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const bydConnections = [
  {
    id: 1,
    username: "_Test",
    password: "Welcome123",
    wsdl: "BusinessPartner.wsdl",
  },
];

export default function SapBydPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this SAP BYD connection?"
    );
    if (!confirmed) return;

    console.log("Deleted SAP BYD connection:", id);
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
            SAP BYD Connection
          </h2>
          <p className="text-gray-600">
            Manage SAP Business ByDesign credentials and WSDL files
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/sap-byd/add">
          <button
            className="flex items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            Add BYD Connection
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
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">Username</th>
                  <th className="px-6 py-4 text-left">Password</th>
                  <th className="px-6 py-4 text-left">WSDL File</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bydConnections.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-24 text-center text-gray-600"
                    >
                      <p className="text-lg font-medium">
                        No BYD Connections Found
                      </p>
                      <p className="text-sm mt-1">
                        Click “Add BYD Connection” to create one.
                      </p>
                    </td>
                  </tr>
                ) : (
                  bydConnections.map((conn) => (
                    <tr
                      key={conn.id}
                      className="border-t border-gray-200 hover:bg-white/60 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {conn.username}
                      </td>

                      <td className="px-6 py-4 font-mono text-sm">
                        ••••••••••
                      </td>

                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center gap-2
                          text-sky-700 hover:text-sky-900 font-medium"
                          onClick={() =>
                            console.log("View WSDL:", conn.wsdl)
                          }
                        >
                          <FiEye />
                          View File
                        </button>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <Link
                            href={`/dashboard/settings/sap-byd/${conn.id}/edit`}
                            className="text-amber-600 hover:text-amber-800"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(conn.id)}
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
