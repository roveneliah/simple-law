import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { caseId, readyForInvitation } = await request.json()

  console.log(caseId, readyForInvitation)

  const { data: caseData, error } = await supabase
    .from('Case')
    .update({
      readyForInvitation,
      updatedAt: new Date(),
    })
    .eq('id', caseId)
    .single()

  return new Response(JSON.stringify({ data: caseData, error }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
