import { supabase } from '@/lib/supabaseClient'
import { createNoteForLawyer } from './utils/createNoteForLawyer'
import { v4 as uuidv4 } from 'uuid'
import { Case, Invitation, Lawyer } from '@prisma/client'
import sendEmailInvitation from '../../email/invite-by-caseId/sendEmailInvitation'

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

export async function createInvitationsForLawyers(
  curatedList: Lawyer[],
  caseData: Case,
) {
  const invitations = curatedList.map(async (lawyer: Lawyer) => {
    return {
      id: uuidv4(),
      caseId: caseData.id,
      lawyerId: lawyer.id,
      status: 'pending',
      comment: await createNoteForLawyer({ caseData, lawyer }),
      dueBy: new Date(Date.now() + 48 * 60 * 60 * 1000),
      updatedAt: new Date(),
    }
  })

  const results = await Promise.allSettled(invitations)
  const errors = results.filter((result) => result.status === 'rejected')

  if (errors.length > 0) {
    console.error('Errors occurred while creating invitations:', errors)
    throw new Error('Failed to create some invitations.')
  }

  return results.map((result: any) => result.value) // Assuming you want to return successful inserts
}

export const createInvitations = async (caseData: Case) => {
  const curatedList = await fetchCuratedList(caseData)

  // write custom notes for each recipient
  const invitationsData = await createInvitationsForLawyers(
    curatedList,
    caseData,
  )

  // insert the invitations into the database
  await supabase.from('Invitation').insert(invitationsData)
  const { data: invitations, error } = await supabase
    .from('Invitation')
    .select('*, Lawyer(*), Case(*)')
    .eq('caseId', caseData.id)

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

  return { data: receipts, error }
}

export async function POST(request: Request) {
  try {
    const { caseData } = await request.json()
    if (!caseData.id) throw new Error('No case id.')

    const { data, error } = await createInvitations(caseData)

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
