"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFileInvoice,
  FaBuilding,
  FaFileAlt,
  FaIndustry,
  FaUserTie,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaUserCheck,
  FaCogs,
  FaCloud,
  FaPuzzlePiece,
  FaEnvelope,
} from "react-icons/fa";

const navigation = [
  { href: "/dashboard/settings/billing-types", icon: FaFileInvoice, label: "Billing Types" },
  { href: "/dashboard/settings/departments", icon: FaBuilding, label: "Departments" },
  { href: "/dashboard/settings/document-types", icon: FaFileAlt, label: "Document Types" },
  { href: "/dashboard/settings/industry", icon: FaIndustry, label: "Industry" },
  { href: "/dashboard/settings/employee-positions", icon: FaUserTie, label: "Employee Positions" },
  { href: "/dashboard/settings/employee-roles", icon: FaUsers, label: "Employee Roles" },
  { href: "/dashboard/settings/leave-policy", icon: FaCalendarAlt, label: "Leave Policy" },
  { href: "/dashboard/settings/payment-terms", icon: FaMoneyCheckAlt, label: "Payment Terms" },
  { href: "/dashboard/settings/expense-approver", icon: FaUserCheck, label: "Expense Approver" },
  { href: "/dashboard/settings/sap-abap", icon: FaCogs, label: "SAP ABAP" },
  { href: "/dashboard/settings/sap-byd", icon: FaCloud, label: "SAP BYD" },
  { href: "/dashboard/settings/custom-fields", icon: FaPuzzlePiece, label: "Custom Fields" },
  { href: "/dashboard/settings/email", icon: FaEnvelope, label: "Email" },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div
      className="relative flex-1 min-h-0 w-full overflow-hidden rounded-3xl
      bg-gradient-to-br from-sky-50 via-indigo-50 to-white"
    >
      {/* BLURS */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 bg-indigo-400/20 blur-3xl" />

      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b">
        <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className="shrink-0">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition
                    ${
                      active
                        ? "bg-gradient-to-br from-sky-400 to-indigo-600 text-white"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="relative z-10 flex h-full min-h-0">
        {/* MAIN CONTENT */}
        <main className="flex-1 min-h-0 p-4 md:p-6 overflow-hidden">
          <div className="w-full h-full rounded-2xl shadow-xl flex flex-col overflow-hidden">
            {children}
          </div>
        </main>

        {/* RIGHT SIDEBAR (DESKTOP ONLY) */}
        <aside className="hidden md:flex w-24 shrink-0 items-center justify-center">
          <div
            className="h-full max-h-[calc(100%-1rem)] w-16 rounded-2xl shadow-2xl
            bg-white/40 backdrop-blur-xl border border-white/40
            flex flex-col items-center space-y-3 py-4"
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link key={item.href} href={item.href} className="relative group">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all
                      ${
                        active
                          ? "bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-md"
                          : "text-gray-600 hover:text-indigo-600 hover:bg-white/60"
                      }`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* TOOLTIP */}
                  <div
                    className="absolute right-full mr-2 top-1/2 -translate-y-1/2
                    whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  >
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
