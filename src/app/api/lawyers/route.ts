// get lawyer

import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

// get lawyer by id from GET reuqest
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  try {
    const { data, error } = await supabase
      .from('Lawyer')
      .select('*, Service(*)')
      .eq('id', id)
      .single()
    return new Response(JSON.stringify({ data, error }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
