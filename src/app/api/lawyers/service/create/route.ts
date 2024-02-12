import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lawyerId, type, price } = body
    const { data, error } = await supabase
      .from('Service')
      .insert({
        id: uuidv4(),
        lawyerId,
        type,
        price,
        updatedAt: new Date(),
      })
      .select()
    return new Response(JSON.stringify({ data, error }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
