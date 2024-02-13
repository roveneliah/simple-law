import { supabase } from '@/lib/supabaseClient'
import { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    console.log("You've hit the create inquiry endpoint")
    const { lawyerId, question, answer } = await req.json()

    const { data, error } = await supabase
      .from('Inquiry')
      .insert([
        {
          id: uuidv4(),
          lawyerId,
          question,
          answer,
          updatedAt: new Date(),
        },
      ])
      .select('*')

    console.log('data', data)
    console.log('error', error)

    return new Response(JSON.stringify({ data, error }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
