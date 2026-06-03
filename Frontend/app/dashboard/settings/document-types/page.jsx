"use client";

import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const documentTypes = [
  { id: 1, name: "Passport" },
  { id: 2, name: "Visa" },
  { id: 3, name: "Government ID" },
  { id: 4, name: "SAP Certification" },
  { id: 5, name: "Other Certifications" },
  { id: 6, name: "Education Credential" },
  { id: 7, name: "Signed Contract" },
  { id: 8, name: "NDA" },
  { id: 9, name: "Flight Ticket" },
];

export default function DocumentTypesPage() {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document type?"
    );
    if (!confirmed) return;

    // 🔥 Replace with API / Server Action
    console.log("Deleted document type:", id);
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
            Document Types
          </h2>
          <p className="text-gray-600">
            Manage document categories used across the system
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link href="/dashboard/settings/document-types/add">
          <button
            className="flex items-center justify-center gap-2 rounded-2xl
            bg-gradient-to-br from-sky-400 to-indigo-600
            px-6 py-3 text-sm font-medium text-white shadow-md
            hover:from-sky-500 hover:to-indigo-700 transition whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            Add Document Type
          </button>
        </Link>
      </section>

      {/* DOCUMENT TYPES TABLE */}
      <section className="relative">
        <div
          className="relative overflow-hidden rounded-3xl
          border border-white/40 bg-white/70 backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left">Document Name</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {documentTypes.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {doc.name}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                      

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {documentTypes.length === 0 && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-20 text-center text-gray-600"
                    >
                      No document types found
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
