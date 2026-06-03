import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ===== FONTS ===== */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ===== METADATA ===== */
export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  description:
    "Modern admin dashboard for managing employees, payroll, attendance, leaves, and reports.",
  icons: {
    icon: "/brands.jpeg",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  themeColor: "#2563eb",
};

/* ===== ROOT LAYOUT ===== */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black`}
      >
        {/* ===== GLOBAL BACKGROUND ===== */}
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-white">

          {/* BLURRED BLOBS */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />

          {/* APP CONTENT */}
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
