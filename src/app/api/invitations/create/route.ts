import { supabase } from '@/lib/supabaseClient'
import { createNoteForLawyer } from './utils/createNoteForLawyer'
import { v4 as uuidv4 } from 'uuid'
import { Case, Lawyer } from '@prisma/client'

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
    const comment = await createNoteForLawyer({ caseData, lawyer })
    return {
      id: uuidv4(),
      caseId: caseData.id,
      lawyerId: lawyer.id,
      status: 'pending',
      comment,
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
  const invitations = await createInvitationsForLawyers(curatedList, caseData)
  const { data, error } = await supabase.from('Invitation').insert(invitations)

  return { data, error }
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
