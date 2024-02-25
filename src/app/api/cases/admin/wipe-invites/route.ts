import { supabase } from '@/lib/supabaseClient'

// Wipe all Invites with caseId, and wipe Case's interviewDueBy
export async function POST(request: Request) {
  try {
    const { caseId } = await request.json()
    if (!caseId) throw new Error('No case id.')

    // Wipe all Invites with caseId
    const { data: inviteData, error: inviteError } = await supabase
      .from('Invitation')
      .delete()
      .eq('caseId', caseId)
      .select()

    if (inviteError)
      throw new Error(`Failed to delete invites: ${inviteError.message}`)

    // Wipe Case's interviewDueBy
    const { data: caseUpdateData, error: caseUpdateError } = await supabase
      .from('Case')
      .update({ interviewDueBy: null })
      .eq('id', caseId)
      .select()

    if (caseUpdateError)
      throw new Error(
        `Failed to set interviewDueBy date: ${caseUpdateError.message}`,
      )

    return new Response(
      JSON.stringify({ data: inviteData, error: inviteError }),
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
