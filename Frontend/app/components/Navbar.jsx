"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiSearch, FiSettings } from "react-icons/fi";
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/api";
import NotificationsBell from "../components/NotificationsBell"; // ✅ NEW

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const profileRef = useRef(null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  /* ================= FETCH USER PROFILE ================= */
  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/employees/${user.id}`, {
          headers: authHeaders,
        });
        setProfileData(data);
      } catch (err) {
        console.error("Navbar profile fetch error:", err);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]);

  /* ================= CLOSE DROPDOWN OUTSIDE CLICK ================= */
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  /* ================= LOGOUT FUNCTION ================= */
  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth-storage");
    setProfileData(null);
    setOpen(false);
    router.push("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="h-[3px] w-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700" />

        <div className="h-16 border-b border-black/5 bg-white/60 backdrop-blur-xl">
          <div className="mx-auto flex h-full w-full items-center justify-between px-4 md:px-6">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center">
                <Image
                  src="/brands.jpeg"
                  alt="Brand"
                  width={220}
                  height={80}
                  className="h-8 w-auto rounded object-contain"
                  priority
                />
              </Link>

              <div className="relative hidden md:block w-[340px]">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Search..."
                  className="w-full rounded-full border border-gray-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* ✅ Notifications separated */}
              <NotificationsBell />

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-3 rounded-full px-2 py-1.5 hover:bg-sky-50 transition"
                >
                  {profileData?.profilePicture ? (
                    <div className="h-9 w-9 rounded-full overflow-hidden border">
                      <Image
                        src={profileData.profilePicture}
                        alt="User"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <FaUserCircle size={34} className="text-sky-700" />
                  )}

                  <div className="hidden sm:block text-left leading-tight">
                    <p className="text-sm font-semibold text-gray-900">
                      {profileData
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : "Loading..."}
                    </p>
                    <p className="text-xs text-gray-500">{profileData?.role || ""}</p>
                  </div>

                  <FiChevronDown className="hidden sm:block text-gray-600" />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {profileData
                          ? `${profileData.firstName} ${profileData.lastName}`
                          : ""}
                      </p>
                      <p className="text-xs text-gray-500">{profileData?.email}</p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 transition"
                      >
                        <FaUserCircle size={16} />
                        Profile
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 transition"
                      >
                        <FiSettings size={16} />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[67px]" />
    </>
  );
}