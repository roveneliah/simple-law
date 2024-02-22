import { supabase } from '@/lib/supabaseClient'
import { openai } from './route'

export const reviewCaseWithAI = async (caseData: any) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a legal assistant designed to make sure the client's case is ready for review.",
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
      {
        role: 'system',
        content: `Please review the provided information and respond as JSON:
        {
          questions: [
            question: string (max 128 chars)
            subQuestion: string (max 256 chars)
          ],
          readyForInvitation: boolean (whether we have enough information to pass the lead to lawyers)
        }`,
      },
    ],
  })

  try {
    const review = JSON.parse(completion.choices[0].message.content || '{}')
    return review
  } catch (error) {
    console.log("reviewCaseWithAI: Couldn't parse OpenAI's response.")
    console.log(error)
    return {}
  }
}

export const createInterviewWithAI = async (caseData: any) => {
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
