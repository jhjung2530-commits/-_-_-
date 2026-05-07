import { supabase } from './supabase'

type Senior = {
  id: string
  region: string
  desired_job: string
  career_years: number
}

type Job = {
  id: string
  region: string
  job_type: string
  required_career: number
}

function calculateScore(senior: Senior, job: Job): number {
  let score = 0
  if (senior.region === job.region) score += 50
  if (senior.desired_job === job.job_type) score += 30
  if (senior.career_years >= job.required_career) score += 20
  return score
}

export async function runMatching(seniorId: string): Promise<void> {
  const { data: senior } = await supabase
    .from('seniors')
    .select('id, region, desired_job, career_years')
    .eq('id', seniorId)
    .single()

  if (!senior) return

  const { data: jobs } = await supabase
    .from('jobs')
    .select('id, region, job_type, required_career')

  if (!jobs || jobs.length === 0) return

  // 기존 매칭 삭제 후 재계산
  await supabase.from('matches').delete().eq('senior_id', seniorId)

  const rows = jobs
    .map((job) => ({
      senior_id: seniorId,
      job_id: job.id,
      score: calculateScore(senior, job),
      status: 'pending' as const,
    }))
    .filter((r) => r.score > 0)

  if (rows.length > 0) {
    await supabase.from('matches').insert(rows)
  }
}
