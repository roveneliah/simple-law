import { NextRequest } from 'next/server'
import { openai } from '../create/utils/createNoteForLawyer'

export const analyzeLawyerCaseFit = async (invitation) => {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "Respond with a friendly prompt for lawyers that prompts them for key information that would help the client understand if they're a good fit.",
      },
      {
        role: 'user',
        content: `Case Data: ${JSON.stringify(invitation.Case)}`,
      },
      {
        role: 'user',
        content: `Invitation Data: ${JSON.stringify(invitation)}`,
      },
    ],
  })
}

export const reviewStrategy = async (invitation) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "Given the following case details and invitation send to the lawyer, respond with a 1 paragraph analysis on lawyer's strategy.  You're acting on behalf of the client.",
      },
      {
        role: 'user',
        content: `Case Data: ${JSON.stringify(invitation.Case)}`,
      },
      {
        role: 'user',
        content: `Lawyer's Comments: ${JSON.stringify(invitation)}`,
      },
    ],
  })

  return response.choices[0].message.content
}

export async function POST(request: NextRequest) {
  try {
    const invitation = await request.json()

    const review = await reviewStrategy(invitation)
    return new Response(JSON.stringify({ data: review }), {
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
