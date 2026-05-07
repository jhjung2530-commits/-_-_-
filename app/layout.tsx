import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "상상우리 — 시니어 일자리 매칭",
  description: "시니어와 일자리를 자동으로 매칭해 드립니다.",
};

const NAV_LINKS = [
  { href: "/register", label: "프로필 등록" },
  { href: "/recommendations", label: "추천 일자리" },
  { href: "/admin", label: "담당자 대시보드" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={geist.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* 상단 네비게이션 */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-2xl font-black text-blue-600 tracking-tight"
            >
              상상우리
            </Link>
            <ul className="flex gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="px-4 py-2 rounded-lg text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {children}

        <footer className="mt-16 border-t border-gray-200 py-8 text-center text-gray-400 text-base">
          © 2026 상상우리 — 시니어 일자리 매칭 시스템
        </footer>
      </body>
    </html>
  );
}
