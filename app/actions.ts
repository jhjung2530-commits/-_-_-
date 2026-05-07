'use server'

import { supabase } from '@/lib/supabase'
import { runMatching } from '@/lib/matching'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function registerSenior(formData: FormData) {
  const name = (formData.get('name') as string).trim()
  const region = formData.get('region') as string
  const desired_job = formData.get('desired_job') as string
  const career_years = parseInt(formData.get('career_years') as string, 10)

  if (!name || !region || !desired_job || isNaN(career_years)) {
    throw new Error('모든 항목을 입력해 주세요.')
  }

  const { data, error } = await supabase
    .from('seniors')
    .insert({ name, region, desired_job, career_years })
    .select('id')
    .single()

  if (error || !data) throw new Error('등록 실패: ' + error?.message)

  await runMatching(data.id)

  redirect(`/recommendations?senior_id=${data.id}`)
}

export async function assignMatch(matchId: string) {
  await supabase
    .from('matches')
    .update({ status: 'assigned' })
    .eq('id', matchId)

  revalidatePath('/admin')
}
