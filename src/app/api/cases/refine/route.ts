import OpenAI from 'openai'
import { refineCaseWithAI } from './refineCaseWithAI'
export const openai = new OpenAI({
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
