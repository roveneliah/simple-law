import { supabase } from '@/lib/supabaseClient'
import sendEmailInvitation, {
  InvitationTemplateParams,
} from './sendEmailInvitation'

export const dispatchInvitationsForCase = async (caseId: string) => {
  const { data: invitations, error } = await supabase
    .from('Invitation')
    .select('*, Lawyer(*), Case(*)')
    .eq('caseId', caseId)

  // send out emails to the lawyers
  const receipts = await Promise.all(
    invitations?.map((invitation) => {
      return sendEmailInvitation({
        subject: 'New Case from ImpossibleLaw',
        title: invitation.Case.title,
        interviewLink: `https://impossiblelaw.com/lawyers/invitations/${invitation.caseId}`,
        to: invitation.Lawyer.email,
        comment: invitation.comment,
        dueBy: invitation.dueBy,
      })
    }) || [],
  )

  return receipts
}

// given a caseId, send out invitations on it that are pending
export async function POST(request: Request) {
  try {
    const { caseId } = await request.json()
    if (!caseId) throw new Error('No case id.')

    const receipts = await dispatchInvitationsForCase(caseId)

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
