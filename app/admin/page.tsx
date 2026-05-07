const SECTIONS = [
  {
    key: "unmatched",
    label: "미매칭",
    color: "border-red-400 bg-red-50",
    badge: "bg-red-100 text-red-700",
    count: 0,
    description: "아직 매칭되지 않은 시니어",
  },
  {
    key: "pending",
    label: "매칭 대기",
    color: "border-yellow-400 bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
    count: 0,
    description: "추천됐으나 배정 전 대기 중",
  },
  {
    key: "assigned",
    label: "배정 완료",
    color: "border-green-400 bg-green-50",
    badge: "bg-green-100 text-green-700",
    count: 0,
    description: "일자리 배정이 완료된 시니어",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 제목 */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            담당자 대시보드
          </h1>
          <p className="text-xl text-gray-600">
            매칭 현황을 한눈에 확인하고 관리하세요.
          </p>
        </div>

        {/* 통계 요약 — 기능 구현 예정 */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {SECTIONS.map((s) => (
            <div
              key={s.key}
              className={`rounded-2xl border-2 p-6 text-center ${s.color}`}
            >
              <p className="text-xl font-semibold text-gray-700">{s.label}</p>
              <p className="text-5xl font-black text-gray-900 mt-2">{s.count}</p>
              <p className="text-base text-gray-500 mt-1">{s.description}</p>
            </div>
          ))}
        </div>

        {/* 섹션별 목록 — 기능 구현 예정 */}
        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.key}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-gray-800">{s.label}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-lg font-semibold ${s.badge}`}
                >
                  {s.count}건
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-xl text-gray-400">
                  데이터가 없습니다.
                </p>
                <p className="text-base text-gray-300 mt-1">
                  ※ 목록 기능은 다음 단계에서 구현됩니다.
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
