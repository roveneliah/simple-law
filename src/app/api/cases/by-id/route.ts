import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // get caseId from url
  const caseId = request.nextUrl.searchParams.get('caseId')

  const { data: caseData, error } = await supabase
    .from('Case')
    .select('*')
    .eq('id', caseId)
    .single()

  return new Response(JSON.stringify({ data: caseData, error }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
