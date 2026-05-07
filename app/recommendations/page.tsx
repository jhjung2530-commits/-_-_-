export default function RecommendationsPage() {
  // 더미 데이터 — 실제 매칭 로직은 다음 단계에서 구현
  const placeholderJobs = [
    { id: 1, title: "아파트 경비원", region: "서울 강남구", score: 95 },
    { id: 2, title: "학교 급식 보조", region: "서울 종로구", score: 82 },
    { id: 3, title: "공원 환경 미화", region: "서울 마포구", score: 74 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 페이지 제목 */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            나에게 맞는 일자리
          </h1>
          <p className="text-xl text-gray-600">
            프로필을 분석해 추천 일자리를 점수 순으로 보여드립니다.
          </p>
        </div>

        {/* 추천 목록 — 기능 구현 예정 */}
        <div className="space-y-4">
          {placeholderJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between opacity-60"
            >
              <div>
                <p className="text-2xl font-bold text-gray-900">{job.title}</p>
                <p className="text-xl text-gray-500 mt-1">📍 {job.region}</p>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-400">매칭 점수</p>
                <p className="text-4xl font-black text-blue-600">{job.score}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 안내 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 text-center">
          <p className="text-xl text-blue-700 font-semibold">
            ✨ 프로필을 등록하면 실제 추천 목록이 표시됩니다.
          </p>
          <p className="text-lg text-blue-500 mt-1">
            ※ 매칭 기능은 다음 단계에서 구현됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
