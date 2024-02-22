import { supabase } from '@/lib/supabaseClient'
import { UUID } from 'crypto'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { reviewCaseWithAI } from '../utils'

const getCaseData = async (caseId: UUID) =>
  await supabase.from('Case').select('*').eq('id', caseId).single()

export const caseParser = z.object({
  // string of max length 32
  readyForInvitation: z.boolean(),
  questions: z.array(
    z.object({
      question: z.string().max(128),
      subQuestion: z.string().max(256),
    }),
  ),
})

export async function POST(request: NextRequest) {
  const { caseId } = await request.json()
  const { data: caseData, error } = await getCaseData(caseId)

  let attempts = 3 // make 3 attempts to refine the case before giving up
  while (attempts > 0) {
    const caseReview = await reviewCaseWithAI(caseData)
    const parsedCase = caseParser.safeParse(caseReview)

    if (parsedCase.error) {
      console.log(parsedCase.error.errors)
      attempts -= 1
      console.log('attempting to parse again')
      continue
    }

    return new Response(JSON.stringify(parsedCase.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Failed to parse case' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  })
}
