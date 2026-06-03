"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white overflow-hidden">

      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="text-lg font-extrabold tracking-tight">
            XPLservices
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="rounded-xl bg-black px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section (Centered like reference image) */}
      <section className="relative flex min-h-screen items-center justify-center px-6">

        {/* Soft Glow Background Effects */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400 blur-3xl opacity-20" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500 blur-3xl opacity-20" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 text-white px-4 py-2 text-xs font-semibold backdrop-blur">
            XPLservices IT Company • HR System
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Smart HR Management System for Modern Teams
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
            XPLservices HR System is a complete workforce management platform designed for growing IT companies. Manage employees, attendance, payroll, performance, leave tracking, and compliance — all in one secure and scalable system. Built to simplify HR operations and empower teams with real-time insights.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Login to Dashboard
            </Link>

            <a
              href="#services"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl text-white">
          <h2 className="text-2xl font-extrabold tracking-tight">
            HR System Features
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur transition hover:bg-white/20">
              <h3 className="font-bold">Employee Management</h3>
              <p className="mt-2 text-sm text-white/80">
                Centralized employee profiles, document storage, role management, and real-time updates.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur transition hover:bg-white/20">
              <h3 className="font-bold">Attendance & Payroll</h3>
              <p className="mt-2 text-sm text-white/80">
                Automated attendance tracking, shift management, salary calculation, and payroll processing.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur transition hover:bg-white/20">
              <h3 className="font-bold">Performance & Leave Management</h3>
              <p className="mt-2 text-sm text-white/80">
                Track performance reviews, manage leave requests, approvals, and employee lifecycle seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/10 backdrop-blur text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-white/80">
          © {new Date().getFullYear()} XPLservices. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
