"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiEye,
  FiEdit,
  FiSettings,
  FiList,
} from "react-icons/fi";

export default function JobsPage() {
  const router = useRouter();

  const jobPosts = useMemo(() => [], []);
  const applications = useMemo(() => [], []);

  const HeaderRow = ({ title, right }) => (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {right}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 space-y-10 text-black">

      {/* ===== BACKGROUND BLUR BLOBS ===== */}
      <div className="absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= ALL JOB POSTS ================= */}
      <section
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-white/90
          backdrop-blur-xl
          border border-white/60
          shadow-xl
          p-5
        "
      >
        {/* INNER GLASS HIGHLIGHT */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

        <HeaderRow
          title="All Job Posts"
          right={
            <>
              <button
                onClick={() => router.push("/dashboard/jobs/lists")}
                className="inline-flex items-center justify-center gap-2 rounded-xl
                bg-gradient-to-br from-sky-400 to-indigo-600
                px-5 py-2.5 text-sm font-medium text-white shadow-md
                hover:from-sky-500 hover:to-indigo-700 transition"
              >
                <FiList />
                Jobs List Page
              </button>

              <button
                onClick={() => router.push("/dashboard/jobs/add")}
                className="inline-flex items-center justify-center gap-2 rounded-xl
                bg-gradient-to-br from-sky-400 to-indigo-600
                px-5 py-2.5 text-sm font-medium text-white shadow-md
                hover:from-sky-500 hover:to-indigo-700 transition"
              >
                <FiPlus />
                Add Job Post
              </button>
            </>
          }
        />

        <div className="relative overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[1150px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-4 py-4 text-left font-semibold">Job Title</th>
                <th className="px-4 py-4 text-left font-semibold">Location</th>
                <th className="px-4 py-4 text-left font-semibold">Description</th>
                <th className="px-4 py-4 text-left font-semibold">Category</th>
                <th className="px-4 py-4 text-left font-semibold">Created At</th>
                <th className="px-4 py-4 text-left font-semibold">Deadline</th>
                <th className="px-4 py-4 text-left font-semibold">Status</th>
                <th className="px-4 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-600">
                    No job posts found
                  </td>
                </tr>
              ) : (
                jobPosts.map((j) => (
                  <tr
                    key={j.id}
                    className="border-t border-gray-200 hover:bg-white/60 transition"
                  >
                    <td className="px-4 py-3 font-medium">{j.title}</td>
                    <td className="px-4 py-3">{j.location}</td>
                    <td className="px-4 py-3">{j.description}</td>
                    <td className="px-4 py-3">{j.category}</td>
                    <td className="px-4 py-3">{j.createdAt}</td>
                    <td className="px-4 py-3">{j.deadline}</td>
                    <td className="px-4 py-3">{j.status}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <FiEye />
                        </button>
                        <button className="text-sky-600 hover:text-sky-800">
                          <FiEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= CURRENT APPLICATIONS ================= */}
      <section
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-white/90
          backdrop-blur-xl
          border border-white/60
          shadow-xl
          p-5
        "
      >
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

        <HeaderRow title="Current Job Applications" />

        <div className="relative overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[1050px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-4 py-4 text-left font-semibold">Job Title</th>
                <th className="px-4 py-4 text-left font-semibold">Applicant Name</th>
                <th className="px-4 py-4 text-left font-semibold">CV</th>
                <th className="px-4 py-4 text-left font-semibold">Status</th>
                <th className="px-4 py-4 text-left font-semibold">View</th>
                <th className="px-4 py-4 text-left font-semibold">Edit Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-600">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((a) => (
                  <tr key={a.id} className="border-t hover:bg-white/60 transition">
                    <td className="px-4 py-3 font-medium">{a.jobTitle}</td>
                    <td className="px-4 py-3">{a.applicantName}</td>
                    <td className="px-4 py-3">
                      <a href={a.cvUrl} className="text-indigo-600 hover:underline">
                        Download
                      </a>
                    </td>
                    <td className="px-4 py-3">{a.status}</td>
                    <td className="px-4 py-3">
                      <FiEye className="text-indigo-600" />
                    </td>
                    <td className="px-4 py-3">
                      <FiEdit className="text-sky-600" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= FLOATING SETTINGS ================= */}
      <button
        title="Settings"
        className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center
        rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700
        text-white shadow-lg hover:opacity-90"
      >
        <FiSettings className="text-xl" />
      </button>
    </div>
  );
}
