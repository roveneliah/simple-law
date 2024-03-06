import { supabase } from '@/lib/supabaseClient'
import { Case, Invitation, Lawyer } from '@prisma/client'
import sendEmailInvitation from '../../email/invite-by-caseId/sendEmailInvitation'
import { createInvitationsForLawyers } from './utils/createInvitationsForLawyers'
import { getCaseData } from '../../cases/review/parse/route'
import { dispatchInvitationsForCase } from '../../email/invite-by-caseId/route'

// Get lawyers to Interview
async function fetchCuratedList(caseData: Case) {
  const response = await fetch('http://localhost:3000/api/invitations/curate', {
    method: 'POST',
    body: JSON.stringify({ caseData }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch curated list: ${response.statusText}`)
  }

  const { data: curatedList } = await response.json()
  return curatedList || []
}

export const createInvitationsForCase = async (caseData: Case) => {
  const curatedList: Lawyer[] = await fetchCuratedList(caseData)

  // write custom notes for each recipient
  const invitationsData = await createInvitationsForLawyers(
    curatedList,
    caseData,
  )

  // insert the invitations into the database
  const { data, error } = await supabase
    .from('Invitation')
    .insert(invitationsData)
    .select()

  return { data, error }
}

export async function POST(request: Request) {
  try {
    console.log('Trying to create invitations for case...')
    const { caseId } = await request.json()
    console.log(caseId)
    if (!caseId) throw new Error('No case id.')

    const { data: caseData, error: getCaseDataError } =
      await getCaseData(caseId)

    if (getCaseDataError)
      throw new Error(`Failed to get case data: ${getCaseDataError}`)
    if (!caseData) throw new Error(`No case data found for case id: ${caseId}`)
    if (!caseData.readyForInvitation)
      throw new Error('Case is not ready for invitation.')

    const { data, error } = await createInvitationsForCase(caseData)
    if (error) throw new Error(`Failed to create invitations: ${error.message}`)

    // update interviewDueBy on Case
    const interviewDueBy = new Date()
    interviewDueBy.setDate(interviewDueBy.getDate() + 2)
    const { data: caseUpdateData, error: caseUpdateError } = await supabase
      .from('Case')
      .update({ interviewDueBy })
      .eq('id', caseId)
      .select()

    if (caseUpdateError)
      throw new Error(
        `Failed to set interviewDueBy date: ${caseUpdateError.message}`,
      )

    return new Response(JSON.stringify({ data, error }), {
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
