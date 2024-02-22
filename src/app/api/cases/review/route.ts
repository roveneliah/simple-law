import OpenAI from 'openai'
import { reviewCaseWithAI, createInterviewWithAI } from './utils'
import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function GET(request: NextRequest) {
  const { caseId } = await request.json()
  const { data: caseData, error } = await supabase
    .from('Case')
    .select('*')
    .eq('id', caseId)
    .single()
  const interview = await createInterviewWithAI(caseData)
  return new Response(JSON.stringify(interview), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  console.log('Triggering case review with AI.')
  try {
    const { caseId, override = false } = await request.json()
    const { data: caseData, error } = await supabase
      .from('Case')
      .select('*')
      .eq('id', caseId)
      .single()

    console.log(caseData)

    const review = override ? null : await reviewCaseWithAI(caseData)

    // if not ready, update case with review (for later review by lawyer)
    const { data: updatedCaseData, error: updatedCaseError } = await supabase
      .from('Case')
      .update({
        readyForInvitation: review?.readyForInvitation,
        review: review?.questions,
      })
      .eq('id', caseData.id)
      .single()

    return new Response(JSON.stringify({ review, error }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
