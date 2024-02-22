'use client'
import { getCaseData } from '@/app/api/cases/review/parse/route'
import { useCase } from '@/lib/useCase'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

// TODO: should be server component...
export default function CaseView({ params: { caseId } }) {
  // trigger new questions if none already

  const caseData = useCase(caseId)
  const router = useRouter()

  useEffect(() => {
    const questions = caseData?.Question
    if (caseData?.id && (!questions || questions.length === 0)) {
      console.log('No questions found, triggering new questions...')
      fetch(`/api/cases/review/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseId }),
      })
      router.push(`/app/cases/lawyers/${caseId}`)
    } else if (caseData?.id && questions.length > 0) {
      console.log('Questions found, not triggering new questions...')
      router.push(`/app/cases/lawyers/${caseId}`)
    }
  }, [caseData?.Question])

  return <></>
}
