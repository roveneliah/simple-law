import { supabase } from '@/lib/supabaseClient'
import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { caseData, clientName } = await request.json()
  console.log(caseData, clientName)

  const note = await createNoteForLawyer({ caseData, clientName })

  const { data, error } = await supabase.from('Invitation').insert({
    id: uuidv4(),
    caseId: caseData.id,
    lawyerId: '08332dfa-3634-46c3-8854-da9042f0c419',
    status: 'pending',
    comment: note,
    updatedAt: new Date(),
  })

  if (error) {
    console.log(error)
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

  return new Response(
    JSON.stringify({
      ...caseData,
      note,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

const createNoteForLawyer = async ({ caseData, clientName }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a legal assistant.  Given the following case data, write an invitation to the lawyer to review the invitation to the case.  Provide an analysis of whether it's a fit and worth their time given the below information on the lawyers priorities and the case's details.",
      },
      {
        role: 'system',
        content:
          "The lawyer's expertise is in business contract law, and priorities are: 1. High value cases, 2. Quick and easy, 3. Quality clients",
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
      {
        role: 'system',
        content: 'GO',
      },
    ],
  })

  const review = completion.choices[0].message.content
  return review
}
