"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiCamera, FiX, FiTrash2, FiSave, FiLoader } from "react-icons/fi";
import api from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";

/**
 * Discord-like profile picture editor:
 * - Hover camera overlay on avatar
 * - Click opens modal
 * - Preview selected image
 * - Save uploads (base64) to your endpoint
 * - Remove resets to default (optional endpoint call included)
 */
export default function ProfilePicBox({ employee, setEmployee }) {
  const token = useAuthStore((s) => s.token);
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [previewSrc, setPreviewSrc] = useState(null); // dataURL preview
  const [pickedFileName, setPickedFileName] = useState("");

  if (!employee) return null;

  const currentSrc = employee.profilePicture || "/image.png";
  const displaySrc = previewSrc || currentSrc;

  const openPicker = () => inputRef.current?.click();

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    // (Optional) limit size ~3MB to avoid huge base64
    const maxMB = 3;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`Image too large. Please upload under ${maxMB}MB.`);
      return;
    }

    setPickedFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewSrc(reader.result); // base64 dataURL
    reader.readAsDataURL(file);

    // reset input so picking same file again triggers change
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!previewSrc) {
      setShowModal(false);
      return;
    }

    try {
      setUploading(true);

      const { data } = await api.put(
        `/employees/profile-pic/${employee.id}`,
        { profilePicture: previewSrc },
        { headers: { "Content-Type": "application/json", ...authHeaders } }
      );

      setEmployee(data);
      setPreviewSrc(null);
      setPickedFileName("");
      setShowModal(false);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error?.response?.data?.message || "Server error while uploading image");
    } finally {
      setUploading(false);
    }
  };

  // Optional "Remove" handler:
  // If your backend supports removing picture, keep it.
  // If not, you can simply set previewSrc null and skip server call.
  const handleRemove = async () => {
    if (!confirm("Remove profile picture?")) return;

    try {
      setUploading(true);

      // OPTION A: if backend supports setting null
      const { data } = await api.put(
        `/employees/profile-pic/${employee.id}`,
        { profilePicture: null },
        { headers: { "Content-Type": "application/json", ...authHeaders } }
      );

      setEmployee(data);
      setPreviewSrc(null);
      setPickedFileName("");
      setShowModal(false);
    } catch (error) {
      console.error("Remove error:", error);
      alert(error?.response?.data?.message || "Failed to remove image");
    } finally {
      setUploading(false);
    }
  };

  const closeModal = () => {
    if (!uploading) {
      setShowModal(false);
      setPreviewSrc(null);
      setPickedFileName("");
    }
  };

  return (
    <>
      <aside className="col-span-12 md:col-span-3">
        <div className="rounded-3xl bg-white shadow-2xl p-6 border border-gray-100">
          <div className="flex flex-col items-center text-center">
            {/* Discord-like avatar */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg focus:outline-none"
                aria-label="Open profile picture editor"
              >
                <Image
                  src={currentSrc}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition flex flex-col items-center gap-1">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white">
                      <FiCamera size={18} />
                    </span>
                    <span className="text-[11px] font-semibold text-white drop-shadow">
                      Change
                    </span>
                  </div>
                </div>
              </button>

              {/* Small camera badge bottom-right (discord vibe) */}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-white shadow-lg border-4 border-white hover:bg-slate-800 transition"
                aria-label="Edit profile picture"
              >
                <FiCamera size={18} />
              </button>
            </div>

            {/* NAME */}
            <h2 className="mt-6 text-xl font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-sm text-gray-500">{employee.jobTitle}</p>

            {/* STATUS */}
            <span
              className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                employee.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {employee.isActive ? "Active Employee" : "Inactive"}
            </span>

            {/* DETAILS BOX */}
            <div className="mt-6 w-full space-y-3 text-sm bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Employee ID</span>
                <span className="font-semibold text-right">{employee.employeeId}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-right truncate max-w-[160px]">
                  {employee.email}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Location</span>
                <span className="font-semibold text-right">{employee.workLocation}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Department</span>
                <span className="font-semibold text-right">
                  {employee.department || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Reporting To</span>
                <span className="font-semibold text-right">
                  {employee.reportingManager || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPickFile}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <p className="text-sm font-bold text-gray-900">Change your avatar</p>
                <p className="text-xs text-gray-500">
                  Choose an image. Preview before saving.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100 transition"
                aria-label="Close"
                disabled={uploading}
              >
                <FiX />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Big preview */}
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-gray-100 shadow">
                  <Image
                    src={displaySrc}
                    alt="Preview"
                    fill
                    sizes="160px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Controls */}
                <div className="flex-1 w-full">
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={openPicker}
                      disabled={uploading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
                    >
                      <FiCamera />
                      Choose Image
                    </button>

                    <button
                      type="button"
                      onClick={handleRemove}
                      disabled={uploading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition disabled:opacity-60"
                    >
                      <FiTrash2 />
                      Remove
                    </button>

                    {pickedFileName && (
                      <p className="text-xs text-gray-500">
                        Selected: <span className="font-semibold">{pickedFileName}</span>
                      </p>
                    )}

                    <p className="text-xs text-gray-500">
                      Tip: Use a square image for best results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                disabled={uploading}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={uploading || !previewSrc}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 hover:opacity-90 transition disabled:opacity-60"
              >
                {uploading ? <FiLoader className="animate-spin" /> : <FiSave />}
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}