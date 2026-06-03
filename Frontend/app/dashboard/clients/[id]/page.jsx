"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

export default function ClientViewPage() {
  const { id } = useParams();

  const client = {
    id,
    type: "Corporate",
    company: "Tech Solutions Ltd",
    displayName: "Tech Solutions",
    number: "C-1023",
    phone: "+92 300 1234567",
    email: "info@techsolutions.com",
    country: "Pakistan",
    industry: "IT Services",
    custom: "Priority Client",
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 text-black">
      
      {/* ===== BACKGROUND BLURS (CLIPPED) ===== */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ===== HEADER ===== */}
      <div className="relative mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {client.company}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Client ID: {client.id}
          </p>
        </div>

        <Link
          href={`/dashboard/clients/edit/${client.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:from-sky-500 hover:to-indigo-700 transition"
        >
          <FiEdit />
          Edit Client
        </Link>
      </div>

      {/* ===== CLIENT DETAILS CARD ===== */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-semibold">
          Client Information
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          <Field label="Client Type" value={client.type} />
          <Field label="Company Name" value={client.company} />
          <Field label="Display Name" value={client.displayName} />
          <Field label="Client Number" value={client.number} />
          <Field label="Phone Number" value={client.phone} />
          <Field label="Email" value={client.email} />
          <Field label="Country" value={client.country} />
          <Field label="Industry" value={client.industry} />
          <Field label="Custom Field" value={client.custom} />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <p className="relative mt-12 text-center text-xs text-gray-400">
        © 2025 XPL Services
      </p>
    </div>
  );
}

/* ===== FIELD ===== */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-black">
        {value || "-"}
      </p>
    </div>
  );
}
