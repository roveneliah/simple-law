import { log } from 'console'
import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { caseData, clientName } = await request.json()
  console.log(caseData, clientName)

  const review = await reviewCaseWithAI({ caseData, clientName })
  log('review')
  console.log(review)

  return new Response(JSON.stringify(review), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

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
