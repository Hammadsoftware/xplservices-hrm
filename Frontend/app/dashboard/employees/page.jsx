"use client";

import useAuthStore from "@/store/useAuthStore";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiLoader } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import api from "@/lib/api";

/* ================= STYLES ================= */
const iconBtn = "flex h-9 w-9 items-center justify-center rounded-full transition";
const editBtn = `${iconBtn} bg-green-100 text-green-700 hover:bg-green-200`;
const viewBtn = `${iconBtn} bg-indigo-100 text-indigo-700 hover:bg-indigo-200`;
const deleteBtn = `${iconBtn} bg-red-100 text-red-600 hover:bg-red-200`;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  // 1. Fetch Data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get("/employees", {
          headers: authHeaders, // remove this line if endpoint is public
        });

        setEmployees(data || []);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch employees";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 2. Filter Logic
  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        emp.employeeId?.toLowerCase().includes(q) ||
        emp.department?.toLowerCase().includes(q)
      );
    });
  }, [search, employees]);

  // 3. Delete Logic
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    // optimistic remove
    const prev = employees;
    setEmployees((p) => p.filter((e) => e.id !== id));

    try {
      await api.delete(`/employees/${id}`, {
        headers: authHeaders,
      });
    } catch (err) {
      setEmployees(prev); // revert
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 py-10 space-y-6 text-black">
      {/* HEADER */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Employees
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Search by name, ID or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {user?.role === "ADMIN" && (
            <Link
              href="/dashboard/employees/add-employees"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:opacity-90 transition"
            >
              <FiPlus size={16} /> Add Employee
            </Link>
          )}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="relative rounded-3xl overflow-hidden border border-white/40 bg-white/80 backdrop-blur-xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead>
              <tr className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white">
                <th className="px-6 py-4 font-semibold">Employee ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role/Title</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <FiLoader className="inline animate-spin mr-2" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t border-gray-100 hover:bg-white/60 transition"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-600">
                      {emp.employeeId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{emp.email}</div>
                    </td>

                    <td className="px-6 py-4 capitalize">{emp.department || "N/A"}</td>

                    <td className="px-6 py-4">
                      <div className="font-medium">{emp.jobTitle}</div>
                      <div className="text-xs text-gray-400">{emp.employmentType}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          emp.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {emp.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/dashboard/employees/${emp.id}`}
                          className={viewBtn}
                          title="View"
                        >
                          <IoEyeOutline size={16} />
                        </Link>

                        {user?.role === "ADMIN" && (
                          <>
                            <Link
                              href={`/dashboard/employees/edit/${emp.id}`}
                              className={editBtn}
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </Link>

                            <button
                              onClick={() => handleDelete(emp.id)}
                              className={deleteBtn}
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}