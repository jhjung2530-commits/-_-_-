import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Match = {
  id: string
  score: number
  status: string
  jobs: {
    title: string
    region: string
    job_type: string
    required_career: number
  } | null
}

type Senior = {
  name: string
  region: string
  desired_job: string
  career_years: number
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? 'text-green-600' : score >= 50 ? 'text-blue-600' : 'text-gray-500'
  return <p className={`text-4xl font-black ${color}`}>{score}점</p>
}

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: Promise<{ senior_id?: string }>
}) {
  const { senior_id } = await searchParams

  if (!senior_id) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <p className="text-3xl font-bold text-gray-700">먼저 프로필을 등록해 주세요.</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            프로필 등록하러 가기
          </Link>
        </div>
      </main>
    )
  }

  const [{ data: senior }, { data: matches }] = await Promise.all([
    supabase
      .from('seniors')
      .select('name, region, desired_job, career_years')
      .eq('id', senior_id)
      .single<Senior>(),
    supabase
      .from('matches')
      .select('id, score, status, jobs(title, region, job_type, required_career)')
      .eq('senior_id', senior_id)
      .order('score', { ascending: false })
      .returns<Match[]>(),
  ])

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">나에게 맞는 일자리</h1>
          {senior && (
            <p className="text-xl text-gray-600">
              {senior.name}님 ({senior.region} · {senior.desired_job} · 경력 {senior.career_years}년)
            </p>
          )}
        </div>

        {/* 점수 기준 안내 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-lg text-blue-700">
          점수 기준: 지역 일치 +50점 · 직종 일치 +30점 · 경력 충족 +20점 (최대 100점)
        </div>

        {/* 매칭 결과 */}
        {!matches || matches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <p className="text-2xl text-gray-500">매칭된 일자리가 없습니다.</p>
            <p className="text-lg text-gray-400 mt-2">지역·직종 조건이 일치하는 일자리가 아직 없어요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((m, idx) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gray-300 w-8">{idx + 1}</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{m.jobs?.title}</p>
                    <p className="text-xl text-gray-500 mt-1">
                      📍 {m.jobs?.region} &nbsp;·&nbsp; {m.jobs?.job_type}
                    </p>
                    <p className="text-lg text-gray-400 mt-1">
                      요구 경력 {m.jobs?.required_career}년 이상
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-base text-gray-400 mb-1">매칭 점수</p>
                  <ScoreBadge score={m.score} />
                  {m.status === 'assigned' && (
                    <span className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-base font-semibold">
                      배정 완료
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="text-xl text-blue-600 hover:underline"
          >
            ← 다른 프로필로 다시 등록하기
          </Link>
        </div>
      </div>
    </main>
  )
}
