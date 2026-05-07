export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 페이지 제목 */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            시니어 프로필 등록
          </h1>
          <p className="text-xl text-gray-600">
            정보를 입력하시면 맞춤 일자리를 추천해 드립니다.
          </p>
        </div>

        {/* 등록 폼 — 기능 구현 예정 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">

          {/* 이름 */}
          <div className="space-y-2">
            <label className="block text-2xl font-semibold text-gray-800">
              이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              disabled
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* 지역 */}
          <div className="space-y-2">
            <label className="block text-2xl font-semibold text-gray-800">
              거주 지역
            </label>
            <input
              type="text"
              placeholder="서울시 종로구"
              disabled
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* 희망 직종 */}
          <div className="space-y-2">
            <label className="block text-2xl font-semibold text-gray-800">
              희망 직종
            </label>
            <input
              type="text"
              placeholder="경비, 청소, 사무보조 등"
              disabled
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* 경력 */}
          <div className="space-y-2">
            <label className="block text-2xl font-semibold text-gray-800">
              총 경력 (년)
            </label>
            <input
              type="number"
              placeholder="0"
              disabled
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* 제출 버튼 — 기능 구현 예정 */}
          <button
            disabled
            className="w-full h-16 rounded-xl bg-blue-600 text-white text-2xl font-bold cursor-not-allowed opacity-50"
          >
            프로필 등록하기
          </button>
        </div>

        <p className="mt-4 text-center text-gray-400 text-lg">
          ※ 기능은 다음 단계에서 구현됩니다.
        </p>
      </div>
    </main>
  );
}
