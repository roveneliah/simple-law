import { supabase } from '@/lib/supabaseClient'
import { log } from 'console'
import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const reviewCaseWithAI = async ({ caseData, clientName }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a legal assistant designed to make sure the client's case is ready for review. Please review the following client note and respond with an email to the client ${clientName}.  Sign email with "ImpossibleLaw Team".  Keep message concise, friendly, and walk them through exactly what you need and why as a bulletted list.  If the information is sufficient to pass on, simply respond "0", and the automated system will compile that and send the details along.`,
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

const createInterviewWithAI = async ({ caseData, clientName }) => {
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
  const { caseData, clientName } = await request.json()

  const review = await reviewCaseWithAI({ caseData, clientName })
  if (review == '0') {
    const { data, error } = await supabase
      .from('Case')
      .update({
        status: 'ready',
        interview: await createInterviewWithAI({ caseData, clientName }),
      })
      .eq('id', caseData.id)
      .single()

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
  }

  return new Response(JSON.stringify(review), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
