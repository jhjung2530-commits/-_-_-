'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-16 rounded-xl bg-blue-600 text-white text-2xl font-bold
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-blue-700 transition-colors"
    >
      {pending ? '등록 중...' : '프로필 등록하기'}
    </button>
  )
}
