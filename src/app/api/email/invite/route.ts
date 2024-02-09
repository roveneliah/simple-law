import { supabase } from '@/lib/supabaseClient'
import { Case, Invitation, Lawyer } from '@prisma/client'

// TODO: ACTUALLY SEND EMAILS INSTEAD OF MOCKING IT
export async function sendEmailInvitation(invitation: Invitation) {
  const emailParams = {
    to: invitation.Lawyer.email,
    subject: 'You have been invited to a new case',
    text: `You have been invited to a new case: ${invitation.Case.title}`,
    interviewLink: `http://localhost:3000/lawyers/invitations/${invitation.id}`,
  }
  return {
    ...emailParams,
    sentAt: new Date(),
  }
}

export async function POST(request: Request) {
  try {
    const { caseId } = await request.json()
    // given a caseId, send out invitations on it that are pending

    const { data: invitations, error } = await supabase
      .from('Invitation')
      .select('*, Lawyer(*), Case(*)')
      .eq('caseId', caseId)

    // send out emails to the lawyers
    const receipts = await Promise.all(
      invitations?.map(sendEmailInvitation) || [],
    )

    return new Response(JSON.stringify(receipts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
