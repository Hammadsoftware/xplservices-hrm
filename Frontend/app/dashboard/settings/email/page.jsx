"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const emailServers = [
  {
    id: 1,
    email: "hr@xplservices.com",
    password: "Welcome@54321",
    smtpPort: "587",
    smtpServer: "mail.xplservices.com",
  },
];

export default function EmailServerPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this email server configuration?"
    );
    if (!confirmed) return;

    console.log("Deleted email server:", id);
  };

  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Email Server
          </h2>
          <p className="text-gray-600">
            Configure SMTP email server settings
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/email/add">
          <button
            className="flex items-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition"
          >
            <FiPlus className="text-lg" />
            Add Email Server
          </button>
        </Link>
      </section>

      {/* TABLE */}
      <section>
        <div
          className="overflow-hidden rounded-3xl
          border border-white/40 bg-white/70 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Password</th>
                  <th className="px-6 py-4 text-center">SMTP Port</th>
                  <th className="px-6 py-4 text-left">SMTP Server</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {emailServers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-24 text-center text-gray-600"
                    >
                      <p className="text-lg font-medium">
                        No Email Server Configured
                      </p>
                      <p className="text-sm mt-1">
                        Click “Add Email Server” to configure one.
                      </p>
                    </td>
                  </tr>
                ) : (
                  emailServers.map((server) => (
                    <tr
                      key={server.id}
                      className="border-t border-gray-200 hover:bg-white/60 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {server.email}
                      </td>

                      <td className="px-6 py-4 font-mono text-sm">
                        ••••••••••••
                      </td>

                      <td className="px-6 py-4 text-center">
                        {server.smtpPort}
                      </td>

                      <td className="px-6 py-4 font-mono text-sm">
                        {server.smtpServer}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <Link
                            href={`/dashboard/settings/email/${server.id}/edit`}
                            className="text-amber-600 hover:text-amber-800"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(server.id)}
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
