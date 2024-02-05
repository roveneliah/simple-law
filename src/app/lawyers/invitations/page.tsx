'use client'
import LawyerViewLayout from '@/components/LawyerViewLayout'
import AppLayout from '@/components/Layout/AppLayout'

export const INVITATIONS = [
  {
    caseId: '1234',
    nickname: 'Personal Injury, $200000, San Diego, CA',
    note: 'Hey John, client seeking $200000 damages, based in San Diego.  Client ready to start immediately.',
    interviewBy: new Date(),
  },
]

function InvitationsList() {
  return (
    <div>
      {INVITATIONS.map((invitation) => (
        <div>
          <div className="font-medium">{invitation.nickname}</div>
          <div>{invitation.note}</div>
          <div className="flex w-full flex-row justify-end">
            <button>Accept</button>
            <button>Decline</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function InvitationsView() {
  return (
    <AppLayout>
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
    </AppLayout>
  )
}
