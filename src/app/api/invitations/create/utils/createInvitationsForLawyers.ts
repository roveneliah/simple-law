import { createNoteForLawyer } from './createNoteForLawyer'
import { v4 as uuidv4 } from 'uuid'
import { Case, Invitation, Lawyer } from '@prisma/client'

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
