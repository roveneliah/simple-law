import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

// get list of services by lawyer id
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  try {
    const { data, error } = await supabase
      .from('Service')
      .select()
      .eq('lawyerId', id)
    return new Response(JSON.stringify({ data, error }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
