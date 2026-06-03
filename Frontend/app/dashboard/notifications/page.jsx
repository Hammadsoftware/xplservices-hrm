"use client";

import { useState } from "react";
import { FiBell, FiEye, FiCheck, FiTrash2, FiX } from "react-icons/fi";

/* ================= STYLES ================= */

const badgeBase =
  "inline-flex rounded-full px-3 py-1 text-xs font-medium";

const unreadBadge = `${badgeBase} bg-indigo-100 text-indigo-700`;
const readBadge = `${badgeBase} bg-gray-200 text-gray-700`;

const actionBtn =
  "flex h-9 w-9 items-center justify-center rounded-full transition";

const modalBtn =
  "rounded-xl px-4 py-2 text-sm font-medium transition";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "NOTIF-001",
      title: "Attendance Approved",
      message: "Your attendance for 12 Sept has been approved.",
      date: "Sep 12, 2025",
      read: false,
    },
    {
      id: "NOTIF-002",
      title: "Expense Rejected",
      message: "Your travel expense was rejected.",
      date: "Sep 10, 2025",
      read: true,
    },
  ]);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleDelete = () => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== selectedId)
    );
    setShowDelete(false);
    setSelectedId(null);
  };

  return (
    <div className="relative min-h-screen w-full rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 sm:px-8 py-10 space-y-8 text-black">

      {/* ===== BACKGROUND BLURS ===== */}
      <div className="absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 rounded-full blur-3xl" />

      {/* ================= HEADER ================= */}
      <div className="relative">
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications
        </h1>
      </div>

      {/* ================= NOTIFICATION CARDS ================= */}
      {notifications.length === 0 ? (
        <div
          className="
            relative
            rounded-3xl
            overflow-hidden
            border border-white/60
            bg-white/90
            backdrop-blur-xl
            py-20
            text-center
            text-gray-600
            shadow-xl
          "
        >
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />
          No notifications found
        </div>
      ) : (
        <div className="relative space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`
                relative
                rounded-3xl
                overflow-hidden
                border border-white/60
                bg-white/90
                backdrop-blur-xl
                p-5
                shadow-xl
                transition
                ${
                  !n.read
                    ? "ring-2 ring-indigo-200"
                    : "hover:bg-white/95"
                }
              `}
            >
              {/* INNER GLASS RING */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

              {/* ICON */}
              <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <FiBell />
              </div>

              {/* CONTENT */}
              <div className="relative pl-14 pr-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-black">
                    {n.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {n.date}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-600">
                  {n.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className={n.read ? readBadge : unreadBadge}>
                    {n.read ? "Read" : "Unread"}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      title="View"
                      className={`${actionBtn} bg-indigo-100 text-indigo-700 hover:bg-indigo-200`}
                    >
                      <FiEye size={16} />
                    </button>

                    {!n.read && (
                      <button
                        title="Mark as Read"
                        onClick={() => markAsRead(n.id)}
                        className={`${actionBtn} bg-green-100 text-green-700 hover:bg-green-200`}
                      >
                        <FiCheck size={16} />
                      </button>
                    )}

                    <button
                      title="Delete"
                      onClick={() => {
                        setSelectedId(n.id);
                        setShowDelete(true);
                      }}
                      className={`${actionBtn} bg-red-100 text-red-700 hover:bg-red-200`}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            onClick={() => setShowDelete(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* MODAL */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-sm
              rounded-3xl
              overflow-hidden
              bg-white/95
              backdrop-blur-xl
              shadow-2xl
            "
          >
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />

            {/* HEADER */}
            <div className="relative flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-2 text-red-600">
                <FiTrash2 />
                <h3 className="font-semibold text-black">
                  Delete Notification
                </h3>
              </div>

              <button
                onClick={() => setShowDelete(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="relative px-6 py-5">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this notification?
                <br />
                <span className="font-medium text-red-600">
                  This action cannot be undone.
                </span>
              </p>
            </div>

            {/* FOOTER */}
            <div className="relative flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setShowDelete(false)}
                className={`${modalBtn} bg-gray-100 text-gray-700 hover:bg-gray-200`}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className={`${modalBtn} bg-red-600 text-white hover:bg-red-700`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
