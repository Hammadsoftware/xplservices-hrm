"use client";

import { useState, useEffect, useMemo } from "react";
import { FiBell, FiX } from "react-icons/fi";
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/api";

export default function NotificationsBell() {
  const { user, token } = useAuthStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.readAt).length,
    [notifications]
  );

  /* ================= FETCH ================= */
  const fetchNotifications = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const res = await api.get(`/notifications/${user.id}`, { headers: authHeaders });
      setNotifications(res.data?.data || []);
    } catch (err) {
      console.error("Fetch notifications error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!id) return; // ❌ no conversion, id is string

    try {
      setDeletingId(id);
      await api.delete(`/notifications/${id}`, { headers: authHeaders });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Delete notification error:", err?.response?.data || err);
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= MARK AS READ ================= */
  const markAsRead = async (id) => {
    if (!id) return; // ❌ string id
    try {
      await api.patch(`/notifications/${id}/read`, {}, { headers: authHeaders });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readAt: new Date() } : n))
      );
    } catch (err) {
      console.error("Mark read error:", err?.response?.data || err);
    }
  };

  /* ================= MARK ALL AS READ ================= */
  const markAllAsRead = async () => {
    if (!user?.id) return;

    try {
      await api.patch(`/notifications/${user.id}/read-all`, {}, { headers: authHeaders });
      setNotifications((prev) => prev.map((n) => ({ ...n, readAt: new Date() })));
    } catch (err) {
      console.error("Mark all read error:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  return (
    <div className="relative">
      {/* Bell */}
      <button
        onClick={() => setNotifOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-gray-100"
      >
        <FiBell />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {notifOpen && (
        <div className="absolute right-0 mt-2 w-[350px] bg-white shadow-lg border rounded-lg z-50">
          <div className="px-4 py-3 border-b flex justify-between items-center font-semibold text-sm">
            <span>Notifications</span>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-blue-600">
                  Mark all read
                </button>
              )}
              <button onClick={() => setNotifOpen(false)}>
                <FiX />
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-auto">
            {loading ? (
              <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`relative border-b px-4 py-3 group ${!n.readAt ? "bg-gray-50" : ""}`}>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(n.id)}
                    disabled={deletingId === n.id}
                    className="absolute right-3 top-3 hidden group-hover:block"
                  >
                    <FiX />
                  </button>

                  <div onClick={() => markAsRead(n.id)} className="cursor-pointer">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-gray-700 mt-1">{n.message}</p>
                    <p className="text-[11px] text-gray-700 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}