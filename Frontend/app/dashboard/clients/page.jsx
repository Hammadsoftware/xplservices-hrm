"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiEye, FiEdit, FiSearch } from "react-icons/fi";

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const clients = [
    {
      id: "CL-001",
      type: "Corporate",
      company: "Tech Solutions Ltd",
      number: "C-1023",
      phone: "+92 300 1234567",
      country: "Pakistan",
      custom: "Priority Client",
    },
    {
      id: "CL-002",
      type: "Individual",
      company: "John Doe",
      number: "C-1041",
      phone: "+1 202 555 0189",
      country: "USA",
      custom: "Long Term",
    },
    {
      id: "CL-003",
      type: "Corporate",
      company: "BlueWave Inc",
      number: "C-1099",
      phone: "+44 7700 900123",
      country: "UK",
      custom: "NDA Signed",
    },
  ];

  /* 🔍 SEARCH ALL FIELDS */
  const filteredClients = clients.filter((client) =>
    Object.values(client)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 space-y-8 text-black">

      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* HEADER */}
      <section className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Clients</h2>
          <p className="text-gray-600">All clients of XPL</p>
        </div>

        {/* SEARCH + BUTTON */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-[320px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full rounded-2xl border border-gray-300 bg-white/80 px-11 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* ADD CLIENT */}
          <Link href="/dashboard/clients/add-clients">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap">
              <FiPlus className="text-lg" />
              Add Client
            </button>
          </Link>
        </div>
      </section>

      {/* CLIENT TABLE */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[1300px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">Client ID</th>
                  <th className="px-6 py-4 text-left">Client Type</th>
                  <th className="px-6 py-4 text-left">Company Name</th>
                  <th className="px-6 py-4 text-left">Client Number</th>
                  <th className="px-6 py-4 text-left">Phone Number</th>
                  <th className="px-6 py-4 text-left">Country</th>
                  <th className="px-6 py-4 text-left">Custom Fields</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-6 py-4 font-medium">{client.id}</td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          client.type === "Corporate"
                            ? "rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
                            : "rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700"
                        }
                      >
                        {client.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">{client.company}</td>
                    <td className="px-6 py-4">{client.number}</td>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">{client.country}</td>
                    <td className="px-6 py-4">{client.custom}</td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FiEye />
                        </Link>

                        <Link
                          href={`/dashboard/clients/edit/${client.id}`}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <FiEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredClients.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-20 text-center text-gray-600"
                    >
                      No matching clients found
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
