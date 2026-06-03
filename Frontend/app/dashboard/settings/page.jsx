"use client";

import {
  FiUser,
  FiBell,
  FiLock,
  FiGlobe,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";

const settingsItems = [
  {
    title: "Account",
    description: "Profile, password, and personal information",
    icon: <FiUser className="text-xl" />,
  },
  {
    title: "Notifications",
    description: "Email, push, and system notifications",
    icon: <FiBell className="text-xl" />,
  },
  {
    title: "Privacy & Security",
    description: "Security, sessions, and permissions",
    icon: <FiLock className="text-xl" />,
  },
  {
    title: "Appearance",
    description: "Theme, layout, and display preferences",
    icon: <FiSettings className="text-xl" />,
  },
  {
    title: "Language & Region",
    description: "Language, timezone, and locale",
    icon: <FiGlobe className="text-xl" />,
  },
  {
    title: "Help & Support",
    description: "FAQs, documentation, and support",
    icon: <FiHelpCircle className="text-xl" />,
  },
];

export default function SettingsIndexPage() {
  return (
    <div
      className="relative min-h-full w-full rounded-3xl overflow-hidden
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white
      px-6 sm:px-8 py-10 space-y-8 text-black"
    >
      {/* HEADER */}
      <section className="relative">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-600">
          Manage application preferences and configurations
        </p>
      </section>

      {/* SETTINGS GRID */}
      <section className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsItems.map((item) => (
          <div
            key={item.title}
            className="group"
          >
            <div
              className="relative h-full rounded-3xl border border-white/40
              bg-white/70 backdrop-blur-xl p-6
              shadow-[0_20px_40px_rgba(0,0,0,0.08)]
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
            >
              <div
                className="flex h-12 w-12 items-center justify-center
                rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600
                text-white shadow-md"
              >
                {item.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
