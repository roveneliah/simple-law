import { openai } from './route'

export const reviewCaseWithAI = async (caseData: any) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a legal assistant designed to make sure the client's case is ready for review.  Prompt clients for details on what evidence they have of what, and help explain why we're asking for what we are.  Ask questions to ensure we understand their expectations and goals.",
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
      { role: 'user', content: JSON.stringify(caseData?.Question) },
      {
        role: 'system',
        content: `Please review the provided information and respond as JSON:
        {
          questions: [
            question: string (max 128 chars) // any NEW questions that you have for the client
            subQuestion: string (max 256 chars)
          ],
          determination: string (max 256 chars) // why or why not is the case ready to pass to lawyers
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
