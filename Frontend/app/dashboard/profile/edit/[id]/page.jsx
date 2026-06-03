"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";
import useAuthStore from "../../../../../store/useAuthStore";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchEmployee = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/employees/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setForm(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [user, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/employees/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        router.push("/dashboard/profile");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!form) {
    return <div className="p-10">No data found</div>;
  }

  const InputField = ({ label, name }) => (
    <div className="grid grid-cols-12 gap-4 py-4">
      <p className="col-span-4 text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="col-span-8">
        <input
          name={name}
          value={form[name] || ""}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 py-10 text-gray-900">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold">Edit Profile</h2>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-xs font-medium text-white shadow hover:bg-green-700"
            >
              <FiSave size={14} />
              Save
            </button>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              <FiX size={14} />
              Cancel
            </button>
          </div>
        </div>

        {/* BASIC INFO */}
        <InputField label="First Name" name="firstName" />
        <InputField label="Last Name" name="lastName" />
        <InputField label="Nick Name" name="nickName" />
        <InputField label="Email" name="email" />
        <InputField label="Date of Birth" name="dob" />
        <InputField label="Gender" name="gender" />
        <InputField label="Nationality" name="nationality" />
        <InputField label="Skills" name="skills" />

        {/* WORK INFO */}
        <InputField label="Job Title" name="jobTitle" />
        <InputField label="Department" name="department" />
        <InputField label="Reporting Manager" name="reportingManager" />
        <InputField label="Work Location" name="workLocation" />

        {/* CONTACT INFO */}
        <InputField label="Work Phone" name="workPhone" />
        <InputField label="Personal Phone" name="personalPhone" />
        <InputField label="Present Address" name="presentAddress" />
        <InputField label="Permanent Address" name="permanentAddress" />

      </div>
    </div>
  );
}
