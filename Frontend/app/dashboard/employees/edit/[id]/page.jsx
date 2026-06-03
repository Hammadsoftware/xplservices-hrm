"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiLoader,
  FiCheckCircle,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";
import Loader from "@/app/components/Loader";
import api from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";

/* ================= STABLE FIELD COMPONENT ================= */
const Field = ({ label, name, type = "text", value, onChange }) => (
  <div className="grid grid-cols-12 py-3 border-b border-gray-100 last:border-none items-center">
    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-500 mb-1 md:mb-0">
      {label}
    </label>
    <div className="col-span-12 md:col-span-8">
      <input
        type={type}
        value={value || ""}
        placeholder={`Enter ${label.toLowerCase()}...`}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-sky-400 transition-all"
      />
    </div>
  </div>
);

const tabs = ["Profile", "Work", "Contact", "Bank", "Travel", "Separation"];

export default function EmployeeEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  const [activeTab, setActiveTab] = useState("Profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [employee, setEmployee] = useState(null);

  // Gradient Constant for matching the table header
  const brandGradient = "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const handleChange = (key, value) => {
    setEmployee((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/employees/${id}`, employee, {
        headers: authHeaders,
      });

      alert("Employee updated successfully!");
      router.push(`/dashboard/employees/${id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );

  if (!employee)
    return (
      <div className="flex flex-col h-screen items-center justify-center text-gray-500">
        <FiAlertCircle size={48} className="mb-4" />
        <p>Employee not found.</p>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-4 md:px-8 py-10 text-black">
      <div className="relative grid grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 space-y-4">
          <div className="rounded-3xl bg-white border border-white shadow-xl p-6 text-center">
            {/* ✅ Profile Picture + fallback */}
            <div className="h-24 w-24 mx-auto rounded-full overflow-hidden shadow-md border border-white">
              {employee.profilePicture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={employee.profilePicture}
                  alt={`${employee.firstName || ""} ${employee.lastName || ""}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`h-full w-full ${brandGradient} flex items-center justify-center text-white text-2xl font-bold`}
                >
                  {employee.firstName?.[0]}
                  {employee.lastName?.[0]}
                </div>
              )}
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {employee.firstName} {employee.lastName}
            </h2>

            <p className="text-sm font-semibold text-blue-600 mt-1 uppercase tracking-wide">
              {employee.jobTitle || "Designation"}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 w-full px-6 py-3 text-sm font-medium text-gray-500 bg-white/70 rounded-2xl hover:text-blue-600 transition shadow-sm border border-transparent hover:border-sky-100"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
        </aside>

        {/* MAIN EDIT FORM */}
        <section className="col-span-12 md:col-span-9">
          <div className="rounded-3xl bg-white border border-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">
                Edit <span className="text-blue-600">Personal Record</span>
              </h3>

              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl ${brandGradient} text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-blue-100`}
              >
                {saving ? <FiLoader className="animate-spin" /> : <FiCheckCircle />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* TABS */}
            <div className="flex gap-8 px-8 border-b overflow-x-auto bg-gray-50/50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-5 text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-1 ${brandGradient} rounded-t-full`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* SCROLLABLE FORM AREA */}
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {activeTab === "Profile" && (
                <div className="space-y-1">
                  <Field label="First Name" name="firstName" value={employee.firstName} onChange={handleChange} />
                  <Field label="Last Name" name="lastName" value={employee.lastName} onChange={handleChange} />
                  <Field label="Username" name="username" value={employee.username} onChange={handleChange} />
                  <Field label="Email Address" name="email" value={employee.email} onChange={handleChange} />
                  <Field label="Date of Birth" name="dob" type="date" value={employee.dob} onChange={handleChange} />
                  <Field label="Gender" name="gender" value={employee.gender} onChange={handleChange} />
                  <Field label="Nationality" name="nationality" value={employee.nationality} onChange={handleChange} />
                  <Field label="Marital Status" name="maritalStatus" value={employee.maritalStatus} onChange={handleChange} />
                  <Field label="Skills" name="skills" value={employee.skills} onChange={handleChange} />

                  {/* ✅ optional: allow updating profile picture URL */}
                  <Field
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={employee.profilePicture}
                    onChange={handleChange}
                  />
                </div>
              )}

              {activeTab === "Work" && (
                <div className="space-y-1">
                  <Field label="Employee ID" name="employeeId" value={employee.employeeId} onChange={handleChange} />
                  <Field label="Job Title" name="jobTitle" value={employee.jobTitle} onChange={handleChange} />
                  <Field label="Position" name="position" value={employee.position} onChange={handleChange} />
                  <Field label="Department" name="department" value={employee.department} onChange={handleChange} />
                  <Field label="Employment Type" name="employmentType" value={employee.employmentType} onChange={handleChange} />
                  <Field label="Work Location" name="workLocation" value={employee.workLocation} onChange={handleChange} />
                  <Field label="Date of Joining" name="dateOfJoining" type="date" value={employee.dateOfJoining} onChange={handleChange} />
                </div>
              )}

              {activeTab === "Contact" && (
                <div className="space-y-1">
                  <Field label="Work Phone" name="workPhone" value={employee.workPhone} onChange={handleChange} />
                  <Field label="Personal Phone" name="personalPhone" value={employee.personalPhone} onChange={handleChange} />
                  <Field label="Present Address" name="presentAddress" value={employee.presentAddress} onChange={handleChange} />
                  <Field label="Permanent Address" name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} />
                  <Field label="Emergency Contact Name" name="emergencyName" value={employee.emergencyName} onChange={handleChange} />
                  <Field label="Emergency Phone" name="emergencyPhone" value={employee.emergencyPhone} onChange={handleChange} />
                </div>
              )}

              {activeTab === "Bank" && (
                <div className="space-y-1">
                  <Field label="Bank Name" name="bankName" value={employee.bankName} onChange={handleChange} />
                  <Field label="Account Type" name="accountType" value={employee.accountType} onChange={handleChange} />
                  <Field label="Account Number" name="accountNumber" value={employee.accountNumber} onChange={handleChange} />
                  <Field label="IBAN" name="iban" value={employee.iban} onChange={handleChange} />
                  <Field label="Swift Code" name="swiftCode" value={employee.swiftCode} onChange={handleChange} />
                  <Field label="Routing Code" name="routingCode" value={employee.routingCode} onChange={handleChange} />
                </div>
              )}

              {activeTab === "Travel" && (
                <div className="space-y-1">
                  <Field label="First Entry Date" name="firstEntry" type="date" value={employee.firstEntry} onChange={handleChange} />
                  <Field label="Latest Entry Date" name="latestEntry" type="date" value={employee.latestEntry} onChange={handleChange} />
                  <Field label="Latest Exit Date" name="latestExit" type="date" value={employee.latestExit} onChange={handleChange} />
                </div>
              )}

              {activeTab === "Separation" && (
                <div className="space-y-1">
                  <Field label="Exit Date" name="exitDate" type="date" value={employee.exitDate} onChange={handleChange} />
                  <Field label="Exit Reason" name="exitReason" value={employee.exitReason} onChange={handleChange} />

                  <div className="grid grid-cols-12 py-3 items-center">
                    <label className="col-span-12 md:col-span-4 text-sm font-medium text-gray-500 mb-1 md:mb-0">
                      Can Join Again?
                    </label>
                    <div className="col-span-12 md:col-span-8">
                      <select
                        value={employee.canJoinAgain ? "true" : "false"}
                        onChange={(e) => handleChange("canJoinAgain", e.target.value === "true")}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}