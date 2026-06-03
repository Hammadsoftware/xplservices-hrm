"use client";

import Link from "next/link";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";

export default function EditEmployeePositionPage() {
  const { id } = useParams();
  const router = useRouter();

  // 🔹 Mock data (replace with API fetch using id)
  const position = {
    id,
    name: "Manager",
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this position?"
    );
    if (!confirmed) return;

    console.log("Deleted position:", id);
    router.push("/dashboard/settings/employee-positions");
  };

  return (
    <div
      className="relative flex-1 w-full overflow-hidden
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Employee Position
          </h1>
          <p className="text-gray-600 mt-1">
            Update position details
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings/employee-positions"
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
      <div
        className="relative w-full rounded-3xl
        border border-white/40 bg-white/70 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-8"
      >
        <form className="space-y-6">
          {/* POSITION NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position Name
            </label>
            <input
              type="text"
              defaultValue={position.name}
              className="w-full rounded-xl border border-gray-300
              bg-white/80 px-4 py-3 text-sm outline-none
              focus:ring-2 focus:ring-indigo-300"
            />
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
              Update Position
            </button>

            <Link
              href="/dashboard/settings/employee-positions"
              className="rounded-xl border border-gray-300
              px-6 py-3 text-sm font-medium text-gray-700
              hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
