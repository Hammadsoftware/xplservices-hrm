"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import api from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";

const tabs = [
  "Basic Info",
  "Work Info",
  "Contact Info",
  "Bank Info",
  "Travel Info",
  "Separation Info",
];

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  const [activeTab, setActiveTab] = useState("Basic Info");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Employee
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/employees/${id}`, {
          headers: authHeaders,
        });
        setEmployee(data);
      } catch (err) {
        console.error(err);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
  }, [id, token]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader className="text-blue-600" />
      </div>
    );

  if (!employee)
    return <div className="p-10 text-center">Employee not found.</div>;

  const sections = {
    "Basic Info": {
      "First Name": employee.firstName,
      "Last Name": employee.lastName,
      "Email": employee.email,
      "Username": employee.username,
      "Date of Birth": employee.dob,
      "Age": employee.age,
      "Gender": employee.gender,
      "Nationality": employee.nationality,
      "Skills": employee.skills,
    },
    "Work Info": {
      "Employee ID": employee.employeeId,
      "Job Title": employee.jobTitle,
      "Position": employee.position,
      "Department": employee.department,
      "Employment Type": employee.employmentType,
      "Location": employee.workLocation,
      "Joining Date": employee.dateOfJoining,
      "Status": employee.isActive ? "Active" : "Inactive",
    },
    "Contact Info": {
      "Work Phone": employee.workPhone,
      "Personal Phone": employee.personalPhone,
      "Present Address": employee.presentAddress,
      "Emergency Name": employee.emergencyName,
      "Emergency Phone": employee.emergencyPhone,
    },
    "Bank Info": {
      "Bank Name": employee.bankName,
      "Account Number": employee.accountNumber,
      "IBAN": employee.iban,
      "Swift Code": employee.swiftCode,
    },
    "Travel Info": {
      "First Entry": employee.firstEntry,
      "Latest Entry": employee.latestEntry,
      "Latest Exit": employee.latestExit,
    },
    "Separation Info": {
      "Exit Date": employee.exitDate || "—",
      "Exit Reason": employee.exitReason || "—",
      "Re-join Eligible": employee.canJoinAgain ? "Yes" : "No",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            <FiArrowLeft /> Back to Employees
          </button>
          <button
            onClick={() =>
              router.push(`/dashboard/employees/edit/${id}`)
            }
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition text-sm font-semibold"
          >
            <FiEdit className="text-indigo-600" /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT SIDE PROFILE CARD */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border p-8 text-center sticky top-10">
              
              {/* Profile Image */}
              <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden shadow-lg border border-white">
                {employee.profilePicture ? (
                  <Image
                    src={employee.profilePicture}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white text-3xl font-bold">
                    {employee.firstName?.[0]}
                    {employee.lastName?.[0]}
                  </div>
                )}
              </div>

              <h2 className="mt-6 text-xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h2>

              <p className="text-indigo-600 font-medium mt-1">
                {employee.jobTitle}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-50">
                <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                  Employee ID
                </div>
                <div className="text-sm font-mono mt-1 text-gray-700">
                  {employee.employeeId}
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    employee.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE TABS */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
              
              {/* Tabs */}
              <div className="flex gap-8 px-8 border-b overflow-x-auto bg-gray-50/30">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-5 text-sm font-bold transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? "text-indigo-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute left-0 right-0 bottom-0 h-1 bg-indigo-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6">
                  {activeTab}
                </h3>

                <div className="grid grid-cols-1 gap-1">
                  {Object.entries(sections[activeTab]).map(
                    ([label, value]) => (
                      <div
                        key={label}
                        className="grid grid-cols-12 py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition px-2 rounded-lg"
                      >
                        <p className="col-span-4 text-sm font-semibold text-gray-400 uppercase tracking-tight">
                          {label}
                        </p>
                        <p className="col-span-8 text-sm font-bold text-gray-800">
                          {value || (
                            <span className="text-gray-300 italic font-normal">
                              Not Provided
                            </span>
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}