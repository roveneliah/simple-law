import OpenAI from 'openai'
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export const createNoteForLawyer = async ({ caseData, lawyer }: any) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a legal assistant.  Given the following case data, write an invitation to the lawyer to review the invitation to the case.  Provide an analysis of whether it's a fit and worth their time given the below information on the lawyers priorities and the case's details.  Keep brief such that lawyer can vet key details.",
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
