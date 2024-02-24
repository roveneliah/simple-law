import { NextRequest } from 'next/server'
import { getCaseData } from '../review/parse/route'
import { openai } from '../review/route'
import { supabase } from '@/lib/supabaseClient'

const summarizeCase = async (caseData: any) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a superintelligent empathic AI legal copilot.  Given the following caseData, provide a simple summary of the case for the client, that helps them understand the essence of the case in the mind of a lawyer.  Be very concise and use every word to convey key information.',
      },
      {
        role: 'user',
        content: JSON.stringify(caseData),
      },
    ],
  })

  return res.choices[0].message.content
}

// given some caseId, summarize the case and return the summary
export async function POST(request: NextRequest) {
  try {
    const { caseId } = await request.json()
    const { data: caseData, error } = await getCaseData(caseId)
    const summary = await summarizeCase(caseData)
    const { data: updatedCaseData, error: updatedCaseError } = await supabase
      .from('Case')
      .update({
        summary,
      })
      .eq('id', caseId)
      .single()

    if (updatedCaseError) {
      throw new Error(`Failed to update case with summary: ${updatedCaseError}`)
    }

    return new Response(
      JSON.stringify({ updatedCaseData, updatedCaseError, summary }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
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
