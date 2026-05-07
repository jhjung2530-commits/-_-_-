import { supabase } from '@/lib/supabase'
import AssignButton from './AssignButton'

type BestMatch = {
  id: string
  score: number
  status: string
  jobs: { title: string; region: string; job_type: string } | null
}

type SeniorWithMatch = {
  id: string
  name: string
  region: string
  desired_job: string
  career_years: number
  bestMatch: BestMatch | null
}

type Section = {
  key: string
  label: string
  headerColor: string
  badgeColor: string
  cardColor: string
  seniors: SeniorWithMatch[]
}

async function fetchSeniorsWithBestMatch(): Promise<SeniorWithMatch[]> {
  const { data: seniors } = await supabase
    .from('seniors')
    .select('id, name, region, desired_job, career_years')

  if (!seniors) return []

  const results = await Promise.all(
    seniors.map(async (s) => {
      const { data: matches } = await supabase
        .from('matches')
        .select('id, score, status, jobs(title, region, job_type)')
        .eq('senior_id', s.id)
        .order('score', { ascending: false })
        .limit(1)
        .returns<BestMatch[]>()

      return { ...s, bestMatch: matches?.[0] ?? null }
    })
  )

  return results
}

function categorizeSeniors(seniors: SeniorWithMatch[]) {
  const unmatched = seniors.filter((s) => !s.bestMatch)
  const pending = seniors.filter((s) => s.bestMatch?.status === 'pending')
  const assigned = seniors.filter((s) => s.bestMatch?.status === 'assigned')
  return { unmatched, pending, assigned }
}

function SeniorCard({ senior, showAssign }: { senior: SeniorWithMatch; showAssign: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-900">{senior.name}</p>
        <p className="text-lg text-gray-500 mt-1">
          {senior.region} · {senior.desired_job} · 경력 {senior.career_years}년
        </p>
        {senior.bestMatch && (
          <p className="text-lg text-blue-600 mt-1 font-semibold">
            추천: {senior.bestMatch.jobs?.title} ({senior.bestMatch.score}점)
          </p>
        )}
      </div>
      {showAssign && senior.bestMatch && (
        <AssignButton matchId={senior.bestMatch.id} />
      )}
    </div>
  )
}

export default async function AdminPage() {
  const seniors = await fetchSeniorsWithBestMatch()
  const { unmatched, pending, assigned } = categorizeSeniors(seniors)

  const sections: Section[] = [
    {
      key: 'unmatched',
      label: '미매칭',
      headerColor: 'border-red-400 bg-red-50',
      badgeColor: 'bg-red-100 text-red-700',
      cardColor: '',
      seniors: unmatched,
    },
    {
      key: 'pending',
      label: '매칭 대기',
      headerColor: 'border-yellow-400 bg-yellow-50',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      cardColor: '',
      seniors: pending,
    },
    {
      key: 'assigned',
      label: '배정 완료',
      headerColor: 'border-green-400 bg-green-50',
      badgeColor: 'bg-green-100 text-green-700',
      cardColor: '',
      seniors: assigned,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 제목 */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">담당자 대시보드</h1>
          <p className="text-xl text-gray-600">매칭 현황을 확인하고 배정을 처리하세요.</p>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {sections.map((s) => (
            <div key={s.key} className={`rounded-2xl border-2 p-6 text-center ${s.headerColor}`}>
              <p className="text-xl font-semibold text-gray-700">{s.label}</p>
              <p className="text-5xl font-black text-gray-900 mt-2">{s.seniors.length}</p>
              <p className="text-base text-gray-500 mt-1">명</p>
            </div>
          ))}
        </div>

        {/* 섹션별 목록 */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.key}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{s.label}</h2>
                <span className={`px-3 py-1 rounded-full text-lg font-semibold ${s.badgeColor}`}>
                  {s.seniors.length}명
                </span>
              </div>

              {s.seniors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <p className="text-xl text-gray-400">해당 상태의 시니어가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {s.seniors.map((senior) => (
                    <SeniorCard
                      key={senior.id}
                      senior={senior}
                      showAssign={s.key === 'pending'}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
