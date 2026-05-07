import Link from "next/link";

const CARDS = [
  {
    href: "/register",
    title: "프로필 등록",
    desc: "이름·지역·희망 직종·경력을 입력하세요.",
    emoji: "📝",
    bg: "bg-blue-600 hover:bg-blue-700",
  },
  {
    href: "/recommendations",
    title: "추천 일자리",
    desc: "나의 프로필과 딱 맞는 일자리를 확인하세요.",
    emoji: "⭐",
    bg: "bg-green-600 hover:bg-green-700",
  },
  {
    href: "/admin",
    title: "담당자 대시보드",
    desc: "매칭 현황 전체를 한눈에 관리하세요.",
    emoji: "📊",
    bg: "bg-purple-600 hover:bg-purple-700",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          시니어 일자리 매칭
        </h1>
        <p className="text-2xl text-gray-600">
          상상우리가 딱 맞는 일자리를 찾아드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {CARDS.map(({ href, title, desc, emoji, bg }) => (
          <Link
            key={href}
            href={href}
            className={`${bg} rounded-2xl p-8 text-white text-center transition-colors shadow-md`}
          >
            <span className="text-5xl">{emoji}</span>
            <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
            <p className="text-lg opacity-90">{desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
