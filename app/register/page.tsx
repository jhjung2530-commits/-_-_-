import { registerSenior } from '@/app/actions'
import SubmitButton from './SubmitButton'

const REGIONS = ['서울', '부산', '인천']
const JOB_TYPES = ['경비', '복지보조', '사무보조', '급식보조', '환경미화', '포장', '판매']

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">시니어 프로필 등록</h1>
          <p className="text-xl text-gray-600">
            정보를 입력하시면 맞춤 일자리를 자동으로 추천해 드립니다.
          </p>
        </div>

        <form action={registerSenior} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          {/* 이름 */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-2xl font-semibold text-gray-800">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="홍길동"
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl
                         focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* 지역 */}
          <div className="space-y-2">
            <label htmlFor="region" className="block text-2xl font-semibold text-gray-800">
              거주 지역 <span className="text-red-500">*</span>
            </label>
            <select
              id="region"
              name="region"
              required
              defaultValue=""
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl
                         focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="" disabled>지역을 선택하세요</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* 희망 직종 */}
          <div className="space-y-2">
            <label htmlFor="desired_job" className="block text-2xl font-semibold text-gray-800">
              희망 직종 <span className="text-red-500">*</span>
            </label>
            <select
              id="desired_job"
              name="desired_job"
              required
              defaultValue=""
              className="w-full h-14 rounded-xl border-2 border-gray-300 px-4 text-xl
                         focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="" disabled>직종을 선택하세요</option>
              {JOB_TYPES.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>

          {/* 경력 */}
          <div className="space-y-2">
            <label htmlFor="career_years" className="block text-2xl font-semibold text-gray-800">
              총 경력 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="career_years"
                name="career_years"
                type="number"
                required
                min={0}
                max={50}
                defaultValue={0}
                className="w-40 h-14 rounded-xl border-2 border-gray-300 px-4 text-xl
                           focus:border-blue-500 focus:outline-none"
              />
              <span className="text-2xl text-gray-600">년</span>
            </div>
          </div>

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-gray-400 text-lg">
          등록 즉시 자동 매칭이 실행되어 추천 일자리 화면으로 이동합니다.
        </p>
      </div>
    </main>
  )
}
