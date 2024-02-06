'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import AppLayout from '@/components/Layout/AppLayout'
import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'
import { useState } from 'react'

export const INVITATIONS = [
  {
    caseId: '1234',
    nickname: 'Personal Injury, $200000, San Diego, CA',
    note: 'Hey John, client seeking $200000 damages, based in San Diego.  Client ready to start immediately.',
    interviewBy: new Date(),
  },
  {
    caseId: '1353424534',
    nickname: 'Divorce, Chula Vista, CA',
    note: 'Client looking for a divorce lawyer, based in Chula Vista.',
  },
]

function InvitationsList({}) {
  const [invitations, setInvitations] = useState(INVITATIONS)
  const declineInvitation = (caseId) => {
    setInvitations(
      invitations.filter((i) => {
        return caseId !== i.caseId
      }),
    )
  }
  return (
    <div className="flex flex-col gap-4">
      {invitations.map((invitation, i) => (
        <div key={i}>
          <div className="font-medium">{invitation.nickname}</div>
          <div>{invitation.note}</div>
          <div className="flex w-full flex-row justify-end gap-4">
            <button>View Details</button>
            <button onClick={() => declineInvitation(invitation.caseId)}>
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function InvitationsView() {
  return (
    <LawyerAppLayout>
      <LawyerViewLayout viewName="Invitations">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Invitations
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We've screened out the best cases for you. Check them out and
                let us know if you're interested.
              </p>
            </div>
          </div>
        </form>
        <div className="mt-8">
          <InvitationsList />
        </div>
      </LawyerViewLayout>
    </LawyerAppLayout>
  )
}
