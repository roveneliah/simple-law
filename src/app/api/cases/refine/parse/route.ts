import { supabase } from '@/lib/supabaseClient'
import { Case } from '@prisma/client'
import { UUID } from 'crypto'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { refineCaseWithAI } from '../refineCaseWithAI'

const getCaseData = async (caseId: UUID) =>
  await supabase.from('Case').select('*').eq('id', caseId).single()

export const caseParser = z.object({
  // string of max length 32
  title: z.string().max(32),
  description: z.string().max(256),
  caseType: z.enum([
    'criminal',
    'civil',
    'family',
    'business',
    'immigration',
    'other',
  ]),
})

export async function POST(request: NextRequest) {
  const { caseId } = await request.json()
  // keep trying to refine the case with AI until it parses successfully
  const { data: caseData, error } = await getCaseData(caseId)

  let attempts = 3 // make 3 attempts to refine the case before giving up
  while (attempts > 0) {
    const refinedCase = await refineCaseWithAI(caseData)
    const parsedCase = caseParser.safeParse(refinedCase)

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
