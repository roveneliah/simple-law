import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // get lawyerId from nextquery
    const id = request.nextUrl.searchParams.get('lawyerId')

    const { data, error } = await supabase
      .from('Inquiry')
      .select('*')
      .eq('lawyerId', id)

    console.log('data', data)
    console.log('error', error)

    return new Response(JSON.stringify({ data, error }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
