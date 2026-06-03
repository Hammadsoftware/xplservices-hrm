"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  WrenchScrewdriverIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

/* ===== THEME ===== */
const ACTIVE_BG = "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700";
const ACTIVE_TEXT = "text-white";
const ACTIVE_DOT = "bg-sky-300";
const ACTIVE_GLOW = "shadow-[0_0_14px_rgba(56,189,248,0.55)]";

const ITEM_BOX =
  "border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.10)]";
const ITEM_HOVER =
  "hover:bg-sky-50 hover:border-sky-100 hover:text-sky-700 hover:shadow-[0_14px_28px_rgba(0,0,0,0.12)]";

/* ===== MENU ===== */
const menu = [
  { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/dashboard/employees", label: "Employees", icon: UserGroupIcon },
  { href: "/dashboard/timesheet", label: "Timesheet", icon: ClockIcon },
  { href: "/dashboard/clients", label: "Clients", icon: BuildingStorefrontIcon },
  { href: "/dashboard/projects", label: "Projects", icon: BriefcaseIcon },
  { href: "/dashboard/leaves", label: "Leaves", icon: CalendarDaysIcon },
  { href: "/dashboard/attendance", label: "Attendance", icon: ClipboardDocumentCheckIcon },
  { href: "/dashboard/payroll", label: "Payroll", icon: BanknotesIcon },
  { href: "/dashboard/reports", label: "Reports", icon: DocumentTextIcon },
  { href: "/dashboard/expense", label: "Expense", icon: CurrencyDollarIcon },
  { href: "/dashboard/document-request", label: "Document Request", icon: DocumentDuplicateIcon },
  { href: "/dashboard/jobs", label: "Jobs", icon: BriefcaseIcon },
  { href: "/dashboard/settings", label: "Settings", icon: WrenchScrewdriverIcon },
];

const PRIMARY_MENU = [
  "/dashboard",
  "/dashboard/employees",
  "/dashboard/attendance",
  "/dashboard/projects",
  "/dashboard/leaves",
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const secondaryMenu = useMemo(
    () => menu.filter((m) => !PRIMARY_MENU.includes(m.href)),
    []
  );

  const isActive = (href) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 h-[64vh] items-center">
        <div className="flex flex-col items-center gap-1.5 p-2 rounded-[28px] bg-white/55 backdrop-blur-2xl border border-white/50 shadow-[0_18px_40px_rgba(0,0,0,0.15)]">
          {menu.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`group relative w-11 h-11 grid place-items-center transition-all duration-200
                  ${active ? "rounded-[17px]" : "rounded-[16px]"}
                  ${
                    active
                      ? `${ACTIVE_BG} ${ACTIVE_TEXT} ${ACTIVE_GLOW}`
                      : `${ITEM_BOX} text-slate-700 ${ITEM_HOVER}`
                  }`}
              >
                <Icon className="w-[18px] h-[18px]" />

                {active && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full rotate-[30deg] ${ACTIVE_DOT}`}
                  />
                )}

                {/* Tooltip */}
                {mounted && (
                  <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                    <div className="relative px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_10px_26px_rgba(0,0,0,0.12)] text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {label}
                      <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 bg-white/95 border-l border-b border-white/60" />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 rounded-2xl border border-white/50 bg-white/85 px-3 py-2 backdrop-blur-2xl shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        {menu
          .filter((m) => PRIMARY_MENU.includes(m.href))
          .map(({ href, icon: Icon, label }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={`w-10 h-10 grid place-items-center transition-all duration-200
                  ${active ? "rounded-[17px]" : "rounded-[16px]"}
                  ${
                    active
                      ? `${ACTIVE_BG} ${ACTIVE_TEXT}`
                      : `${ITEM_BOX} text-slate-700 ${ITEM_HOVER}`
                  }`}
              >
                <Icon className="w-[18px] h-[18px]" />
              </Link>
            );
          })}

      <button
  onClick={() => setOpen(true)}
  className={`w-10 h-10 grid place-items-center rounded-[16px] ${ITEM_BOX} hover:bg-sky-50`}
>
  <EllipsisHorizontalIcon className="w-6 h-6 text-black" />
</button>

      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/35" onClick={() => setOpen(false)} />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white/92 backdrop-blur-2xl border-t border-white/50 shadow-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">More</p>
                <p className="text-xs text-slate-500">Quick access</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-700"
              >
                <XMarkIcon className="w-5  h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {secondaryMenu.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 text-slate-700 hover:text-sky-700"
                >
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 ring-1 ring-sky-100 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-center">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
