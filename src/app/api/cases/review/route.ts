import OpenAI from 'openai'
import { reviewCaseWithAI, createInterviewWithAI } from './utils'
import { supabase } from '@/lib/supabaseClient'
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { caseData, clientName, override = false } = await request.json()

    const review = override ? null : await reviewCaseWithAI(caseData)
    const ready = override === true || review.readyForInvitation

    // if ready, mark case as ready

    // if not ready, update case with review (for later review by lawyer)
    const { data: updatedCaseData, error } = await supabase
      .from('Case')
      .update({
        readyForInvitation: ready,
        questions: review.questions,
      })

    return new Response(
      JSON.stringify({ review, ready, updatedCaseData, error }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
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
