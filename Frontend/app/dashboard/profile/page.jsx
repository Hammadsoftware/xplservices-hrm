"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { EditIcon } from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import ProfilePicBox from "@/app/components/ProfilePicBox";
import Loader from "@/app/components/Loader";

/* ================= CHECK-IN REMINDER ================= */
function CheckInReminder() {
  return (
    <div className="rounded-2xl border border-black/5 bg-orange-50/80 backdrop-blur px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <FiClock size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-black">
            Check-in reminder
          </p>
          <p className="text-xs text-black">
            Your shift has already started
          </p>
        </div>
      </div>
    </div>
  );
}

const tabs = ["Profile", "Work", "Contact", "Bank", "Travel", "Separation"];

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [activeTab, setActiveTab] = useState("Profile");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/employees/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEmployee(data);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [user, token]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  const Field = ({ label, value }) => (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-black/5 last:border-none">
      <p className="col-span-4 text-sm font-medium text-black">{label}</p>
      <p className="col-span-8 text-sm font-semibold text-black">
        {value || "-"}
      </p>
    </div>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader/>
      </div>
    );

  if (!employee)
    return (
      <div className="flex items-center justify-center h-screen">
        Failed to load profile.
      </div>
    );

  return (
    <div className="relative min-h-screen rounded-3xl w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 py-8 text-black">
      <div className="grid grid-cols-12 gap-8">

        {/* LEFT PANEL */}
        <aside className="col-span-12 md:col-span-3">
          <ProfilePicBox
            employee={employee}
            setEmployee={setEmployee}
          />

        </aside>

        {/* RIGHT CONTENT */}
        <section className="col-span-12 md:col-span-9 space-y-6">
          <CheckInReminder />

          <div className="rounded-3xl bg-white shadow-xl">
            {/* TABS */}
            <div className="flex gap-6 border-b px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-semibold ${activeTab === tab
                      ? "text-black"
                      : "text-gray-500"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* PROFILE TAB */}
              {activeTab === "Profile" && (
                <>
                  <Field label="Username" value={employee.username} />
                  <Field label="First Name" value={employee.firstName} />
                  <Field label="Last Name" value={employee.lastName} />
                  <Field label="Nick Name" value={employee.nickName} />
                  <Field label="Email" value={employee.email} />
                  <Field label="Date of Birth" value={employee.dob} />
                  <Field label="Age" value={employee.age} />
                  <Field label="Gender" value={employee.gender} />
                  <Field label="Marital Status" value={employee.maritalStatus} />
                  <Field label="Nationality" value={employee.nationality} />
                  <Field label="Skills" value={employee.skills} />
                  <Field label="LinkedIn" value={employee.linkedin} />
                  <Field label="Twitter" value={employee.twitter} />
                </>
              )}

              {/* WORK TAB */}
              {activeTab === "Work" && (
                <>
                  <Field label="Employee ID" value={employee.employeeId} />
                  <Field label="Role" value={employee.role} />
                  <Field label="Employment Type" value={employee.employmentType} />
                  <Field label="Job Title" value={employee.jobTitle} />
                  <Field label="Position" value={employee.position} />
                  <Field label="Department" value={employee.department} />
                  <Field label="Business Unit" value={employee.businessUnit} />
                  <Field label="Reporting Manager" value={employee.reportingManager} />
                  <Field label="Work Location" value={employee.workLocation} />
                  <Field label="Remote Rate" value={employee.remoteRate} />
                  <Field label="Onsite Rate" value={employee.onsiteRate} />
                  <Field label="Rate Basis" value={employee.rateBasis} />
                  <Field label="Date Of Joining" value={formatDate(employee.dateOfJoining)} />
                  <Field label="Employee Status" value={employee.employeeStatus} />
                  <Field label="Leave Policy" value={employee.leavePolicy} />
                  <Field label="Timesheet Required" value={employee.timesheetRequired ? "Yes" : "No"} />
                </>
              )}



            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
