import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const caseData = await request.json()
  console.log('caseData', caseData)

  const refinedCase = await refineCaseWithAI(caseData)
  console.log('refinedCase', refinedCase)

  return new Response(JSON.stringify(refinedCase), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

const refineCaseWithAI = async (caseData) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a legal assistant designed to annotate client notes about their case into digestable JSON data for the lawyer to review. Please annotate the following client note into a JSON object with the following fields: title, description.  This title and description will be used in a view to list out the user's cases, and should be natural language fields.  Output will be read by a Javascript program, and must compile.  Title should be max 3 words.",
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
    ],
  })

  // parse message
  // given: whatUp, goals, dates, documents
  // return: title, description
  const annotations = JSON.parse(completion.choices[0].message.content)

  return {
    ...annotations,
    ...caseData,
  }
}
