import { supabase } from '@/lib/supabaseClient'

// Wipe all Invites with caseId, and wipe Case's interviewDueBy
export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    // Wipe all Invites with caseId
    const { data: agreementData, error: agreementError } = await supabase
      .from('Agreement')
      .delete()
      .eq('userId', userId)
      .select()

    if (agreementError)
      throw new Error(`Failed to delete invites: ${agreementError.message}`)

    return new Response(
      JSON.stringify({ data: agreementData, error: agreementError }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
