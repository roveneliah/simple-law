import { supabase } from '@/lib/supabaseClient'
import OpenAI from 'openai'
import { createInvitations } from '../../invitations/create/route'
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const reviewCaseWithAI = async ({ caseData, clientName }: any) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a legal assistant designed to make sure the client's case is ready for review.  
Please review the provided information and respond as JSON:
{
  questions: [
    question: string
    subQuestion: string
  ],
  readyForLawyer: boolean (whether we have enough information to pass the lead to lawyers)
}`,
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
    ],
  })

  const review = completion.choices[0].message.content
  return review
}

const markReady = async ({ caseData, clientName }: any) => {
  console.log('marking ready...')
  const { data, error } = await supabase
    .from('Case')
    .update({
      readyForInvitation: true,
      review: null,
      interview: await createInterviewWithAI({ caseData, clientName }),
    })
    .eq('id', caseData.id)
    .single()

  return { data, error }
}

const updateCaseWithReview = async ({ caseId, review }: any) => {
  const { data, error } = await supabase
    .from('Case')
    .update({
      readyForInvitation: false,
      review,
      interview: null,
    })
    .eq('id', caseId)
    .single()

  return { data, error }
}

const createInterviewWithAI = async ({ caseData }: any) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "Respond with a friendly prompt for lawyers that prompts them for key information that would help the client understand if they're a good fit.",
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
    ],
  })

  const interview = completion.choices[0].message.content
  return interview
}

export async function POST(request: Request) {
  try {
    const { caseData, clientName, override = false } = await request.json()

    const review = override
      ? null
      : await reviewCaseWithAI({ caseData, clientName })
    const ready = override === true || review == '0'

    const { data, error } = ready
      ? await markReady({ caseData, clientName }).then(
          async () => await createInvitations(caseData),
        )
      : await updateCaseWithReview({
          caseId: caseData.id,
          review,
        })

    return new Response(JSON.stringify({ review, ready, data, error }), {
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
